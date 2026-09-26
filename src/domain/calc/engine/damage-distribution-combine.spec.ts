import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage distribution combination — hit counts around the accuracy boundary", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const cloyster = () => new Pokemon("Cloyster", { nature: "Adamant", sps: { atk: 32 } })
  const dondozo = () => new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" })

  const spear = (hits: number) => calculate(cloyster(), dondozo(), new Move("Icicle Spear", { hits }), field())

  it("keeps two hits exact, without approximating the distribution", () => {
    const result = spear(2)

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (2 hits) vs. 32 HP / 32+ Def Dondozo: 12-16 (4.6 - 6.2%)")
    expect(result.description()).not.toContain("approx.")
  })

  it("keeps three hits exact, the last count before the distribution is reduced", () => {
    const result = spear(3)

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (3 hits) vs. 32 HP / 32+ Def Dondozo: 18-24 (7 - 9.3%)")
    expect(result.description()).not.toContain("approx.")
  })

  it("marks four hits as approximate, the first count that reduces the distribution", () => {
    const result = spear(4)

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (4 hits) vs. 32 HP / 32+ Def Dondozo: 24-32 (9.3 - 12.4%) -- approx. possible 9HKO")
  })

  it("reduces the distribution once per hit beyond the boundary", () => {
    expect(spear(5).description()).toEqual("32+ Atk Cloyster Icicle Spear (5 hits) vs. 32 HP / 32+ Def Dondozo: 30-40 (11.6 - 15.5%) -- approx. possible 7HKO")
    expect(spear(10).description()).toEqual("32+ Atk Cloyster Icicle Spear (10 hits) vs. 32 HP / 32+ Def Dondozo: 60-80 (23.3 - 31.1%) -- approx. 99.8% chance to 4HKO")
  })
})

describe("Damage distribution combination — ten hit moves", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const maushold = () => new Pokemon("Maushold", { nature: "Adamant", sps: { atk: 32 } })

  it("combines the ten rows of Population Bomb against a bulky target", () => {
    const result = calculate(maushold(), new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" }), new Move("Population Bomb"), field())

    expect(result.description()).toEqual("32+ Atk Maushold Population Bomb (10 hits) vs. 32 HP / 32+ Def Dondozo: 90-120 (35 - 46.6%) -- guaranteed 3HKO")
  })

  it("combines the ten rows against a target that dies to a single hit", () => {
    const result = calculate(maushold(), new Pokemon("Ralts", {}), new Move("Population Bomb"), field())

    expect(result.description()).toEqual("32+ Atk Maushold Population Bomb (10 hits) vs. 0 HP / 0 Def Ralts: 360-430 (349.5 - 417.4%) -- guaranteed OHKO")
  })

  it("reports the same survival across every roll level", () => {
    const result = calculate(maushold(), new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" }), new Move("Population Bomb"), field())

    expect([0, 7, 15].map(rollIndex => [1, 2, 3].map(hits => result.survivesHits(hits, rollIndex)))).toEqual([
      [true, true, false],
      [true, true, false],
      [true, true, false]
    ])
  })
})

describe("Damage distribution combination — Parental Bond produces two rows", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const kangaskhan = () => new Pokemon("Kangaskhan-Mega", { nature: "Adamant", sps: { atk: 32 }, ability: "Parental Bond" })

  it("combines both rows of a Parental Bond move", () => {
    const result = calculate(kangaskhan(), new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" }), new Move("Body Slam"), field())

    expect(result.description()).toEqual("32+ Atk Parental Bond Kangaskhan-Mega Body Slam vs. 32 HP / 32+ Def Dondozo: 63-76 (24.5 - 29.5%) -- 99.9% chance to 4HKO")
  })

  it("combines both rows when the defender also raises Defense between hits", () => {
    const result = calculate(kangaskhan(), new Pokemon("Mudsdale", { sps: { hp: 32, def: 32 }, nature: "Impish", ability: "Stamina", abilityOn: true }), new Move("Body Slam"), field())

    expect(result.description()).toEqual("32+ Atk Parental Bond Kangaskhan-Mega Body Slam vs. 32 HP / 32+ Def Stamina Mudsdale (Stamina considered): 66-79 (31.8 - 38.1%) -- 0.1% chance to 4HKO")
  })
})

describe("Damage distribution combination — defensive effects between hits", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("combines rows that grow apart because the defender raises Defense", () => {
    const result = calculate(new Pokemon("Cloyster", { nature: "Adamant", sps: { atk: 32 } }), new Pokemon("Mudsdale", { sps: { hp: 32, def: 32 }, nature: "Impish", ability: "Stamina" }), new Move("Icicle Spear"), field())

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (3 hits) vs. 32 HP / 32+ Def Stamina Mudsdale: 64-82 (30.9 - 39.6%) -- 98.4% chance to 3HKO")
  })

  it("combines rows where the first hit is softened by a resist berry", () => {
    const result = calculate(new Pokemon("Maushold", { nature: "Adamant", sps: { atk: 32 } }), new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", item: "Chilan Berry" }), new Move("Population Bomb"), field())

    expect(result.description()).toEqual("32+ Atk Maushold Population Bomb (10 hits) vs. 32 HP / 32+ Def Dondozo: 85-114 (33 - 44.3%) reduced by Chilan Berry -- guaranteed 3HKO")
  })
})

describe("Damage distribution combination — extreme roll spreads", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("combines rows that repeat the same damage value", () => {
    const result = calculate(new Pokemon("Ralts", { sps: { atk: 0 } }), new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold" }), new Move("Icicle Spear", { hits: 5 }), field())

    expect(result.description()).toEqual("0 Atk Ralts Icicle Spear (5 hits) vs. 32 HP / 32+ Def Blissey: 35-45 (9.6 - 12.4%) -- approx. possible 9HKO")
  })

  it("combines rows that spread across many distinct damage values", () => {
    const result = calculate(new Pokemon("Rillaboom", { nature: "Adamant", sps: { atk: 32 } }), new Pokemon("Ralts", {}), new Move("Icicle Spear", { hits: 5 }), field())

    expect(result.description()).toEqual("32+ Atk Rillaboom Icicle Spear (5 hits) vs. 0 HP / 0 Def Ralts: 205-245 (199 - 237.8%) -- guaranteed OHKO")
  })
})

describe("Damage distribution combination — turns and combined attackers", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const cloyster = () => new Pokemon("Cloyster", { nature: "Adamant", sps: { atk: 32 } })
  const dondozo = () => new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" })

  it("keeps the combined distribution when the move is used over several turns", () => {
    const result = calculate(cloyster(), dondozo(), new Move("Icicle Spear", { timesUsed: 3 }), field())

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (3 hits) over 3 turns vs. 32 HP / 32+ Def Dondozo: 18-24 (7 - 9.3%) -- not a KO")
  })

  it("combines the rows of two multi hit attackers", () => {
    const result = calculateMulti(new Pokemon("Maushold", { nature: "Adamant", sps: { atk: 32 } }), cloyster(), new Move("Population Bomb"), new Move("Icicle Spear"), dondozo(), field())

    expect(result.description()).toEqual("32+ Atk Maushold Population Bomb (10 hits) AND 32+ Atk Cloyster Icicle Spear (3 hits) vs. 32 HP / 32+ Def Dondozo: 108-144 (42 - 56%) -- 0.1% chance to 2HKO")
  })
})
