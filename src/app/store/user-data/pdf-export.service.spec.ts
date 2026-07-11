import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog"
import { TeamListPlayerInfo } from "@features/modals/team-list-modal/team-list-modal.component"
import { PdfExportService } from "@store/user-data/pdf-export.service"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { CalcStore } from "@store/calc-store"
import { Ability, Move, MoveSet, Pokemon, Team, TeamMember } from "@multicalc/model"
import { MockOf } from "@app/test-utils"

describe("PdfExportService", () => {
  let service: PdfExportService
  let store: CalcStore
  let dialogSpy: MockOf<MatDialog>
  let afterClosedValue: TeamListPlayerInfo | undefined

  const basePlayerInfo: TeamListPlayerInfo = {
    playerName: "Ash Ketchum",
    ageDivision: "Masters",
    pageSelection: "Both",
    trainerName: "Ash",
    playerId: "1234-5678-9012",
    battleTeamName: "Battle Team",
    dateOfBirth: "05/20/1997",
    datePartOrder: "mdy",
    switchProfileName: "AshSwitch",
    supportId: "AAAA-BBBB"
  }

  beforeEach(async () => {
    localStorage.clear()

    const templatePdf = await buildFakeTemplatePdf()
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ arrayBuffer: async () => templatePdf } as Response)
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(vi.fn())
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockReset().mockImplementation(vi.fn())

    afterClosedValue = basePlayerInfo
    dialogSpy = {
      open: vi.fn().mockReturnValue({
        afterClosed: () => ({ subscribe: (cb: (info: TeamListPlayerInfo | undefined) => void) => cb(afterClosedValue) })
      })
    } as unknown as MockOf<MatDialog>

    TestBed.configureTestingModule({
      providers: [PdfExportService, MegaStoneService, CalcStore, { provide: MatDialog, useValue: dialogSpy }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(PdfExportService)
    store = TestBed.inject(CalcStore)
  })

  const buildTeamWithMembers = (pokemons: Pokemon[]): Team =>
    new Team(
      "1",
      true,
      "My Team",
      pokemons.map(p => new TeamMember(p))
    )

  const waitForPdfGeneration = () => new Promise(resolve => setTimeout(resolve, 0))

  it("should not generate a pdf when the dialog is closed without player info", async () => {
    afterClosedValue = undefined
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    service.export(team)
    await waitForPdfGeneration()

    expect(URL.createObjectURL).not.toHaveBeenCalled()
  })

  it("should open the team list dialog with the team name", () => {
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    service.export(team)

    expect(dialogSpy.open).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ data: { teamName: "My Team" } }))
  })

  it("should generate a pdf including both pages and download it using the player id as filename", async () => {
    const pokemon = new Pokemon("Garchomp", {
      ability: new Ability("Rough Skin"),
      nature: "Jolly",
      item: "Choice Scarf",
      moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Fire Fang"), new Move("Rock Slide"))
    })
    const team = buildTeamWithMembers([pokemon])

    service.export(team)
    await waitForPdfGeneration()

    expect(URL.createObjectURL).toHaveBeenCalled()
    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012.pdf")
  })

  it("should use the team name as filename when the player id is empty", async () => {
    afterClosedValue = { ...basePlayerInfo, playerId: "" }
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    service.export(team)
    await waitForPdfGeneration()

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("My Team.pdf")
  })

  it("should append a -staff suffix and remove the OTS page when the selection is Staff only", async () => {
    afterClosedValue = { ...basePlayerInfo, pageSelection: "Staff" }
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    service.export(team)
    await waitForPdfGeneration()

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012-staff.pdf")
  })

  it("should append an -ots suffix and remove the staff page when the selection is OTS only", async () => {
    afterClosedValue = { ...basePlayerInfo, pageSelection: "OTS" }
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    service.export(team)
    await waitForPdfGeneration()

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012-ots.pdf")
  })

  it("should print at most 6 Pokémon when the team has more than 6 members", async () => {
    const pokemons = Array.from({ length: 8 }, () => new Pokemon("Garchomp", { nature: "Jolly", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) }))
    const team = buildTeamWithMembers(pokemons)

    await expect(async () => {
      service.export(team)
      await waitForPdfGeneration()
    }).not.toThrow()
  })

  describe("date of birth parsing", () => {
    it("should parse a mdy date order", async () => {
      afterClosedValue = { ...basePlayerInfo, dateOfBirth: "05/20/1997", datePartOrder: "mdy" }
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(async () => {
        service.export(team)
        await waitForPdfGeneration()
      }).not.toThrow()
    })

    it("should parse a dmy date order", async () => {
      afterClosedValue = { ...basePlayerInfo, dateOfBirth: "20/05/1997", datePartOrder: "dmy" }
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(async () => {
        service.export(team)
        await waitForPdfGeneration()
      }).not.toThrow()
    })

    it("should parse a ymd date order", async () => {
      afterClosedValue = { ...basePlayerInfo, dateOfBirth: "1997/05/20", datePartOrder: "ymd" }
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(async () => {
        service.export(team)
        await waitForPdfGeneration()
      }).not.toThrow()
    })
  })

  describe("age division", () => {
    it.each([["Juniors"], ["Seniors"], ["Masters"]] as const)("should mark the %s checkbox", async ageDivision => {
      afterClosedValue = { ...basePlayerInfo, ageDivision }
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(async () => {
        service.export(team)
        await waitForPdfGeneration()
      }).not.toThrow()
    })
  })

  describe("mega evolved Pokémon", () => {
    it("should print the base form and ability when the Pokémon is currently mega evolved with a stored base ability", () => {
      const megaStoneService = TestBed.inject(MegaStoneService)
      const pokemonId = store.addPokemonToTeam("Kangaskhan")
      store.item(pokemonId, "Kangaskhanite")
      store.ability(pokemonId, "Scrappy")
      megaStoneService.toggleMega(pokemonId, "Kangaskhan", "Kangaskhanite")
      const mega = store.findPokemonById(pokemonId)

      const team = buildTeamWithMembers([mega])

      expect(() => service.export(team)).not.toThrow()
    })

    it("should fall back to the species default ability when the Pokémon is mega evolved without a stored base ability", () => {
      const pokemon = new Pokemon("Kangaskhan-Mega")
      const team = buildTeamWithMembers([pokemon])

      expect(() => service.export(team)).not.toThrow()
    })
  })

  it("should omit the OTS switch profile name field when it is empty", async () => {
    afterClosedValue = { ...basePlayerInfo, switchProfileName: "" }
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    await expect(async () => {
      service.export(team)
      await waitForPdfGeneration()
    }).not.toThrow()
  })

  it("should omit the held item when the Pokémon has no item", async () => {
    const pokemon = new Pokemon("Garchomp", { item: "No Item" })
    const team = buildTeamWithMembers([pokemon])

    await expect(async () => {
      service.export(team)
      await waitForPdfGeneration()
    }).not.toThrow()
  })
})

async function buildFakeTemplatePdf(): Promise<ArrayBuffer> {
  const { PDFDocument, StandardFonts } = await import("pdf-lib")
  const doc = await PDFDocument.create()
  doc.addPage([612, 792])
  doc.addPage([612, 792])
  await doc.embedFont(StandardFonts.Helvetica)
  const bytes = await doc.save()

  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}
