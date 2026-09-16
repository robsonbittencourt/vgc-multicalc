import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Ability } from "@multicalc/model/ability"
import { respondsToDamage } from "@multicalc/sp-optimizer/internal/damage-response"

describe("respondsToDamage", () => {
  let field: Field
  let attacker: Pokemon

  beforeEach(() => {
    field = new Field()
    attacker = new Pokemon("Chi-Yu")
  })

  const defenderHolding = (item: string): Pokemon => new Pokemon("Farigiraf", { item })

  it("should report every berry that recovers HP as responsive to damage", () => {
    const healingBerries = ["Sitrus Berry", "Oran Berry", "Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry", "Enigma Berry"]

    const responsive = healingBerries.filter(berry => respondsToDamage(defenderHolding(berry), attacker, field))

    expect(responsive).toEqual(healingBerries)
  })

  it("should not report a berry that only resists a type as responsive to damage", () => {
    expect(respondsToDamage(defenderHolding("Chople Berry"), attacker, field)).toBe(false)
  })

  it("should not report an item that recovers every turn as responsive to damage", () => {
    expect(respondsToDamage(defenderHolding("Leftovers"), attacker, field)).toBe(false)
  })

  it("should not report a defender without an item as responsive to damage", () => {
    expect(respondsToDamage(new Pokemon("Farigiraf"), attacker, field)).toBe(false)
  })

  it("should ignore the berry when the field suppresses it", () => {
    const suppressed = new Field({ isUnnerve: true })

    expect(respondsToDamage(defenderHolding("Sitrus Berry"), attacker, suppressed)).toBe(false)
  })

  it("should ignore the berry when the attacker suppresses it", () => {
    const unnerving = new Pokemon("Chi-Yu", { ability: new Ability("Unnerve") })

    expect(respondsToDamage(defenderHolding("Sitrus Berry"), unnerving, field)).toBe(false)
  })

  it("should ignore the berry for each ability that suppresses berries", () => {
    const suppressors = ["Unnerve", "As One (Glastrier)", "As One (Spectrier)"]

    const blocked = suppressors.filter(name => !respondsToDamage(defenderHolding("Sitrus Berry"), new Pokemon("Calyrex-Shadow", { ability: new Ability(name) }), field))

    expect(blocked).toEqual(suppressors)
  })
})
