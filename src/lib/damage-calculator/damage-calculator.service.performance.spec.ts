import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"

import { FieldMapper } from "@lib/field-mapper"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"

import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { LastRespectsAdjuster } from "@lib/damage-calculator/calc-adjuster/last-respects-adjuster"
import { NeutralizingGasAdjuster } from "@lib/damage-calculator/calc-adjuster/neutralizing-gas-adjuster"
import { OgerponAdjuster } from "@lib/damage-calculator/calc-adjuster/ogerpon-adjuster"
import { RageFistAdjuster } from "@lib/damage-calculator/calc-adjuster/rage-fist-adjuster"
import { RuinsAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/ruins-ability-adjuster"
import { ZacianZamazentaAdjuster } from "@lib/damage-calculator/calc-adjuster/zacian-zamazenta-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { RuinationCalculator } from "@lib/damage-calculator/specific-damage-calculator/ruination-calculator"

function expectPerformance<T>(fn: () => T, maxDurationMs: number, description?: string): T {
  const startTime = performance.now()
  const result = fn()
  const duration = performance.now() - startTime

  const msg = description ? `${description} took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)` : `Operation took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)`

  expect(duration).withContext(msg).toBeLessThan(maxDurationMs)

  return result
}

describe("DamageCalculatorService - Performance", () => {
  let service: DamageCalculatorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DamageCalculatorService,
        FieldMapper,
        SpeedCalculatorService,
        { provide: CALC_ADJUSTERS, useClass: RuinsAbilityAdjuster, multi: true },
        { provide: CALC_ADJUSTERS, useClass: LastRespectsAdjuster, multi: true },
        { provide: CALC_ADJUSTERS, useClass: RageFistAdjuster, multi: true },
        { provide: CALC_ADJUSTERS, useClass: ZacianZamazentaAdjuster, multi: true },
        { provide: CALC_ADJUSTERS, useClass: NeutralizingGasAdjuster, multi: true },
        { provide: CALC_ADJUSTERS, useClass: OgerponAdjuster, multi: true },
        { provide: SPECIFIC_DAMAGE_CALCULATORS, useClass: RuinationCalculator, multi: true },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DamageCalculatorService)
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
