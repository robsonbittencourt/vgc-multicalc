import { Field, Side } from "@smogon/calc"
import { Pokemon } from "../pokemon"
import { SmogonFunctions } from "./smogon-functions"

describe('SmogonFunctions', () => {
  let service: SmogonFunctions

  beforeEach(() => {
    service = new SmogonFunctions()
  })

  it('should return the Pokémon speed', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(108)
  })

  it('should return the Pokémon speed when +1', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 }, boosts: { spe: 1 } })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(162)
  })

  it('should return the Pokémon speed when +2', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 }, boosts: { spe: 2 } })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(216)
  })

  it('should return the Pokémon speed when -1', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 }, boosts: { spe: -1 } })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(72)
  })

  it('should return the Pokémon speed when -2', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 }, boosts: { spe: -2 } })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(54)
  })

  it('should return the Pokémon speed in Tailwind', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 } })
    const side = new Side()
    side.isTailwind = true
    
    const finalSpeed = service.getFinalSpeed(pokemon, new Field(), side)

    expect(finalSpeed).toEqual(216)
  })

  it('should return the Pokémon speed when paralyzed', () => {
    const pokemon = new Pokemon('Raging Bolt', { evs: { spe: 100 }, status: 'par' })
    
    const finalSpeed = service.getFinalSpeed(pokemon)

    expect(finalSpeed).toEqual(54)
  })

  it('should return the speed of Flutter Mane with Protosynthesis activated', () => {
    const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
    const field = new Field()
    field.weather = "Sun"

    const finalSpeed = service.getFinalSpeed(pokemon, field)

    expect(finalSpeed).toEqual(423)
  })

  it('should return the speed of Flutter Mane with Protosynthesis activated in Tailwind', () => {
    const pokemon = new Pokemon("Flutter Mane", { item: "Choice Scarf", nature: "Timid", evs: { spe: 124 } })
    const field = new Field()
    field.weather = "Sun"

    const side = new Side()
    side.isTailwind = true

    const finalSpeed = service.getFinalSpeed(pokemon, field, side)

    expect(finalSpeed).toEqual(846)
  })

})