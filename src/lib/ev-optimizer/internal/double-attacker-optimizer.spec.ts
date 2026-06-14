import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { MockOf } from "@lib/test-utils"
import { DoubleAttackerOptimizer } from "./double-attacker-optimizer"

describe("DoubleAttackerOptimizer", () => {
  let service: DoubleAttackerOptimizer
  let adjusterSpy: MockOf<CalcAdjuster>

  beforeEach(() => {
    adjusterSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>

    TestBed.configureTestingModule({
      providers: [DoubleAttackerOptimizer, DamageCalculatorService, { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(DoubleAttackerOptimizer)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("optimizeForTwoAttackers", () => {
    it("should optimize for two physical attackers", () => {
      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Garchomp-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(attacker1, attacker2, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.def).toBeGreaterThan(0)
      expect(result.spd).toBe(0)
    })

    it("should optimize for two special attackers", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Chandelure-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
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
      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const physicalAttacker = new Pokemon("Heracross-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Pin Missile"), new Move("Rock Blast"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const specialAttacker = new Pokemon("Gengar-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Sludge Bomb"), new Move("Focus Blast"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(physicalAttacker, specialAttacker, defender, field)

      expect(result.hp).toBeGreaterThan(0)
      expect(result.def).toBeGreaterThanOrEqual(0)
      expect(result.spd).toBeGreaterThanOrEqual(0)
    })

    it("should return valid EV values within limit", () => {
      const defender = new Pokemon("Dragonite", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker1 = new Pokemon("Garchomp", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Chandelure-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const field = new Field()
      const result = service.optimizeForTwoAttackers(attacker1, attacker2, defender, field)

      expect(result.hp + result.def + result.spd).toBeLessThanOrEqual(508)
    })
  })
})
