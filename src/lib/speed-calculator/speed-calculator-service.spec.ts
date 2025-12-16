import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ACTUAL, MAX, MIN } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"

describe("SpeedCalculatorService", () => {
  let service: SpeedCalculatorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeedCalculatorService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(SpeedCalculatorService)
  })

  describe("Test order methods", () => {
    it("should return a list of Pokémon with at least more than two", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ regulation: "F" })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      expect(inRange.length).toBeGreaterThan(2)
    })

    it("should return Pokémon in speed range ordered", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ regulation: "F" })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })

    it("should return Pokémon in speed range ordered with default options", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })

    it("should fill left side with empty Speed Definitions of actual until have pokemonEachSide value", () => {
      const pokemon = new Pokemon("Torkoal")
      const field = new Field()
      const pokemonEachSide = 30

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide)

      const actualIndex = inRange.findIndex(p => p.pokemonName == "Torkoal" && p.description.includes(ACTUAL))
      expect(actualIndex).toBe(30)

      expect(inRange[0].pokemonName).toEqual("Select a Pokémon")
    })

    it("should return only Pokémon informed in options and actual when option target is informed", () => {
      const pokemon = new Pokemon("Rillaboom", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ targetName: "Tyranitar", regulation: "F" })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      expect(inRange.length).toEqual(5)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })

    it("should return Pokémon in speed range ordered when Paralyzed option was activated", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ paralyzedActive: true })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })

    it("should return Pokémon in speed range ordered when Choice Scarf option was activated", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ choiceScarfActive: true })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next >= actual).toBeTruthy()
        }
      }
    })

    it("should return Pokémon in speed range reverse ordered when Trick Room was activated", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field({ isTrickRoom: true })
      const pokemonEachSide = 30

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next <= actual).toBeTruthy()
        }
      }
    })

    it("should merge Meta and Atual description when speed are equals", () => {
      const pokemon = new Pokemon("Urshifu", { nature: "Adamant", evs: { spe: 252 } })
      const field = new Field()
      const pokemonEachSide = 30

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide)

      const actual = inRange.find(p => p.pokemonName == "Urshifu" && p.description.includes(ACTUAL))
      const quantity = inRange.filter(p => p.pokemonName == "Urshifu" && p.value == 149).length

      expect(actual).not.toBeUndefined()
      expect(quantity).toBe(1)
    })
  })

  describe("Test filter options", () => {
    it("should calculate Base speed", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 10
      const options = new SpeedCalculatorOptions({ mode: SpeedCalculatorMode.Base, regulation: "F" })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      inRange.forEach(r => {
        expect(r.description.includes("Base")).toBeTrue()
      })
    })
  })

  describe("Test orderPairBySpeed method", () => {
    it("should return first Pokémon as first in pair when it is faster", () => {
      const pokemonOne = new Pokemon("Rillaboom")
      const pokemonTwo = new Pokemon("Raging Bolt")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should return second Pokémon as first in pair when it is faster", () => {
      const pokemonOne = new Pokemon("Raging Bolt")
      const pokemonTwo = new Pokemon("Rillaboom")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonTwo.id)
      expect(slower.id).toBe(pokemonOne.id)
    })

    it("should return Pokémon with priority move", () => {
      const pokemonOne = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Thunderbolt"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider first Pokémon because the high priority", () => {
      const pokemonOne = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Extreme Speed"), new Move("Earthquake"), new Move("Scale Shot"), new Move("Protect"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider second Pokémon because the high priority", () => {
      const pokemonOne = new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Extreme Speed"), new Move("Earthquake"), new Move("Scale Shot"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"), new Move("Protect"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonTwo.id)
      expect(slower.id).toBe(pokemonOne.id)
    })

    it("should return faster Pokémon when two attacks have same priority", () => {
      const pokemonOne = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("Fake Out"), new Move("Protect"), 1), evs: { spe: 60 } })
      const pokemonTwo = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("Fake Out"), new Move("Protect"), 1), evs: { spe: 68 } })
      const field = new Field({ terrain: "Grassy" })

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonTwo.id)
      expect(slower.id).toBe(pokemonOne.id)
    })

    it("should return Pokémon with Grassy Glide if Grassy Terrain is active", () => {
      const pokemonOne = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("Fake Out"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane")
      const field = new Field({ terrain: "Grassy" })

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should not consider Grassy Glide as priority if Grassy Terrain is not active", () => {
      const pokemonOne = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("Fake Out"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonTwo.id)
      expect(slower.id).toBe(pokemonOne.id)
    })

    it("should consider Helping Hand priority", () => {
      const pokemonOne = new Pokemon("Torkoal", { moveSet: new MoveSet(new Move("Helping Hand"), new Move("Eruption"), new Move("Heat Wave"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider Protect priority", () => {
      const pokemonOne = new Pokemon("Torkoal", { moveSet: new MoveSet(new Move("Protect"), new Move("Weather Ball"), new Move("Eruption"), new Move("Heat Wave"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane")
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider Focus Punch and Avalanche priority", () => {
      const pokemonOne = new Pokemon("Blaziken", { moveSet: new MoveSet(new Move("Focus Punch"), new Move("Double-Edge"), new Move("Heat Crash"), new Move("Knock Off"), 1) })
      const pokemonTwo = new Pokemon("Avalugg", { moveSet: new MoveSet(new Move("Avalanche"), new Move("Double-Edge"), new Move("Icicle Crash"), new Move("Crunch"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider Avalanche and Counter priority", () => {
      const pokemonOne = new Pokemon("Blaziken", { moveSet: new MoveSet(new Move("Counter"), new Move("Double-Edge"), new Move("Heat Crash"), new Move("Knock Off"), 1) })
      const pokemonTwo = new Pokemon("Avalugg", { moveSet: new MoveSet(new Move("Avalanche"), new Move("Double-Edge"), new Move("Icicle Crash"), new Move("Crunch"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonTwo.id)
      expect(slower.id).toBe(pokemonOne.id)
    })

    it("should consider Dragon Tail priority", () => {
      const pokemonOne = new Pokemon("Dragonite", { moveSet: new MoveSet(new Move("Dragon Tail"), new Move("Earthquake"), new Move("Scale Shot"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Trick Room"), new Move("Moonblast"), new Move("Shadow Ball"), new Move("Protect"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })

    it("should consider Trick Room priority", () => {
      const pokemonOne = new Pokemon("Torkoal", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Weather Ball"), new Move("Eruption"), new Move("Protect"), 1) })
      const pokemonTwo = new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Trick Room"), new Move("Moonblast"), new Move("Shadow Ball"), new Move("Protect"), 1) })
      const field = new Field()

      const [faster, slower] = service.orderPairBySpeed(pokemonOne, pokemonTwo, field)

      expect(faster.id).toBe(pokemonOne.id)
      expect(slower.id).toBe(pokemonTwo.id)
    })
  })

  describe("minSpeedIvZero", () => {
    it("should return min speed of a Trick Room Pokémon", () => {
      const pokemon = new Pokemon("Torkoal")
      const field = new Field()

      const speedDefinition = service.minSpeedIvZero(pokemon, field)

      expect(speedDefinition.value).toEqual(22)
    })
  })

  describe("min speed", () => {
    it("should return min speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description.includes(MIN)).toBeTrue()
    })

    it("should return min speed of Raging Bolt", () => {
      const pokemon = new Pokemon("Raging Bolt")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(95)
    })

    it("should return min speed of Chien-Pao", () => {
      const pokemon = new Pokemon("Chien-Pao")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(155)
    })

    it("should return min speed of Chien-Pao with -1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 } })
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(103)
    })

    it("should return min speed of Chien-Pao with -6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 } })
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(38)
    })

    it("should return min speed of Chien-Pao with +1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 } })
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(232)
    })

    it("should return min speed of Chien-Pao with +6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 } })
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(620)
    })

    it("should return min speed of Swift Swim Excadrill in the Rain", () => {
      const pokemon = new Pokemon("Kingdra", { ability: new Ability("Swift Swim") })
      const field = new Field({ weather: "Rain" })

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(210)
    })
  })

  describe("max speed", () => {
    it("should return max speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description.includes(MAX)).toBeTrue()
    })

    it("should return max speed of Raging Bolt", () => {
      const pokemon = new Pokemon("Raging Bolt")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(139)
    })

    it("should not consider item on max speed calculation", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Choice Scarf" })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(139)
    })

    it("should return max speed of Chien-Pao", () => {
      const pokemon = new Pokemon("Chien-Pao")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(205)
    })

    it("should return max speed of a Trick Room Pokémon", () => {
      const pokemon = new Pokemon("Torkoal")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(79)
    })

    it("should return max speed of Chien-Pao with -1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 } })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(136)
    })

    it("should return max speed of Chien-Pao with -6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 } })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(51)
    })

    it("should return max speed of Chien-Pao with +1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 } })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(307)
    })

    it("should return max speed of Chien-Pao with +6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 } })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(820)
    })

    it("should return max speed of Chien-Pao paralyzed", () => {
      const pokemon = new Pokemon("Chien-Pao", { status: Status.PARALYSIS })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(102)
    })

    it("should return max speed of Sand Rush Excadrill in the Sand", () => {
      const pokemon = new Pokemon("Excadrill", { ability: new Ability("Sand Rush") })
      const field = new Field({ weather: "Sand" })

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(308)
    })
  })

  describe("maxBooster", () => {
    it("should return max speed of Flutter Mane with Booster Energy", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.maxBooster(pokemon, field)

      expect(speedDefinition.value).toEqual(307)
    })

    it("should return max speed of Flutter Mane with Booster Energy and -1 in boosts", () => {
      const pokemon = new Pokemon("Flutter Mane", { boosts: { spe: -1 } })
      const field = new Field()

      const speedDefinition = service.maxBooster(pokemon, field)

      expect(speedDefinition.value).toEqual(204)
    })
  })

  describe("statistics", () => {
    it("should return meta speed description and Pokémon name from Regulation F", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()
      const regulation = "F"

      const speedDefinition = service.statistics(pokemon, field, regulation)

      expect(speedDefinition[0].pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition[0].value).toEqual(180)
      expect(speedDefinition[0].description).toMatch(/\d{1,3}% Usage/)
    })

    it("should return meta speed description and Pokémon name from Regulation J", () => {
      const pokemon = new Pokemon("Arceus")
      const field = new Field()
      const regulation = "J"

      const speedDefinition = service.statistics(pokemon, field, regulation)

      expect(speedDefinition[0].pokemonName).toEqual("Arceus")
      expect(speedDefinition[0].value).toEqual(140)
      expect(speedDefinition[0].description).toMatch(/\d{1,3}% Usage/)
    })
  })
})
