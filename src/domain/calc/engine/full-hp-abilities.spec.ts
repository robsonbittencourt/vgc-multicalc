import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

const field = (terrain?: "Grassy") => new Field({ gameType: "Doubles", terrain })
const dragonite = () => new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale", item: "Leftovers" } as never)
const snorlax = (ability = "Shadow Shield") => new Pokemon("Snorlax", { sps: { hp: 32 }, ability, item: "Leftovers" } as never)
const pichu = () => new Pokemon("Pichu", { ability: "Static" } as never)
const pikachu = (ability = "Static") => new Pokemon("Pikachu", { ability } as never)

describe("Multiscale and Shadow Shield — halving again whenever the HP is back to full", () => {
  it("halves again at the low rolls that let Leftovers restore the HP", () => {
    const result = calculate(pichu(), dragonite(), new Move("Dragon Breath"), field())

    expect(result.damageWithRemainingUntilTurn(6, 0)).toEqual(0)
    expect(result.damageWithRemainingUntilTurn(6, 7)).toEqual(0)
    expect(result.damageWithRemainingUntilTurn(6, 15)).toEqual(82)
  })

  it("shows the second use halved only at the rolls that restore the HP", () => {
    const result = calculate(pichu(), dragonite(), new Move("Dragon Breath", { timesUsed: 2 }), field())

    expect(result.shownDamage()).toEqual([
      [11, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 14],
      [11, 12, 12, 12, 12, 12, 12, 12, 26, 26, 26, 26, 26, 26, 26, 28]
    ])
  })

  it("keeps any holder of Shadow Shield at full HP when the healing covers the halved hit", () => {
    const result = calculate(pikachu(), snorlax(), new Move("Brick Break"), field("Grassy"))

    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(0)
    expect(result.koChance().text).toEqual("")
  })

  it("keeps only the rolls whose halved hit is covered by the healing at full HP", () => {
    const result = calculate(new Pokemon("Machop", { ability: "Guts" } as never), snorlax(), new Move("Rock Smash"), field("Grassy"))

    expect(result.damageWithRemainingUntilTurn(4, 7)).toEqual(0)
    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(103)
    expect(result.koChance().text).toEqual("possible 8HKO after Leftovers and Grassy Terrain recovery")
  })

  it("halves the first attacker again when both hits of the turn are covered by the healing", () => {
    const result = calculateMulti(pikachu(), pichu(), new Move("Thunderbolt"), new Move("Thunder Shock"), snorlax(), field("Grassy"))

    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(0)
    expect(result.getHKO()).toEqual("10HKO or more")
  })

  it("halves the first attacker on every use of combined attackers", () => {
    const result = calculateMulti(pikachu(), pichu(), new Move("Thunderbolt", { timesUsed: 3 }), new Move("Thunder Shock", { timesUsed: 3 }), snorlax(), field("Grassy"))

    expect(result.rollsFor(0)).toEqual([
      [14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17],
      [14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17],
      [14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17]
    ])
    expect(result.rollsFor(1)).toEqual([
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
      [10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13]
    ])
    expect(result.getHKO()).toEqual("not a KO")
  })

  it("guarantees a long KO only once toxic keeps the HP from returning to full", () => {
    const result = calculate(new Pokemon("Eevee", { ability: "Run Away" } as never), new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale", status: "tox", toxicCounter: 1 } as never), new Move("Swift"), field())

    expect(result.koChance().text).toEqual("guaranteed 5HKO after toxic damage")
  })

  it("keeps Shadow Shield against Mold Breaker", () => {
    const result = calculate(pikachu("Mold Breaker"), snorlax(), new Move("Brick Break"), field("Grassy"))

    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(0)
  })

  it("ignores Multiscale against Mold Breaker", () => {
    const result = calculate(pikachu("Mold Breaker"), snorlax("Multiscale"), new Move("Brick Break"), field("Grassy"))

    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(120)
    expect(result.koChance().text).toEqual("possible 8HKO after Leftovers and Grassy Terrain recovery")
  })
})

describe("Times used in a row — the turns between the uses", () => {
  it("applies each use on its own turn with the healing in between", () => {
    const result = calculate(pichu(), dragonite(), new Move("Acid Spray", { timesUsed: 4 }), field())

    expect(result.shownDamage()).toEqual([
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
      [7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
      [11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 13],
      [14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 34]
    ])
    expect(result.damageWithRemainingUntilTurn(1, 15)).toEqual(0)
    expect(result.damageWithRemainingUntilTurn(4, 15)).toEqual(23)
  })

  it("counts the Leftovers recovery between the uses in the chance to KO", () => {
    const dragapult = new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 }, ability: "Infiltrator", item: "Choice Specs" } as never)

    const result = calculate(dragapult, new Pokemon("Snorlax", { sps: { hp: 32 }, ability: "Immunity", item: "Leftovers" } as never), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(result.koChance().text).toEqual("4% chance to KO in 3 turns after Leftovers recovery")
  })
})

describe("Multiscale and Shadow Shield — chance to KO within some of the uses", () => {
  const draco = () => calculate(new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 16 } }), new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale" } as never), new Move("Draco Meteor", { timesUsed: 3 }), field())

  it("halves only the first use when counting the chance to KO within two uses", () => {
    const result = draco()

    expect(result.koChanceWithin(2)).toEqual(87 / 128)
    expect(result.koChanceWithin(3)).toEqual(1)
  })

  it("counts only the rolls up to the roll asked for in every use", () => {
    const result = draco()

    expect(result.koChanceWithin(2, 7)).toEqual(7 / 64)
  })
})

describe("Tera Shell — resisting only the uses that start at full HP", () => {
  const terapagos = (item?: string, hpLoss = 0) => {
    const pokemon = new Pokemon("Terapagos-Terastal", { ability: "Tera Shell", item } as never)
    pokemon.originalCurrentHp = pokemon.maxHp() - hpLoss

    return pokemon
  }
  const chansey = () => new Pokemon("Chansey")
  const kangaskhan = () => new Pokemon("Kangaskhan-Mega", { ability: "Parental Bond", boosts: { atk: -6 } } as never)

  it("leaves a move that is already resisted at its own effectiveness", () => {
    const result = calculate(new Pokemon("Snorlax"), new Pokemon("Terapagos-Terastal", { ability: "Tera Shell", overrides: { types: ["Steel", "Rock"] } } as never), new Move("Body Slam"), field())

    expect(result.damage).toEqual([12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14])
    expect(result.description()).toEqual("0 Atk Snorlax Body Slam vs. 0 HP / 0 Def Terapagos-Terastal (Steel/Rock): 12-14 (7 - 8.2%)")
  })

  it("resists nothing on a Pokemon other than Terapagos-Terastal", () => {
    const result = calculate(new Pokemon("Garchomp"), new Pokemon("Snorlax", { ability: "Tera Shell" } as never), new Move("Brick Break"), field())

    expect(result.damage).toEqual([102, 102, 104, 104, 106, 108, 108, 110, 110, 112, 114, 114, 116, 116, 118, 120])
    expect(result.description()).toEqual("0 Atk Garchomp Brick Break vs. 0 HP / 0 Def Snorlax: 102-120 (43.4 - 51%) -- 3.1% chance to 2HKO")
  })

  it("does not resist Struggle", () => {
    const result = calculate(new Pokemon("Garchomp"), terapagos(), new Move("Struggle"), field())

    expect(result.damage).toEqual([22, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 27])
  })

  it("drops the resistance from the uses that start below full HP", () => {
    const result = calculate(new Pokemon("Garchomp", { nature: "Adamant", sps: { atk: 32 } }), terapagos(), new Move("Superpower", { timesUsed: 3 }), field())

    expect(result.shownDamage()).toEqual([
      [35, 35, 36, 36, 36, 37, 37, 38, 38, 39, 39, 39, 40, 40, 41, 41],
      [94, 96, 96, 98, 98, 100, 100, 102, 104, 104, 106, 106, 108, 108, 110, 112],
      [70, 72, 72, 72, 74, 74, 76, 76, 78, 78, 78, 80, 80, 82, 82, 84]
    ])
    expect(result.koChance().text).toEqual("guaranteed KO in 3 turns")
  })

  it("resists again the uses that start at full HP after the healing", () => {
    const result = calculate(chansey(), terapagos("Leftovers", 5), new Move("Power-Up Punch", { timesUsed: 3 }), field("Grassy"))

    expect(result.shownDamage()).toEqual([
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 10],
      [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4]
    ])
  })

  it("keeps the child hit of Parental Bond resisted on the uses that start at full HP", () => {
    const result = calculate(kangaskhan(), terapagos("Leftovers"), new Move("Power-Up Punch", { timesUsed: 3, ability: "Parental Bond" }), field("Grassy"))

    expect(result.shownDamage()).toEqual([
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })

  it("resists the first attacker again on every turn that starts at full HP", () => {
    const result = calculateMulti(chansey(), chansey(), new Move("Power-Up Punch", { timesUsed: 3 }), new Move("Pound"), terapagos("Leftovers"), field("Grassy"))

    expect(result.rollsFor(0)).toEqual([
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4]
    ])
  })

  it("keeps both hits of Parental Bond resisted on every turn that starts at full HP", () => {
    const result = calculateMulti(kangaskhan(), chansey(), new Move("Power-Up Punch", { timesUsed: 3, ability: "Parental Bond" }), new Move("Pound"), terapagos("Leftovers"), field("Grassy"))

    expect(result.rollsFor(0)).toEqual([
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
})
