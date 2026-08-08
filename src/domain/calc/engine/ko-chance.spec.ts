import { computeMultiHitKOChance, getKOChance, getSurvivesHits, truncateToRoll } from "@calc/engine/ko-chance"
import { calculate, Field, Move, Pokemon } from "@calc"
import { RawDesc } from "@data/types"

describe("getKOChance input guards", () => {
  const attacker = () => new Pokemon("Garchomp")
  const defender = () => new Pokemon("Blissey")
  const rawDesc = () => ({ attackerName: "Garchomp", defenderName: "Blissey" }) as RawDesc

  it("rejects a damage value that is not a number", () => {
    expect(() => getKOChance(attacker(), defender(), new Move("Earthquake"), new Field(), NaN, rawDesc())).toThrow("damage[0] must be a number.")
  })

  it("rejects a damage roll that deals nothing", () => {
    expect(() => getKOChance(attacker(), defender(), new Move("Earthquake"), new Field(), 0, rawDesc())).toThrow("damage[damage.length - 1] === 0.")
  })
})

describe("computeMultiHitKOChance", () => {
  it("treats an already fainted defender as a guaranteed KO", () => {
    const result = computeMultiHitKOChance([[10]], 0, 0, 100, 0, 0)

    expect(result.chance).toBe(1)
    expect(result.anyBerryConsumed).toBe(false)
  })

  it("splits the KO chance across the rolls of a single damage row", () => {
    const result = computeMultiHitKOChance([[50, 90]], 100, -30, 100, 0, 0)

    expect(result.chance).toBe(0.5)
  })

  it("counts a KO caused by end-of-turn damage after the hit lands", () => {
    const result = computeMultiHitKOChance([[50]], 60, -20, 100, 0, 0)

    expect(result.chance).toBe(1)
    expect(result.berryConsumed).toBe(false)
  })

  it("caps healing at the defender's maximum HP", () => {
    const result = computeMultiHitKOChance([[10]], 90, 5, 100, 0, 0)

    expect(result.chance).toBe(0)
  })

  it("applies end-of-turn damage once per turn when rows are grouped", () => {
    const result = computeMultiHitKOChance([[10], [10]], 100, -5, 100, 0, 0, 2, 0)

    expect(result.chance).toBe(0)
  })

  it("scales toxic damage with the counter across turns", () => {
    const result = computeMultiHitKOChance([[10], [10]], 100, 5, 100, 0, 0, 1, 3)

    expect(result.chance).toBe(0)
  })

  it("KOs when the toxic damage outweighs the end-of-turn healing", () => {
    const result = computeMultiHitKOChance([[10], [10]], 100, 5, 100, 0, 0, 1, 8)

    expect(result.chance).toBe(1)
  })

  describe("berry handling", () => {
    it("consumes the berry on the hit that drops the defender below the threshold", () => {
      const result = computeMultiHitKOChance([[50]], 60, -20, 100, 30, 55)

      expect(result.chance).toBe(0)
      expect(result.anyBerryConsumed).toBe(true)
      expect(result.firstBerryTurn).toBe(1)
    })

    it("reports the berry as consumed in the KO when the defender still faints", () => {
      const result = computeMultiHitKOChance([[10, 90]], 95, -40, 100, 25, 50)

      expect(result.chance).toBe(0.5)
      expect(result.berryConsumed).toBe(true)
      expect(result.anyBerryConsumed).toBe(true)
    })

    it("accepts per-row recovery and threshold arrays", () => {
      const result = computeMultiHitKOChance([[60], [60]], 100, 0, 100, [30, 30], [60, 60])

      expect(result.chance).toBe(0)
      expect(result.anyBerryConsumed).toBe(true)
      expect(result.firstBerryTurn).toBe(1)
    })
  })
})

describe("truncateToRoll", () => {
  it("returns every roll when the index is the default worst-case roll", () => {
    expect(truncateToRoll([1, 2, 3, 4, 5], 15)).toEqual([1, 2, 3, 4, 5])
  })

  it("keeps a proportional slice of the rolls for a lower index", () => {
    expect(truncateToRoll([1, 2, 3, 4, 5], 7)).toEqual([1, 2, 3])
  })

  it("always keeps at least one roll", () => {
    expect(truncateToRoll([1, 2, 3, 4, 5], 0)).toEqual([1])
  })
})

describe("getKOChance — toxic damage over multiple turns", () => {
  const incineroar = () => new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
  const blissey = (toxicCounter: number) => new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "tox", toxicCounter })

  it("guarantees the KO in two turns once the toxic counter is high", () => {
    const result = calculate(incineroar(), blissey(8), new Move("Knock Off", { timesUsed: 2 }), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Knock Off over 2 turns vs. 252 HP / 252 Def Blissey: 218-258 (60.2 - 71.2%) -- guaranteed KO in 2 turns after toxic damage")
  })

  it("does not reach the KO in two turns with a low toxic counter", () => {
    const result = calculate(incineroar(), blissey(1), new Move("Knock Off", { timesUsed: 2 }), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Knock Off over 2 turns vs. 252 HP / 252 Def Blissey: 218-258 (60.2 - 71.2%) -- not a KO")
  })

  it("reports a partial KO chance in three turns with a low toxic counter", () => {
    const result = calculate(incineroar(), blissey(1), new Move("Knock Off", { timesUsed: 3 }), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Knock Off over 3 turns vs. 252 HP / 252 Def Blissey: 327-387 (90.3 - 106.9%) -- 92.1% chance to 3HKO after toxic damage")
  })
})

describe("getSurvivesHits — through Result.survivesHits", () => {
  const incineroar = () => new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
  const poisonedBlissey = () => new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "tox", toxicCounter: 3 })

  const resultOf = (move: Move) => calculate(incineroar(), poisonedBlissey(), move, new Field())

  it("survives a single Rock Blast volley", () => {
    expect(resultOf(new Move("Rock Blast")).survivesHits(1)).toBe(true)
  })

  it("survives two Rock Blast volleys", () => {
    expect(resultOf(new Move("Rock Blast")).survivesHits(2)).toBe(true)
  })

  it("does not survive three Rock Blast volleys while poisoned", () => {
    expect(resultOf(new Move("Rock Blast")).survivesHits(3)).toBe(false)
  })

  it("falls back to the KO chance when the hit count is above the supported range", () => {
    expect(resultOf(new Move("Knock Off")).survivesHits(5)).toBe(false)
  })

  it("survives when no hit is requested", () => {
    expect(resultOf(new Move("Knock Off")).survivesHits(0)).toBe(true)
  })

  it("falls back to the KO chance for a move used over several turns", () => {
    expect(resultOf(new Move("Knock Off", { timesUsed: 3 })).survivesHits(2)).toBe(true)
  })
})

describe("getKOChance — berry recovery against a multi hit move", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })

  it("reports the Sitrus Berry recovery in the KO chance", () => {
    const defender = new Pokemon("Blissey", { item: "Sitrus Berry", evs: { hp: 252, def: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("252+ Atk Cloyster Icicle Spear (3 hits) vs. 252 HP / 0 Def Blissey: 228-273 (62.9 - 75.4%) -- guaranteed 2HKO after Sitrus Berry recovery")
  })

  it("reports the Figy Berry recovery on an uninvested defender", () => {
    const defender = new Pokemon("Blissey", { item: "Figy Berry", evs: { hp: 0, def: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("252+ Atk Cloyster Icicle Spear (3 hits) vs. 0 HP / 0 Def Blissey: 228-273 (69 - 82.7%) -- guaranteed 2HKO after Figy Berry recovery")
  })
})

describe("computeMultiHitKOChance — end of turn damage after the berry is eaten", () => {
  const threeRows = () => [
    [30, 32, 35],
    [30, 32, 35],
    [30, 32, 35]
  ]

  it("kills part of the berry branch with end of turn damage", () => {
    const result = computeMultiHitKOChance(threeRows(), 100, -28, 100, 25, 50)

    expect(result).toEqual({ chance: 16 / 27, berryConsumed: true, anyBerryConsumed: true, firstBerryTurn: 2 })
  })

  it("kills the whole berry branch with heavier end of turn damage", () => {
    const result = computeMultiHitKOChance(threeRows(), 100, -35, 100, 25, 50)

    expect(result).toEqual({ chance: 1, berryConsumed: true, anyBerryConsumed: true, firstBerryTurn: 2 })
  })

  it("leaves the berry branch alive when the end of turn damage is small", () => {
    const result = computeMultiHitKOChance(threeRows(), 100, -20, 100, 25, 50)

    expect(result).toEqual({ chance: 1 / 27, berryConsumed: true, anyBerryConsumed: true, firstBerryTurn: 2 })
  })

  it("records the berry turn without any KO when there is no end of turn damage", () => {
    const result = computeMultiHitKOChance(threeRows(), 100, 0, 100, 25, 50)

    expect(result).toEqual({ chance: 0, berryConsumed: false, anyBerryConsumed: true, firstBerryTurn: 2 })
  })
})

describe("computeMultiHitKOChance — end of turn applied per turn group", () => {
  const berryThenChip = () => [[60], [10]]

  it("keeps the berry branch alive through a light end of turn", () => {
    const result = computeMultiHitKOChance(berryThenChip(), 100, -10, 100, 25, 50, 1, 0)

    expect(result).toEqual({ chance: 0, berryConsumed: false, anyBerryConsumed: true, firstBerryTurn: 1 })
  })

  it("faints the berry branch when the end of turn outdamages the recovery", () => {
    const result = computeMultiHitKOChance(berryThenChip(), 100, -40, 100, 25, 50, 1, 0)

    expect(result).toEqual({ chance: 1, berryConsumed: true, anyBerryConsumed: true, firstBerryTurn: 1 })
  })
})

describe("getSurvivesHits — multi hit move against a berry holder", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
  const berryBlissey = () => new Pokemon("Blissey", { item: "Sitrus Berry", evs: { hp: 252, def: 0 } })

  const resultOf = () => calculate(cloyster(), berryBlissey(), new Move("Icicle Spear"), new Field())

  it("survives a single Icicle Spear volley thanks to the berry", () => {
    expect(resultOf().survivesHits(1)).toBe(true)
  })

  it("does not survive two Icicle Spear volleys", () => {
    expect(resultOf().survivesHits(2)).toBe(false)
  })

  it("does not survive three Icicle Spear volleys", () => {
    expect(resultOf().survivesHits(3)).toBe(false)
  })
})

describe("getSurvivesHits — zero damage and metronome guards", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })

  it("always survives a move the defender is immune to", () => {
    const result = calculate(new Pokemon("Snorlax", { evs: { atk: 252 } }), new Pokemon("Gengar", { evs: { hp: 252 } }), new Move("Body Slam"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })

  it("always survives a move that deals no damage", () => {
    const result = calculate(new Pokemon("Magikarp"), blissey(), new Move("Splash"), new Field())

    expect(result.survivesHits(2)).toBe(true)
  })

  it("uses the KO chance path for a move boosted by consecutive Metronome uses", () => {
    const result = calculate(new Pokemon("Cloyster", { evs: { atk: 252 } }), blissey(), new Move("Icicle Spear", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })
})

describe("getSurvivesHits — KO chance without a computed probability", () => {
  it("treats a possible NHKO with no probability as survivable", () => {
    const attacker = new Pokemon("Chien-Pao", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field())

    expect(result.koChance().chance).toBeUndefined()
    expect(result.survivesHits(5)).toBe(true)
    expect(result.survivesHits(6)).toBe(true)
  })
})

describe("multi hit moves whose damage has a single row", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })
  const iceSpear = () => new Move("Icicle Spear")
  const desc = () => ({ attackerName: "Cloyster", defenderName: "Blissey" }) as RawDesc

  it("falls back to the single roll path when the damage matrix has one row", () => {
    const result = getKOChance(cloyster(), blissey(), iceSpear(), new Field(), [[40, 50, 60]] as never, desc())

    expect(result.text).toEqual("possible 7HKO")
    expect(result.n).toEqual(7)
  })

  it("survives two volleys when the damage matrix has one row", () => {
    expect(getSurvivesHits(cloyster(), blissey(), iceSpear(), new Field(), [[40, 50, 60]] as never, desc(), 2, 15)).toBe(true)
  })
})

describe("getSurvivesHits — multi hit volley that can OHKO", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant", item: "Life Orb" })

  it("does not survive a single Icicle Spear volley that can OHKO", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("survives that same volley while holding a Sitrus Berry", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 0 }, item: "Sitrus Berry" })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })

  it("does not survive a single hit move that can OHKO", () => {
    const defender = new Pokemon("Gengar", { evs: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })
})

describe("getSurvivesHits — single hit move and resist berries", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant", item: "Life Orb" })

  it("does not survive a single hit move that KOs outright", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Crash"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("does not survive an Ice move even with the Yache Berry halving it", () => {
    const defender = new Pokemon("Garchomp", { evs: { hp: 0 }, item: "Yache Berry" })

    const result = calculate(cloyster(), defender, new Move("Icicle Crash"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("survives a Fire move halved by the Occa Berry", () => {
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 0 }, item: "Occa Berry" })

    const result = calculate(cloyster(), defender, new Move("Flamethrower"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })
})

describe("getKOChance — move used over several turns against a damaged defender", () => {
  const cloyster = () => new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
  const fullBlissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })

  const damagedBlissey = (curHP: number) => new Pokemon("Blissey", { evs: { hp: 252 }, curHP })

  const reference = () => calculate(cloyster(), fullBlissey(), new Move("Icicle Crash"), new Field())

  it("guarantees the KO when even the lowest roll covers the remaining HP", () => {
    const base = reference()

    const result = getKOChance(cloyster(), damagedBlissey(256), new Move("Icicle Crash", { timesUsed: 2 }), new Field(), base.damage, base.rawDesc)

    expect(result.text).toEqual("guaranteed KO in 2 turns")
  })

  it("reports a possible KO when only the higher rolls cover the remaining HP", () => {
    const base = reference()

    const result = getKOChance(cloyster(), damagedBlissey(279), new Move("Icicle Crash", { timesUsed: 2 }), new Field(), base.damage, base.rawDesc)

    expect(result.text).toEqual("possible KO in 2 turns")
  })

  it("reports no KO when not even the highest roll covers the remaining HP", () => {
    const base = reference()

    const result = getKOChance(cloyster(), damagedBlissey(305), new Move("Icicle Crash", { timesUsed: 2 }), new Field(), base.damage, base.rawDesc)

    expect(result.text).toEqual("not a KO")
  })
})

describe("getKOChance — toxic damage accumulating across five or more hits", () => {
  it("reaches the KO in five hits counting the growing toxic damage", () => {
    const attacker = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "tox", toxicCounter: 1 })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field())

    expect(result.description()).toEqual("0- Atk Magikarp Tackle vs. 252 HP / 252 Def Blissey: 7-9 (1.9 - 2.4%) -- guaranteed 5HKO after toxic damage")
  })
})
