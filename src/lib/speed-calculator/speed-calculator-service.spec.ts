import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ACTUAL, MAX, MIN } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"

describe("SpeedCalculatorService", () => {
  let service: SpeedCalculatorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeedCalculatorService, SmogonFunctions, provideExperimentalZonelessChangeDetection()]
    })

    service = TestBed.inject(SpeedCalculatorService)
  })

  describe("Test order methods", () => {
    it("should return a list of Pokémon with at least more than two", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ regulation: "I" })

      const inRange = service.orderedPokemon(pokemon, field, pokemonEachSide, options)

      expect(inRange.length).toBeGreaterThan(2)
    })

    it("should return Pokémon in speed range ordered", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ regulation: "I" })

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
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const pokemonEachSide = 30
      const options = new SpeedCalculatorOptions({ targetName: "Tyranitar" })

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

      const actual = inRange.find(p => p.pokemonName == "Urshifu" && p.description.includes(ACTUAL) && p.description.includes("48% Usage"))
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
      const options = new SpeedCalculatorOptions({ mode: SpeedCalculatorMode.Base })

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
  })

  describe("statistics", () => {
    it("should return meta speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.statistics(pokemon, field)

      expect(speedDefinition[0].pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition[0].value).toEqual(205)
      expect(speedDefinition[0].description).toMatch(/\d{1,3}% Usage/)
    })
  })
})
