import { SELECT_POKEMON_LABEL } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { PokemonParameters } from "@lib/types"
import { AbilityName, ItemName } from "@robsonbittencourt/calc/src/data/interface"
import { fromExisting, fromScratch } from "./smogon-pokemon-builder"

describe("SmogonPokemonBuilder", () => {
  it("should create a SmogonPokemon from an existing Pokemon", () => {
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

    const smogonPokemon = fromExisting(pokemon)

    expect(smogonPokemon.name).toBe("Pikachu")
    expect(smogonPokemon.ability).toBe("Levitate" as AbilityName)
    expect(smogonPokemon.item).toBe("Choice Scarf" as ItemName)
    expect(smogonPokemon.nature).toBe("Timid")
    expect(smogonPokemon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(smogonPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(smogonPokemon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(smogonPokemon.status).toBe("par")
    expect(smogonPokemon.originalCurHP).toBe(Math.round((smogonPokemon.maxHP() * 50) / 100))
  })

  it("should create a SmogonPokemon from scratch with default values", () => {
    const smogonPokemon = fromScratch(SELECT_POKEMON_LABEL, {})

    expect(smogonPokemon.name).toBe("Togepi")
    expect(smogonPokemon.ability).toBe("Hustle" as AbilityName)
    expect(smogonPokemon.item).toBeUndefined()
    expect(smogonPokemon.nature).toBe("Hardy")
    expect(smogonPokemon.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(smogonPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(smogonPokemon.boosts).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(smogonPokemon.status).toBe("")
    expect(smogonPokemon.originalCurHP).toBe(smogonPokemon.maxHP())
  })

  it("should create a SmogonPokemon from scratch with provided values", () => {
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
    const smogonPokemon = fromScratch("Pikachu", options)

    expect(smogonPokemon.name).toBe("Pikachu")
    expect(smogonPokemon.ability).toBe("Levitate" as AbilityName)
    expect(smogonPokemon.item).toBe("Choice Scarf" as ItemName)
    expect(smogonPokemon.nature).toBe("Timid")
    expect(smogonPokemon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(smogonPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(smogonPokemon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(smogonPokemon.status).toBe("par")
    expect(smogonPokemon.originalCurHP).toBe(Math.round((smogonPokemon.maxHP() * 50) / 100))
  })
})
