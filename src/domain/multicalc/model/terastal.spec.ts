import { Pokemon } from "@multicalc/model/pokemon"
import { terastalize } from "@multicalc/model/terastal"

describe("terastalize", () => {
  describe("Terapagos", () => {
    it("should not change base Terapagos", () => {
      const pokemon = new Pokemon("Terapagos")

      const result = terastalize(pokemon)

      expect(result.name).toBe("Terapagos")
    })

    it("should turn Terapagos-Stellar into Terapagos-Terastal with Tera Shell and tera inactive", () => {
      const pokemon = new Pokemon("Terapagos-Stellar")

      const result = terastalize(pokemon)

      expect(result.name).toBe("Terapagos-Terastal")
      expect(result.ability.name).toBe("Tera Shell")
      expect(result.teraTypeActive).toBe(false)
    })

    it("should turn Terapagos-Terastal into Terapagos-Stellar with Teraform Zero and tera active", () => {
      const pokemon = new Pokemon("Terapagos-Terastal")

      const result = terastalize(pokemon)

      expect(result.name).toBe("Terapagos-Stellar")
      expect(result.ability.name).toBe("Teraform Zero")
      expect(result.teraTypeActive).toBe(true)
    })
  })

  describe("Ogerpon", () => {
    it("should activate Ogerpon-Wellspring: Embody Aspect and +1 Sp. Def", () => {
      const pokemon = new Pokemon("Ogerpon-Wellspring")

      const result = terastalize(pokemon)

      expect(result.teraTypeActive).toBe(true)
      expect(result.ability.name).toBe("Embody Aspect (Wellspring)")
      expect(result.boosts.spd).toBe(1)
      expect(result.bonusBoosts.spd).toBe(1)
    })

    it("should activate Ogerpon-Hearthflame: Embody Aspect and +1 Attack", () => {
      const pokemon = new Pokemon("Ogerpon-Hearthflame")

      const result = terastalize(pokemon)

      expect(result.ability.name).toBe("Embody Aspect (Hearthflame)")
      expect(result.boosts.atk).toBe(1)
      expect(result.bonusBoosts.atk).toBe(1)
    })

    it("should activate Ogerpon-Cornerstone: Embody Aspect and +1 Defense", () => {
      const pokemon = new Pokemon("Ogerpon-Cornerstone")

      const result = terastalize(pokemon)

      expect(result.ability.name).toBe("Embody Aspect (Cornerstone)")
      expect(result.boosts.def).toBe(1)
      expect(result.bonusBoosts.def).toBe(1)
    })

    it("should activate base Ogerpon: Embody Aspect (Teal) and +1 Speed", () => {
      const pokemon = new Pokemon("Ogerpon")

      const result = terastalize(pokemon)

      expect(result.ability.name).toBe("Embody Aspect (Teal)")
      expect(result.boosts.spe).toBe(1)
      expect(result.bonusBoosts.spe).toBe(1)
    })

    it("should deactivate an active Ogerpon, restoring inactive ability and removing the boost", () => {
      const activated = terastalize(new Pokemon("Ogerpon-Wellspring"))

      const result = terastalize(activated)

      expect(result.teraTypeActive).toBe(false)
      expect(result.ability.name).toBe("Water Absorb")
      expect(result.boosts.spd).toBe(0)
      expect(result.bonusBoosts.spd).toBe(-1)
    })

    it("should not boost beyond the maximum stage of 6", () => {
      const pokemon = new Pokemon("Ogerpon", { boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 6 } })

      const result = terastalize(pokemon)

      expect(result.boosts.spe).toBe(6)
      expect(result.bonusBoosts.spe ?? 0).toBe(0)
    })
  })

  describe("regular Pokémon", () => {
    it("should toggle teraTypeActive on and keep it a normal terastal", () => {
      const pokemon = new Pokemon("Garchomp")

      const result = terastalize(pokemon)

      expect(result.teraTypeActive).toBe(true)
    })

    it("should toggle teraTypeActive off when already active", () => {
      const active = new Pokemon("Garchomp", { teraTypeActive: true, teraType: "Ground" })

      const result = terastalize(active)

      expect(result.teraTypeActive).toBe(false)
    })
  })
})
