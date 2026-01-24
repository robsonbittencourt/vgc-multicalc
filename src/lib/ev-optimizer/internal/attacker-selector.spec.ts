import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { defaultPokemon } from "@lib/default-pokemon"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { AttackerSelector } from "./attacker-selector"

describe("AttackerSelector", () => {
  let service: AttackerSelector
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [AttackerSelector, DamageCalculatorService, { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true }, { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(AttackerSelector)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("getPhysicalAttackers", () => {
    it("should return only physical attackers", () => {
      const physicalAttacker = new Pokemon("Urshifu-Rapid-Strike", {
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Raging Bolt", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker, specialAttacker]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(physicalAttacker)
    })

    it("should filter out default pokemon", () => {
      const physicalAttacker = new Pokemon("Urshifu-Rapid-Strike", {
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defaultPoke = defaultPokemon()

      const attackers = [physicalAttacker, defaultPoke]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(physicalAttacker)
    })

    it("should return empty array when no physical attackers", () => {
      const specialAttacker = new Pokemon("Raging Bolt", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [specialAttacker]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(0)
    })
  })

  describe("getSpecialAttackers", () => {
    it("should return only special attackers", () => {
      const physicalAttacker = new Pokemon("Urshifu-Rapid-Strike", {
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Raging Bolt", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker, specialAttacker]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(specialAttacker)
    })

    it("should filter out default pokemon", () => {
      const specialAttacker = new Pokemon("Raging Bolt", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const defaultPoke = defaultPokemon()

      const attackers = [specialAttacker, defaultPoke]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(specialAttacker)
    })

    it("should return empty array when no special attackers", () => {
      const physicalAttacker = new Pokemon("Urshifu-Rapid-Strike", {
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(0)
    })
  })

  describe("determinePriority", () => {
    it("should prioritize physical when more physical attackers can survive", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker1 = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const physicalAttacker2 = new Pokemon("Landorus-Therian", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("U-turn")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const specialAttacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([physicalAttacker1, physicalAttacker2], [specialAttacker], defender, field)

      expect(result.prioritizePhysical).toBe(true)
    })

    it("should return strongest physical attacker", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker1 = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([physicalAttacker1], [], defender, field)

      expect(result.physicalStrongestAttacker).toBeTruthy()
    })

    it("should return strongest special attacker", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const specialAttacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([], [specialAttacker], defender, field)

      expect(result.specialStrongestAttacker).toBeTruthy()
    })
  })

  describe("findStrongestDoubleTarget", () => {
    it("should find strongest double target", () => {
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

      const target = new Target(attacker1, attacker2)
      const field = new Field()

      const result = service.findStrongestDoubleTarget(defender, [target], field)

      expect(result).toBeTruthy()
      expect(result?.attacker1).toBe(attacker1)
      expect(result?.attacker2).toBe(attacker2)
      expect(result?.maxDamage).toBeGreaterThan(0)
    })

    it("should return null when no double targets", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const target = new Target(attacker)
      const field = new Field()

      const result = service.findStrongestDoubleTarget(defender, [target], field)

      expect(result).toBeNull()
    })

    it("should filter out default pokemon", () => {
      const defender = new Pokemon("Gholdengo", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const defaultPoke = defaultPokemon()

      const target = new Target(defaultPoke, defaultPoke)
      const field = new Field()

      const result = service.findStrongestDoubleTarget(defender, [target], field)

      expect(result).toBeNull()
    })
  })
})
