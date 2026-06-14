import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { CalculatorStore } from "@data/store/calculator-store"
import { defaultPokemon } from "@lib/default-pokemon"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { MockOf } from "@lib/test-utils"
import { AttackerSelector } from "./attacker-selector"

describe("AttackerSelector", () => {
  let service: AttackerSelector
  let adjusterSpy: MockOf<CalcAdjuster>

  beforeEach(() => {
    adjusterSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>

    TestBed.configureTestingModule({
      providers: [
        AttackerSelector,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: CalculatorStore, useValue: { useSpsMode: () => false, isChampions: () => false } },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(AttackerSelector)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("getPhysicalAttackers", () => {
    it("should return only physical attackers", () => {
      const physicalAttacker = new Pokemon("Lopunny-Mega", {
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Chandelure-Mega", {
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker, specialAttacker]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(physicalAttacker)
    })

    it("should filter out default pokemon", () => {
      const physicalAttacker = new Pokemon("Lopunny-Mega", {
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defaultPoke = defaultPokemon()

      const attackers = [physicalAttacker, defaultPoke]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(physicalAttacker)
    })

    it("should return empty array when no physical attackers", () => {
      const specialAttacker = new Pokemon("Chandelure", {
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [specialAttacker]
      const result = service.getPhysicalAttackers(attackers)

      expect(result.length).toBe(0)
    })
  })

  describe("getSpecialAttackers", () => {
    it("should return only special attackers", () => {
      const physicalAttacker = new Pokemon("Garchomp", {
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Chandelure", {
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker, specialAttacker]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(specialAttacker)
    })

    it("should filter out default pokemon", () => {
      const specialAttacker = new Pokemon("Chandelure", {
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const defaultPoke = defaultPokemon()

      const attackers = [specialAttacker, defaultPoke]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(specialAttacker)
    })

    it("should return empty array when no special attackers", () => {
      const physicalAttacker = new Pokemon("Garchomp", {
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attackers = [physicalAttacker]
      const result = service.getSpecialAttackers(attackers)

      expect(result.length).toBe(0)
    })
  })

  describe("determinePriority", () => {
    it("should prioritize physical when more physical attackers can survive", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker1 = new Pokemon("Garchomp", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const physicalAttacker2 = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Iron Head"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const specialAttacker = new Pokemon("Chandelure", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([physicalAttacker1, physicalAttacker2], [specialAttacker], defender, field)

      expect(result.prioritizePhysical).toBe(true)
    })

    it("should return strongest physical attacker", () => {
      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker1 = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([physicalAttacker1], [], defender, field)

      expect(result.physical.strongestAttacker).toBeTruthy()
    })

    it("should return strongest special attacker", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const specialAttacker = new Pokemon("Chandelure", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.determinePriority([], [specialAttacker], defender, field)

      expect(result.special.strongestAttacker).toBeTruthy()
    })
  })

  describe("findStrongestDoubleTarget", () => {
    it("should find strongest double target", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Garchomp", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
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
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Garchomp", {
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const target = new Target(attacker)
      const field = new Field()

      const result = service.findStrongestDoubleTarget(defender, [target], field)

      expect(result).toBeNull()
    })

    it("should filter out default pokemon", () => {
      const defender = new Pokemon("Dragonite", {
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
