import { calculate, Field, Move, Pokemon } from "@calc"

describe("Parental Bond — child hit and berry consumption", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("should consume a resist berry on a super-effective first hit and not reduce the child hit again", () => {
    const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
    const defender = new Pokemon("Ferrothorn", { item: "Occa Berry" })
    const move = new Move("Fire Punch")

    const result = calculate(attacker, defender, move, field())
    const [firstHitDamage, childHitDamage] = result.damage as [number[], number[]]

    expect(result.description()).toEqual("252+ Atk Parental Bond Kangaskhan-Mega Fire Punch vs. 0 HP / 0 Def Ferrothorn: 110-132 (73.8 - 88.5%) reduced by Occa Berry -- guaranteed 2HKO")
    expect(firstHitDamage).toEqual([74, 74, 76, 76, 78, 78, 80, 80, 80, 82, 82, 84, 84, 86, 86, 88])
    expect(childHitDamage).toEqual([36, 36, 36, 36, 36, 36, 40, 40, 40, 40, 40, 40, 40, 40, 40, 44])
  })

  it("should consume a resist berry on a Normal-type move even when the hit is not super-effective", () => {
    const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
    const defender = new Pokemon("Ferrothorn", { item: "Chilan Berry" })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Parental Bond Kangaskhan-Mega Facade vs. 0 HP / 0 Def Ferrothorn: 18-22 (12 - 14.7%) reduced by Chilan Berry -- possible 7HKO")
  })

  it("should not consume the resist berry on either hit when an ally on the field has Unnerve (e.g. Aerodactyl alongside Kangaskhan-Mega)", () => {
    const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
    const defender = new Pokemon("Ferrothorn", { item: "Occa Berry" })
    const move = new Move("Fire Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isUnnerve: true }))
    const [firstHitDamage, childHitDamage] = result.damage as [number[], number[]]

    expect(result.description()).toEqual("252+ Atk Parental Bond Kangaskhan-Mega Fire Punch vs. 0 HP / 0 Def Ferrothorn: 184-220 (123.4 - 147.6%) -- guaranteed OHKO")
    expect(firstHitDamage).toEqual([148, 148, 152, 152, 156, 156, 160, 160, 160, 164, 164, 168, 168, 172, 172, 176])
    expect(childHitDamage.every(dmg => dmg > 0)).toBe(true)
  })

  it("should not consume the berry when the defender's item does not resist the move's type", () => {
    const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
    const defender = new Pokemon("Ferrothorn", { item: "Occa Berry" })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).not.toContain("reduced by")
  })
})
