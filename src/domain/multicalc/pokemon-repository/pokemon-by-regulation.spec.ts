import { MOVESETS } from "@data/moveset-data"
import { Regulation } from "@multicalc/types"
import { pokemonByRegulation, toPokemon } from "@pokemon-repository/pokemon-by-regulation"

describe("pokemonByRegulation", () => {
  it("returns Pokémon from the top usage list for the regulation, ordered by usage rank", () => {
    const pokemon = pokemonByRegulation("MB", undefined, MOVESETS, false)

    expect(pokemon.length).toBeGreaterThan(0)
    expect(pokemon[0].name).not.toBe(pokemon[pokemon.length - 1].name)
  })

  it("limits the result to the requested quantity", () => {
    const pokemon = pokemonByRegulation("MB", 5, MOVESETS, false)

    expect(pokemon.length).toBe(5)
  })

  it("orders the result by usage rank rather than by the setdex order", () => {
    const setdex = { Garchomp: MOVESETS["Garchomp"], Kingambit: MOVESETS["Kingambit"], Incineroar: MOVESETS["Incineroar"] }

    const pokemon = pokemonByRegulation("MB", undefined, setdex, false)

    expect(pokemon.map(p => p.name)).toEqual(["Kingambit", "Incineroar", "Garchomp"])
  })

  it("keeps Aegislash, whose resolved name carries the Shield form suffix", () => {
    const setdex = { Aegislash: MOVESETS["Aegislash"], Kingambit: MOVESETS["Kingambit"] }

    const pokemon = pokemonByRegulation("MB", undefined, setdex, false)

    expect(pokemon.map(p => p.name)).toEqual(["Kingambit", "Aegislash-Shield"])
  })

  it("drops a Pokémon that is absent from the regulation usage list", () => {
    const setdex = { Bulbasaur: MOVESETS["Bulbasaur"], Kingambit: MOVESETS["Kingambit"] }

    const pokemon = pokemonByRegulation("MB", undefined, setdex, false)

    expect(pokemon.map(p => p.name)).toEqual(["Kingambit"])
  })

  it("keeps a Pokémon outside the usage list when includeAllPokemon is true", () => {
    const setdex = { Bulbasaur: MOVESETS["Bulbasaur"], Kingambit: MOVESETS["Kingambit"] }

    const pokemon = pokemonByRegulation("MB", undefined, setdex, true)

    expect(pokemon.map(p => p.name)).toEqual(["Bulbasaur", "Kingambit"])
  })

  it("returns no Pokémon for a regulation that has no usage list, instead of failing", () => {
    const setdex = { Kingambit: MOVESETS["Kingambit"], Incineroar: MOVESETS["Incineroar"] }

    const pokemon = pokemonByRegulation("G9" as Regulation, undefined, setdex, false)

    expect(pokemon).toEqual([])
  })

  it("still returns every Pokémon for a regulation without usage list when includeAllPokemon is true", () => {
    const setdex = { Kingambit: MOVESETS["Kingambit"], Incineroar: MOVESETS["Incineroar"] }

    const pokemon = pokemonByRegulation("G9" as Regulation, undefined, setdex, true)

    expect(pokemon.map(p => p.name)).toEqual(["Incineroar", "Kingambit"])
  })

  it("returns every non-banned Pokémon sorted alphabetically when includeAllPokemon is true", () => {
    const pokemon = pokemonByRegulation("MB", undefined, MOVESETS, true)

    const names = pokemon.map(p => p.displayNameWithoutSuffix)
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b))

    expect(names).toEqual(sortedNames)
  })
})

describe("toPokemon", () => {
  it("builds a Pokemon from moveset data, converting SP values back to EVs", () => {
    const pokemon = toPokemon("Incineroar", MOVESETS)

    expect(pokemon.name).toBe("Incineroar")
    expect(pokemon.ability.name.length).toBeGreaterThan(0)
  })
})
