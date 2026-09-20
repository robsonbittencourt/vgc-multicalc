import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveSpOptimizer } from "@multicalc/sp-optimizer/defensive-sp-optimizer"

describe("DefensiveSpOptimizer — target coverage", () => {
  let service: DefensiveSpOptimizer

  beforeEach(() => {
    service = new DefensiveSpOptimizer()
  })

  it("reports an empty coverage when there are no targets", () => {
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 13, def: 3 } })

    const result = service.optimize(defender, [], new Field())

    expect(result.coverage).toEqual({ covered: 0, total: 0, outOfReach: 0, bestTargetName: null })
  })

  it("reports full coverage with no pending target when every attacker is survived", () => {
    const defender = new Pokemon("Blissey")
    const pichu = new Pokemon("Pichu", { nature: "Modest", moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
    const magikarp = new Pokemon("Magikarp", { nature: "Adamant", moveSet: new MoveSet(new Move("Tackle"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })

    const result = service.optimize(defender, [new Target(pichu), new Target(magikarp)], new Field())

    expect(result.status).toEqual("not-needed")
    expect(result.coverage).toEqual({ covered: 2, total: 2, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 })
  })

  it("names the attacker left out when a lost cause is dropped from the plan", () => {
    const defender = new Pokemon("Blissey", { nature: "Calm" })
    const pichu = new Pokemon("Pichu", { nature: "Modest", moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
    const koraidon = new Pokemon("Koraidon", { nature: "Adamant", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

    const result = service.optimize(defender, [new Target(pichu), new Target(koraidon)], new Field())

    expect(result.coverage.total).toEqual(2)
    expect(result.coverage.covered).toEqual(1)
    expect(result.coverage.outOfReach).toEqual(1)
    expect(result.coverage.bestTargetName).toEqual("Koraidon")
  })

  it("names a pair with both attackers when the pair is the pending threat", () => {
    const defender = new Pokemon("Blissey", { nature: "Calm" })
    const koraidon = new Pokemon("Koraidon", { nature: "Adamant", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
    const miraidon = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

    const result = service.optimize(defender, [new Target(koraidon, miraidon)], new Field())

    expect(result.coverage.total).toEqual(1)
    expect(result.coverage.bestTargetName).toEqual("Koraidon + Miraidon")
  })

  it("reports impossible with no investment when the attack cannot be survived at any spread", () => {
    const defender = new Pokemon("Flutter Mane")
    const rayquaza = new Pokemon("Rayquaza", { nature: "Adamant", teraType: "Flying", teraTypeActive: true, moveSet: new MoveSet(new Move("Dragon Ascent"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

    const result = service.optimize(defender, [new Target(rayquaza)], new Field())

    expect(result.status).toEqual("impossible")
    expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(result.coverage).toEqual({ covered: 0, total: 1, outOfReach: 1, bestTargetName: "Rayquaza", bestTargetKoChance: 1 })
  })

  it("keeps the reserved offensive SPs when the threat is impossible", () => {
    const defender = new Pokemon("Flutter Mane", { sps: { atk: 32, spa: 32, spe: 32 } })
    const rayquaza = new Pokemon("Rayquaza", { nature: "Adamant", teraType: "Flying", teraTypeActive: true, moveSet: new MoveSet(new Move("Dragon Ascent"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

    const result = service.optimize(defender, [new Target(rayquaza)], new Field(), false, true)

    expect(result.status).toEqual("impossible")
    expect(result.sps).toEqual({ hp: 0, atk: 32, def: 0, spa: 32, spd: 0, spe: 32 })
  })

  it("stays a best effort rather than impossible when a spread lowers the KO chance below one", () => {
    const defender = new Pokemon("Snorlax")
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
    const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

    const result = service.optimize(defender, [new Target(garchomp, chiYu)], new Field({ weather: "Sand" }))

    expect(result.status).toEqual("best-effort")

    if (result.status !== "best-effort") return

    expect(result.koChance).toBeGreaterThan(0)
    expect(result.koChance).toBeLessThan(1)
  })

  it("measures the coverage against the nature the best effort picked", () => {
    const defender = new Pokemon("Blissey")
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
    const kartana = new Pokemon("Kartana", { nature: "Adamant", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

    const result = service.optimize(defender, [new Target(garchomp, kartana)], new Field(), true)

    expect(result.status).toEqual("best-effort")
    expect(result.nature).toEqual("Calm")
    expect(result.sps).toEqual({ hp: 32, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
    expect(result.coverage).toEqual({ covered: 0, total: 1, outOfReach: 1, bestTargetName: "Garchomp + Kartana", bestTargetKoChance: 0.82421875 })
  })

  it("reports the KO chance of the very attacker it names as the worst one", () => {
    const defender = new Pokemon("Snorlax")
    const koraidon = new Pokemon("Koraidon", { nature: "Adamant", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
    const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

    const result = service.optimize(defender, [new Target(koraidon), new Target(chiYu)], new Field(), true, false, 3)

    expect(result.status).toEqual("best-effort")

    if (result.status !== "best-effort") return

    expect(result.coverage.bestTargetName).toEqual("Koraidon")
    expect(result.koChance).toEqual(result.coverage.bestTargetKoChance)
  })

  it("finds the nature that lets every attacker be survived", () => {
    const defender = new Pokemon("Ribombee")
    const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32, spe: 32 } })
    const koraidon = new Pokemon("Koraidon", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32, spe: 32 } })
    const chienPao = new Pokemon("Chien-Pao", { nature: "Jolly", item: "Focus Sash", moveSet: new MoveSet(new Move("Icicle Crash"), new Move(""), new Move(""), new Move("")), sps: { atk: 32, spe: 32 } })

    const result = service.optimize(defender, [new Target(miraidon), new Target(koraidon), new Target(chienPao)], new Field(), true)

    expect(result.status).toEqual("success")
    expect(result.nature).toEqual("Calm")
    expect(result.coverage.covered).toEqual(3)
    expect(result.coverage.outOfReach).toEqual(0)
  })

  it("counts the targets that carry no attack at all", () => {
    const defender = new Pokemon("Blissey")
    const amoonguss = new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Spore"), new Move(""), new Move(""), new Move("")) })
    const grimmsnarl = new Pokemon("Grimmsnarl", { moveSet: new MoveSet(new Move("Light Screen"), new Move(""), new Move(""), new Move("")) })

    const result = service.optimize(defender, [new Target(amoonguss), new Target(grimmsnarl)], new Field())

    expect(result.status).toEqual("not-needed")
    expect(result.coverage).toEqual({ covered: 2, total: 2, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 })
  })
})
