import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { OffensiveSpOptimizer } from "@multicalc/sp-optimizer/offensive-sp-optimizer"
import { evsToSps } from "@multicalc/utils"
import { KoThreshold, OffensiveSpProposal, OffensiveStat } from "@multicalc/sp-optimizer/internal/offensive-sp-optimizer-types"
import { Stats } from "@multicalc/types"

describe("OffensiveSpOptimizer", () => {
  let optimizer: OffensiveSpOptimizer
  let damageCalc: DamageCalc
  let field: Field

  const HIGH_ROLL = RollLevelConfig.HIGH_ROLL_INDEX

  beforeEach(() => {
    optimizer = new OffensiveSpOptimizer()
    damageCalc = new DamageCalc()
    field = new Field()
  })

  const withMove = (name: string, moveName: string, options: object = {}): Pokemon => {
    return new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), ...options })
  }

  const spFor = (result: { proposals: readonly OffensiveSpProposal[] }, pokemon: Pokemon): number => {
    const proposal = result.proposals.find(candidate => candidate.pokemonId === pokemon.id)!

    return proposal.sps[proposal.stat]
  }

  const statFor = (result: { proposals: readonly OffensiveSpProposal[] }, pokemon: Pokemon): OffensiveStat => {
    return result.proposals.find(proposal => proposal.pokemonId === pokemon.id)!.stat
  }

  const spsFor = (result: { proposals: readonly OffensiveSpProposal[] }, pokemon: Pokemon): Stats => {
    return result.proposals.find(proposal => proposal.pokemonId === pokemon.id)!.sps
  }

  const natureFor = (result: { proposals: readonly OffensiveSpProposal[] }, pokemon: Pokemon): string | null => {
    return result.proposals.find(proposal => proposal.pokemonId === pokemon.id)!.nature
  }

  const kosAt = (attacker: Pokemon, defender: Pokemon, stat: OffensiveStat, sp: number, threshold: KoThreshold): boolean => {
    const probe = attacker.clone({ sps: { ...attacker.sps, [stat]: sp } })
    const result = damageCalc.calculateResult(probe, defender, probe.move, field, true)

    return result.koChanceWithin(threshold, HIGH_ROLL) === 1
  }

  const kosTogetherAt = (attacker: Pokemon, partner: Pokemon, defender: Pokemon, attackerStat: OffensiveStat, attackerSp: number, partnerStat: OffensiveStat, partnerSp: number, threshold: KoThreshold): boolean => {
    const attackerProbe = attacker.clone({ sps: { ...attacker.sps, [attackerStat]: attackerSp } })
    const partnerProbe = partner.clone({ sps: { ...partner.sps, [partnerStat]: partnerSp } })
    const multiResult = damageCalc.calcDamageValueForTwoAttackers(attackerProbe, partnerProbe, defender, field, true)

    return multiResult.koChanceWithin(threshold, HIGH_ROLL) === 1
  }

  describe("single target", () => {
    it("should aim for the OHKO when no threshold is given", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Pichu")

      const result = optimizer.optimize(attacker, [new Target(defender)], field)

      expect(result.status).toBe("not-needed")
      expect(kosAt(attacker, defender, statFor(result, attacker), spFor(result, attacker), 1)).toBe(true)
    })

    it("should pick the Attack stat for a physical move", () => {
      const attacker = withMove("Urshifu-Rapid-Strike", "Surging Strikes", { nature: "Adamant" })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2)

      expect(statFor(result, attacker)).toBe("atk")
    })

    it("should pick the Special Attack stat for a special move", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2)

      expect(statFor(result, attacker)).toBe("spa")
    })

    it("should return the minimum SP that guarantees the KO and not one point less", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2)

      expect(result.status).toBe("success")
      expect(kosAt(attacker, defender, statFor(result, attacker), spFor(result, attacker), 2)).toBe(true)
      expect(kosAt(attacker, defender, statFor(result, attacker), spFor(result, attacker) - 1, 2)).toBe(false)
    })

    it("should report not-needed when the KO already happens without investment", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { spa: 0 } })
      const defender = new Pokemon("Pichu")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1)

      expect(result.status).toBe("not-needed")
      expect(spFor(result, attacker)).toBe(0)
    })

    it("should propose the cheapest spread that reaches the highest chance when the KO is not guaranteed", () => {
      const attacker = withMove("Torkoal", "Eruption", { nature: "Quiet", item: "Charcoal" })
      const defender = new Pokemon("Farigiraf", { nature: "Calm", item: "Ability Shield" })
      const sun = new Field({ weather: "Sun" })

      const result = optimizer.optimize(attacker, [new Target(defender)], sun, 1)

      expect(result.status).toBe("best-effort")
      expect(result.status === "best-effort" && result.koChance).toBe(0.3125)
      expect(spFor(result, attacker)).toBe(31)
    })

    it("should not propose a more expensive spread that reaches the same chance", () => {
      const attacker = withMove("Torkoal", "Eruption", { nature: "Quiet", item: "Charcoal" })
      const defender = new Pokemon("Farigiraf", { nature: "Calm", item: "Ability Shield" })
      const sun = new Field({ weather: "Sun" })

      const result = optimizer.optimize(attacker, [new Target(defender)], sun, 1)
      const proposed = spFor(result, attacker)

      const atProposed = attacker.clone({ sps: { ...attacker.sps, spa: proposed } })
      const atNext = attacker.clone({ sps: { ...attacker.sps, spa: proposed + 1 } })

      const chanceAtProposed = damageCalc.calculateResult(atProposed, defender, atProposed.move, sun, true).koChanceWithin(1, HIGH_ROLL)
      const chanceAtNext = damageCalc.calculateResult(atNext, defender, atNext.move, sun, true).koChanceWithin(1, HIGH_ROLL)

      expect(chanceAtNext).toBe(chanceAtProposed)
    })

    it("should report impossible only when no investment deals a knock out chance", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Blissey", { sps: { hp: 32, spd: 32 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1)

      expect(result.status).toBe("impossible")
      expect(result.proposals).toEqual([])
    })

    it("should report impossible when even maximum investment cannot reach the KO", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Blissey", { sps: { hp: 32, spd: 32 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1)

      expect(result.status).toBe("impossible")
      expect(result.proposals).toEqual([])
      expect(kosAt(attacker, defender, "spa", 32, 1)).toBe(false)
    })

    it("should require no more investment for a 2HKO than for an OHKO", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Flutter Mane")

      const ohko = optimizer.optimize(attacker, [new Target(defender)], field, 1)
      const twoHko = optimizer.optimize(attacker, [new Target(defender)], field, 2)

      expect(ohko.status).toBe("impossible")
      expect(twoHko.status).toBe("success")
      expect(kosAt(attacker, defender, statFor(twoHko, attacker), spFor(twoHko, attacker), 2)).toBe(true)
    })
  })

  describe("multiple targets", () => {
    it("should return the highest of the minimums required by each target", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const frail = new Pokemon("Indeedee-F")
      const bulky = new Pokemon("Flutter Mane")

      const againstFrail = optimizer.optimize(attacker, [new Target(frail)], field, 2)
      const againstBulky = optimizer.optimize(attacker, [new Target(bulky)], field, 2)
      const againstBoth = optimizer.optimize(attacker, [new Target(frail), new Target(bulky)], field, 2)

      expect(spFor(againstBoth, attacker)).toBe(Math.max(spFor(againstFrail, attacker), spFor(againstBulky, attacker)))
    })

    it("should kill every target at the returned SP", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const frail = new Pokemon("Indeedee-F")
      const bulky = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(frail), new Target(bulky)], field, 2)

      expect(result.status).toBe("success")
      expect(kosAt(attacker, frail, statFor(result, attacker), spFor(result, attacker), 2)).toBe(true)
      expect(kosAt(attacker, bulky, statFor(result, attacker), spFor(result, attacker), 2)).toBe(true)
    })

    it("should not let a target that is immune to the move discard the best effort against the others", () => {
      const attacker = withMove("Dragonite", "Dragon Claw", { item: "Life Orb", nature: "Adamant", boosts: { atk: 1 } })
      const reachable = new Pokemon("Maushold", { item: "Chople Berry", nature: "Impish", sps: evsToSps({ hp: 252, def: 92, spd: 172 }) })
      const immune = new Pokemon("Floette-Mega", { item: "Floettite", nature: "Timid", sps: evsToSps({ hp: 12, spa: 252, spe: 252 }) })

      const againstReachable = optimizer.optimize(attacker, [new Target(reachable)], field, 1)
      const againstBoth = optimizer.optimize(attacker, [new Target(reachable), new Target(immune)], field, 1)

      expect(againstReachable.status).toBe("best-effort")
      expect(againstReachable.status === "best-effort" && againstReachable.koChance).toBe(0.375)
      expect(againstBoth.status).toBe("best-effort")
      expect(againstBoth.status === "best-effort" && againstBoth.koChance).toBe(0.375)
      expect(spFor(againstBoth, attacker)).toBe(32)
    })

    it("should report the best effort when every target it can damage already falls and only an immune one is left", () => {
      const attacker = withMove("Dragonite", "Dragon Claw", { item: "Life Orb", nature: "Adamant" })
      const falls = new Pokemon("Indeedee-F")
      const immune = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(falls), new Target(immune)], field, 2)

      expect(result.status).toBe("best-effort")
      expect(result.status === "best-effort" && result.koChance).toBe(0)
      expect(result.coverage).toEqual({ covered: 1, total: 2, outOfReach: 1, bestTargetName: null })
    })

    it("should still spend the SPs a reachable target needs when another one is out of reach", () => {
      const attacker = withMove("Flutter Mane", "Moonblast", { nature: "Modest" })
      const reachable = withMove("Kingambit", "Tackle", {})
      const wall = withMove("Blissey", "Seismic Toss", { nature: "Calm", sps: { hp: 32, spd: 32 } })

      const result = optimizer.optimize(attacker, [new Target(reachable), new Target(wall)], field, 2)

      expect(result.status).toBe("best-effort")
      expect(spFor(result, attacker)).toBe(1)
      expect(kosAt(attacker, reachable, "spa", spFor(result, attacker), 2)).toBe(true)
      expect(result.coverage.bestTargetName).toBe("Blissey")
    })

    it("should keep investing for a target that is not knocked out yet even when another one already falls", () => {
      const attacker = withMove("Dragonite", "Dragon Claw", { item: "Life Orb", nature: "Adamant", boosts: { atk: 6 } })
      const alreadyFalls = new Pokemon("Indeedee-F")
      const stillStanding = new Pokemon("Kingambit", { item: "Life Orb", nature: "Adamant" })

      const result = optimizer.optimize(attacker, [new Target(alreadyFalls), new Target(stillStanding)], field, 1)

      expect(result.status).toBe("best-effort")
      expect(spFor(result, attacker)).toBe(32)
      expect(result.status === "best-effort" && result.koChance).toBe(0.875)
      expect(result.coverage).toEqual({ covered: 1, total: 2, outOfReach: 0, bestTargetName: "Kingambit" })
    })

    it("should report impossible only when every target is out of reach", () => {
      const attacker = withMove("Dragonite", "Dragon Claw", { item: "Life Orb", nature: "Adamant", boosts: { atk: 1 } })
      const immune = new Pokemon("Floette-Mega", { item: "Floettite", nature: "Timid", sps: evsToSps({ hp: 12, spa: 252, spe: 252 }) })

      const result = optimizer.optimize(attacker, [new Target(immune)], field, 1)

      expect(result.status).toBe("impossible")
      expect(result.proposals).toEqual([])
    })
  })

  describe("combined attackers", () => {
    it("should return a pair whose total is minimal and that reaches the KO", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant" })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner } })

      expect(result.status).toBe("success")
      expect(kosTogetherAt(attacker, partner, defender, statFor(result, attacker), spFor(result, attacker), "spa", spFor(result, partner), 1)).toBe(true)
    })

    it("should not reach the KO with any cheaper total", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant" })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner } })
      const total = spFor(result, attacker) + spFor(result, partner)

      const cheaperKos: boolean[] = []

      for (let cheaper = 0; cheaper < total; cheaper++) {
        for (let sp = 0; sp <= cheaper; sp++) {
          cheaperKos.push(kosTogetherAt(attacker, partner, defender, statFor(result, attacker), sp, "spa", cheaper - sp, 1))
        }
      }

      expect(cheaperKos.some(kos => kos)).toBe(false)
    })

    it("should report not-needed when the pair already reaches the KO without investment", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { atk: 0 } })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { spa: 0 } })
      const defender = new Pokemon("Pichu")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner } })

      expect(result.status).toBe("not-needed")
      expect(spFor(result, attacker)).toBe(0)
      expect(spFor(result, partner)).toBe(0)
    })

    it("should propose the best reachable chance for a pair that never guarantees the KO", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const partner = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 3, { secondAttacker: { pokemon: partner } })

      expect(result.status).toBe("best-effort")
      expect(result.status === "best-effort" && result.koChance).toBe(0.33712852001190186)
      expect(result.proposals).toHaveLength(2)
    })

    it("should propose a boosting nature for each attacker of a pair when that is what reaches a knock out chance", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Jolly" })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Timid" })
      const defender = new Pokemon("Garganacl", { sps: { hp: 32, def: 32, spd: 32 } })

      const withoutNature = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner, updateNature: false }, updateNature: false })
      const withNature = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner, updateNature: true }, updateNature: true })

      expect(withoutNature.status).toBe("impossible")
      expect(withNature.status).toBe("best-effort")
      expect(withNature.status === "best-effort" && withNature.koChance).toBe(0.48828125)
      expect(natureFor(withNature, attacker)).toBe("Adamant")
      expect(natureFor(withNature, partner)).toBe("Modest")
      expect(spFor(withNature, attacker)).toBe(32)
      expect(spFor(withNature, partner)).toBe(28)
    })

    it("should report impossible for a pair that cannot reach the KO even at full investment", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const partner = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Blissey", { sps: { hp: 32, atk: 0, def: 32, spa: 0, spd: 32, spe: 0 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner }, updateNature: true })

      expect(result.status).toBe("impossible")
      expect(result.proposals).toEqual([])
    })

    it("should still search every spread when the target of a pair recovers when damaged", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const partner = withMove("Kingambit", "Kowtow Cleave", { nature: "Adamant" })
      const withBerry = new Pokemon("Farigiraf", { item: "Sitrus Berry", sps: { hp: 20, atk: 0, def: 12, spa: 0, spd: 12, spe: 0 } })
      const withoutBerry = new Pokemon("Farigiraf", { sps: { hp: 20, atk: 0, def: 12, spa: 0, spd: 12, spe: 0 } })

      const berryResult = optimizer.optimize(attacker, [new Target(withBerry)], field, 1, { secondAttacker: { pokemon: partner } })
      const bareResult = optimizer.optimize(attacker, [new Target(withoutBerry)], field, 1, { secondAttacker: { pokemon: partner } })

      expect(berryResult.status).toBe("not-needed")
      expect(bareResult.status).toBe("not-needed")
    })

    it("should find the best effort of a pair whose ceiling reaches only part of the knock out", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const partner = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Dondozo", { sps: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 3, { secondAttacker: { pokemon: partner } })

      expect(result.status).toBe("best-effort")
      expect(result.proposals).toHaveLength(2)
    })

    it("should report impossible when the pair cannot reach the KO at all", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const partner = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Blissey", { sps: { hp: 32, spd: 32 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner } })

      expect(result.status).toBe("impossible")
    })
  })

  describe("targets that recover when damaged", () => {
    const farigiraf = (item?: string) => new Pokemon("Farigiraf", { item, sps: { hp: 20, atk: 0, def: 12, spa: 0, spd: 12, spe: 0 } })

    it("should find the cheapest spread that reaches the highest chance even when more investment lowers it", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })

      const result = optimizer.optimize(attacker, [new Target(farigiraf("Sitrus Berry"))], field, 2)

      expect(result.status).toBe("best-effort")
      expect(result.status === "best-effort" && result.koChance).toBe(0.15234375)
      expect(spFor(result, attacker)).toBe(16)
    })

    it("should reach the knock out at full investment when the target holds no berry", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })

      const result = optimizer.optimize(attacker, [new Target(farigiraf())], field, 2)

      expect(result.status).toBe("success")
      expect(spFor(result, attacker)).toBe(29)
    })

    it("should treat a target whose berry is suppressed exactly like a target without one", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const suppressed = new Field({ isUnnerve: true })

      const withBerry = optimizer.optimize(attacker, [new Target(farigiraf("Sitrus Berry"))], suppressed, 2)
      const withoutBerry = optimizer.optimize(attacker, [new Target(farigiraf())], suppressed, 2)

      expect(withBerry.status).toBe("success")
      expect(spFor(withBerry, attacker)).toBe(29)
      expect(spFor(withBerry, attacker)).toBe(spFor(withoutBerry, attacker))
    })

    it("should still find the best effort against a pinch berry that recovers a third of the HP", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant" })
      const defender = new Pokemon("Dondozo", { item: "Figy Berry", sps: { hp: 20, atk: 0, def: 12, spa: 0, spd: 12, spe: 0 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 3)

      expect(result.status).toBe("best-effort")
      expect(result.status === "best-effort" && result.koChance).toBe(0.922607421875)
      expect(spFor(result, attacker)).toBe(5)
    })

    it("should report impossible for a target that recovers and is still out of reach", () => {
      const attacker = withMove("Pichu", "Thunder Shock", { nature: "Modest" })
      const defender = new Pokemon("Blissey", { item: "Sitrus Berry", sps: { hp: 32, atk: 0, def: 32, spa: 0, spd: 32, spe: 0 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1)

      expect(result.status).toBe("impossible")
      expect(result.proposals).toEqual([])
    })
  })

  describe("budget", () => {
    it("should return the existing SPs and not-needed when there are no targets", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { spa: 20 } })

      const result = optimizer.optimize(attacker, [], field, 1)

      expect(result.status).toBe("not-needed")
      expect(spFor(result, attacker)).toBe(20)
    })

    it("should keep the physical stat when there are no targets and the move is physical", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { atk: 14 } })

      const result = optimizer.optimize(attacker, [], field, 1)

      expect(statFor(result, attacker)).toBe("atk")
      expect(spFor(result, attacker)).toBe(14)
    })

    it("should not exceed the remaining budget when the other SPs are kept", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 32, spd: 30, spa: 0 } })
      const defender = new Pokemon("Flutter Mane")

      const kept = optimizer.optimize(attacker, [new Target(defender)], field, 2, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: true })
      const free = optimizer.optimize(attacker, [new Target(defender)], field, 2, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })

      expect(free.status).toBe("success")
      expect(spFor(free, attacker)).toBeGreaterThan(4)
      expect(kept.status).toBe("best-effort")
      expect(spFor(kept, attacker)).toBeLessThanOrEqual(4)
    })

    it("should discard the SPs of the other stats when they are not kept", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 20, def: 10, spa: 0 } })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: false })
      const sps = spsFor(result, attacker)

      expect(result.status).toBe("success")
      expect(sps.hp).toBe(0)
      expect(sps.def).toBe(0)
      expect(sps.spa).toBe(spFor(result, attacker))
    })

    it("should keep the SPs of the other stats when they are kept", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 20, def: 10, spa: 0 } })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: true })
      const sps = spsFor(result, attacker)

      expect(sps.hp).toBe(20)
      expect(sps.def).toBe(10)
    })

    it("should not exceed the total SP budget when the other stats are discarded", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 32, def: 32, spa: 0 } })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: false })
      const sps = spsFor(result, attacker)
      const total = sps.hp + sps.atk + sps.def + sps.spa + sps.spd + sps.spe

      expect(total).toBeLessThanOrEqual(66)
      expect(total).toBe(sps.spa)
    })

    it("should discard the other stats of the partner as well", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { hp: 10, atk: 0 } })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 12, def: 8, spa: 0 } })
      const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: false, secondAttacker: { pokemon: partner } })
      const partnerSps = spsFor(result, partner)

      expect(partnerSps.hp).toBe(0)
      expect(partnerSps.def).toBe(0)
    })

    it("should allow the full stat range when the other SPs are not kept", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 32, spd: 30, spa: 0 } })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { rollIndex: HIGH_ROLL, rightIsDefender: true, keepOtherSps: false })

      expect(result.status).toBe("success")
      expect(kosAt(attacker, defender, statFor(result, attacker), spFor(result, attacker), 2)).toBe(true)
    })
  })

  describe("nature", () => {
    it("should not propose a nature when updating it was not asked", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Timid" })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: false, updateNature: false })

      expect(result.proposals.every(proposal => proposal.nature === null)).toBe(true)
    })

    it("should keep the nature untouched when the attacker already has the boosting one", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Flutter Mane")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: false, updateNature: true })

      expect(result.proposals.every(proposal => proposal.nature === null)).toBe(true)
    })

    it("should reach a KO with the boosting nature that no investment reaches without it", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Timid" })
      const defender = new Pokemon("Rillaboom", { sps: { hp: 16, def: 16, spd: 16 } })

      const withoutNature = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: false, updateNature: false })
      const withNature = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: false, updateNature: true })

      expect(withoutNature.status).toBe("best-effort")
      expect(withNature.status).toBe("success")
      expect(spFor(withNature, attacker)).toBe(16)
      expect(natureFor(withNature, attacker)).toBe("Modest")
    })

    it("should propose the boosting nature for a physical attacker when it helps", () => {
      const attacker = withMove("Dragonite", "Extreme Speed", { nature: "Jolly" })
      const defender = new Pokemon("Indeedee-F")

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 2, { keepOtherSps: false, updateNature: true })

      expect(result.status).toBe("success")
      expect(spFor(result, attacker)).toBe(31)
      expect(natureFor(result, attacker)).toBe("Adamant")
    })

    it("should give the partner the same budget as the attacker when the other SPs are kept", () => {
      const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { hp: 32, def: 30, atk: 0 } })
      const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 32, spd: 30, spa: 0 } })
      const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

      const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: true, secondAttacker: { pokemon: partner, keepOtherSps: true } })

      expect(spFor(result, attacker)).toBe(4)
      expect(spFor(result, partner)).toBe(3)
    })

    describe("options per attacker", () => {
      const bulkyPair = (): [Pokemon, Pokemon, Pokemon] => [withMove("Chi-Yu", "Heat Wave", { nature: "Timid" }), withMove("Chi-Yu", "Heat Wave", { nature: "Timid" }), new Pokemon("Farigiraf", { nature: "Careful", sps: { hp: 8, spd: 8 } })]

      it("should propose a nature only for the attacker that allows changing it", () => {
        const [attacker, partner, defender] = bulkyPair()

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { updateNature: true, secondAttacker: { pokemon: partner, updateNature: false } })

        expect(result.status).toBe("best-effort")
        expect(natureFor(result, attacker)).toBe("Modest")
        expect(natureFor(result, partner)).toBeNull()
      })

      it("should propose a nature only for the partner that allows changing it", () => {
        const [attacker, partner, defender] = bulkyPair()

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { updateNature: false, secondAttacker: { pokemon: partner, updateNature: true } })

        expect(result.status).toBe("best-effort")
        expect(natureFor(result, attacker)).toBeNull()
        expect(natureFor(result, partner)).toBe("Modest")
      })

      it("should reach the KO when both attackers allow changing the nature", () => {
        const [attacker, partner, defender] = bulkyPair()

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { updateNature: true, secondAttacker: { pokemon: partner, updateNature: true } })

        expect(result.status).toBe("success")
        expect(natureFor(result, attacker)).toBe("Modest")
        expect(natureFor(result, partner)).toBe("Modest")
        expect(spFor(result, attacker)).toBe(28)
        expect(spFor(result, partner)).toBe(28)
      })

      it("should leave both natures untouched when the partner carries no options", () => {
        const [attacker, partner, defender] = bulkyPair()

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { secondAttacker: { pokemon: partner } })

        expect(result.status).toBe("best-effort")
        expect(natureFor(result, attacker)).toBeNull()
        expect(natureFor(result, partner)).toBeNull()
        expect(spFor(result, attacker)).toBe(31)
        expect(spFor(result, partner)).toBe(31)
      })

      it("should keep the other SPs only for the attacker that asks to keep them", () => {
        const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { hp: 8, spe: 8 } })
        const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 8, spe: 8 } })
        const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: true, secondAttacker: { pokemon: partner, keepOtherSps: false } })

        expect(spsFor(result, attacker)).toEqual({ hp: 8, atk: 18, def: 0, spa: 0, spd: 0, spe: 8 })
        expect(spsFor(result, partner)).toEqual({ hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 })
      })

      it("should keep the other SPs only for the partner that asks to keep them", () => {
        const attacker = withMove("Sneasler", "Close Combat", { nature: "Adamant", sps: { hp: 8, spe: 8 } })
        const partner = withMove("Chi-Yu", "Heat Wave", { nature: "Modest", sps: { hp: 8, spe: 8 } })
        const defender = new Pokemon("Farigiraf", { sps: { hp: 20, def: 12, spd: 12 } })

        const result = optimizer.optimize(attacker, [new Target(defender)], field, 1, { keepOtherSps: false, secondAttacker: { pokemon: partner, keepOtherSps: true } })

        expect(spsFor(result, attacker)).toEqual({ hp: 0, atk: 18, def: 0, spa: 0, spd: 0, spe: 0 })
        expect(spsFor(result, partner)).toEqual({ hp: 8, atk: 0, def: 0, spa: 3, spd: 0, spe: 8 })
      })
    })
  })

  describe("roll level", () => {
    it("should need no more investment at a lower roll than at the high roll", () => {
      const attacker = withMove("Chi-Yu", "Heat Wave", { nature: "Modest" })
      const defender = new Pokemon("Flutter Mane")

      const atHighRoll = optimizer.optimize(attacker, [new Target(defender)], field, 2, { rollIndex: HIGH_ROLL })
      const atLowRoll = optimizer.optimize(attacker, [new Target(defender)], field, 2, { rollIndex: 0 })

      expect(atHighRoll.status).toBe("success")
      expect(atLowRoll.status).toBe("success")
      expect(spFor(atLowRoll, attacker)).toBeLessThanOrEqual(spFor(atHighRoll, attacker))
    })
  })
})
