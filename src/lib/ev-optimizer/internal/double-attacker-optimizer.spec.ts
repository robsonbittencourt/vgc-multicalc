import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { DoubleAttackerOptimizer } from "./double-attacker-optimizer"

describe("DoubleAttackerOptimizer", () => {
  let service: DoubleAttackerOptimizer
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [
        DoubleAttackerOptimizer,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DoubleAttackerOptimizer)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("optimizeForTwoAttackers", () => {
    it("should optimize for two physical attackers", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Landorus-Therian", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("U-turn")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(attacker1, attacker2, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.def).toBeGreaterThan(0)
      expect(result.spd).toBe(0)
    })

    it("should optimize for two special attackers", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Flutter Mane", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Icy Wind"), new Move("Protect"), new Move("Taunt")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(attacker1, attacker2, defender, field)

      expect(result.hp).toBeGreaterThanOrEqual(0)
      expect(result.spd).toBeGreaterThanOrEqual(0)
      expect(result.def).toBe(0)
      expect(result.atk).toBe(0)
      expect(result.spa).toBe(0)
      expect(result.spe).toBe(0)
      expect(result.hp + result.spd + result.def).toBeLessThanOrEqual(508)
    })

    it("should optimize for mixed attackers", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Flutter Mane", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Icy Wind"), new Move("Protect"), new Move("Taunt")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(physicalAttacker, specialAttacker, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.def).toBeGreaterThanOrEqual(0)
      expect(result.spd).toBeGreaterThanOrEqual(0)
    })

    it("should return valid EV values within limit", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Flutter Mane", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Icy Wind"), new Move("Protect"), new Move("Taunt")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(attacker1, attacker2, defender, field)

      expect(result.hp + result.def + result.spd).toBeLessThanOrEqual(508)
    })
  })
})
