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

  it('should return meta speed description and Pokémon name', () => {
    const pokemon = new Pokemon("Flutter Mane")

    const speedDefinition = pokemon.maxMeta()

    expect(speedDefinition.pokemonName).toEqual("Flutter Mane")
    expect(speedDefinition.description).toEqual("Meta Speed")
  })

  it('should return meta speed of Rillaboom', () => {
    const pokemon = new Pokemon("Rillaboom", { evs: { spe: 28 } })

    const speedDefinition = pokemon.maxMeta()

    expect(speedDefinition.value).toEqual(109)
  })

  it('should return meta speed of scarf Urshifu', () => {
    const pokemon = new Pokemon("Urshifu-Rapid-Strike", { item: "Choice Scarf", evs: { spe: 252 } })

    const speedDefinition = pokemon.maxMeta()

    expect(speedDefinition.value).toEqual(223)
  })

  it('should return meta speed of booster Flutter Mane', () => {
    const pokemon = new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 124 } })

    const speedDefinition = pokemon.maxMeta()

    expect(speedDefinition.value).toEqual(282)
  })

  it('should return meta speed of scarf Flutter Mane with Protosynthesis activated', () => {
    const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })

    const speedDefinition = pokemon.maxMeta()

    expect(speedDefinition.value).toEqual(423)
  })

})