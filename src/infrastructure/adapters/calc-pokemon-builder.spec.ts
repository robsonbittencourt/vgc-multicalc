import { Ability } from "@multicalc/model/ability"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Status } from "@multicalc/model/status"
import { PokemonParameters } from "@multicalc/model/pokemon"
import { AbilityName, ItemName } from "@data/types"
import { fromExisting, fromScratch } from "./calc-pokemon-builder"

const SELECT_POKEMON_LABEL = "Select a Pokémon"

describe("CalcPokemonBuilder", () => {
  it("should create a CalcPokemon from an existing Pokemon", () => {
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

    const calcPokemon = fromExisting(pokemon)

    expect(calcPokemon.name).toBe("Pikachu")
    expect(calcPokemon.ability).toBe("Levitate" as AbilityName)
    expect(calcPokemon.item).toBe("Choice Scarf" as ItemName)
    expect(calcPokemon.nature).toBe("Timid")
    expect(calcPokemon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(calcPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(calcPokemon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(calcPokemon.status).toBe("par")
    expect(calcPokemon.originalCurrrentHp).toBe(Math.round((calcPokemon.maxHp() * 50) / 100))
  })

  it("should create a CalcPokemon from scratch with default values", () => {
    const calcPokemon = fromScratch(SELECT_POKEMON_LABEL, {})

    expect(calcPokemon.name).toBe("Togepi")
    expect(calcPokemon.ability).toBe("Hustle" as AbilityName)
    expect(calcPokemon.item).toBeUndefined()
    expect(calcPokemon.nature).toBe("Hardy")
    expect(calcPokemon.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(calcPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(calcPokemon.boosts).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(calcPokemon.status).toBe("")
    expect(calcPokemon.originalCurrrentHp).toBe(calcPokemon.maxHp())
  })

  it("should create a CalcPokemon from scratch with provided values", () => {
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
    const calcPokemon = fromScratch("Pikachu", options)

    expect(calcPokemon.name).toBe("Pikachu")
    expect(calcPokemon.ability).toBe("Levitate" as AbilityName)
    expect(calcPokemon.item).toBe("Choice Scarf" as ItemName)
    expect(calcPokemon.nature).toBe("Timid")
    expect(calcPokemon.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 })
    expect(calcPokemon.ivs).toEqual({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })
    expect(calcPokemon.boosts).toEqual({ hp: 0, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 })
    expect(calcPokemon.status).toBe("par")
    expect(calcPokemon.originalCurrrentHp).toBe(Math.round((calcPokemon.maxHp() * 50) / 100))
  })
})
