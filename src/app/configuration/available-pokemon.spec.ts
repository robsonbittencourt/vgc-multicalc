import { AVAILABLE_POKEMON, availablePokemonIds } from "@configuration/available-pokemon"
import { getMoveset } from "@data/moveset-data"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { POKEMON_DATA } from "@data/pokemon-data"

describe("availablePokemonIds", () => {
  it("should return the curated list when the all pokes flag is off", () => {
    expect(availablePokemonIds(false)).toBe(AVAILABLE_POKEMON)
  })

  it("should return every known Pokémon when the all pokes flag is on", () => {
    expect(availablePokemonIds(true)).toEqual(Object.keys(POKEMON_DATA))
  })

  it("should offer more Pokémon when the flag is on than when it is off", () => {
    const curated = availablePokemonIds(false).length
    const all = availablePokemonIds(true).length

    expect(all).toBeGreaterThan(curated)
  })

  it("should not repeat any Pokémon in the curated list", () => {
    expect(new Set(AVAILABLE_POKEMON).size).toBe(AVAILABLE_POKEMON.length)
  })

  it("should only list Pokémon that exist in the Pokémon data", () => {
    const unknown = AVAILABLE_POKEMON.filter(id => !(id in POKEMON_DATA))

    expect(unknown).toEqual([])
  })

  it("should only use moves that the Pokémon can actually learn in its default moveset", () => {
    const outsideLearnset: string[] = []

    for (const id of AVAILABLE_POKEMON) {
      const moveset = getMoveset(POKEMON_DATA[id].name)

      if (!moveset) continue

      const learnset = getPokemonMoveset(id)?.learnset ?? []
      const invalid = moveset.moves.filter(move => move && !learnset.includes(move))

      if (invalid.length) outsideLearnset.push(`${id}: ${invalid.join(", ")}`)
    }

    expect(outsideLearnset).toEqual([])
  })
})
