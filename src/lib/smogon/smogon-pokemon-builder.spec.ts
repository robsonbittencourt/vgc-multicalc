import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SELECT_POKEMON_LABEL } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { PokemonParameters } from "@lib/types"
import { AbilityName, ItemName } from "@robsonbittencourt/calc/src/data/interface"
import { SmogonPokemonBuilder } from "./smogon-pokemon-builder"

describe("SmogonPokemonBuilder", () => {
  let builder: SmogonPokemonBuilder

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()]
    })

    builder = TestBed.inject(SmogonPokemonBuilder)
  })

  it("should create a PokemonSmogon from an existing Pokemon", () => {
    const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
    const ability = new Ability("Levitate", true)
    const options: PokemonParameters = {
      id: "test-id",
      moveSet: moveSet,
      teraType: "Electric",
      hpPercentage: 50,
      commanderActive: true,
      nature: "Timid",
      item: "Choice Scarf",
      ability: ability,
      teraTypeActive: true,
      evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
      status: Status.PARALYSIS
    }
    const pokemon = new Pokemon("Pikachu", options)

    const pokemonSmogon = builder.fromExisting(pokemon)

    expect(pokemonSmogon.name).toBe("Pikachu")
    expect(pokemonSmogon.ability).toBe("Levitate" as AbilityName)
    expect(pokemonSmogon.item).toBe("Choice Scarf" as ItemName)
    expect(pokemonSmogon.nature).toBe("Timid")
    expect(pokemonSmogon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(pokemonSmogon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(pokemonSmogon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(pokemonSmogon.status).toBe("par")
    expect(pokemonSmogon.originalCurHP).toBe(Math.round((pokemonSmogon.maxHP() * 50) / 100))
  })

  it("should create a PokemonSmogon from scratch with default values", () => {
    const pokemonSmogon = builder.fromScratch(SELECT_POKEMON_LABEL, {})

    expect(pokemonSmogon.name).toBe("Togepi")
    expect(pokemonSmogon.ability).toBe("Hustle" as AbilityName)
    expect(pokemonSmogon.item).toBeUndefined()
    expect(pokemonSmogon.nature).toBe("Hardy")
    expect(pokemonSmogon.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(pokemonSmogon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(pokemonSmogon.boosts).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(pokemonSmogon.status).toBe("")
    expect(pokemonSmogon.originalCurHP).toBe(pokemonSmogon.maxHP())
  })

  it("should create a PokemonSmogon from scratch with provided values", () => {
    const ability = new Ability("Levitate", true)
    const options: PokemonParameters = {
      nature: "Timid",
      item: "Choice Scarf",
      ability: ability,
      teraType: "Electric",
      teraTypeActive: true,
      evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
      status: Status.PARALYSIS,
      hpPercentage: 50
    }
    const pokemonSmogon = builder.fromScratch("Pikachu", options)

    expect(pokemonSmogon.name).toBe("Pikachu")
    expect(pokemonSmogon.ability).toBe("Levitate" as AbilityName)
    expect(pokemonSmogon.item).toBe("Choice Scarf" as ItemName)
    expect(pokemonSmogon.nature).toBe("Timid")
    expect(pokemonSmogon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(pokemonSmogon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(pokemonSmogon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(pokemonSmogon.status).toBe("par")
    expect(pokemonSmogon.originalCurHP).toBe(Math.round((pokemonSmogon.maxHP() * 50) / 100))
  })
})
