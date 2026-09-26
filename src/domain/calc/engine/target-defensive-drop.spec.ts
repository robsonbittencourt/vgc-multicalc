import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Target defensive drop — the drop lands on later hits, never on the hit that causes it", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = (spd = 0) => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", boosts: { spd } })

  it("does not apply Acid Spray's own drop to the hit that lands it", () => {
    const withoutDrop = calculate(sylveon(), dondozo(), new Move("Acid Spray"), field())

    expect(withoutDrop.range()[1]).toEqual(26)
  })

  it("lowers the target's Sp. Def by 2 for the combined partner and keeps dropping into the next turn", () => {
    const result = calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo(), field())

    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(76)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(251)
  })

  it("matches the damage of a target whose Sp. Def drop was declared up front", () => {
    const declared = [0, -2, -4, -6].map(spd => calculate(sylveon(), dondozo(spd), new Move("Acid Spray"), field()).range()[1])

    expect(declared).toEqual([26, 50, 76, 99])
    expect(declared[0] + declared[1]).toEqual(76)
    expect(declared[0] + declared[1] + declared[2] + declared[3]).toEqual(251)
  })
})

describe("Target defensive drop — Lumina Crash", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const ralts = () => new Pokemon("Ralts", { sps: { spa: 0 }, nature: "Modest" })
  const blissey = (spd = 0) => new Pokemon("Blissey", { sps: { hp: 32, spd: 32 }, nature: "Careful", boosts: { spd } })

  it("drops Sp. Def by 2 per hit across the turn boundary", () => {
    const declared = [0, -2, -4, -6].map(spd => calculate(ralts(), blissey(spd), new Move("Lumina Crash"), field()).range()[1])
    const result = calculateMulti(ralts(), ralts(), new Move("Lumina Crash"), new Move("Lumina Crash"), blissey(), field())

    expect(declared).toEqual([21, 39, 57, 76])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(60)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(193)
  })
})

describe("Target defensive drop — Fire Lash", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const rillaboom = () => new Pokemon("Rillaboom", { nature: "Adamant", sps: { atk: 32 } })
  const dondozo = (def = 0) => new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", boosts: { def } })

  it("drops Defense by 1 per hit across the turn boundary", () => {
    const declared = [0, -1, -2, -3].map(def => calculate(rillaboom(), dondozo(def), new Move("Fire Lash"), field()).range()[1])
    const result = calculateMulti(rillaboom(), rillaboom(), new Move("Fire Lash"), new Move("Fire Lash"), dondozo(), field())

    expect(declared).toEqual([21, 32, 43, 53])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(53)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(149)
  })
})

describe("Target defensive drop — Grav Apple", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const ralts = () => new Pokemon("Ralts", { sps: { atk: 0 } })
  const dondozo = (def = 0) => new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", boosts: { def } })

  it("drops Defense by 1 per hit across the turn boundary", () => {
    const declared = [0, -1, -2, -3].map(def => calculate(ralts(), dondozo(def), new Move("Grav Apple"), field()).range()[1])
    const result = calculateMulti(ralts(), ralts(), new Move("Grav Apple"), new Move("Grav Apple"), dondozo(), field())

    expect(declared).toEqual([22, 32, 42, 52])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(54)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(148)
  })
})

describe("Target defensive drop — Thunderous Kick", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const ralts = () => new Pokemon("Ralts", { sps: { atk: 0 } })
  const dondozo = (def = 0) => new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", boosts: { def } })

  it("drops Defense by 1 per hit across the turn boundary", () => {
    const declared = [0, -1, -2, -3].map(def => calculate(ralts(), dondozo(def), new Move("Thunderous Kick"), field()).range()[1])
    const result = calculateMulti(ralts(), ralts(), new Move("Thunderous Kick"), new Move("Thunderous Kick"), dondozo(), field())

    expect(declared).toEqual([11, 16, 21, 26])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(27)
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(74)
  })
})

describe("Target defensive drop — White Herb", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = (item?: "White Herb") => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Unaware", item })

  it("negates the first drop and then wears off, letting later hits drop normally", () => {
    const withHerb = calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("White Herb"), field())
    const withoutHerb = calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo(), field())

    expect(withHerb.damageWithRemainingUntilTurn(1, 15)).toEqual(52)
    expect(withoutHerb.damageWithRemainingUntilTurn(1, 15)).toEqual(76)

    expect(withHerb.damageWithRemainingUntilTurn(2, 15)).toEqual(178)
    expect(withHerb.damageWithRemainingUntilTurn(2, 15) - withHerb.damageWithRemainingUntilTurn(1, 15)).toEqual(126)
  })
})

describe("Target defensive drop — immunities", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = (ability: string, item?: string) => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability, item } as never)

  it("keeps the target's Sp. Def untouched for abilities and items that block stat drops", () => {
    const unaffected = 52

    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("Clear Body"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("White Smoke"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("Full Metal Body"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("Shield Dust"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("Unaware", "Clear Amulet"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
    expect(calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo("Unaware", "Covert Cloak"), field()).damageWithRemainingUntilTurn(1, 15)).toEqual(unaffected)
  })
})

describe("Target defensive drop — a move the target is immune to never drops the stat", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const luminaUser = () => new Pokemon("Ralts", { nature: "Timid", sps: { spa: 32, spe: 32 } })
  const partner = () => new Pokemon("Ralts", { nature: "Modest", sps: { spa: 32, spe: 0 } })
  const umbreon = (spd = 0) => new Pokemon("Umbreon", { sps: { hp: 32, spd: 32 }, nature: "Careful", boosts: { spd } })

  it("keeps the partner's damage at the untouched Sp. Def when Lumina Crash is blocked by the Dark type", () => {
    const untouched = calculate(partner(), umbreon(), new Move("Dazzling Gleam"), field()).range()
    const dropped = calculate(partner(), umbreon(-2), new Move("Dazzling Gleam"), field()).range()

    expect(untouched).toEqual([36, 44])
    expect(dropped).toEqual([72, 86])

    const result = calculateMulti(luminaUser(), partner(), new Move("Lumina Crash"), new Move("Dazzling Gleam"), umbreon(), field())

    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(44)
  })
})

describe("Target defensive drop — Acid Spray blocked by the Steel type", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const acidSprayUser = () => new Pokemon("Sylveon", { nature: "Timid", sps: { spa: 32, spe: 32 } })
  const partner = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const klinklang = (spd = 0) => new Pokemon("Klinklang", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Plus", boosts: { spd } })

  it("keeps the partner's damage at the untouched Sp. Def when Acid Spray cannot hit the Steel target", () => {
    expect(calculate(acidSprayUser(), klinklang(), new Move("Acid Spray"), field()).range()).toEqual([0, 0])
    expect(calculate(partner(), klinklang(), new Move("Dazzling Gleam"), field()).range()).toEqual([20, 24])
    expect(calculate(partner(), klinklang(-2), new Move("Dazzling Gleam"), field()).range()).toEqual([40, 48])

    const result = calculateMulti(acidSprayUser(), partner(), new Move("Acid Spray"), new Move("Dazzling Gleam"), klinklang(), field())

    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(24)
  })
})

describe("Target defensive drop — Fire Lash absorbed by Flash Fire", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const fireLashUser = () => new Pokemon("Rillaboom", { nature: "Jolly", sps: { atk: 32, spe: 32 } })
  const partner = () => new Pokemon("Rillaboom", { nature: "Adamant", sps: { atk: 32 } })
  const arcanine = (ability: string, def = 0) => new Pokemon("Arcanine", { sps: { hp: 32, def: 32 }, nature: "Impish", ability, abilityOn: true, boosts: { def } } as never)

  it("keeps the partner's damage at the untouched Defense when Flash Fire absorbs Fire Lash", () => {
    expect(calculate(fireLashUser(), arcanine("Flash Fire"), new Move("Fire Lash"), field()).range()).toEqual([0, 0])
    expect(calculate(partner(), arcanine("Flash Fire"), new Move("Body Slam"), field()).range()).toEqual([44, 52])
    expect(calculate(partner(), arcanine("Flash Fire", -1), new Move("Body Slam"), field()).range()).toEqual([65, 77])

    const result = calculateMulti(fireLashUser(), partner(), new Move("Fire Lash"), new Move("Body Slam"), arcanine("Flash Fire"), field())

    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(52)
    expect(result.description()).not.toContain("stat drops considered")
  })

  it("still drops Defense when the same target cannot absorb the move", () => {
    const result = calculateMulti(fireLashUser(), partner(), new Move("Fire Lash"), new Move("Body Slam"), arcanine("Justified"), field())

    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(102)
    expect(result.description()).toContain("stat drops considered")
  })
})

describe("Target defensive drop — stacking with Stamina", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const ralts = () => new Pokemon("Ralts", { sps: { atk: 0 } })
  const dondozo = (ability: string) => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability, abilityOn: true } as never)

  it("raises Defense from Stamina while Acid Spray lowers Sp. Def on the same defender", () => {
    const withStamina = calculateMulti(sylveon(), ralts(), new Move("Acid Spray"), new Move("Body Slam"), dondozo("Stamina"), field())
    const withoutStamina = calculateMulti(sylveon(), ralts(), new Move("Acid Spray"), new Move("Body Slam"), dondozo("Unaware"), field())

    expect(withStamina.damageWithRemainingUntilTurn(1, 15)).toEqual(36)
    expect(withoutStamina.damageWithRemainingUntilTurn(1, 15)).toEqual(40)

    expect(withStamina.damageWithRemainingUntilTurn(2, 15)).toEqual(92)
    expect(withoutStamina.damageWithRemainingUntilTurn(2, 15)).toEqual(104)
  })
})

describe("Target defensive drop — single attacker across turns", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = (spd = 0) => new Pokemon("Dondozo", { sps: { hp: 0, spd: 0 }, nature: "Hasty", ability: "Unaware", boosts: { spd } })

  it("counts the growing damage of later turns in the KO chance of a lone attacker", () => {
    const ladder = [0, -2, -4, -6].map(spd => calculate(sylveon(), dondozo(spd), new Move("Acid Spray"), field()).range())

    expect(ladder).toEqual([
      [32, 38],
      [64, 76],
      [96, 113],
      [128, 151]
    ])

    const result = calculate(sylveon(), dondozo(), new Move("Acid Spray"), field())

    expect(result.description()).toEqual("32+ SpA Sylveon Acid Spray vs. 0 HP / 0 SpD Dondozo: 32-38 (14.2 - 16.8%) -- 0.3% chance to 3HKO")
  })

  it("keeps the first hit unaffected by its own drop", () => {
    const result = calculate(sylveon(), dondozo(), new Move("Acid Spray"), field())

    expect(result.range()).toEqual([32, 38])
  })
})

describe("Stamina — single attacker across turns", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const rillaboom = () => new Pokemon("Rillaboom", { nature: "Adamant", sps: { atk: 13 } })
  const mudsdale = (ability: string, def = 0) => new Pokemon("Mudsdale", { sps: { hp: 32, def: 32 }, nature: "Impish", ability, abilityOn: true, boosts: { def } } as never)

  it("makes a lone attacker lose the KO that the same damage would reach without Stamina", () => {
    const withStamina = calculate(rillaboom(), mudsdale("Stamina"), new Move("Body Slam"), field())
    const withoutStamina = calculate(rillaboom(), mudsdale("Own Tempo"), new Move("Body Slam"), field())

    expect(withStamina.description()).toEqual("13+ Atk Rillaboom Body Slam vs. 32 HP / 32+ Def Mudsdale (Stamina considered): 34-40 (16.4 - 19.3%)")
    expect(withoutStamina.description()).toEqual("13+ Atk Rillaboom Body Slam vs. 32 HP / 32+ Def Mudsdale: 34-40 (16.4 - 19.3%) -- possible 6HKO")
  })
})

describe("Target defensive drop — Contrary and Simple", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = (ability: string, spd = 0) => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability, boosts: { spd } } as never)

  const combined = (ability: string) => calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo(ability), field())

  it("raises Sp. Def instead of lowering it when the target has Contrary", () => {
    const raised = [0, 2, 4].map(spd => calculate(sylveon(), dondozo("Unaware", spd), new Move("Acid Spray"), field()).range()[1])

    expect(raised).toEqual([26, 14, 10])
    expect(combined("Contrary").damageWithRemainingUntilTurn(1, 15)).toEqual(40)
  })

  it("doubles the drop when the target has Simple", () => {
    const lowered = [0, -4, -6].map(spd => calculate(sylveon(), dondozo("Unaware", spd), new Move("Acid Spray"), field()).range()[1])

    expect(lowered).toEqual([26, 76, 99])
    expect(combined("Simple").damageWithRemainingUntilTurn(1, 15)).toEqual(102)
  })

  it("lowers by the plain amount without those abilities", () => {
    expect(combined("Unaware").damageWithRemainingUntilTurn(1, 15)).toEqual(76)
  })
})

describe("Target defensive drop — applied between the hits of a Parental Bond move", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const kangaskhan = () => new Pokemon("Kangaskhan-Mega", { nature: "Modest", sps: { spa: 32 }, ability: "Parental Bond" })
  const dondozo = (ability = "Unaware", item?: string) => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability, item } as never)

  const maxRollPerHit = (defender: Pokemon) => (calculate(kangaskhan(), defender, new Move("Acid Spray"), field()).damage as number[][]).map(hit => hit[hit.length - 1])

  it("lowers the target's Sp. Def for the second hit only", () => {
    expect(maxRollPerHit(dondozo())).toEqual([18, 9])
  })

  it("raises the target's Sp. Def for the second hit when it has Contrary", () => {
    expect(maxRollPerHit(dondozo("Contrary"))).toEqual([18, 2])
  })

  it("doubles the drop for the second hit when the target has Simple", () => {
    expect(maxRollPerHit(dondozo("Simple"))).toEqual([18, 13])
  })

  it("leaves the second hit untouched when a White Herb absorbs the drop", () => {
    expect(maxRollPerHit(dondozo("Unaware", "White Herb"))).toEqual([18, 4])
  })

  it("leaves the second hit untouched when the target blocks stat drops", () => {
    expect(maxRollPerHit(dondozo("Clear Body"))).toEqual([18, 4])
  })
})

describe("Target defensive drop — KO chances beyond the fourth turn", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const ralts = (spa: number) => new Pokemon("Ralts", { sps: { spa }, nature: "Modest" })
  const dondozo = () => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Unaware" })

  it("guarantees the KO once the weakest rolls of the growing damage are enough", () => {
    expect(calculate(ralts(25), dondozo(), new Move("Acid Spray"), field()).description()).toEqual("25+ SpA Ralts Acid Spray vs. 32 HP / 32+ SpD Dondozo: 12-15 (4.6 - 5.8%) -- guaranteed 7HKO")
  })

  it("reports a possible KO when only the strongest rolls are enough", () => {
    expect(calculate(ralts(32), dondozo(), new Move("Acid Spray"), field()).description()).toEqual("32+ SpA Ralts Acid Spray vs. 32 HP / 32+ SpD Dondozo: 13-16 (5 - 6.2%) -- possible 6HKO")
  })
})

describe("Target defensive drop — survivesHits follows the growing damage", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const ralts = () => new Pokemon("Ralts", { sps: { spa: 25 }, nature: "Modest" })
  const dondozo = () => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Unaware" })

  it("stops surviving at the seventh hit of a move that keeps lowering Sp. Def", () => {
    const result = calculate(ralts(), dondozo(), new Move("Acid Spray"), field())

    expect([1, 2, 3, 4, 5, 6, 7].map(hits => result.survivesHits(hits))).toEqual([true, true, true, true, true, true, false])
  })

  it("stops surviving at the sixth hit of a move that does not lower Sp. Def", () => {
    const result = calculate(ralts(), dondozo(), new Move("Psychic"), field())

    expect([1, 2, 3, 4, 5, 6, 7].map(hits => result.survivesHits(hits))).toEqual([true, true, true, true, true, false, false])
  })
})

describe("Target defensive drop — description", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 } })
  const dondozo = () => new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Unaware" })

  it("notes that the stat drops were taken into account", () => {
    const result = calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo(), field())

    expect(result.description()).toEqual("32+ SpA Sylveon Acid Spray AND 32+ SpA Sylveon Acid Spray vs. 32 HP / 32+ SpD Dondozo (stat drops considered): 64-76 (24.9 - 29.5%) -- guaranteed 3HKO")
  })
})

describe("Progressive defensive damage — an Unaware attacker ignores the ladder", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const rillaboom = (ability?: string) => new Pokemon("Rillaboom", { nature: "Adamant", sps: { atk: 13 }, ability } as never)
  const mudsdale = (ability: string) => new Pokemon("Mudsdale", { sps: { hp: 32, def: 32 }, nature: "Impish", ability, abilityOn: true } as never)

  it("keeps the KO an Unaware attacker would reach against a defender without Stamina", () => {
    const unawareVsStamina = calculate(rillaboom("Unaware"), mudsdale("Stamina"), new Move("Body Slam"), field())
    const unawareVsPlain = calculate(rillaboom("Unaware"), mudsdale("Own Tempo"), new Move("Body Slam"), field())

    expect(unawareVsStamina.description()).toEqual(unawareVsPlain.description())
    expect(unawareVsStamina.description()).toContain("possible 6HKO")
  })

  it("loses that KO when the attacker is not Unaware", () => {
    expect(calculate(rillaboom(), mudsdale("Stamina"), new Move("Body Slam"), field()).description()).not.toContain("HKO")
  })
})

describe("Stamina — activation", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 0 } })
  const archaludon = (abilityOn: boolean) => new Pokemon("Archaludon", { sps: { hp: 32, def: 1 }, ability: "Stamina", abilityOn } as never)

  it("raises Defense after every hit and notes it in the description when active", () => {
    const result = calculate(incineroar(), archaludon(true), new Move("Close Combat"), field())

    expect(result.description()).toEqual("0 Atk Incineroar Close Combat vs. 32 HP / 1 Def Archaludon (Stamina considered): 82-98 (41.6 - 49.7%) -- 43.2% chance to 3HKO")
  })

  it("repeats the same damage on every hit when inactive", () => {
    const result = calculate(incineroar(), archaludon(false), new Move("Close Combat"), field())

    expect(result.description()).toEqual("0 Atk Incineroar Close Combat vs. 32 HP / 1 Def Archaludon: 82-98 (41.6 - 49.7%) -- guaranteed 3HKO")
  })

  it("does not raise Defense between the combined attackers when inactive", () => {
    const active = calculateMulti(incineroar(), incineroar(), new Move("Close Combat"), new Move("Close Combat"), archaludon(true), field())
    const inactive = calculateMulti(incineroar(), incineroar(), new Move("Close Combat"), new Move("Close Combat"), archaludon(false), field())

    expect(active.description()).toContain("(Stamina considered)")
    expect(inactive.description()).not.toContain("Stamina")
    expect(active.damageWithRemainingUntilTurn(1, 15)).toEqual(164)
    expect(inactive.damageWithRemainingUntilTurn(1, 15)).toEqual(196)
  })
})
