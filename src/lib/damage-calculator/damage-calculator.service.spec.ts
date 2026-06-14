import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { Ability } from "@lib/model/ability"
import { MockOf } from "@lib/test-utils"
import { CalculatorStore } from "@data/store/calculator-store"

describe("Damage Calculator Service", () => {
  let service: DamageCalculatorService
  let adjusterOneSpy: MockOf<CalcAdjuster>
  let adjusterTwoSpy: MockOf<CalcAdjuster>

  beforeEach(() => {
    adjusterOneSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>
    adjusterTwoSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>

    TestBed.configureTestingModule({
      providers: [
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterOneSpy, multi: true },
        { provide: CALC_ADJUSTERS, useValue: adjusterTwoSpy, multi: true },
        { provide: CalculatorStore, useValue: { useSpsMode: () => false, isChampions: () => false } },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DamageCalculatorService)
  })

  it("should calculate damage", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Thunderbolt")
    expect(damageResult.result).toEqual("40 - 48.4%")
    expect(damageResult.koChance).toEqual("guaranteed 3HKO")
    expect(damageResult.damage).toEqual(48.4)
    expect(damageResult.description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")
    expect(damageResult.attackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])
  })

  it("should calculate damage with multi hit move", () => {
    const attacker = new Pokemon("Lopunny-Mega", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Fake Out"), new Move("Encore")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })

    const target = new Target(new Pokemon("Goodra-Hisui"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Triple Axel")
    expect(damageResult.result).toEqual("51.6 - 61.9%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(61.9)
    expect(damageResult.description).toEqual("252+ Atk Lopunny-Mega Triple Axel (120 BP) (3 hits) vs. 0 HP / 0 Def Goodra-Hisui: 80-96 (51.6 - 61.9%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls[0]).toEqual([14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17])
    expect(damageResult.attackerRolls[1]).toEqual([27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 30, 30, 31, 31, 31, 32])
    expect(damageResult.attackerRolls[2]).toEqual([39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47])
  })

  it("should calculate damage to all attacks", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui"))
    const field = new Field()

    const damageResults = service.calcDamageAllAttacks(attacker, target.pokemon, field, true)

    expect(damageResults.length).toEqual(4)

    expect(damageResults[0].attacker.id).toEqual(attacker.id)
    expect(damageResults[0].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[0].move).toEqual("Shadow Ball")
    expect(damageResults[0].result).toEqual("33.5 - 40.6%")
    expect(damageResults[0].koChance).toEqual("guaranteed 3HKO")
    expect(damageResults[0].damage).toEqual(40.6)
    expect(damageResults[0].description).toEqual("0 SpA Chandelure-Mega Shadow Ball vs. 0 HP / 0 SpD Goodra-Hisui: 52-63 (33.5 - 40.6%) -- guaranteed 3HKO")
    expect(damageResults[0].attackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])

    expect(damageResults[1].attacker.id).toEqual(attacker.id)
    expect(damageResults[1].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[1].move).toEqual("Trick Room")
    expect(damageResults[1].result).toEqual("0 - 0%")
    expect(damageResults[1].koChance).toEqual("Does not cause any damage")
    expect(damageResults[1].damage).toEqual(0)
    expect(damageResults[1].description).toEqual("Chandelure-Mega Trick Room vs. Goodra-Hisui: 0-0 (0 - 0%)")
    expect(damageResults[1].attackerRolls).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])

    expect(damageResults[2].attacker.id).toEqual(attacker.id)
    expect(damageResults[2].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[2].move).toEqual("Heat Wave")
    expect(damageResults[2].result).toEqual("29.6 - 35.4%")
    expect(damageResults[2].koChance).toEqual("24% chance to 3HKO")
    expect(damageResults[2].damage).toEqual(35.4)
    expect(damageResults[2].description).toEqual("0 SpA Chandelure-Mega Heat Wave vs. 0 HP / 0 SpD Goodra-Hisui: 46-55 (29.6 - 35.4%) -- 24% chance to 3HKO")
    expect(damageResults[2].attackerRolls).toEqual([[46, 46, 48, 48, 48, 49, 49, 51, 51, 51, 52, 52, 52, 54, 54, 55]])

    expect(damageResults[3].attacker.id).toEqual(attacker.id)
    expect(damageResults[3].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[3].move).toEqual("Protect")
    expect(damageResults[3].result).toEqual("0 - 0%")
    expect(damageResults[3].koChance).toEqual("Does not cause any damage")
    expect(damageResults[3].damage).toEqual(0)
    expect(damageResults[3].description).toEqual("Chandelure-Mega Protect vs. Goodra-Hisui: 0-0 (0 - 0%)")
    expect(damageResults[3].attackerRolls).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
  })

  it("should calculate damage to two attackers", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.secondAttacker!.id).toEqual(secondAttacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Shadow Ball")
    expect(damageResult.result).toEqual("54.8 - 65.8%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(65.8)
    expect(damageResult.description).toEqual("0 SpA Chandelure-Mega Shadow Ball AND 0 Atk Mold Breaker Gyarados-Mega Waterfall vs. 0 HP / 0 Def / 0 SpD Goodra-Hisui: 85-102 (54.8 - 65.8%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])
    expect(damageResult.secondAttackerRolls).toEqual([[33, 33, 34, 34, 35, 35, 36, 36, 36, 36, 37, 37, 38, 38, 39, 39]])
  })

  it("should calculate damage to two attackers considering speed", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { boosts: { spe: 2 }, moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(secondAttacker.id)
    expect(damageResult.secondAttacker?.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Waterfall")
    expect(damageResult.result).toEqual("54.8 - 65.8%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(65.8)
    expect(damageResult.description).toEqual("0 Atk Mold Breaker Gyarados-Mega Waterfall AND 0 SpA Chandelure-Mega Shadow Ball vs. 0 HP / 0 Def / 0 SpD Goodra-Hisui: 85-102 (54.8 - 65.8%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls).toEqual([[33, 33, 34, 34, 35, 35, 36, 36, 36, 36, 37, 37, 38, 38, 39, 39]])
    expect(damageResult.secondAttackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])
  })

  it("should calculate damage to two attackers without damage", () => {
    const attacker = new Pokemon("Jolteon", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Zapdos", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Air Slash"), new Move("Protect")) })
    const target = new Target(new Pokemon("Ting-Lu"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toEqual("Jolteon Thunder AND Zapdos Thunder vs. Ting-Lu: 0-0 (0 - 0%) -- possibly the worst move ever")
  })

  it("should adjust inputs before calculation", () => {
    const activeMove = new Move("Thunderbolt")
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(activeMove, new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const targetPokemon = new Pokemon("Flutter Mane")
    const target = new Target(targetPokemon)
    const field = new Field()

    service.calcDamage(attacker, target.pokemon, field)

    expect(adjusterOneSpy.adjust).toHaveBeenCalledWith(expect.any(SmogonPokemon), expect.any(SmogonPokemon), activeMove, expect.any(MoveSmogon), expect.any(FieldSmogon), undefined, expect.any(Field))
    expect(adjusterTwoSpy.adjust).toHaveBeenCalledWith(expect.any(SmogonPokemon), expect.any(SmogonPokemon), activeMove, expect.any(MoveSmogon), expect.any(FieldSmogon), undefined, expect.any(Field))
  })

  it("should inject adjusted BP in description when adjuster sets override", () => {
    adjusterOneSpy.adjust.mockImplementation((_a, _t, _m, moveSmogon) => {
      moveSmogon.bp = 150
      moveSmogon.overrides = { basePower: 150 }
    })

    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toContain("Stomping Tantrum (150 BP)")
  })

  it("should not inject adjusted BP when adjuster does not set override", () => {
    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).not.toContain("BP)")
  })

  it("should inject adjusted BP in description for both attackers when both have overrides", () => {
    adjusterOneSpy.adjust.mockImplementation((_a, _t, move, moveSmogon) => {
      if (move.name === "Stomping Tantrum") {
        moveSmogon.bp = 150
        moveSmogon.overrides = { basePower: 150 }
      }
    })

    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Venusaur"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description.match(/Stomping Tantrum \(150 BP\)/g)?.length).toBe(2)
  })

  it("should adjust inputs before calculation when have second attacker", () => {
    const activeMove = new Move("Grassy Glide")
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(activeMove, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const targetPokemon = new Pokemon("Flutter Mane")
    const target = new Target(targetPokemon)
    const field = new Field()

    service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(adjusterOneSpy.adjust).toHaveBeenCalledWith(expect.any(SmogonPokemon), expect.any(SmogonPokemon), activeMove, expect.any(MoveSmogon), expect.any(FieldSmogon), attacker, expect.any(Field))
    expect(adjusterTwoSpy.adjust).toHaveBeenCalledWith(expect.any(SmogonPokemon), expect.any(SmogonPokemon), activeMove, expect.any(MoveSmogon), expect.any(FieldSmogon), attacker, expect.any(Field))
  })

  it("should calculate damage to two attackers one with multi hit move", () => {
    const attacker = new Pokemon("Lopunny-Mega", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Triple Axel"), new Move("Close Combat"), new Move("Fake Out"), new Move("Encore")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })

    const target = new Target(new Pokemon("Goodra-Hisui"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Triple Axel")
    expect(damageResult.result).toEqual("72.9 - 87%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(87)
    expect(damageResult.description).toEqual("252+ Atk Lopunny-Mega Triple Axel (120 BP) (3 hits) AND 0 Atk Mold Breaker Gyarados-Mega Waterfall vs. 0 HP / 0 Def Goodra-Hisui: 113-135 (72.9 - 87%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls[0]).toEqual([14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17])
    expect(damageResult.attackerRolls[1]).toEqual([27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 30, 30, 31, 31, 31, 32])
    expect(damageResult.attackerRolls[2]).toEqual([39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47])
    expect(damageResult.secondAttackerRolls).toEqual([[33, 33, 34, 34, 35, 35, 36, 36, 36, 36, 37, 37, 38, 38, 39, 39]])
  })

  it("should calculate damage to two attackers with Tera active in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { teraType: "Steel", teraTypeActive: true, nature: "Bold", boosts: { def: 1 }, evs: { def: 252, spd: 12 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +1 252+ Def / 12 SpD Tera Steel Goodra-Hisui")
  })

  it("should calculate damage to two attackers with positive def modifier/nature in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { nature: "Bold", boosts: { def: 1 }, evs: { def: 252, spd: 12 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +1 252+ Def / 12 SpD Goodra-Hisui")
  })

  it("should calculate damage to two attackers with positive spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { nature: "Sassy", boosts: { spd: 3 }, evs: { def: 20, spd: 228 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / 20 Def / +3 228+ SpD Goodra-Hisui")
  })

  it("should calculate damage to two attackers with negative def modifier/nature in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { nature: "Hasty", boosts: { def: -1 }, evs: { def: 140, spd: 28 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / -1 140- Def / 28 SpD Goodra-Hisui")
  })

  it("should calculate damage to two attackers with negative spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { nature: "Naive", boosts: { spd: -3 }, evs: { def: 36, spd: 148 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / 36 Def / -3 148- SpD Goodra-Hisui")
  })

  it("should calculate damage to two attackers with positive def modifier/nature and negative spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Chandelure-Mega", { moveSet: new MoveSet(new Move("Shadow Ball"), new Move("Trick Room"), new Move("Heat Wave"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Gyarados-Mega", { moveSet: new MoveSet(new Move("Waterfall"), new Move("Ice Fang"), new Move("Earthquake"), new Move("Protect")) })
    const target = new Target(new Pokemon("Goodra-Hisui", { nature: "Lax", boosts: { def: 6, spd: -4 }, evs: { def: 252, spd: 140 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +6 252+ Def / -4 140- SpD Goodra-Hisui")
  })

  it("should calculate damage in a critical hit when attacker have critical hit configured and right is defender", () => {
    const rightIsDefender = true
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const attackerSide = new FieldSide({ isCriticalHit: true })
    const field = new Field({ attackerSide })

    const damageResult = service.calcDamageAllAttacks(attacker, target.pokemon, field, rightIsDefender)

    expect(damageResult[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane on a critical hit: 79-94 (60.7 - 72.3%) -- guaranteed 2HKO")
  })

  it("should calculate damage in a critical hit when defender have critical hit configured and right is not defender", () => {
    const rightIsDefender = false
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const defenderSide = new FieldSide({ isCriticalHit: true })
    const field = new Field({ defenderSide })

    const damageResult = service.calcDamageAllAttacks(attacker, target.pokemon, field, rightIsDefender)

    expect(damageResult[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane on a critical hit: 79-94 (60.7 - 72.3%) -- guaranteed 2HKO")
  })

  it("should calculate damage of a fixed damage move", () => {
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(new Move("Final Gambit"), new Move("Close Combat"), new Move("Shadow Claw"), new Move("Coaching")) })
    const target = new Target(new Pokemon("Incineroar"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.move).toEqual("Final Gambit")
    expect(damageResult.result).toEqual("108.8 - 108.8%")
    expect(damageResult.koChance).toEqual("guaranteed OHKO")
    expect(damageResult.damage).toEqual(108.8)
    expect(damageResult.description).toEqual("Annihilape Final Gambit vs. 0 HP Incineroar: 185-185 (108.8 - 108.8%) -- guaranteed OHKO")
    expect(damageResult.attackerRolls).toEqual([[185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185]])
  })

  it.skip("should calculate Ruination damage as half of the target current HP", () => {
    const attacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(new Move("Ruination"), new Move("Leech Seed"), new Move("Pollen Puff"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.move).toEqual("Ruination")
    expect(damageResult.damage).toEqual(50)
    expect(damageResult.attackerRolls).toEqual([[65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]])
  })

  it("should consider berry in damage calculation", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Flapple", { item: "Sitrus Berry", ability: new Ability("Ripen") }))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toEqual("0 Atk Urshifu Close Combat vs. 0 HP / 0 Def Flapple: 102-121 (70.3 - 83.4%) -- 77.3% chance to 2HKO after Sitrus Berry recovery")
  })

  it("should return berryHP when Sitrus Berry triggers", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toEqual(50)
  })

  it("should trigger Sitrus Berry and affect second attacker damage (Water Spout)", () => {
    const attacker1 = new Pokemon("Kangaskhan-Mega", { item: "Choice Band", moveSet: new MoveSet(new Move("Double-Edge"), new Move(""), new Move(""), new Move("")) })
    const attacker2 = new Pokemon("Blastoise-Mega", { moveSet: new MoveSet(new Move("Water Spout"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 }, nature: "Modest" })

    const target = new Target(new Pokemon("Goodra-Hisui", { item: "Sitrus Berry", evs: { hp: 252 } }))
    const field = new Field()

    const result = service.calcDamageForTwoAttackers(attacker1, attacker2, target.pokemon, field)

    expect(result.description).toContain("after Sitrus Berry recovery")
  })

  it("should trigger Enigma Berry correctly with two attackers (Neutral -> Super Effective)", () => {
    const attacker1 = new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")) })
    const attacker2 = new Pokemon("Landorus-Therian", { moveSet: new MoveSet(new Move("Bulldoze"), new Move(""), new Move(""), new Move("")) })

    const target = new Target(new Pokemon("Incineroar", { item: "Enigma Berry", evs: { hp: 252 } }))
    const field = new Field()

    const result = service.koChanceForTwoAttackers(attacker1, attacker2, target.pokemon, field)

    expect(result).toContain("after Enigma Berry recovery")
  })

  it("should apply Colbur Berry damage reduction when Unnerve is off", () => {
    const attacker = new Pokemon("Tyranitar-Mega", { evs: { spa: 0 }, moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Farigiraf", { item: "Colbur Berry", evs: { hp: 29, spd: 11 } }))
    const field = new Field({ isUnnerve: false })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toContain("Colbur Berry")
  })

  it("should NOT apply Colbur Berry damage reduction when Unnerve is on", () => {
    const attacker = new Pokemon("Tyranitar-Mega", { evs: { spa: 0 }, moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Farigiraf", { item: "Colbur Berry", evs: { hp: 29, spd: 11 } }))
    const field = new Field({ isUnnerve: true })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).not.toContain("Colbur Berry")
  })

  it("should apply Sitrus Berry recovery when Unnerve is off", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field({ isUnnerve: false })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toBeGreaterThan(0)
  })

  it("should NOT apply Sitrus Berry recovery when Unnerve is on", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field({ isUnnerve: true })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toEqual(0)
  })
})
