import { pokemonByRegulation, toPokemon } from "@adapters/pokemon-by-regulation"

describe("pokemonByRegulation", () => {
  it("returns Pokémon from the top usage list for the regulation, ordered by usage rank", () => {
    const pokemon = pokemonByRegulation("MB")

    expect(pokemon.length).toBeGreaterThan(0)
    expect(pokemon[0].name).not.toBe(pokemon[pokemon.length - 1].name)
  })

  it("limits the result to the requested quantity", () => {
    const pokemon = pokemonByRegulation("MB", 5)

    expect(pokemon.length).toBe(5)
  })

  it("returns every non-banned Pokémon sorted alphabetically when includeAllPokemon is true", () => {
    const pokemon = pokemonByRegulation("MB", undefined, undefined, true)

    const names = pokemon.map(p => p.displayNameWithoutSuffix)
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b))

    expect(names).toEqual(sortedNames)
  })
})

describe("toPokemon", () => {
  it("builds a Pokemon from moveset data, converting SP values back to EVs", () => {
    const pokemon = toPokemon("Incineroar")

    expect(pokemon.name).toBe("Incineroar")
    expect(pokemon.ability.name.length).toBeGreaterThan(0)
  })
})
