import { PokemonState } from "@data/store/calculator-store"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { pokemonToState, stateToPokemon } from "./state-mapper"

describe("State Mapper", () => {
  describe("stateToPokemon", () => {
    it("should build Pokémon using state", () => {
      const result = stateToPokemon(pikachuState)

      expect(result.name).toBe("Pikachu")
      expect(result.nature).toBe("Timid")
      expect(result.item).toBe("Light Ball")
      expect(result.status).toBe(Status.HEALTHY)
      expect(result.ability.name).toBe("Static")
      expect(result.ability.on).toBe(false)
      expect(result.commanderActive).toBe(true)
      expect(result.teraType).toBe("Electric")
      expect(result.teraTypeActive).toBe(true)
      expect(result.activeMoveName).toBe("Thunderbolt")
      expect(result.move1Name).toEqual("Thunderbolt")
      expect(result.move2Name).toEqual("Quick Attack")
      expect(result.move3Name).toEqual("Volt Tackle")
      expect(result.move4Name).toEqual("Iron Tail")
      expect(result.boosts).toEqual({ atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.bonusBoosts).toEqual({ atk: -1, def: 0, spa: 0, spd: 0, spe: 0 })
      expect(result.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
    })
  })

  describe("pokemonToState", () => {
    it("should map Pikachu back to state correctly", () => {
      const result = pokemonToState(pikachu)

      expect(result.id).toBe("123")
      expect(result.name).toBe("Pikachu")
      expect(result.nature).toBe("Timid")
      expect(result.item).toBe("Light Ball")
      expect(result.status).toBe(Status.HEALTHY.description)
      expect(result.ability).toBe("Static")
      expect(result.abilityOn).toBe(false)
      expect(result.commanderActive).toBe(true)
      expect(result.teraType).toBe("Electric")
      expect(result.teraTypeActive).toBe(true)
      expect(result.activeMove).toBe("Thunderbolt")

      expect(result.moveSet[0].name).toBe("Thunderbolt")
      expect(result.moveSet[1].name).toBe("Quick Attack")
      expect(result.moveSet[2].name).toBe("Volt Tackle")
      expect(result.moveSet[3].name).toBe("Iron Tail")

      expect(result.boosts).toEqual({ atk: -1, def: -2, spa: 1, spd: 2, spe: 3 })
      expect(result.bonusBoosts).toEqual({ atk: -1, def: 0, spa: 0, spd: 0, spe: 0 })
      expect(result.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 })
      expect(result.ivs).toEqual({ hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 })
      expect(result.hpPercentage).toBe(100)
    })
  })
})

const pikachuState: PokemonState = {
  id: "123",
  name: "Pikachu",
  nature: "Timid",
  item: "Light Ball",
  status: Status.HEALTHY.description,
  ability: "Static",
  abilityOn: false,
  commanderActive: true,
  teraType: "Electric",
  teraTypeActive: true,
  activeMove: "Thunderbolt",
  moveSet: [{ name: "Thunderbolt" }, { name: "Quick Attack" }, { name: "Volt Tackle" }, { name: "Iron Tail" }],
  boosts: { atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  bonusBoosts: { atk: -1, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100,
  automaticAbilityOn: false
}

const pikachu = new Pokemon("Pikachu", {
  id: "123",
  nature: "Timid",
  item: "Light Ball",
  status: Status.HEALTHY,
  ability: new Ability("Static", false),
  commanderActive: true,
  teraType: "Electric",
  teraTypeActive: true,
  moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Tackle"), new Move("Iron Tail"), 1),
  boosts: { atk: -1, def: -2, spa: 1, spd: 2, spe: 3 },
  bonusBoosts: { atk: -1, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { hp: 26, atk: 27, def: 28, spa: 29, spd: 30, spe: 31 },
  hpPercentage: 100
})
