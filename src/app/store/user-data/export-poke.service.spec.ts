import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog"
import { FEATURES } from "@configuration/feature-flags"
import { TeamExportModalComponent } from "@features/export-modal/export-modal.component"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { MockOf } from "@app/test-utils"

describe("ExportPokeService", () => {
  let service: ExportPokeService
  let dialogSpy: MockOf<MatDialog>

  beforeEach(() => {
    dialogSpy = { open: vi.fn() } as unknown as MockOf<MatDialog>

    TestBed.configureTestingModule({
      providers: [ExportPokeService, { provide: MatDialog, useValue: dialogSpy }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(ExportPokeService)
  })

  function rillaboom(): Pokemon {
    return new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })
  }

  it("should open the export modal with a single Pokémon", async () => {
    const pokemon = rillaboom()

    await service.export("Title", pokemon)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
      data: { title: "Title", pokemon: [pokemon], useSpsMode: false, includeTeraType: FEATURES.teraType },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: expect.any(NoopScrollStrategy)
    })
  })

  it("should open the export modal with a list of Pokémon", async () => {
    const pokemon1 = rillaboom()
    const pokemon2 = new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Jolly",
      item: "Safety Goggles",
      teraType: "Ghost",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      evs: { hp: 244, def: 4, spa: 20, spd: 4, spe: 252 }
    })

    await service.export("Title", [pokemon1, pokemon2])

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
      data: { title: "Title", pokemon: [pokemon1, pokemon2], useSpsMode: false, includeTeraType: FEATURES.teraType },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: expect.any(NoopScrollStrategy)
    })
  })

  it("should pass useSpsMode true through to the modal", async () => {
    const pokemon = rillaboom()

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
      data: { title: "Title", pokemon: [pokemon], useSpsMode: true, includeTeraType: FEATURES.teraType },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: expect.any(NoopScrollStrategy)
    })
  })

  it("should open the modal with an empty list when called with no pokemon argument", async () => {
    await (service as unknown as { export: (title: string) => Promise<void> }).export("Title")

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
      data: { title: "Title", pokemon: [], useSpsMode: false, includeTeraType: FEATURES.teraType },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: expect.any(NoopScrollStrategy)
    })
  })

  it("should filter out non-Pokémon arguments when called outside the typed overloads", async () => {
    const pokemon = rillaboom()

    await (service as unknown as { export: (title: string, ...args: unknown[]) => Promise<void> }).export("Title", "not-a-pokemon", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
      data: { title: "Title", pokemon: [pokemon], useSpsMode: true, includeTeraType: FEATURES.teraType },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: expect.any(NoopScrollStrategy)
    })
  })

  it("should pass the current teraType feature flag to the modal", async () => {
    FEATURES.teraType = true

    try {
      const pokemon = rillaboom()

      await service.export("Title", pokemon)

      expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, {
        data: { title: "Title", pokemon: [pokemon], useSpsMode: false, includeTeraType: true },
        width: "40em",
        position: { top: "2em" },
        autoFocus: false,
        scrollStrategy: expect.any(NoopScrollStrategy)
      })
    } finally {
      FEATURES.teraType = false
    }
  })
})
