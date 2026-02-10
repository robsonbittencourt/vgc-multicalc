import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SolutionCombiner } from "./solution-combiner"

describe("SolutionCombiner", () => {
  let service: SolutionCombiner
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [SolutionCombiner, DamageCalculatorService, { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true }, { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(SolutionCombiner)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("combineSolutions", () => {
    it("should return null when both solutions are null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 100, atk: 0, def: 50, spa: 0, spd: 50, spe: 0 }
      })

      const field = new Field()
      const result = service.combineSolutions(null, null, true, defender, field, null, null, [], [])

      expect(result).toBeNull()
    })

    it("should return physical solution when special is null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalSolution = { hp: 140, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 }
      const field = new Field()
      const result = service.combineSolutions(physicalSolution, null, true, defender, field, null, null, [], [])

      expect(result).not.toBeNull()
      expect(result!.hp).toBe(140)
      expect(result!.def).toBe(236)
      expect(result!.spd).toBe(0)
    })

    it("should return special solution when physical is null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const specialSolution = { hp: 12, atk: 0, def: 0, spa: 0, spd: 44, spe: 0 }
      const field = new Field()
      const result = service.combineSolutions(null, specialSolution, true, defender, field, null, null, [], [])

      expect(result).not.toBeNull()
      expect(result!.hp).toBe(12)
      expect(result!.spd).toBe(44)
      expect(result!.def).toBe(0)
    })
  })

  describe("combineThreeSolutions", () => {
    it("should return double solution when physical and special are null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const doubleSolution = { hp: 148, atk: 0, def: 60, spa: 0, spd: 4, spe: 0 }
      const field = new Field()
      const result = service.combineThreeSolutions(
        { physicalSolution: null, specialSolution: null, doubleSolution },
        { defender, field, threshold: 2 },
        { physicalAttacker: null, specialAttacker: null, physicalAttackers: [], specialAttackers: [] },
        { attacker1: null, attacker2: null }
      )

      expect(result).toEqual(doubleSolution)
    })

    it("should use combineSolutions when double solution is null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalSolution = { hp: 140, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 }
      const specialSolution = { hp: 12, atk: 0, def: 0, spa: 0, spd: 44, spe: 0 }
      const field = new Field()
      const result = service.combineThreeSolutions(
        { physicalSolution, specialSolution, doubleSolution: null },
        { defender, field, threshold: 2 },
        { physicalAttacker: null, specialAttacker: null, physicalAttackers: [], specialAttackers: [] },
        { attacker1: null, attacker2: null }
      )

      expect(result).toBeTruthy()
      expect(result!.hp).toBeGreaterThanOrEqual(0)
    })
  })
})
