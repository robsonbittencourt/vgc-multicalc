import { Pokemon } from '../pokemon'
import { PokemonSpeedService } from './pokemon-speed-service'

describe('PokemonSpeedService', () => {
  let service: PokemonSpeedService

  beforeEach(() => {
    service = new PokemonSpeedService()
  })

  it('should return a ordered list with garanteed slower Pokémon', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
    
    const slowerPokemon = service.garantedSlowestPokemon(pokemon)

    expect(slowerPokemon.length).toEqual(1)

    expect(slowerPokemon[0].pokemonName).toEqual("Amoonguss")
    expect(slowerPokemon[0].value).toEqual(90)
    expect(slowerPokemon[0].description).toEqual("Max. Speed")
  })

  it('should return a ordered list with garanteed faster Pokémon', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
    
    const fasterPokemon = service.garantedFasterPokemon(pokemon)

    expect(fasterPokemon.length).toEqual(2)
    
    expect(fasterPokemon[0].pokemonName).toEqual("Flutter Mane")
    expect(fasterPokemon[0].value).toEqual(155)
    expect(fasterPokemon[0].description).toEqual("Min. Speed")

    expect(fasterPokemon[1].pokemonName).toEqual("Calyrex-Shadow")
    expect(fasterPokemon[1].value).toEqual(170)
    expect(fasterPokemon[1].description).toEqual("Min. Speed")
  })

  it('should return only Pokémon in speed range ordered', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })

    const inRange = service.orderedPokemon(pokemon)

    expect(inRange.length).toEqual(13)
    
    expect(inRange[0].pokemonName).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[0].value).toEqual(51)
    expect(inRange[0].description).toEqual("Min. Speed")

    expect(inRange[1].pokemonName).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[1].value).toEqual(51)
    expect(inRange[1].description).toEqual("Meta Speed")

    expect(inRange[2].pokemonName).toEqual("Incineroar")
    expect(inRange[2].value).toEqual(80)
    expect(inRange[2].description).toEqual("Min. Speed")
    
    expect(inRange[3].pokemonName).toEqual("Rillaboom")
    expect(inRange[3].value).toEqual(105)
    expect(inRange[3].description).toEqual("Min. Speed")
    
    expect(inRange[4].pokemonName).toEqual("Raging Bolt")
    expect(inRange[4].value).toEqual(108)
    expect(inRange[4].description).toEqual("Actual Speed")

    expect(inRange[5].pokemonName).toEqual("Rillaboom")
    expect(inRange[5].value).toEqual(109)
    expect(inRange[5].description).toEqual("Meta Speed")

    expect(inRange[6].pokemonName).toEqual("Ursaluna-Bloodmoon")
    expect(inRange[6].value).toEqual(114)
    expect(inRange[6].description).toEqual("Max. Speed")

    expect(inRange[7].pokemonName).toEqual("Urshifu-Rapid-Strike")
    expect(inRange[7].value).toEqual(117)
    expect(inRange[7].description).toEqual("Min. Speed")

    expect(inRange[8].pokemonName).toEqual("Incineroar")
    expect(inRange[8].value).toEqual(123)
    expect(inRange[8].description).toEqual("Max. Speed")

    expect(inRange[9].pokemonName).toEqual("Incineroar")
    expect(inRange[9].value).toEqual(123)
    expect(inRange[9].description).toEqual("Meta Speed")
    
    expect(inRange[10].pokemonName).toEqual("Rillaboom")
    expect(inRange[10].value).toEqual(150)
    expect(inRange[10].description).toEqual("Max. Speed")

    expect(inRange[11].pokemonName).toEqual("Urshifu-Rapid-Strike")
    expect(inRange[11].value).toEqual(163)
    expect(inRange[11].description).toEqual("Max. Speed")

    expect(inRange[12].pokemonName).toEqual("Urshifu-Rapid-Strike")
    expect(inRange[12].value).toEqual(223)
    expect(inRange[12].description).toEqual("Meta Speed")
  })
});
