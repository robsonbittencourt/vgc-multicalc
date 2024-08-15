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

    it('should only garanteed slower Pokémon', () => {
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
      
      const slowerPokemon = service.garantedSlowestPokemon(pokemon)

      slowerPokemon.forEach(p => {
        expect(p.value < pokemon.modifiedSpe()).toBeTruthy()
        expect(p.description).toEqual("Max. Speed")
      })
    })

    it('should return a ordered list with garanteed slower Pokémon', () => {
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
      
      const slowerPokemon = service.garantedSlowestPokemon(pokemon)

      expect(slowerPokemon[0].value >= slowerPokemon[1].value).toBeTruthy()
      expect(slowerPokemon[1].value >= slowerPokemon[2].value).toBeTruthy()
      expect(slowerPokemon[2].value >= slowerPokemon[3].value).toBeTruthy()
    })

    it('should only garanteed faster Pokémon', () => {
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
      
      const fasterPokemon = service.garantedFasterPokemon(pokemon)

      fasterPokemon.forEach(p => {
        expect(p.value > pokemon.modifiedSpe()).toBeTruthy()
        expect(p.description).toEqual("Min. Speed")
      })
    })

    it('should return a ordered list with garanteed faster Pokémon', () => {
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
      
      const fasterPokemon = service.garantedFasterPokemon(pokemon)

      expect(fasterPokemon[0].value >= fasterPokemon[1].value).toBeTruthy()
      expect(fasterPokemon[1].value >= fasterPokemon[2].value).toBeTruthy()
      expect(fasterPokemon[2].value >= fasterPokemon[3].value).toBeTruthy()
    })

    it('should return only Pokémon in speed range ordered', () => {
      const ragingBoltMinSpeed = 95
      const ragingBoltMaxSpeed = 139
      const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })

      const inRange = service.orderedPokemon(pokemon)

      inRange.forEach(p => {
        if (p.description == "Min. Speed") {
          expect(p.value > ragingBoltMaxSpeed).toBeFalsy()
        }
        
        if (p.description == "Max. Speed") {
          expect(p.value < ragingBoltMinSpeed).toBeFalsy()
        }
      })
    })
  })

  describe('min speed', () => {

    it('should return min speed description and Pokémon name', () => {
      const pokemon = new Pokemon("Flutter Mane")

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual("Min. Speed")
    })
  
    it('should return min speed of Raging Bolt', () => {
      const pokemon = new Pokemon("Raging Bolt")

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(95)
    })

    it('should return min speed of Chien-Pao', () => {
      const pokemon = new Pokemon("Chien-Pao")

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(155)
    })

    it('should return min speed of a Trick Room Pokémon', () => {
      const pokemon = new Pokemon("Torkoal")

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(22)
    })

    it('should return min speed of Chien-Pao with -1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 }})

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(103)
    })

    it('should return min speed of Chien-Pao with -6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 }})

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(38)
    })

    it('should return min speed of Chien-Pao with +1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 }})

      const speedDefinition = service.minSpeed(pokemon)

      expect(speedDefinition.value).toEqual(232)
    })

    it('should return min speed of Chien-Pao with +6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 }})

      const speedDefinition = service.minSpeed(pokemon)

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

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual("Max. Speed")
    })
  
    it('should return max speed of Raging Bolt', () => {
      const pokemon = new Pokemon("Raging Bolt")

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(139)
    })

    it('should not consider item on max speed calculation', () => {
      const pokemon = new Pokemon("Raging Bolt", { item: "Choice Scarf" })

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(139)
    })

    it('should return max speed of Chien-Pao', () => {
      const pokemon = new Pokemon("Chien-Pao")

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(205)
    })

    it('should return max speed of a Trick Room Pokémon', () => {
      const pokemon = new Pokemon("Torkoal")

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(79)
    })
    
    it('should return max speed of Chien-Pao with -1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -1 }})

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(136)
    })

    it('should return max speed of Chien-Pao with -6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: -6 }})

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(51)
    })

    it('should return max speed of Chien-Pao with +1 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 1 }})

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(307)
    })

    it('should return max speed of Chien-Pao with +6 in speed', () => {
      const pokemon = new Pokemon("Chien-Pao", { boosts: { spe: 6 }})

      const speedDefinition = service.maxSpeed(pokemon)

      expect(speedDefinition.value).toEqual(820)
    })

    it('should return max speed of Chien-Pao paralyzed', () => {
      const pokemon = new Pokemon("Chien-Pao", { status: "Paralysis" })

      const speedDefinition = service.maxSpeed(pokemon)

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

      const speedDefinition = service.maxMeta(pokemon)

      expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
      expect(speedDefinition.description).toEqual("Meta Speed")
    })

    it('should return meta speed of Rillaboom', () => {
      const pokemon = new Pokemon("Rillaboom", { evs: { spe: 28 } })

      const speedDefinition = service.maxMeta(pokemon)

      expect(speedDefinition.value).toEqual(109)
    })

    it('should return meta speed of scarf Urshifu', () => {
      const pokemon = new Pokemon("Urshifu-Rapid-Strike", { item: "Choice Scarf", evs: { spe: 252 } })

      const speedDefinition = service.maxMeta(pokemon)

      expect(speedDefinition.value).toEqual(223)
    })

    it('should return meta speed of booster Flutter Mane', () => {
      const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 }, item: "Booster Energy" })

      const speedDefinition = service.maxMeta(pokemon)

      expect(speedDefinition.value).toEqual(282)
    })

    it('should return meta speed of scarf Flutter Mane with Protosynthesis activated', () => {
      const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
      const field = new Field( { weather: "Sun" })

      const speedDefinition = service.maxMeta(pokemon, field)

      expect(speedDefinition.value).toEqual(423)
    })
  })
})
