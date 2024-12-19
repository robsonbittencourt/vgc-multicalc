import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ACTUAL, MAX, META, MIN } from "@lib/constants"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SmogonFunctions } from "@lib/smogon-functions/smogon-functions"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { Field as SmogonField } from "@robsonbittencourt/calc"

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
      const options = new SpeedCalculatorOptions({ regulation: "Reg G" })

      const inRange = service.orderedPokemon(pokemon, field, options)

      expect(inRange.length).toBeGreaterThan(2)
    })

    it("should return Pokémon in speed range ordered", () => {
      const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
      const field = new Field()
      const options = new SpeedCalculatorOptions({ regulation: "Reg G" })

      const inRange = service.orderedPokemon(pokemon, field, options)

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

      const inRange = service.orderedPokemon(pokemon, field)

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
      const options = new SpeedCalculatorOptions({ paralyzedActive: true })

      const inRange = service.orderedPokemon(pokemon, field, options)

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
      const options = new SpeedCalculatorOptions({ choiceScarfActive: true })

      const inRange = service.orderedPokemon(pokemon, field, options)

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

      const inRange = service.orderedPokemon(pokemon, field)

      for (let index = 0; index < inRange.length; index++) {
        const actual = inRange[index]
        const next = inRange[index + 1]

        if (next) {
          expect(next <= actual).toBeTruthy()
        }
      }
    })

    it("should merge Meta and Atual description when speed are equals", () => {
      const pokemon = new Pokemon("Sneasler", { nature: "Jolly", evs: { spe: 252 } })
      const field = new Field()

      const inRange = service.orderedPokemon(pokemon, field)

      const actual = inRange.find(p => p.pokemonName == "Sneasler" && p.description == ACTUAL)
      const meta = inRange.find(p => p.pokemonName == "Sneasler" && p.description == META)

      expect(actual).not.toBeUndefined()
      expect(meta).toBeUndefined()
    })
  })

  describe("min speed", () => {
    it("should return min speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual(MIN)
    })

    it("should return min speed of Raging Bolt", () => {
      const pokemon = new Pokemon("Raging Bolt")
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(95)
    })

    it("should return min speed of Chien-Pao", () => {
      const pokemon = new Pokemon("Chien-Pao")
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(155)
    })

    it("should return min speed of a Trick Room Pokémon", () => {
      const pokemon = new Pokemon("Torkoal")
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(22)
    })

    it("should return min speed of Chien-Pao with -1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(103)
    })

    it("should return min speed of Chien-Pao with -6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(38)
    })

    it("should return min speed of Chien-Pao with +1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(232)
    })

    it("should return min speed of Chien-Pao with +6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.minSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(620)
    })

    it("should return min speed of Swift Swim Excadrill in the Rain", () => {
      const pokemon = new Pokemon("Kingdra", { ability: "Swift Swim" })
      const field = new SmogonField({ weather: "Rain" })

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(210)
    })
  })

  describe("max speed", () => {
    it("should return max speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual(MAX)
    })

    it("should return max speed of Raging Bolt", () => {
      const pokemon = new Pokemon("Raging Bolt")
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(139)
    })

    it("should not consider item on max speed calculation", () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Choice Scarf" })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(139)
    })

    it("should return max speed of Chien-Pao", () => {
      const pokemon = new Pokemon("Chien-Pao")
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(205)
    })

    it("should return max speed of a Trick Room Pokémon", () => {
      const pokemon = new Pokemon("Torkoal")
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(79)
    })

    it("should return max speed of Chien-Pao with -1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(136)
    })

    it("should return max speed of Chien-Pao with -6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(51)
    })

    it("should return max speed of Chien-Pao with +1 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(307)
    })

    it("should return max speed of Chien-Pao with +6 in speed", () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(820)
    })

    it("should return max speed of Chien-Pao paralyzed", () => {
      const pokemon = new Pokemon("Chien-Pao", { status: "Paralysis" })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxSpeed(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(102)
    })

    it("should return max speed of Sand Rush Excadrill in the Sand", () => {
      const pokemon = new Pokemon("Excadrill", { ability: "Sand Rush" })
      const field = new SmogonField({ weather: "Sand" })

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(308)
    })
  })

  describe("meta speed", () => {

    it("should return meta speed description and Pokémon name", () => {
      const pokemon = new Pokemon("Flutter Mane")
      const smogonField = new SmogonField()

      const speedDefinition = service.maxMeta(pokemon, smogonField)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual(META)
    })

    it("should return meta speed of Rillaboom", () => {
      const pokemon = new Pokemon("Rillaboom", { evs: { spe: 28 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxMeta(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(109)
    })

    it("should return meta speed of Urshifu", () => {
      const pokemon = new Pokemon("Urshifu-Rapid-Strike", { evs: { spe: 252 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxMeta(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(149)
    })

    it("should return meta speed of Flutter Mane with Protosynthesis activated", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 } })
      const field = new SmogonField({ weather: "Sun" })

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.value).toEqual(282)
    })

    it("should return meta speed of Protosynthesis Flutter Mane with ability activated", () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 } })
      const smogonField = new SmogonField()

      const speedDefinition = service.maxBooster(pokemon, smogonField)

      expect(speedDefinition.value).toEqual(282)
    })
  })
})
