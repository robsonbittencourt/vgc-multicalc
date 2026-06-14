import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { CalculatorStore } from "@data/store/calculator-store"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { MockOf } from "@lib/test-utils"
import { SurvivalChecker } from "./survival-checker"

describe("SurvivalChecker", () => {
  let service: SurvivalChecker
  let adjusterSpy: MockOf<CalcAdjuster>

  beforeEach(() => {
    adjusterSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>

    TestBed.configureTestingModule({
      providers: [
        SurvivalChecker,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: CalculatorStore, useValue: { useSpsMode: () => false, isChampions: () => false } },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(SurvivalChecker)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("checkSurvival", () => {
    it("should consider rightIsDefender when swapping field sides", () => {
      const attacker = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Iron Head"), new Move("Earthquake"), new Move("Rock Slide"), new Move("Protect")),
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field({
        attackerSide: new FieldSide({ isReflect: true })
      })

      const survivesRight = service.checkSurvival(attacker, defender, field, 2, 15, true)
      const survivesLeft = service.checkSurvival(attacker, defender, field, 2, 15, false)

      expect(survivesRight).toBe(false)
      expect(survivesLeft).toBe(true)
    })
    it("should return true when defender survives", () => {
      const attacker = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Kangaskhan-Mega", {
        evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field, 2)

      expect(survives).toBe(true)
    })

    it("should return false when defender does not survive", () => {
      const attacker = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Triple Axel"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Ninetales-Alola", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field, 2)

      expect(survives).toBe(false)
    })

    it("should consider threshold when checking survival with 2HKO", () => {
      const attacker = new Pokemon("Heracross-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Close Combat"), new Move("Pin Missile"), new Move("Rock Blast"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Steelix-Mega", {
        nature: "Impish",
        evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field, 2)

      expect(survives).toBe(true)
    })

    it("should consider threshold when checking survival with 3HKO", () => {
      const attacker = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Steelix-Mega", {
        nature: "Impish",
        evs: { hp: 0, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field, 3)

      expect(survives).toBe(true)
    })

    it("should consider threshold when checking survival with 4HKO", () => {
      const attacker = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const defender = new Pokemon("Steelix-Mega", {
        nature: "Impish",
        evs: { hp: 0, atk: 0, def: 172, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvival(attacker, defender, field, 4)

      expect(survives).toBe(true)
    })
  })

  describe("checkSurvivalAgainstTwoAttackers", () => {
    it("should return true when defender survives both attackers with 2HKO", () => {
      const attacker1 = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Chandelure", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Heat Wave"), new Move("Energy Ball"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Kangaskhan-Mega", {
        evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 2)

      expect(survives).toBe(true)
    })

    it("should return false when defender does not survive both attackers with 2HKO", () => {
      const attacker1 = new Pokemon("Lopunny-Mega", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Quick Attack"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gengar-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Sludge Bomb"), new Move("Focus Blast"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Gardevoir-Mega", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 2)

      expect(survives).toBe(false)
    })

    it("should return true when defender survives both attackers with 3HKO", () => {
      const attacker1 = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Steelix-Mega", {
        nature: "Impish",
        evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 3)

      expect(survives).toBe(true)
    })

    it("should return false when defender does not survive both attackers with 3HKO", () => {
      const attacker1 = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Dragonite", {
        evs: { hp: 20, atk: 0, def: 12, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 3)

      expect(survives).toBe(false)
    })

    it("should return false when defender survives both attackers with 4HKO", () => {
      const attacker1 = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Steelix-Mega", {
        nature: "Impish",
        evs: { hp: 244, atk: 0, def: 140, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 4)

      expect(survives).toBe(true)
    })

    it("should return false when defender does not survive both attackers with 4HKO", () => {
      const attacker1 = new Pokemon("Excadrill", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Rock Slide"), new Move("Earthquake"), new Move("Iron Head"), new Move("Protect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker2 = new Pokemon("Gardevoir-Mega", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Psychic"), new Move("Protect"), new Move("Helping Hand")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const defender = new Pokemon("Dragonite", {
        evs: { hp: 20, atk: 0, def: 4, spa: 0, spd: 4, spe: 0 }
      })

      const field = new Field()
      const survives = service.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, defender, field, 4)

      expect(survives).toBe(false)
    })
  })
})
