import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { ExportPokeService } from "@lib/user-data/export-poke.service"

describe("ExportPokeService", () => {
  let service: ExportPokeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportPokeService, provideExperimentalZonelessChangeDetection()]
    })

    service = TestBed.inject(ExportPokeService)
  })

  it("should export a Pokémon", () => {
    const pokemon = new Pokemon("Rillaboom", {
      ability: "Grassy Surge",
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 140, atk: 116, def: 4, spa: 0, spd: 84, spe: 164 }
    })

    const text = service.export(pokemon)

    expect(text).toEqual(`Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
Tera Type: Fire
EVs: 140 HP / 116 Atk / 4 Def / 84 SpD / 164 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower
`)
  })

  it("should export a list of Pokémon", () => {
    const pokemon1 = new Pokemon("Rillaboom", {
      ability: "Grassy Surge",
      nature: "Adamant",
      item: "Assault Vest",
      teraType: "Fire",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("High Horsepower")),
      evs: { hp: 196, atk: 196, def: 4, spa: 0, spd: 12, spe: 100 }
    })

    const pokemon2 = new Pokemon("Incineroar", {
      ability: "Intimidate",
      nature: "Jolly",
      item: "Safety Goggles",
      teraType: "Ghost",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      evs: { hp: 244, def: 4, spa: 20, spd: 4, spe: 252 }
    })

    const pokemon3 = new Pokemon("Urshifu-Rapid-Strike", {
      ability: "Unseen Fist",
      nature: "Adamant",
      item: "Focus Sash",
      teraType: "Stellar",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
      ivs: { hp: 1, atk: 2, def: 3, spa: 4, spd: 5, spe: 6 }
    })

    const text = service.exportAll([pokemon1, pokemon2, pokemon3])

    expect(text).toBe(`Rillaboom @ Assault Vest
Ability: Grassy Surge
Level: 50
Tera Type: Fire
EVs: 196 HP / 196 Atk / 4 Def / 12 SpD / 100 Spe
Adamant Nature
- Fake Out
- Grassy Glide
- Wood Hammer
- High Horsepower

Incineroar @ Safety Goggles
Ability: Intimidate
Level: 50
Tera Type: Ghost
EVs: 244 HP / 4 Def / 20 SpA / 4 SpD / 252 Spe
Jolly Nature
- Fake Out
- Knock Off
- Flare Blitz
- Parting Shot

Urshifu-Rapid-Strike @ Focus Sash
Ability: Unseen Fist
Level: 50
Tera Type: Stellar
EVs: 4 HP / 252 Atk / 252 Spe
Adamant Nature
IVs: 1 HP / 2 Atk / 3 Def / 4 SpA / 5 SpD / 6 Spe
- Surging Strikes
- Close Combat
- Aqua Jet
- Detect

`)
  })
})