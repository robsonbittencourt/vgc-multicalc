import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { SingleAttackerOptimizer } from "./single-attacker-optimizer"

describe("SingleAttackerOptimizer", () => {
  let service: SingleAttackerOptimizer
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [
        SingleAttackerOptimizer,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(SingleAttackerOptimizer)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("optimizeForAttacker", () => {
    it("should optimize EVs for physical attacker", () => {
      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.def).toBeGreaterThan(0)
      expect(result.spd).toBe(0)
      expect(result.atk).toBe(0)
      expect(result.spa).toBe(0)
      expect(result.spe).toBe(0)
    })

    it("should optimize EVs for special attacker", () => {
      const defender = new Pokemon("Vaporeon", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.spd).toBeGreaterThan(0)
      expect(result.def).toBe(0)
      expect(result.atk).toBe(0)
      expect(result.spa).toBe(0)
      expect(result.spe).toBe(0)
    })

    it("should return valid EV values within limit", () => {
      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result.hp + result.def + result.spd).toBeLessThanOrEqual(508)
    })
  })

  describe("findFirstValidSolution", () => {
    it("should find first valid solution for physical attacker", () => {
      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findFirstValidSolution(attacker, defender, field, true)

      expect(result.hp).toBeGreaterThanOrEqual(0)
      expect(result.def).toBeGreaterThanOrEqual(0)
      expect(result.spd).toBe(0)
    })

    it("should find first valid solution for special attacker", () => {
      const defender = new Pokemon("Vaporeon", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findFirstValidSolution(attacker, defender, field, false)

      expect(result.hp).toBeGreaterThanOrEqual(0)
      expect(result.spd).toBeGreaterThanOrEqual(0)
      expect(result.def).toBe(0)
    })
  })

  describe("findMinDefForPhysicalAttacker", () => {
    it("should find minimum defense for physical attacker", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 100, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(100, attacker, defender, field)

      expect(result).toBeGreaterThanOrEqual(0)
    })

    it("should return null when attacker is null", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 100, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(100, null, defender, field)

      expect(result).toBeNull()
    })

    it("should return null or valid defense when hpEv is at limit", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(508, attacker, defender, field)

      expect(result === null || result >= 0).toBe(true)
    })
  })
})
