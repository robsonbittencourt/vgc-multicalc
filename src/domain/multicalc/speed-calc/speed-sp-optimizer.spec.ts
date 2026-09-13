import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { getFinalSpeed } from "@multicalc/stat-calc/spe/modified-spe"
import { SpeedSpOptimizer } from "@multicalc/speed-calc/speed-sp-optimizer"

describe("SpeedSpOptimizer", () => {
  let optimizer: SpeedSpOptimizer
  let field: Field

  beforeEach(() => {
    optimizer = new SpeedSpOptimizer()
    field = new Field()
  })

  const speedAt = (pokemon: Pokemon, nature: string, sp: number): number => getFinalSpeed(pokemon.clone({ nature, sps: { spe: sp } }), field, true)

  describe("outspeed", () => {
    it("should outspeed a slower opponent without any speed investment", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 0) - 5

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.speedSp).toBe(0)
      expect(result.natureChanged).toBe(false)
    })

    it("should return the minimum speed SP needed to outspeed by one point", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 13)

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.finalSpeed!).toBeGreaterThan(opponentSpeed)
      expect(result.speedSp === 0 || speedAt(pokemon, "Jolly", result.speedSp! - 1) <= opponentSpeed).toBe(true)
    })

    it("should be infeasible when even max investment cannot outspeed", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 32) + 20

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(false)
      expect(result.speedSp).toBeNull()
    })

    it("should stay infeasible for a special attacker even after switching to Timid", () => {
      const pokemon = new Pokemon("Chi-Yu", { nature: "Modest" })
      const opponentSpeed = speedAt(pokemon, "Timid", 32) + 20

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(false)
      expect(result.speedSp).toBeNull()
      expect(result.nature).toBe("Modest")
      expect(result.natureChanged).toBe(false)
    })

    it("should switch to a positive speed nature when a neutral spread is not enough", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Adamant" })
      const opponentSpeed = speedAt(pokemon, "Adamant", 32)

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.natureChanged).toBe(true)
      expect(result.nature).toBe("Jolly")
    })

    it("should keep the current nature when it already suffices", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 0)

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.natureChanged).toBe(false)
      expect(result.nature).toBe("Jolly")
    })
  })

  describe("minSpeedSp", () => {
    it("should return zero when the base speed already meets the target", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const targetSpeed = speedAt(pokemon, "Jolly", 0)

      const sp = optimizer.minSpeedSp(pokemon, targetSpeed, field, "Jolly")

      expect(sp).toBe(0)
    })

    it("should return null when the target is unreachable", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const targetSpeed = speedAt(pokemon, "Jolly", 32) + 20

      const sp = optimizer.minSpeedSp(pokemon, targetSpeed, field, "Jolly")

      expect(sp).toBeNull()
    })
  })
})
