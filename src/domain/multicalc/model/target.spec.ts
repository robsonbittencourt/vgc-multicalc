import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"

describe("Target", () => {
  describe("pokemons", () => {
    it("should return only the main Pokémon when there is no second Pokémon", () => {
      const target = new Target(new Pokemon("Pikachu"))

      const result = target.pokemons()

      expect(result.map(p => p.name)).toEqual(["Pikachu"])
    })

    it("should return both Pokémon when the target has a second Pokémon", () => {
      const target = new Target(new Pokemon("Pikachu"), new Pokemon("Tyranitar"))

      const result = target.pokemons()

      expect(result.map(p => p.name)).toEqual(["Pikachu", "Tyranitar"])
    })
  })
})
