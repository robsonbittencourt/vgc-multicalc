import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveSpOptimizer } from "@multicalc/sp-optimizer/defensive-sp-optimizer"
import { OffensiveSpOptimizer } from "@multicalc/sp-optimizer/offensive-sp-optimizer"

const HIGH_ROLL = 15

function attackerWith(name: string, nature: string, move: string, sps: { atk?: number; spa?: number }): Pokemon {
  return new Pokemon(name, { nature, moveSet: new MoveSet(new Move(move), new Move(""), new Move(""), new Move("")), sps })
}

const amoonguss = () => new Pokemon("Amoonguss", { nature: "Bold", item: "Rocky Helmet" })
const chienPao = () => attackerWith("Chien-Pao", "Jolly", "Icicle Crash", { atk: 32 })
const chiYu = () => attackerWith("Chi-Yu", "Modest", "Heat Wave", { spa: 32 })

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

const sps = (hp: number, def: number, spd: number, atk = 0) => ({ hp, atk, def, spa: 0, spd, spe: 0 })

describe("SP optimizers with an accepted success chance", () => {
  describe("DefensiveSpOptimizer", () => {
    const optimizer = new DefensiveSpOptimizer()

    describe("against one physical and one special attacker", () => {
      const optimize = (successChance: number) => optimizer.optimize(amoonguss(), [new Target(chienPao()), new Target(chiYu())], new Field(), false, false, 2, HIGH_ROLL, true, successChance)

      it("should protect only the physical attacker when the survival must be guaranteed", () => {
        const result = optimize(1)

        expect(result.sps).toEqual(sps(10, 30, 0))
        expect(result.coverage).toEqual({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Chi-Yu", bestTargetKoChance: 1 })
      })

      it.each([
        { successChance: 0.9, spread: sps(24, 20, 21), chienPao: 0.9375, chiYu: 0.9375 },
        { successChance: 0.85, spread: sps(30, 16, 16), chienPao: 0.875, chiYu: 0.875 },
        { successChance: 0.8, spread: sps(30, 15, 13), chienPao: 0.8125, chiYu: 0.8125 },
        { successChance: 0.75, spread: sps(30, 13, 13), chienPao: 0.75, chiYu: 0.8125 },
        { successChance: 0.5, spread: sps(18, 15, 13), chienPao: 0.5, chiYu: 0.5 }
      ])("should protect both attackers when $successChance survival is accepted", ({ successChance, spread, chienPao, chiYu }) => {
        const result = optimize(successChance)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual(spread)
        expect(result.coverage.successChances).toEqual([
          { name: "Chien-Pao", chance: chienPao },
          { name: "Chi-Yu", chance: chiYu }
        ])
      })
    })

    describe("against attackers that end with different chances", () => {
      const weakerChienPao = () => attackerWith("Chien-Pao", "Adamant", "Icicle Crash", { atk: 24 })
      const weakerChiYu = () => attackerWith("Chi-Yu", "Modest", "Heat Wave", { spa: 16 })
      const optimize = (successChance: number) => optimizer.optimize(amoonguss(), [new Target(weakerChienPao()), new Target(weakerChiYu())], new Field(), false, false, 2, HIGH_ROLL, true, successChance)

      it("should not report chances when the survival is guaranteed", () => {
        const result = optimize(1)

        expect(result.sps).toEqual(sps(30, 24, 9))
        expect(result.coverage.successChances).toBeUndefined()
      })

      it.each([
        { successChance: 0.8, spread: sps(30, 20, 4), chienPao: 0.875, chiYu: 0.8125 },
        { successChance: 0.75, spread: sps(28, 20, 4), chienPao: 0.8125, chiYu: 0.75 },
        { successChance: 0.5, spread: sps(18, 20, 4), chienPao: 0.5625, chiYu: 0.5 }
      ])("should report each attacker with its own chance when $successChance survival is accepted", ({ successChance, spread, chienPao, chiYu }) => {
        const result = optimize(successChance)

        expect(result.sps).toEqual(spread)
        expect(result.coverage.successChances).toEqual([
          { name: "Chien-Pao", chance: chienPao },
          { name: "Chi-Yu", chance: chiYu }
        ])
      })
    })

    describe("keeping the offensive SPs", () => {
      const defender = () => new Pokemon("Amoonguss", { nature: "Bold", item: "Rocky Helmet", sps: { hp: 10, atk: 6, spe: 0 } })
      const optimize = (successChance: number) => optimizer.optimize(defender(), [new Target(chienPao()), new Target(chiYu())], new Field(), false, true, 2, HIGH_ROLL, true, successChance)

      it("should protect a single attacker when both no longer fit in the remaining budget", () => {
        const result = optimize(0.9)

        expect(result.sps).toEqual(sps(10, 0, 29, 6))
        expect(result.coverage.successChances).toEqual([{ name: "Chi-Yu", chance: 0.9375 }])
      })

      it("should protect both attackers when the accepted risk makes them fit in the remaining budget", () => {
        const result = optimize(0.8)

        expect(result.sps).toEqual(sps(30, 15, 13, 6))
        expect(result.coverage.covered).toBe(2)
      })
    })

    describe("changing the nature", () => {
      it("should change the nature and protect both attackers when 90% survival is accepted", () => {
        const defender = new Pokemon("Amoonguss", { nature: "Sassy", item: "Rocky Helmet" })

        const result = optimizer.optimize(defender, [new Target(chienPao()), new Target(chiYu())], new Field(), true, false, 2, HIGH_ROLL, true, 0.9)

        expect(result.nature).toBe("Bold")
        expect(result.sps).toEqual(sps(24, 20, 21))
        expect(result.coverage.covered).toBe(2)
      })
    })

    describe("with a healing berry scanned linearly", () => {
      const optimize = (successChance: number) => {
        const ironHands = new Pokemon("Iron Hands", { nature: "Adamant", item: "Sitrus Berry" })
        const landorus = attackerWith("Landorus", "Adamant", "Stomping Tantrum", { atk: 32 })

        return optimizer.optimize(ironHands, [new Target(landorus)], new Field(), false, false, 3, HIGH_ROLL, true, successChance)
      }

      it.each([
        { successChance: 1, spread: sps(6, 6, 0), successChances: undefined },
        { successChance: 0.9, spread: sps(3, 3, 0), successChances: [{ name: "Landorus", chance: 0.90234375 }] },
        { successChance: 0.85, spread: sps(1, 3, 0), successChances: [{ name: "Landorus", chance: 0.87109375 }] },
        { successChance: 0.8, spread: sps(0, 3, 0), successChances: [{ name: "Landorus", chance: 0.83984375 }] },
        { successChance: 0.75, spread: sps(0, 1, 0), successChances: [{ name: "Landorus", chance: 0.75 }] }
      ])("should spend fewer SPs on a 2HKO when $successChance survival is accepted", ({ successChance, spread, successChances }) => {
        const result = optimize(successChance)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual(spread)
        expect(result.coverage.successChances).toEqual(successChances)
      })

      it("should need no investment when 50% survival is accepted", () => {
        const result = optimize(0.5)

        expect(result.status).toBe("not-needed")
        expect(result.coverage.successChances).toEqual([{ name: "Landorus", chance: 0.546875 }])
      })
    })

    describe("when the defender already takes an accepted risk", () => {
      const optimize = (successChance: number) => {
        const umbreon = new Pokemon("Umbreon", { nature: "Bold", item: "Sitrus Berry" })
        const urshifu = attackerWith("Urshifu-Rapid-Strike", "Adamant", "Surging Strikes", { atk: 32 })
        const rotom = attackerWith("Rotom-Heat", "Modest", "Overheat", { spa: 32 })

        return optimizer.optimize(umbreon, [new Target(urshifu), new Target(rotom)], new Field(), false, false, 3, HIGH_ROLL, true, successChance)
      }

      it("should invest when the survival must be guaranteed", () => {
        const result = optimize(1)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual(sps(10, 0, 14))
      })

      it("should need no investment and report how often each attacker is survived when 90% is accepted", () => {
        const result = optimize(0.9)

        expect(result.status).toBe("not-needed")
        expect(result.coverage.successChances).toEqual([
          { name: "Urshifu-Rapid-Strike", chance: 0.9651525616645813 },
          { name: "Rotom-Heat", chance: 0.9453125 }
        ])
      })
    })

    describe("against a combined attack", () => {
      const optimize = (successChance: number) => optimizer.optimize(grimmsnarl(), [new Target(charizard(), garchomp())], new Field({ weather: "Sun" }), false, false, 2, HIGH_ROLL, true, successChance)

      it.each([{ successChance: 1 }, { successChance: 0.5 }])("should stay a best effort at $successChance when the pair knocks out more often than accepted", ({ successChance }) => {
        const result = optimize(successChance)

        expect(result).toEqual({
          sps: sps(30, 10, 26),
          nature: null,
          status: "best-effort",
          koChance: 0.875,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Charizard-Mega-Y + Garchomp", bestTargetKoChance: 0.875 }
        })
      })

      it("should survive the pair when a 10% survival is accepted", () => {
        const result = optimize(0.1)

        expect(result.status).toBe("success")
        expect(result.coverage.successChances).toEqual([{ name: "Charizard-Mega-Y + Garchomp", chance: 0.125 }])
      })

      it("should report only the single attacker it covers next to a pair out of reach", () => {
        const kingambit = attackerWith("Kingambit", "Adamant", "Kowtow Cleave", { atk: 32 })

        const result = optimizer.optimize(grimmsnarl(), [new Target(charizard(), garchomp()), new Target(kingambit)], new Field({ weather: "Sun" }), false, false, 2, HIGH_ROLL, true, 0.9)

        expect(result.status).toBe("not-needed")
        expect(result.coverage).toEqual({
          covered: 1,
          total: 2,
          outOfReach: 1,
          bestTargetName: "Charizard-Mega-Y + Garchomp",
          bestTargetKoChance: 1,
          successChances: [{ name: "Kingambit", chance: 1 }]
        })
      })
    })

    it("should stay impossible when the attack cannot be survived at any accepted risk", () => {
      const flutterMane = new Pokemon("Flutter Mane")
      const rayquaza = new Pokemon("Rayquaza", { nature: "Adamant", teraType: "Flying", teraTypeActive: true, moveSet: new MoveSet(new Move("Dragon Ascent"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

      const result = optimizer.optimize(flutterMane, [new Target(rayquaza)], new Field(), false, false, 2, HIGH_ROLL, true, 0.5)

      expect(result).toEqual({ sps: sps(0, 0, 0), nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Rayquaza", bestTargetKoChance: 1 } })
    })
  })

  describe("OffensiveSpOptimizer", () => {
    const optimizer = new OffensiveSpOptimizer()
    const rillaboom = () => new Pokemon("Rillaboom", { nature: "Adamant", sps: { hp: 32 } })
    const unboostedChienPao = (move = "Icicle Crash") => attackerWith("Chien-Pao", "Jolly", move, { atk: 0 })

    describe("against a single target", () => {
      it.each([{ successChance: 1 }, { successChance: 0.9 }, { successChance: 0.85 }])("should stay a best effort at $successChance when the KO lands at most 81.3% of the time", ({ successChance }) => {
        const result = optimizer.optimize(unboostedChienPao(), [new Target(rillaboom())], new Field(), 1, { rollIndex: HIGH_ROLL, successChance })

        expect(result.status).toBe("best-effort")
        expect(result.proposals[0].sps.atk).toBe(32)
        expect(result.coverage.successChances).toBeUndefined()
      })

      it.each([
        { successChance: 0.8, atk: 32, chance: 0.8125 },
        { successChance: 0.75, atk: 29, chance: 0.75 },
        { successChance: 0.5, atk: 23, chance: 0.5 }
      ])("should reach the KO with $atk Atk SPs when $successChance is accepted", ({ successChance, atk, chance }) => {
        const result = optimizer.optimize(unboostedChienPao(), [new Target(rillaboom())], new Field(), 1, { rollIndex: HIGH_ROLL, successChance })

        expect(result.status).toBe("success")
        expect(result.proposals[0].sps.atk).toBe(atk)
        expect(result.coverage).toEqual({ covered: 1, total: 1, outOfReach: 0, bestTargetName: null, successChances: [{ name: "Rillaboom", chance }] })
      })
    })

    describe("against several targets", () => {
      const targets = () => [new Target(rillaboom()), new Target(new Pokemon("Garchomp", { nature: "Jolly" }))]

      it("should report the target already knocked out for sure while the other stays out of reach", () => {
        const result = optimizer.optimize(unboostedChienPao(), targets(), new Field(), 1, { rollIndex: HIGH_ROLL, successChance: 0.9 })

        expect(result.status).toBe("best-effort")
        expect(result.coverage.successChances).toEqual([{ name: "Garchomp", chance: 1 }])
      })

      it("should knock out both targets and report each chance when 80% is accepted", () => {
        const result = optimizer.optimize(unboostedChienPao(), targets(), new Field(), 1, { rollIndex: HIGH_ROLL, successChance: 0.8 })

        expect(result.status).toBe("success")
        expect(result.coverage.successChances).toEqual([
          { name: "Rillaboom", chance: 0.8125 },
          { name: "Garchomp", chance: 1 }
        ])
      })

      it("should report the covered target of a partial best effort", () => {
        const bulkyAmoonguss = new Pokemon("Amoonguss", { nature: "Bold", sps: { hp: 32, def: 20 } })

        const result = optimizer.optimize(unboostedChienPao(), [new Target(rillaboom()), new Target(bulkyAmoonguss)], new Field(), 1, { rollIndex: HIGH_ROLL, successChance: 0.8 })

        expect(result.status).toBe("best-effort")
        expect(result.coverage).toEqual({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Amoonguss", successChances: [{ name: "Rillaboom", chance: 0.8125 }] })
      })
    })

    describe("against a target next to an immune one", () => {
      const targets = () => [new Target(new Pokemon("Gengar")), new Target(new Pokemon("Kingambit", { nature: "Adamant", sps: { hp: 32 } }))]

      it.each([
        { successChance: 1, atk: 20, successChances: undefined },
        { successChance: 0.9, atk: 17, successChances: [{ name: "Kingambit", chance: 0.9375 }] },
        { successChance: 0.5, atk: 4, successChances: [{ name: "Kingambit", chance: 0.5 }] }
      ])("should spend $atk Atk SPs on the reachable target when $successChance is accepted", ({ successChance, atk, successChances }) => {
        const result = optimizer.optimize(unboostedChienPao("Sacred Sword"), targets(), new Field(), 1, { rollIndex: HIGH_ROLL, successChance })

        expect(result.status).toBe("best-effort")
        expect(result.proposals[0].sps.atk).toBe(atk)
        expect(result.coverage.successChances).toEqual(successChances)
      })
    })

    describe("with a combined attack", () => {
      const optimize = (successChance: number) => {
        const attacker = charizard().clone({ sps: { spa: 0 } })
        const partner = garchomp().clone({ sps: { atk: 0 } })

        return optimizer.optimize(attacker, [new Target(grimmsnarl())], new Field({ weather: "Sun" }), 1, { rollIndex: HIGH_ROLL, successChance, secondAttacker: { pokemon: partner } })
      }

      it.each([{ successChance: 1 }, { successChance: 0.9 }])("should stay a best effort at $successChance when the pair knocks out at most 87.5% of the time", ({ successChance }) => {
        const result = optimize(successChance)

        expect(result.status).toBe("best-effort")
        expect(result.proposals.map(proposal => proposal.sps.spa + proposal.sps.atk)).toEqual([27, 30])
      })

      it.each([
        { successChance: 0.85, spa: 27, atk: 30, chance: 0.875 },
        { successChance: 0.8, spa: 24, atk: 30, chance: 0.8359375 },
        { successChance: 0.75, spa: 24, atk: 28, chance: 0.79296875 },
        { successChance: 0.5, spa: 27, atk: 14, chance: 0.54296875 }
      ])("should split $spa SpA and $atk Atk SPs between the pair when $successChance is accepted", ({ successChance, spa, atk, chance }) => {
        const result = optimize(successChance)

        expect(result.status).toBe("success")
        expect(result.proposals.map(proposal => proposal.sps.spa + proposal.sps.atk)).toEqual([spa, atk])
        expect(result.coverage.successChances).toEqual([{ name: "Grimmsnarl", chance }])
      })
    })
  })
})
