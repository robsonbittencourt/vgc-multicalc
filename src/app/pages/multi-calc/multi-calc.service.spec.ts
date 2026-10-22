import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MultiCalcService } from "@app/pages/multi-calc/multi-calc.service"
import { RollLevelConfig } from "@multicalc/damage-calc"
import { Ability, Field, FieldSide, Move, MoveSet, Pokemon, Target } from "@multicalc/model"

describe("MultiCalcService", () => {
  let service: MultiCalcService

  const grimmsnarl = () =>
    new Pokemon("Grimmsnarl", {
      nature: "Sassy",
      item: "Light Clay",
      ability: new Ability("Prankster"),
      moveSet: new MoveSet(new Move("Spirit Break"), new Move("Parting Shot"), new Move("Light Screen"), new Move("Reflect")),
      sps: { hp: 30, def: 10, spd: 26 }
    })

  const charizard = () =>
    new Pokemon("Charizard-Mega-Y", {
      nature: "Modest",
      item: "Charizardite Y",
      ability: new Ability("Drought"),
      moveSet: new MoveSet(new Move("Solar Beam"), new Move("Heat Wave"), new Move("Weather Ball"), new Move("Protect"), 2),
      sps: { spa: 32 }
    })

  const garchomp = () =>
    new Pokemon("Garchomp", {
      nature: "Adamant",
      item: "Sitrus Berry",
      ability: new Ability("Rough Skin"),
      moveSet: new MoveSet(new Move("Earthquake"), new Move("Dragon Claw"), new Move("Stomping Tantrum"), new Move("Rock Slide")),
      sps: { hp: 2, atk: 32, spe: 32 }
    })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiCalcService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(MultiCalcService)
  })

  describe("optimizeDefensiveSps", () => {
    it("should propose the best effort spread against a combined attack the defender cannot survive", () => {
      const field = new Field({ weather: "Sun" })
      const targets = [new Target(charizard(), garchomp())]

      const result = service.optimizeDefensiveSps(grimmsnarl(), targets, field, false, false, 2, RollLevelConfig.HIGH_ROLL_INDEX)

      expect(result).toEqual({
        sps: { hp: 30, atk: 0, def: 10, spa: 0, spd: 26, spe: 0 },
        nature: null,
        status: "best-effort",
        koChance: 0.875,
        coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Charizard-Mega-Y + Garchomp", bestTargetKoChance: 0.875 }
      })
    })

    it("should apply the Light Screen of the defender side to the defender being optimized", () => {
      const field = new Field({ weather: "Sun", defenderSide: new FieldSide({ isLightScreen: true }) })
      const targets = [new Target(charizard(), garchomp())]

      const result = service.optimizeDefensiveSps(grimmsnarl(), targets, field, false, false, 2, RollLevelConfig.HIGH_ROLL_INDEX)

      expect(result).toEqual({
        sps: { hp: 31, atk: 0, def: 14, spa: 0, spd: 5, spe: 0 },
        nature: null,
        status: "success",
        coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 }
      })
    })

    it("should propose a spread that survives the combined attack in the damage shown with the Light Screen of the defender side", () => {
      const field = new Field({ weather: "Sun", defenderSide: new FieldSide({ isLightScreen: true }) })
      const targets = [new Target(charizard(), garchomp())]

      const result = service.optimizeDefensiveSps(grimmsnarl(), targets, field, false, false, 2, RollLevelConfig.HIGH_ROLL_INDEX)
      const [damage] = service.withOpponents(targets, field).damageDefending(grimmsnarl().clone({ sps: result.sps }), true)

      expect(damage.result).toBe("84 - 99.5%")
      expect(damage.koChance).toBe("guaranteed 2HKO")
    })

    it("should apply the Helping Hand of the attacker side to the attackers", () => {
      const field = new Field({ weather: "Sun", attackerSide: new FieldSide({ isHelpingHand: true }) })
      const targets = [new Target(charizard())]

      const result = service.optimizeDefensiveSps(grimmsnarl(), targets, field, false, false, 2, RollLevelConfig.HIGH_ROLL_INDEX)
      const [damage] = service.withOpponents(targets, field).damageDefending(grimmsnarl().clone({ sps: result.sps }), true)

      expect(result).toEqual({
        sps: { hp: 8, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 },
        nature: null,
        status: "success",
        coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 }
      })
      expect(damage.result).toBe("84.2 - 99.4%")
      expect(damage.koChance).toBe("guaranteed 2HKO")
    })
  })

  describe("target list", () => {
    it("should add a member as a new target", () => {
      const targets = [new Target(charizard())]

      const result = service.addMember(targets, garchomp())

      expect(result.map(target => target.pokemon.name)).toEqual(["Charizard-Mega-Y", "Garchomp"])
    })

    it("should combine two attackers into one target", () => {
      const first = charizard()
      const second = garchomp()

      const result = service.combineAttackers([new Target(first), new Target(second)], first.id, second.id)!

      expect(result.map(target => [target.pokemon.name, target.secondPokemon?.name])).toEqual([["Charizard-Mega-Y", "Garchomp"]])
    })

    it("should separate combined attackers into two targets", () => {
      const first = charizard()
      const second = garchomp()

      const result = service.separateAttackers([new Target(first, second)], first.id)

      expect(result.map(target => [target.pokemon.name, target.secondPokemon?.name])).toEqual([
        ["Charizard-Mega-Y", undefined],
        ["Garchomp", undefined]
      ])
    })
  })

  describe("optimizeOffensiveSps", () => {
    it("should optimize the attacker against the targets with the default options", () => {
      const attacker = charizard().clone({ sps: { spa: 0 } })

      const result = service.optimizeOffensiveSps(attacker, [new Target(grimmsnarl())], new Field({ weather: "Sun" }), 2, RollLevelConfig.HIGH_ROLL_INDEX)

      expect(result).toEqual({
        status: "success",
        proposals: [{ pokemonId: attacker.id, stat: "spa", sps: { hp: 0, atk: 0, def: 0, spa: 21, spd: 0, spe: 0 }, nature: null }],
        coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null }
      })
    })

    it("should optimize the attacker together with its partner", () => {
      const attacker = charizard().clone({ sps: { spa: 0 } })
      const partner = garchomp().clone({ sps: { atk: 0 } })

      const result = service.optimizeOffensiveSps(attacker, [new Target(grimmsnarl())], new Field({ weather: "Sun" }), 1, RollLevelConfig.HIGH_ROLL_INDEX, true, true, { pokemon: partner, keepOtherSps: true, updateNature: false })

      expect(result).toEqual({
        status: "best-effort",
        koChance: 0.875,
        proposals: [
          { pokemonId: attacker.id, stat: "spa", sps: { hp: 0, atk: 0, def: 0, spa: 27, spd: 0, spe: 0 }, nature: null },
          { pokemonId: partner.id, stat: "atk", sps: { hp: 0, atk: 30, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null }
        ],
        coverage: { covered: 0, total: 1, outOfReach: 0, bestTargetName: null }
      })
    })
  })
})
