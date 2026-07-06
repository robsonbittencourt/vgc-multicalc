import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

function expectPerformance<T>(fn: () => T, maxDurationMs: number, description?: string): T {
  const startTime = performance.now()
  const result = fn()
  const duration = performance.now() - startTime

  const msg = description ? `${description} took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)` : `Operation took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)`

  expect(duration, msg).toBeLessThan(maxDurationMs)

  return result
}

describe("DamageCalc - Performance", () => {
  let service: DamageCalc

  beforeEach(() => {
    service = new DamageCalc()
  })

  it("should calculate damage for 100 attackers against a single target within time limit", () => {
    const attackers = Array.from(
      { length: 100 },
      (_, i) =>
        new Pokemon("Raging Bolt", {
          id: `attacker-${i}`,
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect"))
        })
    )
    const target = new Pokemon("Flutter Mane")
    const field = new Field()

    expectPerformance(
      () => {
        attackers.forEach(attacker => {
          service.calcDamage(attacker, target, field, true)
        })
      },
      100,
      "100 attackers (400 calculations) calcDamageAllAttacks"
    )
  })

  it("should calculate damage for 100 targets against a single pairs of attackers within time limit", () => {
    const attacker1 = new Pokemon("Raging Bolt", {
      moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect"))
    })
    const attacker2 = new Pokemon("Rillaboom", {
      moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))
    })
    const targets = Array.from(
      { length: 100 },
      (_, i) =>
        new Pokemon("Flutter Mane", {
          id: `target-${i}`,
          evs: { hp: i % 252, def: (i * 2) % 252 }
        })
    )
    const field = new Field()

    expectPerformance(
      () => {
        targets.forEach(target => {
          service.calcDamageForTwoAttackers(attacker1, attacker2, target, field)
        })
      },
      100,
      "100 pairs calcDamageForTwoAttackers"
    )
  })
})
