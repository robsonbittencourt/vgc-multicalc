import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { SurvivalChecker } from "./survival-checker"

describe("SurvivalChecker", () => {
  let service: SurvivalChecker
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [SurvivalChecker, DamageCalculatorService, { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true }, { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(SurvivalChecker)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("calculateMaxDamage", () => {
    it("should calculate max damage for physical attacker", () => {
      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 140, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const damage = service.calculateMaxDamage(attacker, defender, field)

      expect(damage).toBeGreaterThan(0)
    })

    it("should calculate max damage for special attacker", () => {
      const attacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Vaporeon", {
        evs: { hp: 12, atk: 0, def: 0, spa: 0, spd: 44, spe: 0 }
      })

      const field = new Field()
      const damage = service.calculateMaxDamage(attacker, defender, field)

      expect(damage).toBeGreaterThan(0)
    })
  })

  describe("checkSurvival", () => {
    it("should return true when defender survives", () => {
      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 140, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field)

      expect(typeof survives).toBe("boolean")
    })

    it("should return false when defender does not survive", () => {
      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field)

      expect(typeof survives).toBe("boolean")
    })
  })

  describe("calculateMaxCombinedDamage", () => {
    it("should calculate combined damage for two attackers", () => {
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

      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 148, atk: 0, def: 60, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const damage = service.calculateMaxCombinedDamage(attacker1, attacker2, defender, field)

      expect(damage).toBeGreaterThan(0)
    })
  })

  describe("checkSurvivalAgainstTwoAttackers", () => {
    it("should return true when defender survives both attackers", () => {
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

      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 148, atk: 0, def: 60, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field)

      expect(typeof survives).toBe("boolean")
    })

    it("should return false when defender does not survive both attackers", () => {
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

      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field)

      expect(typeof survives).toBe("boolean")
    })
  })
})
