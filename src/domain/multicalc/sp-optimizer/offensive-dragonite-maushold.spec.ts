import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { OffensiveSpOptimizer } from "@multicalc/sp-optimizer/offensive-sp-optimizer"
import { evsToSps } from "@multicalc/utils"

describe("OffensiveSpOptimizer — Dragonite vs Maushold", () => {
  const HIGH_ROLL = RollLevelConfig.HIGH_ROLL_INDEX

  let optimizer: OffensiveSpOptimizer
  let damageCalc: DamageCalc
  let field: Field

  beforeEach(() => {
    optimizer = new OffensiveSpOptimizer()
    damageCalc = new DamageCalc()
    field = new Field()
  })

  const dragonite = (atkEvs: number, atkBoost: number): Pokemon => {
    return new Pokemon("Dragonite", {
      item: "Life Orb",
      nature: "Adamant",
      teraType: "Water",
      moveSet: new MoveSet(new Move("Extreme Speed"), new Move("Dragon Claw"), new Move("Protect"), new Move("Low Kick")),
      sps: evsToSps({ hp: 0, atk: atkEvs, def: 0, spa: 0, spd: 0, spe: 0 }),
      boosts: { atk: atkBoost, def: 0, spa: 0, spd: 0, spe: 0 }
    })
  }

  const maushold = (): Pokemon => {
    return new Pokemon("Maushold", {
      item: "Chople Berry",
      nature: "Impish",
      teraType: "Normal",
      moveSet: new MoveSet(new Move("Feint"), new Move("Protect"), new Move("Follow Me"), new Move("Super Fang")),
      sps: evsToSps({ hp: 252, atk: 0, def: 92, spa: 0, spd: 172, spe: 0 })
    })
  }

  it("should reproduce the reported damage of a boosted Dragonite", () => {
    const attacker = dragonite(156, 2)
    const defender = maushold()

    const result = damageCalc.calculateResult(attacker, defender, attacker.move, field, true)

    expect(result.koChance().text).toEqual("guaranteed 2HKO")
    expect(result.koChanceWithin(1, HIGH_ROLL)).toEqual(0)
    expect(result.koChanceWithin(2, HIGH_ROLL)).toEqual(1)
  })

  it("should not reach the OHKO at any Attack investment when boosted", () => {
    const defender = maushold()

    const chances = [0, 8, 16, 24, 32].map(sp => {
      const attacker = dragonite(0, 2).clone({ sps: { hp: 0, atk: sp, def: 0, spa: 0, spd: 0, spe: 0 }, boosts: { atk: 2 } })

      return damageCalc.calculateResult(attacker, defender, attacker.move, field, true).koChanceWithin(1, HIGH_ROLL)
    })

    expect(chances.every(chance => chance === 0)).toBe(true)
  })

  it("should report the OHKO as impossible for the boosted Dragonite", () => {
    const attacker = dragonite(156, 2)

    const result = optimizer.optimize(attacker, [new Target(maushold())], field, 1, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })

    expect(result.status).toEqual("impossible")
    expect(result.proposals).toEqual([])
  })

  it("should report the OHKO as impossible for the unboosted Dragonite", () => {
    const attacker = dragonite(156, 0)

    const result = optimizer.optimize(attacker, [new Target(maushold())], field, 1, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })

    expect(result.status).toEqual("impossible")
  })

  it("should need no investment for the two hit KO when boosted, since zero Attack already reaches it", () => {
    const attacker = dragonite(156, 2)
    const zeroInvestment = dragonite(0, 2)

    const atZero = damageCalc.calculateResult(zeroInvestment, maushold(), zeroInvestment.move, field, true)
    const result = optimizer.optimize(attacker, [new Target(maushold())], field, 2, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })

    expect(atZero.koChanceWithin(2, HIGH_ROLL)).toEqual(1)
    expect(result.status).toEqual("not-needed")
  })

  it("should find the cheapest Attack that guarantees the three hit KO when unboosted", () => {
    const attacker = dragonite(156, 0)

    const result = optimizer.optimize(attacker, [new Target(maushold())], field, 3, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })
    const proposal = result.proposals.find(candidate => candidate.pokemonId === attacker.id)!

    const atProposal = attacker.clone({ sps: proposal.sps })
    const belowProposal = attacker.clone({ sps: { ...proposal.sps, atk: proposal.sps.atk - 1 } })

    expect(result.status).toEqual("success")
    expect(damageCalc.calculateResult(atProposal, maushold(), atProposal.move, field, true).koChanceWithin(3, HIGH_ROLL)).toEqual(1)
    expect(damageCalc.calculateResult(belowProposal, maushold(), belowProposal.move, field, true).koChanceWithin(3, HIGH_ROLL)).toBeLessThan(1)
  })
})
