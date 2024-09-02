import { Field } from '@smogon/calc'
import { Pokemon } from '../pokemon'
import { SmogonFunctions } from '../smogon-functions/smogon-functions'
import { SpeedCalculatorService } from './speed-calculator-service'

describe('SpeedCalculatorService', () => {
  let service: SpeedCalculatorService

  beforeEach(() => {
    service = new SpeedCalculatorService(new SmogonFunctions())
  })

  describe('Test order methods', () =>  {
    it('should return Pokémon in speed range ordered', () => {
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
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
  })

  describe('min speed', () => {

    it('should return min speed description and Pokémon name', () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.pokemonName).toEqual("flutter-mane")
      expect(speedDefinition.description).toEqual("Min")
    })
  
    it('should return min speed of Raging Bolt', () => {
      const pokemon = new Pokemon("Raging Bolt")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(95)
    })

    it('should return min speed of Chien-Pao', () => {
      const pokemon = new Pokemon("Chien-Pao")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(155)
    })

    it('should return min speed of a Trick Room Pokémon', () => {
      const pokemon = new Pokemon("Torkoal")
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(22)
    })

    it('should return min speed of Chien-Pao with -1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 }})
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(103)
    })

    it('should return min speed of Chien-Pao with -6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 }})
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(38)
    })

    it('should return min speed of Chien-Pao with +1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 }})
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(232)
    })

    it('should return min speed of Chien-Pao with +6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 }})
      const field = new Field()

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(620)
    })

    it('should return min speed of Swift Swim Excadrill in the Rain', () => {
      const pokemon = new Pokemon("Kingdra", { ability: "Swift Swim" })
      const field = new Field( { weather: "Rain" })

      const speedDefinition = service.minSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(210)
    })
  })

  describe('max speed', () => {

    it('should return max speed description and Pokémon name', () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.pokemonName).toEqual("flutter-mane")
      expect(speedDefinition.description).toEqual("Max")
    })
  
    it('should return max speed of Raging Bolt', () => {
      const pokemon = new Pokemon("Raging Bolt")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(139)
    })

    it('should not consider item on max speed calculation', () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Choice Scarf" })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(139)
    })

    it('should return max speed of Chien-Pao', () => {
      const pokemon = new Pokemon("Chien-Pao")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(205)
    })

    it('should return max speed of a Trick Room Pokémon', () => {
      const pokemon = new Pokemon("Torkoal")
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(79)
    })
    
    it('should return max speed of Chien-Pao with -1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 }})
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(136)
    })

    it('should return max speed of Chien-Pao with -6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 }})
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(51)
    })

    it('should return max speed of Chien-Pao with +1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 }})
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(307)
    })

    it('should return max speed of Chien-Pao with +6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 }})
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(820)
    })

    it('should return max speed of Chien-Pao paralyzed', () => {
      const pokemon = new Pokemon("Chien-Pao", { status: "Paralysis" })
      const field = new Field()

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(102)
    })

    it('should return max speed of Sand Rush Excadrill in the Sand', () => {
      const pokemon = new Pokemon("Excadrill", { ability: "Sand Rush" })
      const field = new Field( { weather: "Sand" })

      const speedDefinition = service.maxSpeed(pokemon, field)

      expect(speedDefinition.value).toEqual(308)
    })
  })

  describe('meta speed', () => {

    it('should return meta speed description and Pokémon name', () => {
      const pokemon = new Pokemon("Flutter Mane")
      const field = new Field()

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.pokemonName).toEqual("flutter-mane")
      expect(speedDefinition.description).toEqual("Meta")
    })

    it('should return meta speed of Rillaboom', () => {
      const pokemon = new Pokemon("Rillaboom", { evs: { spe: 28 } })
      const field = new Field()

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.value).toEqual(109)
    })

    it('should return meta speed of Urshifu', () => {
      const pokemon = new Pokemon("Urshifu-Rapid-Strike", { evs: { spe: 252 } })
      const field = new Field()

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.value).toEqual(149)
    })

    it('should return meta speed of Flutter Mane with Protosynthesis activated', () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 } })
      const field = new Field( { weather: "Sun" })

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.value).toEqual(282)
    })

    it('should return meta speed of booster Flutter Mane', () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 }, item: "Booster Energy" })
      const field = new Field()

      const speedDefinition = service.maxBooster(pokemon, field)

      expect(speedDefinition.value).toEqual(282)
    })
  })
})
