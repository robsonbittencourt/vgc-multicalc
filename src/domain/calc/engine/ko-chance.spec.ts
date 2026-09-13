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

describe("computeMultiHitKOChance — badly poisoned residual damage, judged by Showdown", () => {
  const BLISSEY_MAX_HP = 362
  const LEVEL_ONE_MAX_HP = 11

  const restingTurns = (turns: number) => Array.from({ length: turns }, () => [0])

  it("takes floor(maxHP / 16) on the first turn", () => {
    expect(computeMultiHitKOChance(restingTurns(1), 22, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(1), 23, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(0)
  })

  it("adds another floor(maxHP / 16) per turn instead of scaling the whole fraction", () => {
    expect(computeMultiHitKOChance(restingTurns(2), 66, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(2), 67, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(0)
  })

  it("reaches 330 of the 45 HP after five turns, not 337", () => {
    expect(computeMultiHitKOChance(restingTurns(5), 330, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(5), 331, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(0)
    expect(computeMultiHitKOChance(restingTurns(5), 337, 0, BLISSEY_MAX_HP, 0, 0, 1, 1).chance).toBe(0)
  })

  it("stops growing once the counter reaches fifteen", () => {
    expect(computeMultiHitKOChance(restingTurns(1), 330, 0, BLISSEY_MAX_HP, 0, 0, 1, 15).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(1), 330, 0, BLISSEY_MAX_HP, 0, 0, 1, 20).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(1), 331, 0, BLISSEY_MAX_HP, 0, 0, 1, 20).chance).toBe(0)
  })

  it("never takes less than one HP per counter step", () => {
    expect(computeMultiHitKOChance(restingTurns(1), 3, 0, LEVEL_ONE_MAX_HP, 0, 0, 1, 3).chance).toBe(1)
    expect(computeMultiHitKOChance(restingTurns(1), 4, 0, LEVEL_ONE_MAX_HP, 0, 0, 1, 3).chance).toBe(0)
  })
})

describe("getKOChance — toxic damage over multiple turns", () => {
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = (toxicCounter: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter })

  it("guarantees the KO in two turns once the toxic counter is high", () => {
    const result = calculate(incineroar(), blissey(8), new Move("Knock Off", { timesUsed: 2 }), new Field())

    expect(result.description()).toEqual("32+ Atk Incineroar Knock Off over 2 turns vs. 32 HP / 32 Def Blissey: 218-258 (60.2 - 71.2%) -- guaranteed KO in 2 turns after toxic damage (turn 8)")
  })

  it("does not reach the KO in two turns with a low toxic counter", () => {
    const result = calculate(incineroar(), blissey(1), new Move("Knock Off", { timesUsed: 2 }), new Field())

    expect(result.description()).toEqual("32+ Atk Incineroar Knock Off over 2 turns vs. 32 HP / 32 Def Blissey: 218-258 (60.2 - 71.2%) -- not a KO")
  })

  it("reports a partial KO chance in three turns with a low toxic counter", () => {
    const result = calculate(incineroar(), blissey(1), new Move("Knock Off", { timesUsed: 3 }), new Field())

    expect(result.description()).toEqual("32+ Atk Incineroar Knock Off over 3 turns vs. 32 HP / 32 Def Blissey: 327-387 (90.3 - 106.9%) -- 92.1% chance to 3HKO after toxic damage")
  })
})

describe("getKOChance — multi-hit move finished off by the toxic residual, judged by Showdown", () => {
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = (curHP: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter: 1, curHP })
  const rockBlast = () => new Move("Rock Blast", { hits: 5 })

  const koTextAt = (curHP: number) => calculate(incineroar(), blissey(curHP), rockBlast(), new Field()).koChance().text

  it("kills on the first turn when the five hits leave less HP than the toxic residual", () => {
    expect(koTextAt(171)).toEqual("approx. 94.5% chance to OHKO after toxic damage")
  })

  it("shrinks the first turn chance as the defender climbs out of the residual range", () => {
    expect(koTextAt(175)).toEqual("approx. 68.8% chance to OHKO after toxic damage")
    expect(koTextAt(180)).toEqual("approx. 20.2% chance to OHKO after toxic damage")
  })

  it("needs a second turn once the residual can no longer close the gap", () => {
    expect(koTextAt(193)).toEqual("guaranteed 2HKO after toxic damage")
  })
})

describe("getSurvivesHits — through Result.survivesHits", () => {
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const poisonedBlissey = () => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter: 3 })

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

  it("does not survive a move whose turns of use are already a guaranteed KO", () => {
    expect(resultOf(new Move("Knock Off", { timesUsed: 3 })).survivesHits(2)).toBe(false)
  })
})

describe("getKOChance — berry recovery against a multi hit move", () => {
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })

  it("reports the Sitrus Berry recovery in the KO chance", () => {
    const defender = new Pokemon("Blissey", { item: "Sitrus Berry", sps: { hp: 32, def: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (3 hits) vs. 32 HP / 0 Def Blissey: 228-273 (62.9 - 75.4%) -- guaranteed 2HKO after Sitrus Berry recovery")
  })

  it("reports the Figy Berry recovery on an uninvested defender", () => {
    const defender = new Pokemon("Blissey", { item: "Figy Berry", sps: { hp: 0, def: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("32+ Atk Cloyster Icicle Spear (3 hits) vs. 0 HP / 0 Def Blissey: 228-273 (69 - 82.7%) -- guaranteed 2HKO after Figy Berry recovery")
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

describe("computeMultiHitKOChance — recovery capped before the toxic damage", () => {
  const twoAttackersOverThreeTurns = () => [[4], [4], [4], [4], [4], [4]]

  it("caps the recovery at the maximum HP before subtracting the toxic damage", () => {
    const result = computeMultiHitKOChance(twoAttackersOverThreeTurns(), 362, 22, 362, 0, 0, 2, 5)

    expect(result.chance).toBe(1)
  })
})

describe("computeMultiHitKOChance — recovery larger than the toxic damage", () => {
  const twoAttackersOverTwoTurns = () => [
    [20, 21, 22],
    [20, 21, 22],
    [20, 21, 22],
    [20, 21, 22]
  ]

  it("subtracts the toxic damage from the recovery instead of dropping it", () => {
    const result = computeMultiHitKOChance(twoAttackersOverTwoTurns(), 50, 44, 362, 0, 0, 2, 1)

    expect(result.chance).toBe(1)
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
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })
  const berryBlissey = () => new Pokemon("Blissey", { item: "Sitrus Berry", sps: { hp: 32, def: 0 } })

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
  const blissey = () => new Pokemon("Blissey", { sps: { hp: 32 } })

  it("always survives a move the defender is immune to", () => {
    const result = calculate(new Pokemon("Snorlax", { sps: { atk: 32 } }), new Pokemon("Gengar", { sps: { hp: 32 } }), new Move("Body Slam"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })

  it("always survives a move that deals no damage", () => {
    const result = calculate(new Pokemon("Magikarp"), blissey(), new Move("Splash"), new Field())

    expect(result.survivesHits(2)).toBe(true)
  })

  it("uses the KO chance path for a move boosted by consecutive Metronome uses", () => {
    const result = calculate(new Pokemon("Cloyster", { sps: { atk: 32 } }), blissey(), new Move("Icicle Spear", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })
})

describe("getSurvivesHits — a possible KO with no computed probability", () => {
  const pikachu = () => new Pokemon("Pikachu")
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const damagedBoldBlissey = (curHP: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", curHP })
  const damagedNeutralBlissey = (curHP: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Serious", curHP })

  it("does not survive the turns of use when only the highest rolls reach the remaining HP", () => {
    const result = calculate(pikachu(), damagedBoldBlissey(36), new Move("Quick Attack", { timesUsed: 2 }), new Field())

    expect(result.koChance().chance).toBeUndefined()
    expect(result.survivesHits(2)).toBe(false)
  })

  it("survives the turns of use when not even the highest rolls reach the remaining HP", () => {
    const result = calculate(pikachu(), damagedBoldBlissey(45), new Move("Quick Attack", { timesUsed: 2 }), new Field())

    expect(result.survivesHits(2)).toBe(true)
  })

  it("does not survive a metronome boosted hit that only the highest rolls turn into a KO", () => {
    const result = calculate(incineroar(), damagedNeutralBlissey(48), new Move("Fake Out", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.koChance().chance).toBeUndefined()
    expect(result.survivesHits(1)).toBe(false)
  })

  it("survives a metronome boosted hit that no roll turns into a KO", () => {
    const result = calculate(incineroar(), damagedNeutralBlissey(58), new Move("Fake Out", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })
})

describe("getSurvivesHits — recovery capped before the toxic damage", () => {
  it("faints once the capped recovery no longer offsets the growing toxic damage", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", item: "Leftovers", status: "tox", toxicCounter: 3 })

    const result = calculate(new Pokemon("Happiny"), defender, new Move("Tackle"), new Field())

    expect(result.survivesHits(3)).toBe(true)
    expect(result.survivesHits(4)).toBe(false)
  })
})

describe("getSurvivesHits — regressions found in review", () => {
  it("does not take the shortcut when the berry only halves the first hit", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", item: "Chilan Berry", curHP: 30 })

    const result = calculate(new Pokemon("Pikachu"), defender, new Move("Body Slam"), new Field({ terrain: "Grassy" }))

    expect(result.koChance().n).toBe(2)
    expect([2, 3].map(hits => result.survivesHits(hits))).toEqual([false, false])
  })

  it("keeps each hit of a growing damage ladder apart while searching beyond four hits", () => {
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Unaware", curHP: 79 })

    const result = calculate(new Pokemon("Happiny"), defender, new Move("Lumina Crash"), new Field({ gameType: "Doubles", terrain: "Grassy" }))

    expect([4, 5, 6].map(hits => result.survivesHits(hits))).toEqual([true, false, false])
  })

  it("survives when no hit is requested from a move used over several turns", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter: 3 })

    const result = calculate(new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" }), defender, new Move("Knock Off", { timesUsed: 3 }), new Field())

    expect(result.survivesHits(0)).toBe(true)
  })
})

describe("getSurvivesHits — damage that cannot progress", () => {
  const pikachu = () => new Pokemon("Pikachu")
  const blisseyWithLeftovers = () => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", item: "Leftovers" })

  it("survives any number of hits when the recovery matches the strongest roll", () => {
    const result = calculate(pikachu(), blisseyWithLeftovers(), new Move("Quick Attack"), new Field())

    expect([5, 20, 100].map(hits => result.survivesHits(hits))).toEqual([true, true, true])
  })
})

describe("getSurvivesHits — exact search on both sides of the memo threshold", () => {
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = () => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Serious" })

  it("keeps one answer across the four hit boundary", () => {
    const result = calculate(incineroar(), blissey(), new Move("Fake Out"), new Field())

    expect([1, 2, 3, 4, 5, 6, 7, 8].map(hits => result.survivesHits(hits))).toEqual([true, true, true, true, true, true, false, false])
  })

  it("counts the berry recovery while searching beyond four hits", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", item: "Sitrus Berry" })

    const result = calculate(incineroar(), defender, new Move("Fake Out"), new Field())

    expect([8, 9, 10, 11].map(hits => result.survivesHits(hits))).toEqual([true, true, false, false])
  })
})

describe("getSurvivesHits — KO chance without a computed probability", () => {
  it("does not treat a possible NHKO with no probability as survivable", () => {
    const attacker = new Pokemon("Chien-Pao", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field())

    expect(result.koChance().chance).toBeUndefined()
    expect(result.survivesHits(4)).toBe(true)
    expect(result.survivesHits(5)).toBe(false)
    expect(result.survivesHits(6)).toBe(false)
  })
})

describe("multi hit moves whose damage has a single row", () => {
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = () => new Pokemon("Blissey", { sps: { hp: 32 } })
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
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant", item: "Life Orb" })

  it("does not survive a single Icicle Spear volley that can OHKO", () => {
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("survives that same volley while holding a Sitrus Berry", () => {
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 0 }, item: "Sitrus Berry" })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })

  it("does not survive a single hit move that can OHKO", () => {
    const defender = new Pokemon("Gengar", { sps: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Spear"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })
})

describe("getSurvivesHits — single hit move and resist berries", () => {
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant", item: "Life Orb" })

  it("does not survive a single hit move that KOs outright", () => {
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 0 } })

    const result = calculate(cloyster(), defender, new Move("Icicle Crash"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("does not survive an Ice move even with the Yache Berry halving it", () => {
    const defender = new Pokemon("Garchomp", { sps: { hp: 0 }, item: "Yache Berry" })

    const result = calculate(cloyster(), defender, new Move("Icicle Crash"), new Field())

    expect(result.survivesHits(1)).toBe(false)
  })

  it("survives a Fire move halved by the Occa Berry", () => {
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 0 }, item: "Occa Berry" })

    const result = calculate(cloyster(), defender, new Move("Flamethrower"), new Field())

    expect(result.survivesHits(1)).toBe(true)
  })
})

describe("getKOChance — move used over several turns against a damaged defender", () => {
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })
  const fullBlissey = () => new Pokemon("Blissey", { sps: { hp: 32 } })

  const damagedBlissey = (curHP: number) => new Pokemon("Blissey", { sps: { hp: 32 }, curHP })

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
    const attacker = new Pokemon("Magikarp", { sps: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter: 1 })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field())

    expect(result.description()).toEqual("0- Atk Magikarp Tackle vs. 32 HP / 32 Def Blissey: 7-9 (1.9 - 2.4%) -- guaranteed 5HKO after toxic damage")
  })
})

describe("getKOChanceWithin — through Result.koChanceWithin", () => {
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const cloyster = () => new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant", item: "Life Orb" })

  it("reports no KO chance until the volley that knocks out", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter: 3 })

    const result = calculate(incineroar(), defender, new Move("Rock Blast"), new Field())

    expect([0, 1, 2, 3].map(hits => result.koChanceWithin(hits))).toEqual([0, 0, 0, 1])
  })

  it("keeps the partial chance of a multi hit volley that can OHKO", () => {
    const result = calculate(cloyster(), new Pokemon("Flutter Mane", { sps: { hp: 0 } }), new Move("Icicle Spear"), new Field())

    expect(result.koChanceWithin(1)).toBe(0.75146484375)
  })

  it("reports a certain KO for a single hit whose weakest roll exceeds the maximum HP", () => {
    const result = calculate(cloyster(), new Pokemon("Flutter Mane", { sps: { hp: 0 } }), new Move("Icicle Crash"), new Field())

    expect(result.koChanceWithin(1)).toBe(1)
  })

  it("takes the chance of the last hit along the damage ladder", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Serious" })

    const result = calculate(incineroar(), defender, new Move("Fake Out"), new Field())

    expect([6, 7, 8].map(hits => result.koChanceWithin(hits))).toEqual([0, 0.00021070986986160278, 0.999999463558197])
  })

  it("counts a possible KO over several turns with no computed probability as certain", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold", curHP: 36 })

    const result = calculate(new Pokemon("Pikachu"), defender, new Move("Quick Attack", { timesUsed: 2 }), new Field())

    expect(result.koChanceWithin(2)).toBe(1)
  })

  it("counts a metronome boosted hit that only the highest rolls turn into a KO as certain", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Serious", curHP: 48 })

    const result = calculate(incineroar(), defender, new Move("Fake Out", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.koChanceWithin(1)).toBe(1)
  })

  it("reports no chance for a metronome boosted hit that no roll turns into a KO", () => {
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Serious", curHP: 58 })

    const result = calculate(incineroar(), defender, new Move("Fake Out", { timesUsedWithMetronome: 3 }), new Field())

    expect(result.koChanceWithin(1)).toBe(0)
  })
})

describe("getKOChance — abilities that only reduce the first hit", () => {
  it("stops halving the damage with Multiscale after the defender leaves full HP", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Dragonite", { sps: { hp: 32, def: 1 }, ability: "Multiscale" })

    const result = calculate(attacker, defender, new Move("Drain Punch"), new Field({ gameType: "Doubles" }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Multiscale Dragonite: 19-23 (9.5 - 11.6%) -- possible 5HKO")
  })

  it("stops resisting with Tera Shell after the defender leaves full HP", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Terapagos-Terastal", { sps: { hp: 32, def: 1 }, ability: "Tera Shell" })

    const result = calculate(attacker, defender, new Move("Drain Punch"), new Field({ gameType: "Doubles" }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Tera Shell Terapagos-Terastal: 34-41 (16.8 - 20.2%) -- 3.9% chance to 2HKO")
  })

  it("does not let a Multiscale defender survive two hits it actually dies to", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Timid" })
    const defender = new Pokemon("Dragonite", { sps: { hp: 5, spd: 20 }, ability: "Multiscale" })

    const result = calculate(attacker, defender, new Move("Moonblast"), new Field())

    expect(result.survivesHits(2)).toBe(false)
  })
})
