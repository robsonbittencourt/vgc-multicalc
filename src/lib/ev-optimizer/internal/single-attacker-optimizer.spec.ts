import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { CalculatorStore } from "@data/store/calculator-store"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { MockOf } from "@lib/test-utils"
import { SingleAttackerOptimizer } from "./single-attacker-optimizer"

describe("SingleAttackerOptimizer", () => {
  let service: SingleAttackerOptimizer
  let adjusterSpy: MockOf<CalcAdjuster>

  beforeEach(() => {
    adjusterSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>

    TestBed.configureTestingModule({
      providers: [
        SingleAttackerOptimizer,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: CalculatorStore, useValue: { useSpsMode: () => false, isChampions: () => false } },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(SingleAttackerOptimizer)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("optimizeForAttacker", () => {
    it("should optimize EVs for physical attacker", () => {
      const defender = new Pokemon("Ninetales-Alola", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Heracross-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Pin Missile"), new Move("Rock Blast"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result).not.toBeNull()
      expect(result!.hp).toBeGreaterThan(0)
      expect(result!.def).toBeGreaterThan(0)
      expect(result!.spd).toBe(0)
      expect(result!.atk).toBe(0)
      expect(result!.spa).toBe(0)
      expect(result!.spe).toBe(0)
    })

    it("should optimize EVs for special attacker", () => {
      const defender = new Pokemon("Aerodactyl", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Chandelure-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Thunderbolt"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result).not.toBeNull()
      expect(result!.hp + result!.spd + result!.def).toBeLessThanOrEqual(508)
      expect(result!.def).toBe(0)
      expect(result!.atk).toBe(0)
      expect(result!.spa).toBe(0)
      expect(result!.spe).toBe(0)
    })

    it("should return valid EV values within limit", () => {
      const defender = new Pokemon("Slowbro-Mega", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Heracross-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Pin Missile"), new Move("Rock Blast"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.optimizeForAttacker(attacker, defender, field)

      expect(result).not.toBeNull()
      expect(result!.hp + result!.def + result!.spd).toBeLessThanOrEqual(508)
    })
  })

  describe("findFirstValidSolution", () => {
    it("should find first valid solution for physical attacker", () => {
      const defender = new Pokemon("Ninetales-Alola", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Garchomp", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findFirstValidSolution(attacker, defender, field, true)

      expect(result).not.toBeNull()
      expect(result!.hp).toBeGreaterThanOrEqual(0)
      expect(result!.def).toBeGreaterThanOrEqual(0)
      expect(result!.spd).toBe(0)
    })

    it("should find first valid solution for special attacker", () => {
      const defender = new Pokemon("Kangaskhan", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Chandelure", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findFirstValidSolution(attacker, defender, field, false)

      expect(result).not.toBeNull()
      expect(result!.hp).toBeGreaterThanOrEqual(0)
      expect(result!.spd).toBeGreaterThanOrEqual(0)
      expect(result!.def).toBe(0)
    })
  })

  describe("findMinDefForPhysicalAttacker", () => {
    it("should find minimum defense for physical attacker", () => {
      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 100, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Heracross-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Rock Blast"), new Move("Pin Missile"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(100, attacker, defender, field)

      expect(result).toBeGreaterThanOrEqual(0)
    })

    it("should return null when attacker is null", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 100, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(100, null, defender, field)

      expect(result).toBeNull()
    })

    it("should return null or valid defense when hpEv is at limit", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Garchomp", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()
      const result = service.findMinDefForPhysicalAttacker(508, attacker, defender, field)

      expect(result === null || result >= 0).toBe(true)
    })
  })
})
