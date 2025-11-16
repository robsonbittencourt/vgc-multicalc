import { MOVE_DETAILS } from "./move-details"
import { POKEMON_DETAILS } from "./pokemon-details"

describe("Pokémon learnset validation", () => {
  it("should ensure every move in every learnset exists in MOVE_DETAILS", () => {
    const pokemons = Object.values(POKEMON_DETAILS)

    for (const pokemon of pokemons) {
      const learnset = pokemon.learnset

      for (const move of learnset) {
        const moveDetail = MOVE_DETAILS[move]

        if (!moveDetail) {
          throw new Error(`Move "${move}" in Pokémon "${pokemon.name}" DOES NOT exist in MOVE_DETAILS`)
        }
      }
    }

    expect(true).toBe(true)
  })
})
