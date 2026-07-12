import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog"
import { FEATURES } from "@configuration/feature-flags"
import { TeamExportModalComponent } from "@features/modals/export-modal/export-modal.component"
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

  it("should export a Pokémon", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    await service.export("Title", pokemon)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithOnePokemon }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export Aegislash forms as Aegislash", async () => {
    const pokemonShield = new Pokemon("Aegislash-Shield", {
      ability: new Ability("Stance Change"),
      nature: "Quiet",
      item: "Leftovers",
      teraType: "Steel",
      moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Flash Cannon"), new Move("Wide Guard"), new Move("King's Shield")),
      evs: { hp: 32, atk: 0, def: 1, spa: 32, spd: 1, spe: 0 }
    })

    const pokemonBlade = new Pokemon("Aegislash-Blade", {
      ability: new Ability("Stance Change"),
      nature: "Quiet",
      item: "Leftovers",
      teraType: "Steel",
      moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Flash Cannon"), new Move("Wide Guard"), new Move("King's Shield")),
      evs: { hp: 32, atk: 0, def: 1, spa: 32, spd: 1, spe: 0 }
    })

    await service.export("Title", [pokemonShield, pokemonBlade])

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithAegislashBoth }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export a Pokémon with less than 4 moves without undefined lines", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      teraType: "Normal",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move("")),
      ivs: { hp: 31, atk: 30, def: 31, spa: 31, spd: 31, spe: 31 }
    })

    await service.export("Title", pokemon)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithOneMove }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export a list of Pokémon", async () => {
    const pokemon1 = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 196, atk: 196, def: 4, spa: 0, spd: 12, spe: 100 }
    })

    const pokemon2 = new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Jolly",
      item: "Safety Goggles",
      teraType: "Ghost",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      evs: { hp: 244, def: 4, spa: 20, spd: 4, spe: 252 }
    })

    const pokemon3 = new Pokemon("Urshifu-Rapid-Strike", {
      ability: new Ability("Unseen Fist"),
      nature: "Adamant",
      item: "Focus Sash",
      teraType: "Stellar",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
      ivs: { hp: 1, atk: 2, def: 3, spa: 4, spd: 5, spe: 6 }
    })

    await service.export("Title", [pokemon1, pokemon2, pokemon3])

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithThreePokemon }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export a single Pokémon using SP notation when useSpsMode is true", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithOnePokemonSps }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export a list of Pokémon using SP notation when useSpsMode is true", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    await service.export("Title", [pokemon], true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithOnePokemonSps }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should omit the EVs line entirely when a Pokémon has no invested EVs", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move(""))
    })

    await service.export("Title", pokemon)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithNoEvs }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should omit the SPs line entirely when a Pokémon has no invested EVs in SP mode", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move(""))
    })

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithNoEvs }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should export nothing when called with no pokemon argument at all", async () => {
    await (service as unknown as { export: (title: string) => Promise<void> }).export("Title")

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: "" }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should filter out non-Pokémon arguments when called outside the typed overloads", async () => {
    const pokemon = new Pokemon("Ditto", {
      ability: new Ability("Limber"),
      nature: "Hardy",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Transform"), new Move(""), new Move(""), new Move(""))
    })

    await (service as unknown as { export: (title: string, ...args: unknown[]) => Promise<void> }).export("Title", "not-a-pokemon", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithNoEvs }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should omit only the HP entry from the SPs line when HP has no invested EVs", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 0, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithNoHpSps }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should omit only the SpD entry from the SPs line when SpD has no invested EVs", async () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: new Ability("Grassy Surge"),
      nature: "Adamant",
      item: "Assault Vest",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 0, spe: 164 }
    })

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithNoSpdSps }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should include the SpA entry in the SPs line when SpA has invested EVs", async () => {
    const pokemon = new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Quiet",
      item: "Safety Goggles",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      evs: { hp: 244, atk: 0, def: 4, spa: 100, spd: 4, spe: 4 }
    })

    await service.export("Title", pokemon, true)

    expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithSpaSps }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
  })

  it("should include the Tera Type line when the teraType feature flag is enabled", async () => {
    FEATURES.teraType = true

    try {
      const pokemon = new Pokemon("Rillaboom", {
        ability: new Ability("Grassy Surge"),
        nature: "Adamant",
        item: "Assault Vest",
        teraType: "Fire",
        moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
        evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
      })

      await service.export("Title", pokemon)

      expect(dialogSpy.open).toHaveBeenCalledWith(TeamExportModalComponent, { data: { title: "Title", content: pasteWithTeraType }, width: "40em", position: { top: "2em" }, autoFocus: false, scrollStrategy: expect.any(NoopScrollStrategy) })
    } finally {
      FEATURES.teraType = false
    }
  })
})

const pasteWithOneMove = `Ditto @ Assault Vest
Ability: Limber
Level: 50
Hardy Nature
- Transform

`

const pasteWithAegislashBoth = `Aegislash @ Leftovers
Ability: Stance Change
Level: 50
EVs: 32 HP / 1 Def / 32 SpA / 1 SpD
Quiet Nature
- Shadow Ball
- Flash Cannon
- Wide Guard
- King's Shield

Aegislash @ Leftovers
Ability: Stance Change
Level: 50
EVs: 32 HP / 1 Def / 32 SpA / 1 SpD
Quiet Nature
- Shadow Ball
- Flash Cannon
- Wide Guard
- King's Shield

`

const pasteWithOnePokemon = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 140 HP / 116 Atk / 4 Def / 84 SpD / 164 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

`

const pasteWithOnePokemonSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 18 HP / 15 Atk / 1 Def / 11 SpD / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

`

const pasteWithNoEvs = `Ditto @ Assault Vest
Ability: Limber
Level: 50
Hardy Nature
- Transform

`

const pasteWithNoHpSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 15 Atk / 1 Def / 11 SpD / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

`

const pasteWithNoSpdSps = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 18 HP / 15 Atk / 1 Def / 21 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

`

const pasteWithSpaSps = `Incineroar @ Safety Goggles
Ability: Intimidate
Level: 50
EVs: 31 HP / 1 Def / 13 SpA / 1 SpD / 1 Spe
Quiet Nature
- Fake Out
- Knock Off
- Flare Blitz
- Parting Shot

`

const pasteWithTeraType = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
Tera Type: Fire
EVs: 140 HP / 116 Atk / 4 Def / 84 SpD / 164 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

`

const pasteWithThreePokemon = `Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
EVs: 196 HP / 196 Atk / 4 Def / 12 SpD / 100 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

Incineroar @ Safety Goggles
Ability: Intimidate
Level: 50
EVs: 244 HP / 4 Def / 20 SpA / 4 SpD / 252 Spe
Jolly Nature
- Fake Out
- Knock Off
- Flare Blitz
- Parting Shot

Urshifu-Rapid-Strike @ Focus Sash
Ability: Unseen Fist
Level: 50
EVs: 4 HP / 252 Atk / 252 Spe
Adamant Nature
- Surging Strikes
- Close Combat
- Aqua Jet
- Detect

`
