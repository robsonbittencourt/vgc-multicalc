import { Pokemon } from "./pokemon"

describe('Pokemon', () => {

  it('should return min speed description and Pokémon name', () => {
    const pokemon = new Pokemon("Flutter Mane")

    const speedDefinition = pokemon.minSpeed()

    expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
    expect(speedDefinition.description).toEqual("Min. Speed")
  })
 
  it('should return min speed of Raging Bolt', () => {
    const pokemon = new Pokemon("Raging Bolt")

    const speedDefinition = pokemon.minSpeed()

    expect(speedDefinition.value).toEqual(95)
  })

  it('should return min speed of Chien-Pao', () => {
    const pokemon = new Pokemon("Chien-Pao")

    const speedDefinition = pokemon.minSpeed()

    expect(speedDefinition.value).toEqual(155)
  })

  it('should return min speed of a Trick Room Pokémon', () => {
    const pokemon = new Pokemon("Torkoal")

    const speedDefinition = pokemon.minSpeed()

    expect(speedDefinition.value).toEqual(22)
  })


  it('should return max speed description and Pokémon name', () => {
    const pokemon = new Pokemon("Flutter Mane")

    const speedDefinition = pokemon.maxSpeed()

    expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
    expect(speedDefinition.description).toEqual("Max. Speed")
  })
 
  it('should return max speed of Raging Bolt', () => {
    const pokemon = new Pokemon("Raging Bolt")

    const speedDefinition = pokemon.maxSpeed()

    expect(speedDefinition.value).toEqual(139)
  })

  it('should return max speed of Chien-Pao', () => {
    const pokemon = new Pokemon("Chien-Pao")

    const speedDefinition = pokemon.maxSpeed()

    expect(speedDefinition.value).toEqual(205)
  })

  it('should return max speed of a Trick Room Pokémon', () => {
    const pokemon = new Pokemon("Torkoal")

    const speedDefinition = pokemon.maxSpeed()

    expect(speedDefinition.value).toEqual(79)
  })

})