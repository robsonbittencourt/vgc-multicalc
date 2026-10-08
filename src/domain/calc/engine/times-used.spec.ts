import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

const field = () => new Field({ gameType: "Doubles" })
const maxRollPerUse = (damage: unknown) => (damage as number[][]).map(use => use[use.length - 1])

describe("Times used in a row — a move that changes the user's attacking stat", () => {
  const dragapult = (item?: string) => new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 }, item } as never)
  const snorlax = () => new Pokemon("Snorlax", { sps: { hp: 32 } })

  it("lowers the Sp. Atk of Draco Meteor after every use", () => {
    const result = calculate(dragapult(), snorlax(), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([112, 57, 39])
    expect(result.description()).toEqual("32+ SpA Dragapult Draco Meteor over 3 turns (stat changes considered) vs. 32 HP / 0 SpD Snorlax: 175-208 (65.5 - 77.9%) -- not a KO")
  })

  it("restores the Sp. Atk with White Herb after the first drop only", () => {
    const result = calculate(dragapult("White Herb"), snorlax(), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([112, 112, 57])
  })

  it("restores a Sp. Atk that was already lowered to neutral with White Herb", () => {
    const ninetales = new Pokemon("Ninetales", { nature: "Modest", item: "White Herb", sps: { spa: 32 }, boosts: { spa: -1 } })

    const result = calculate(ninetales, new Pokemon("Blissey", { sps: { hp: 32 } }), new Move("Overheat", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([55, 82, 42])
  })

  it("keeps the damage of every use when the target has Unaware", () => {
    const dondozo = new Pokemon("Dondozo", { ability: "Unaware", sps: { hp: 32 } })

    const result = calculate(dragapult(), dondozo, new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([171, 171, 171])
  })

  it("lowers the Attack of Superpower even when the user holds Clear Amulet", () => {
    const machamp = new Pokemon("Machamp", { nature: "Adamant", item: "Clear Amulet", sps: { atk: 32 } })

    const result = calculate(machamp, new Pokemon("Skarmory", { sps: { hp: 32 } }), new Move("Superpower", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([102, 67, 52])
  })

  it("lowers every spread hit of Make It Rain after every use", () => {
    const gholdengo = new Pokemon("Gholdengo", { nature: "Modest", sps: { spa: 32 } })

    const result = calculate(gholdengo, snorlax(), new Move("Make It Rain", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([94, 48, 33])
  })

  it("raises the Attack of Power-Up Punch after every use", () => {
    const lucario = new Pokemon("Lucario", { nature: "Adamant", sps: { atk: 32 } })

    const result = calculate(lucario, snorlax(), new Move("Power-Up Punch", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([114, 170, 224])
  })

  it("lowers the Attack of Power-Up Punch after every use when the user has Contrary", () => {
    const lucario = new Pokemon("Lucario", { nature: "Adamant", ability: "Contrary", sps: { atk: 32 } } as never)

    const result = calculate(lucario, snorlax(), new Move("Power-Up Punch", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([114, 78, 60])
  })

  it("does not raise the Attack of Power-Up Punch when Sheer Force removes the effect", () => {
    const conkeldurr = new Pokemon("Conkeldurr", { nature: "Adamant", ability: "Sheer Force", sps: { atk: 32 } } as never)

    const result = calculate(conkeldurr, snorlax(), new Move("Power-Up Punch", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([174, 174, 174])
  })

  it("raises the Sp. Atk of Torch Song after every use", () => {
    const armarouge = new Pokemon("Armarouge", { nature: "Modest", sps: { spa: 32 } })

    const result = calculate(armarouge, snorlax(), new Move("Torch Song", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([81, 120, 160])
  })
})

describe("Times used in a row — a move that lowers the target's defensive stat", () => {
  const sylveon = (ability?: string) => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 }, ability } as never)
  const dondozo = (item?: string, spd = 0) => new Pokemon("Dondozo", { nature: "Careful", ability: "Oblivious", sps: { hp: 32, spd: 32 }, item, boosts: { spd } } as never)

  it("does not lower the Sp. Def when Sheer Force removes the effect", () => {
    const result = calculate(sylveon("Sheer Force"), dondozo(), new Move("Acid Spray", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([33, 33, 33])
  })

  it("restores a Sp. Def that was already lowered to neutral with White Herb", () => {
    const result = calculate(sylveon(), dondozo("White Herb", -1), new Move("Acid Spray", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([38, 26, 50])
  })

  it("lowers the Sp. Def of Apple Acid after every use", () => {
    const appletun = new Pokemon("Appletun", { nature: "Modest", sps: { spa: 32 } })

    const result = calculate(appletun, new Pokemon("Snorlax", { sps: { hp: 32 } }), new Move("Apple Acid", { timesUsed: 3 }), field())

    expect(maxRollPerUse(result.damage)).toEqual([78, 117, 154])
  })
})

describe("Times used in a row — combined attackers", () => {
  const sylveon = (nature: "Timid" | "Quiet", spe: number) => new Pokemon("Sylveon", { nature, sps: { spa: 32, spe } })
  const gardevoir = (nature: "Timid" | "Quiet", spe: number) => new Pokemon("Gardevoir", { nature, sps: { spa: 32, spe } })
  const dondozo = () => new Pokemon("Dondozo", { nature: "Careful", ability: "Oblivious", sps: { hp: 32, spd: 32 } } as never)

  it("keeps lowering the Sp. Def for both attackers across the uses", () => {
    const result = calculateMulti(sylveon("Timid", 32), gardevoir("Quiet", 0), new Move("Acid Spray", { timesUsed: 3 }), new Move("Psychic", { timesUsed: 3 }), dondozo(), field())

    expect(maxRollPerUse(result.rollsFor(0))).toEqual([24, 46, 69])
    expect(maxRollPerUse(result.rollsFor(1))).toEqual([183, 276, 363])
    expect(result.description()).toEqual("32 SpA Sylveon Acid Spray AND 32+ SpA Gardevoir Psychic over 3 turns (stat changes considered) vs. 32 HP / 32+ SpD Dondozo: 812-961 (315.9 - 373.9%) -- guaranteed KO in 3 turns")
  })

  it("uses the larger number of uses for both attackers", () => {
    const result = calculateMulti(sylveon("Timid", 32), gardevoir("Quiet", 0), new Move("Acid Spray", { timesUsed: 3 }), new Move("Psychic"), dondozo(), field())

    expect(maxRollPerUse(result.rollsFor(1))).toEqual([183, 276, 363])
  })

  it("lowers the attacker's own Sp. Atk across the uses without touching the partner", () => {
    const dragapult = new Pokemon("Dragapult", { nature: "Timid", sps: { spa: 32, spe: 32 } })
    const partner = new Pokemon("Sylveon", { nature: "Quiet", sps: { spa: 32 } })

    const result = calculateMulti(dragapult, partner, new Move("Draco Meteor", { timesUsed: 3 }), new Move("Moonblast", { timesUsed: 3 }), new Pokemon("Snorlax", { sps: { hp: 32 } }), field())

    expect(maxRollPerUse(result.rollsFor(0))).toEqual([102, 52, 36])
    expect(maxRollPerUse(result.rollsFor(1))).toEqual([88, 88, 88])
    expect(result.description()).toContain("(stat changes considered)")
  })

  it("reports the chance to KO within the uses", () => {
    const salazzle = new Pokemon("Salazzle", { nature: "Jolly", sps: { atk: 32, spe: 32 } })
    const snorlax = new Pokemon("Snorlax", { nature: "Brave", sps: { atk: 32 } })
    const mudsdale = new Pokemon("Mudsdale", { nature: "Impish", ability: "Stamina", abilityOn: true, sps: { hp: 32, def: 32 } } as never)

    const result = calculateMulti(salazzle, snorlax, new Move("Fire Lash", { timesUsed: 3 }), new Move("Body Slam", { timesUsed: 3 }), mudsdale, field())

    expect(result.getHKO()).toEqual("61.7% chance to KO in 3 turns")
  })

  it("reports no KO when the uses cannot knock the target out", () => {
    const ralts = (spe: number) => new Pokemon("Ralts", { nature: "Modest", sps: { spa: 0, spe } })

    const result = calculateMulti(ralts(32), ralts(0), new Move("Acid Spray", { timesUsed: 2 }), new Move("Psychic", { timesUsed: 2 }), dondozo(), field())

    expect(result.getHKO()).toEqual("not a KO")
  })

  it("ignores the drop of the last attacker of a turn when the move is used once", () => {
    const result = calculateMulti(gardevoir("Timid", 32), sylveon("Quiet", 0), new Move("Psychic"), new Move("Acid Spray"), dondozo(), field())

    expect(result.description()).not.toContain("stat changes considered")
    expect(result.damageWithRemainingUntilTurn(2, 15)).toEqual(2 * result.damageWithRemainingUntilTurn(1, 15))
  })

  it("does not note stat changes when the drop lowers a stat the partner's move does not hit", () => {
    const snorlax = new Pokemon("Snorlax", { nature: "Brave", sps: { atk: 32 } })

    const result = calculateMulti(sylveon("Timid", 32), snorlax, new Move("Acid Spray"), new Move("Body Slam"), dondozo(), field())

    expect(result.rollsFor(1)).toEqual([[64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73, 73, 75, 76]])
    expect(result.description()).not.toContain("stat changes considered")
  })
})

describe("Times used in a row — Parental Bond", () => {
  const kangaskhan = () => new Pokemon("Kangaskhan-Mega", { nature: "Adamant", sps: { atk: 32 }, ability: "Parental Bond" })
  const snorlax = () => new Pokemon("Snorlax", { sps: { hp: 32 } })

  it("hits twice on every use of Power-Up Punch, raising the Attack after each hit", () => {
    const result = calculate(kangaskhan(), snorlax(), new Move("Power-Up Punch", { timesUsed: 2 }), field())

    expect(result.damage).toEqual([
      [70, 72, 72, 72, 74, 74, 76, 76, 78, 78, 78, 80, 80, 82, 82, 84],
      [24, 24, 26, 26, 26, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 30],
      [138, 140, 142, 144, 144, 146, 148, 150, 152, 154, 154, 156, 158, 160, 162, 164],
      [42, 42, 42, 44, 44, 44, 44, 46, 46, 46, 46, 48, 48, 48, 48, 50]
    ])
    expect(result.range()).toEqual([274, 328])
  })

  it("hits twice on every use of a move that does not change stats", () => {
    const result = calculate(kangaskhan(), snorlax(), new Move("Body Slam", { timesUsed: 2 }), field())

    expect(result.damage).toEqual([
      [109, 111, 112, 114, 115, 117, 118, 120, 120, 121, 123, 124, 126, 127, 129, 130],
      [27, 27, 28, 28, 28, 28, 30, 30, 30, 30, 30, 31, 31, 31, 31, 33],
      [109, 111, 112, 114, 115, 117, 118, 120, 120, 121, 123, 124, 126, 127, 129, 130],
      [27, 27, 28, 28, 28, 28, 30, 30, 30, 30, 30, 31, 31, 31, 31, 33]
    ])
  })
})

describe("Times used in a row — which moves change stats over the uses", () => {
  it("resolves the user's Sp. Atk drop of Draco Meteor", () => {
    expect(new Move("Draco Meteor").selfStatChange).toEqual({ stat: "spa", stages: -2, fromSecondary: false })
  })

  it("resolves the sure Sp. Atk raise of Torch Song as a secondary effect", () => {
    expect(new Move("Torch Song").selfStatChange).toEqual({ stat: "spa", stages: 1, fromSecondary: true })
  })

  it("resolves the user's raise of Clangorous Soulblaze", () => {
    expect(new Move("Clangorous Soulblaze").selfStatChange).toEqual({ stat: "spa", stages: 1, fromSecondary: false })
  })

  it("ignores a raise of the user that only happens by chance", () => {
    expect(new Move("Diamond Storm").selfStatChange).toBeUndefined()
  })

  it("changes stats over the uses for a move that lowers the target's Sp. Def", () => {
    expect(new Move("Acid Spray").changesStatsOverUses()).toBe(true)
  })

  it("changes stats over the uses for a move that lowers the user's Sp. Atk", () => {
    expect(new Move("Draco Meteor").changesStatsOverUses()).toBe(true)
  })

  it("does not change stats over the uses for a move without a sure stat change", () => {
    expect(new Move("Diamond Storm").changesStatsOverUses()).toBe(false)
  })
})

describe("Times used in a row — description", () => {
  const sylveon = (ability?: string) => new Pokemon("Sylveon", { nature: "Modest", sps: { spa: 32 }, ability } as never)
  const dondozo = (ability: string) => new Pokemon("Dondozo", { nature: "Careful", ability, sps: { hp: 32, spd: 32 } } as never)
  const mudsdale = () => new Pokemon("Mudsdale", { nature: "Impish", ability: "Stamina", abilityOn: true, sps: { hp: 32, def: 32 } } as never)
  const salazzle = (ability?: string) => new Pokemon("Salazzle", { nature: "Adamant", sps: { atk: 32 }, ability } as never)

  it("does not note stat changes when the target has Unaware against the user's own drop", () => {
    const dragapult = new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 } })

    const result = calculate(dragapult, dondozo("Unaware"), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(result.description()).not.toContain("stat changes considered")
  })

  it("does not note stat changes when the target blocks the drop", () => {
    const result = calculate(sylveon(), dondozo("Clear Body"), new Move("Acid Spray", { timesUsed: 3 }), field())

    expect(result.description()).not.toContain("stat changes considered")
  })

  it("does not note stat changes when Sheer Force removes the drop", () => {
    const result = calculate(sylveon("Sheer Force"), dondozo("Oblivious"), new Move("Acid Spray", { timesUsed: 3 }), field())

    expect(result.description()).not.toContain("stat changes considered")
  })

  it("notes both the stat changes and Stamina when the move lowers a target with Stamina", () => {
    const result = calculate(salazzle(), mudsdale(), new Move("Fire Lash", { timesUsed: 3 }), field())

    expect(result.description()).toEqual("32+ Atk Salazzle Fire Lash over 3 turns (stat changes considered) vs. 32 HP / 32+ Def Stamina Mudsdale (Stamina considered): 120-144 (57.9 - 69.5%) -- not a KO")
  })

  it("does not note stat changes when an Unaware attacker ignores the drop it lands", () => {
    const result = calculate(sylveon("Unaware"), dondozo("Oblivious"), new Move("Acid Spray", { timesUsed: 3 }), field())
    const showdownRolls = [22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 26]

    expect(result.damage).toEqual([showdownRolls, showdownRolls, showdownRolls])
    expect(result.description()).not.toContain("stat changes considered")
  })

  it("does not note Stamina when the attacker has Unaware", () => {
    const result = calculate(salazzle("Unaware"), mudsdale(), new Move("Fire Lash", { timesUsed: 3 }), field())

    expect(result.description()).not.toContain("Stamina considered")
  })

  it("does not note Stamina when the move hits the Sp. Def", () => {
    const dragapult = new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 } })

    const result = calculate(dragapult, mudsdale(), new Move("Draco Meteor", { timesUsed: 3 }), field())

    expect(result.damage).toEqual([
      [117, 118, 120, 120, 121, 123, 124, 126, 127, 129, 130, 132, 133, 135, 136, 138],
      [58, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70],
      [39, 39, 39, 40, 40, 40, 42, 42, 42, 43, 43, 43, 45, 45, 45, 46]
    ])
    expect(result.description()).not.toContain("Stamina considered")
  })

  it("notes both the stat changes and Stamina for combined attackers", () => {
    const partner = new Pokemon("Snorlax", { nature: "Brave", sps: { atk: 32 } })

    const result = calculateMulti(salazzle(), partner, new Move("Fire Lash", { timesUsed: 3 }), new Move("Body Slam", { timesUsed: 3 }), mudsdale(), field())

    expect(result.description()).toEqual("32+ Atk Salazzle Fire Lash AND 32+ Atk Snorlax Body Slam over 3 turns (stat changes considered) vs. 32 HP / 32+ Def Mudsdale (Stamina considered): 198-240 (95.6 - 115.9%) -- 98.9% chance to KO in 3 turns")
  })

  it("does not note stat changes for combined attackers when only the users' own stats change against Unaware", () => {
    const dragapult = new Pokemon("Dragapult", { nature: "Timid", sps: { spa: 32, spe: 32 } })
    const partner = new Pokemon("Sylveon", { nature: "Quiet", sps: { spa: 32 } })

    const result = calculateMulti(dragapult, partner, new Move("Draco Meteor", { timesUsed: 3 }), new Move("Moonblast", { timesUsed: 3 }), dondozo("Unaware"), field())

    expect(result.description()).not.toContain("stat changes considered")
  })
})

describe("Times used in a row — chance to KO within some of the uses", () => {
  const dracoMeteorThreeTimes = () => calculate(new Pokemon("Dragapult", { nature: "Modest", sps: { spa: 32 }, item: "Choice Specs" } as never), new Pokemon("Snorlax"), new Move("Draco Meteor", { timesUsed: 3 }), field())

  it("counts only the uses within the hits asked for", () => {
    const result = dracoMeteorThreeTimes()

    expect(result.koChanceWithin(2)).toEqual(99 / 256)
    expect(result.koChanceWithin(3)).toEqual(1)
  })

  it("counts only the rolls up to the roll asked for in every use", () => {
    const result = dracoMeteorThreeTimes()

    expect(result.koChanceWithin(2, 7)).toEqual(0)
  })
})
