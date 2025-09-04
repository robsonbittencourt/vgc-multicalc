import { PokemonState } from "@data/store/calculator-store"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { pokemonToState, stateToPokemon } from "./state-mapper"

describe("State Mapper", () => {
  describe("stateToPokemon", () => {
    it("should build Pokémon using state", () => {
      const result = stateToPokemon(pikachuState, new Field())

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

    it("should return true when abilityOn is true, regardless of field", () => {
      const state = { ...protosynthesisState, abilityOn: true }

      const result = stateToPokemon(state, new Field())

      expect(result.ability.on).toBe(true)
    })

    it("should activate Protosynthesis when weather is Sun", () => {
      const field = new Field({ weather: "Sun" })

      const result = stateToPokemon(protosynthesisState, field)

      expect(result.ability.on).toBe(true)
    })

    it("should not activate Protosynthesis if weather is not Sun", () => {
      const field = new Field({ weather: "Rain" })

      const result = stateToPokemon(protosynthesisState, field)

      expect(result.ability.on).toBe(false)
    })

    it("should activate Quark Drive when terrain is Electric", () => {
      const field = new Field({ terrain: "Electric" })

      const result = stateToPokemon(quarkDriveState, field)

      expect(result.ability.on).toBe(true)
    })

    it("should not activate Quark Drive if terrain is not Electric", () => {
      const field = new Field({ terrain: "Grassy" })

      const result = stateToPokemon(quarkDriveState, field)

      expect(result.ability.on).toBe(false)
    })

    it("should not activate abilities when abilityOn is false and conditions are not met", () => {
      const field = new Field({ weather: "Rain", terrain: "Grassy" })

      const result = stateToPokemon(quarkDriveState, field)

      expect(result.ability.on).toBe(false)
    })

    it("should not activate when terrain is Electric but ability is not Quark Drive", () => {
      const field = new Field({ terrain: "Electric" })

      const result = stateToPokemon({ ...protosynthesisState, abilityOn: false }, field)

      expect(result.ability.on).toBe(false)
    })

    it("should not activate when ability is not Quark Drive but terrain is Electric", () => {
      const field = new Field({ terrain: "Electric" })
      const state = { ...protosynthesisState, ability: "Static", abilityOn: false }

      const result = stateToPokemon(state, field)

      expect(result.ability.on).toBe(false)
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
  hpPercentage: 100
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

const protosynthesisState: PokemonState = {
  id: "111",
  name: "Scream Tail",
  nature: "Bold",
  item: "Booster Energy",
  status: Status.HEALTHY.description,
  ability: "Protosynthesis",
  abilityOn: false,
  commanderActive: false,
  teraType: "Fairy",
  teraTypeActive: false,
  activeMove: "Play Rough",
  moveSet: [{ name: "Play Rough" }, { name: "Wish" }, { name: "Protect" }, { name: "Encore" }],
  boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
  hpPercentage: 100
}

const quarkDriveState: PokemonState = {
  id: "222",
  name: "Iron Valiant",
  nature: "Naive",
  item: "Booster Energy",
  status: Status.HEALTHY.description,
  ability: "Quark Drive",
  abilityOn: false,
  commanderActive: false,
  teraType: "Fighting",
  teraTypeActive: false,
  activeMove: "Close Combat",
  moveSet: [{ name: "Close Combat" }, { name: "Spirit Break" }, { name: "Knock Off" }, { name: "Shadow Sneak" }],
  boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  bonusBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  evs: { hp: 0, atk: 252, def: 0, spa: 4, spd: 0, spe: 252 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
  hpPercentage: 100
}
