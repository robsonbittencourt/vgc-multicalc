import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TeamListPlayerInfo } from "@features/modals/team-list-modal/team-list-modal.component"
import { PdfExportService } from "@store/user-data/pdf-export.service"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { CalcStore } from "@store/calc-store"
import { Ability, Move, MoveSet, Pokemon, Team, TeamMember } from "@multicalc/model"

vi.mock("pdf-lib", () => {
  const fakePage = { drawText: vi.fn() }

  const fakeDoc = {
    embedFont: vi.fn().mockResolvedValue({}),
    getPages: vi.fn().mockReturnValue([fakePage, fakePage]),
    removePage: vi.fn(),
    save: vi.fn().mockResolvedValue(new Uint8Array())
  }

  return {
    PDFDocument: { load: vi.fn().mockResolvedValue(fakeDoc) },
    StandardFonts: { Helvetica: "Helvetica" },
    rgb: vi.fn()
  }
})

describe("PdfExportService", () => {
  let service: PdfExportService
  let store: CalcStore

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

  beforeEach(() => {
    localStorage.clear()

    vi.spyOn(globalThis, "fetch").mockResolvedValue({ arrayBuffer: async () => new ArrayBuffer(0) } as Response)
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(vi.fn())
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockReset().mockImplementation(vi.fn())

    TestBed.configureTestingModule({
      providers: [PdfExportService, MegaStoneService, CalcStore, provideZonelessChangeDetection()]
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

  it("should generate a pdf including both pages and download it using the player id as filename", async () => {
    const pokemon = new Pokemon("Garchomp", {
      ability: new Ability("Rough Skin"),
      nature: "Jolly",
      item: "Choice Scarf",
      moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Fire Fang"), new Move("Rock Slide"))
    })
    const team = buildTeamWithMembers([pokemon])

    await service.generatePdf(team, basePlayerInfo)

    expect(URL.createObjectURL).toHaveBeenCalled()
    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012.pdf")
  })

  it("should use the team name as filename when the player id is empty", async () => {
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    await service.generatePdf(team, { ...basePlayerInfo, playerId: "" })

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("My Team.pdf")
  })

  it("should append a -staff suffix and remove the OTS page when the selection is Staff only", async () => {
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    await service.generatePdf(team, { ...basePlayerInfo, pageSelection: "Staff" })

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012-staff.pdf")
  })

  it("should append an -ots suffix and remove the staff page when the selection is OTS only", async () => {
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    await service.generatePdf(team, { ...basePlayerInfo, pageSelection: "OTS" })

    const anchor = (HTMLAnchorElement.prototype.click as any).mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe("1234-5678-9012-ots.pdf")
  })

  it("should print at most 6 Pokémon when the team has more than 6 members", async () => {
    const pokemons = Array.from({ length: 8 }, () => new Pokemon("Garchomp", { nature: "Jolly", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) }))
    const team = buildTeamWithMembers(pokemons)

    await expect(service.generatePdf(team, basePlayerInfo)).resolves.not.toThrow()
  })

  describe("date of birth parsing", () => {
    it("should parse a mdy date order", async () => {
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(service.generatePdf(team, { ...basePlayerInfo, dateOfBirth: "05/20/1997", datePartOrder: "mdy" })).resolves.not.toThrow()
    })

    it("should parse a dmy date order", async () => {
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(service.generatePdf(team, { ...basePlayerInfo, dateOfBirth: "20/05/1997", datePartOrder: "dmy" })).resolves.not.toThrow()
    })

    it("should parse a ymd date order", async () => {
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(service.generatePdf(team, { ...basePlayerInfo, dateOfBirth: "1997/05/20", datePartOrder: "ymd" })).resolves.not.toThrow()
    })
  })

  describe("age division", () => {
    it.each([["Juniors"], ["Seniors"], ["Masters"]] as const)("should mark the %s checkbox", async ageDivision => {
      const team = buildTeamWithMembers([new Pokemon("Garchomp")])

      await expect(service.generatePdf(team, { ...basePlayerInfo, ageDivision })).resolves.not.toThrow()
    })
  })

  describe("mega evolved Pokémon", () => {
    it("should print the base form and ability when the Pokémon is currently mega evolved with a stored base ability", async () => {
      const megaStoneService = TestBed.inject(MegaStoneService)
      const pokemonId = store.addPokemonToTeam("Kangaskhan")
      store.item(pokemonId, "Kangaskhanite")
      store.ability(pokemonId, "Scrappy")
      megaStoneService.toggleMega(pokemonId, "Kangaskhan", "Kangaskhanite")
      const mega = store.findPokemonById(pokemonId)

      const team = buildTeamWithMembers([mega])

      await expect(service.generatePdf(team, basePlayerInfo)).resolves.not.toThrow()
    })

    it("should fall back to the species default ability when the Pokémon is mega evolved without a stored base ability", async () => {
      const pokemon = new Pokemon("Kangaskhan-Mega")
      const team = buildTeamWithMembers([pokemon])

      await expect(service.generatePdf(team, basePlayerInfo)).resolves.not.toThrow()
    })
  })

  it("should omit the OTS switch profile name field when it is empty", async () => {
    const team = buildTeamWithMembers([new Pokemon("Garchomp")])

    await expect(service.generatePdf(team, { ...basePlayerInfo, switchProfileName: "" })).resolves.not.toThrow()
  })

  it("should omit the held item when the Pokémon has no item", async () => {
    const pokemon = new Pokemon("Garchomp", { item: "No Item" })
    const team = buildTeamWithMembers([pokemon])

    await expect(service.generatePdf(team, basePlayerInfo)).resolves.not.toThrow()
  })
})
