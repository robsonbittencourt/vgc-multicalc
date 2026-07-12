import { calculateMultiDamage } from "@calc/engine/multi-target"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

describe("Multi Target Damage - Stamina", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const garchomp = () => new Pokemon("Garchomp", { nature: "Adamant", evs: { atk: 252, spe: 252 } })
  const arcanine = () => new Pokemon("Arcanine", { nature: "Adamant", evs: { atk: 252, spe: 252 } })
  const move1 = () => new Move("Earthquake")
  const move2 = () => new Move("Rock Slide")

  it("should raise Def by 1 after the first attacker hits a Stamina defender", () => {
    const archaludon = new Pokemon("Archaludon", { ability: "Stamina" })

    const result = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), archaludon, field())

    expect(result.results[0].damage).toEqual([114, 114, 116, 116, 120, 120, 120, 122, 122, 126, 126, 128, 128, 132, 132, 134])
    expect(result.results[1].damage).toEqual([13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15])
    expect(result.description()).toEqual("252+ Atk Garchomp Earthquake AND 252+ Atk Arcanine Rock Slide vs. 0 HP / 0 Def Archaludon (Stamina considered): 127-149 (76.9 - 90.3%) -- guaranteed 2HKO")
  })

  it("should not add the Stamina note when the defender does not have Stamina", () => {
    const archaludon = new Pokemon("Archaludon", { ability: "Sturdy" })

    const result = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), archaludon, field())

    expect(result.description()).not.toContain("Stamina considered")
  })

  it("should not raise Def beyond +6", () => {
    const archaludon = new Pokemon("Archaludon", { ability: "Stamina", boosts: { def: 6 } })

    const result = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), archaludon, field())

    expect(result.results[0].damage).toEqual([30, 30, 30, 30, 30, 30, 30, 32, 32, 32, 32, 32, 32, 32, 32, 36])
    expect(result.results[1].damage).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4])
  })

  it("should make a bulky Stamina defender survive longer than the same bulk without Stamina", () => {
    const bulkyEvs = { hp: 252, def: 252, spd: 4 }
    const stamina = new Pokemon("Archaludon", { ability: "Stamina", evs: bulkyEvs })
    const sturdy = new Pokemon("Archaludon", { ability: "Sturdy", evs: bulkyEvs })

    const withStamina = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), stamina, field())
    const withoutStamina = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), sturdy, field())

    expect(withStamina.getHKO()).toEqual("70.8% chance to 3HKO")
    expect(withoutStamina.getHKO()).toEqual("guaranteed 2HKO")
  })

  it("should decrease cumulative damage per turn as the boost rises", () => {
    const bulkyEvs = { hp: 252, def: 252, spd: 4 }
    const stamina = new Pokemon("Archaludon", { ability: "Stamina", evs: bulkyEvs })

    const result = calculateMultiDamage(garchomp(), arcanine(), move1(), move2(), stamina, field())

    const cumulative = [1, 2, 3, 4].map(turn => result.damageWithRemainingUntilTurn(turn, 15))

    expect(cumulative).toEqual([118, 179, 197, 197])
  })
})

describe("Multi Target Damage - Multi-hit move", () => {
  it("should sum every hit of a multi-hit move when computing the max damage for the following turn", () => {
    const field = new Field({ gameType: "Doubles" })
    const cloyster = new Pokemon("Cloyster", { nature: "Adamant", evs: { atk: 252 } })
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", evs: { atk: 252 } })
    const archaludon = new Pokemon("Archaludon", { ability: "Stamina" })

    const result = calculateMultiDamage(cloyster, garchomp, new Move("Icicle Spear", { hits: 2 }), new Move("Rock Slide"), archaludon, field)

    expect(result.results[0].damage).toEqual([
      [16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 19],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13]
    ])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(41)
  })
})

describe("Multi Target Damage - Immunity", () => {
  it("should return the fallback description without throwing when both attackers are immune to the defender", () => {
    const field = new Field({ gameType: "Doubles" })
    const garchomp = new Pokemon("Garchomp", { nature: "Adamant", evs: { atk: 252 } })
    const landorus = new Pokemon("Landorus-Therian", { nature: "Adamant", evs: { atk: 252 } })
    const tornadus = new Pokemon("Tornadus")

    const result = calculateMultiDamage(garchomp, landorus, new Move("Earthquake"), new Move("Earthquake"), tornadus, field)

    expect(result.results[0].damage).toEqual(0)
    expect(result.results[1].damage).toEqual(0)
    expect(result.description()).toEqual("Garchomp Earthquake AND Landorus-Therian Earthquake vs. Tornadus: 0-0 (0 - 0%) -- possibly the worst move ever")
  })
})
