import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { DefensiveEvOptimizerService } from "./defensive-ev-optimizer.service"

function expectPerformance<T>(fn: () => T, maxDurationMs: number, description?: string): T {
  const startTime = performance.now()
  const result = fn()
  const duration = performance.now() - startTime

  const msg = description ? `${description} took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)` : `Operation took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)`

  expect(duration).withContext(msg).toBeLessThan(maxDurationMs)

  return result
}

describe("DefensiveEvOptimizerService - Performance", () => {
  let service: DefensiveEvOptimizerService
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [
        DefensiveEvOptimizerService,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DefensiveEvOptimizerService)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should optimize EVs for Ting-Lu in it's limit", () => {
    performance.now()
    const defender = new Pokemon("Ting-Lu", {
      nature: "Bold",
      item: "Clear Amulet",
      ability: new Ability("Vessel of Ruin"),
      teraType: "Fairy",
      teraTypeActive: true,
      moveSet: new MoveSet(new Move("Earthquake"), new Move("Throat Chop"), new Move("Tera Blast"), new Move("Protect")),
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    })

    const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      item: "Choice Scarf",
      ability: new Ability("Unseen Fist"),
      teraType: "Water",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Surging Strikes")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })

    const landorus = new Pokemon("Landorus", {
      nature: "Modest",
      item: "Life Orb",
      ability: new Ability("Sheer Force"),
      teraType: "Poison",
      moveSet: new MoveSet(new Move("Sludge Bomb"), new Move("Earth Power"), new Move("Protect"), new Move("Substitute")),
      evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
    })

    const okidogi = new Pokemon("Okidogi", {
      nature: "Adamant",
      item: "Choice Band",
      ability: new Ability("Guard Dog"),
      teraType: "Water",
      moveSet: new MoveSet(new Move("Gunk Shot"), new Move("Drain Punch"), new Move("Upper Hand"), new Move("Knock Off")),
      evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })

    const field = new Field()

    const targets = [new Target(urshifuRapidStrike, landorus), new Target(okidogi)]

    expectPerformance(() => service.optimize(defender, targets, field), 2000, "EV optimization for Ting-Lu in it's limit")
  })
})
