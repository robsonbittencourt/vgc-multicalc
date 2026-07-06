import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { getFinalSpeed } from "@multicalc/stat-calc/spe/modified-spe"
import { SpeedEvOptimizer } from "@multicalc/speed-calc/speed-ev-optimizer"

describe("SpeedEvOptimizer", () => {
  let optimizer: SpeedEvOptimizer
  let field: Field

  beforeEach(() => {
    optimizer = new SpeedEvOptimizer()
    field = new Field()
  })

  const speedAt = (pokemon: Pokemon, nature: string, ev: number): number => getFinalSpeed(pokemon.clone({ nature, evs: { spe: ev } }), field, true)

  describe("outspeed", () => {
    it("should outspeed a slower opponent without any speed investment", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 0) - 5

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.speedEv).toBe(0)
      expect(result.natureChanged).toBe(false)
    })

    it("should return the minimum speed EV needed to outspeed by one point", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 100)

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(true)
      expect(result.finalSpeed!).toBeGreaterThan(opponentSpeed)
      expect(result.speedEv === 0 || speedAt(pokemon, "Jolly", result.speedEv! - 4) <= opponentSpeed).toBe(true)
    })

    it("should be infeasible when even max investment cannot outspeed", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const opponentSpeed = speedAt(pokemon, "Jolly", 252) + 20

      const result = optimizer.outspeed(pokemon, opponentSpeed, field)

      expect(result.outspeeds).toBe(false)
      expect(result.speedEv).toBeNull()
    })

    it("should switch to a positive speed nature when a neutral spread is not enough", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Adamant" })
      const opponentSpeed = speedAt(pokemon, "Adamant", 252)

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

  describe("minSpeedEv", () => {
    it("should return zero when the base speed already meets the target", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const targetSpeed = speedAt(pokemon, "Jolly", 0)

      const ev = optimizer.minSpeedEv(pokemon, targetSpeed, field, "Jolly")

      expect(ev).toBe(0)
    })

    it("should return null when the target is unreachable", () => {
      const pokemon = new Pokemon("Garchomp", { nature: "Jolly" })
      const targetSpeed = speedAt(pokemon, "Jolly", 252) + 20

      const ev = optimizer.minSpeedEv(pokemon, targetSpeed, field, "Jolly")

      expect(ev).toBeNull()
    })
  })
})
