import { buildAttackerDescription, buildDefenderDescription, buildDefenderTail, buildDescription, getRecoil, serializeText, toDisplay } from "@calc/engine/description-text"
import { calculate, Field, Move, Pokemon } from "@calc"
import { RawDesc } from "@data/types"

describe("buildDefenderTail", () => {
  it("includes the defender item by default", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", defenderItem: "Leftovers" } as RawDesc

    expect(buildDefenderTail(description)).toBe("Leftovers Blissey")
  })

  it("omits the defender item when asked to", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", defenderItem: "Leftovers" } as RawDesc

    expect(buildDefenderTail(description, true)).toBe("Blissey")
  })

  it("describes the Ruin abilities affecting the defender", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", isTabletsOfRuin: true, isVesselOfRuin: true } as RawDesc

    expect(buildDefenderTail(description)).toBe("Tablets of Ruin Vessel of Ruin Blissey")
  })

  it("describes a protected and Terastalized defender", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", isProtected: true, defenderTera: "Water" } as RawDesc

    expect(buildDefenderTail(description)).toBe("protected Tera Water Blissey")
  })
})

describe("buildAttackerDescription", () => {
  const base = { attackerName: "Garchomp", defenderName: "Blissey" } as RawDesc

  it("mentions a burned attacker", () => {
    expect(buildAttackerDescription({ ...base, isBurned: true } as RawDesc)).toContain("burned")
  })

  it("credits an ally's Flower Gift on the attacking side", () => {
    expect(buildAttackerDescription({ ...base, isFlowerGiftAttacker: true } as RawDesc)).toContain("with an ally's Flower Gift")
  })

  it("credits an ally's Steely Spirit on the attacking side", () => {
    expect(buildAttackerDescription({ ...base, isSteelySpiritAttacker: true } as RawDesc)).toContain("with an ally's Steely Spirit")
  })

  it("shows the resolved move type when the base power is not overridden", () => {
    expect(buildAttackerDescription({ ...base, moveName: "Tera Blast", moveType: "Fire" } as RawDesc)).toBe("Garchomp Tera Blast (Fire) ")
  })
})

describe("buildDefenderTail — ally effects", () => {
  const base = { attackerName: "Garchomp", defenderName: "Blissey" } as RawDesc

  it("credits an ally's Flower Gift on the defending side", () => {
    expect(buildDefenderTail({ ...base, isFlowerGiftDefender: true } as RawDesc)).toBe("Blissey with an ally's Flower Gift")
  })

  it("mentions Power Trick on the defending side", () => {
    expect(buildDefenderTail({ ...base, isPowerTrickDefender: true } as RawDesc)).toBe("Blissey with Power Trick")
  })
})

describe("serializeText", () => {
  it("returns an empty string for no entries", () => {
    expect(serializeText([])).toBe("")
  })

  it("returns the single entry unchanged", () => {
    expect(serializeText(["Stealth Rock"])).toBe("Stealth Rock")
  })

  it("joins two entries with and", () => {
    expect(serializeText(["Stealth Rock", "poison damage"])).toBe("Stealth Rock and poison damage")
  })
})

describe("toDisplay", () => {
  it("converts to a percentage of the maximum", () => {
    expect(toDisplay("%", 50, 200)).toBe(25)
  })

  it("converts to forty-eighths in HP notation", () => {
    expect(toDisplay("HP", 50, 200)).toBe(12)
  })
})

describe("buildDefenderDescription", () => {
  it("keeps the defender item by default", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", defenderItem: "Leftovers" } as RawDesc

    expect(buildDefenderDescription(description)).toContain("Leftovers")
  })

  it("drops the defender item when asked to", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey", defenderItem: "Leftovers" } as RawDesc

    expect(buildDefenderDescription(description, true)).not.toContain("Leftovers")
  })
})

describe("buildDescription", () => {
  it("joins the attacker and defender sides with vs.", () => {
    const description = { attackerName: "Garchomp", defenderName: "Blissey" } as RawDesc

    expect(buildDescription(description)).toContain(" vs. Blissey")
  })
})

describe("getRecoil", () => {
  it("reports no recoil for a move without any recoil component", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const { recoil, text } = getRecoil(attacker, defender, new Move("Earthquake"), [100, 110])

    expect(recoil).toEqual([0, 0])
    expect(text).toBe("")
  })

  it("reports crash damage in percent notation", () => {
    const attacker = new Pokemon("Hitmonlee", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const { recoil, text } = getRecoil(attacker, defender, new Move("High Jump Kick"), [100, 110])

    expect(recoil).toBe(24)
    expect(text).toBe("50% crash damage")
  })

  it("reports crash damage in HP notation", () => {
    const attacker = new Pokemon("Hitmonlee", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const { recoil } = getRecoil(attacker, defender, new Move("High Jump Kick"), [100, 110], "HP")

    expect(recoil).toBe(50)
  })

  it("reports struggle damage", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const { recoil, text } = getRecoil(attacker, defender, new Move("Struggle"), [100, 110])

    expect(recoil).toBe(12)
    expect(text).toBe("25% struggle damage")
  })

  it("omits recoil text when the attacker has Rock Head", () => {
    const attacker = new Pokemon("Aggron", { evs: { atk: 252 }, nature: "Adamant", ability: "Rock Head" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const { text } = getRecoil(attacker, defender, new Move("Double-Edge"), [100, 110])

    expect(text).toBe("")
  })

  it("caps recoil at the defender's remaining HP when the damage overflows it", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })
    const overkill = defender.maxHp() * 2

    const { text } = getRecoil(attacker, defender, new Move("Double-Edge"), [overkill, overkill])

    expect(text).toContain("recoil damage")
  })
})

describe("getRecovery", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })
  const garchomp = (options: Record<string, unknown> = {}) => new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ...options } as never)

  it("reports no recovery for a move that neither drains nor heals", () => {
    const result = calculate(garchomp(), blissey(), new Move("Earthquake"), new Field())

    expect(result.recovery()).toEqual({ recovery: [0, 0], text: "" })
  })

  it("caps Shell Bell recovery at an eighth of the defender's current HP", () => {
    const result = calculate(garchomp({ item: "Shell Bell" }), blissey(), new Move("Earthquake"), new Field())

    expect(result.recovery()).toEqual({ recovery: [45, 45], text: "24.5 - 24.5% recovered" })
  })

  it("scales Shell Bell recovery with the damage dealt when it stays under the cap", () => {
    const attacker = new Pokemon("Blissey", { item: "Shell Bell" })

    const result = calculate(attacker, blissey(), new Move("Tackle"), new Field())

    expect(result.recovery()).toEqual({ recovery: [3, 4], text: "0.9 - 1.2% recovered" })
  })

  it("recovers nothing from Shell Bell when the target is immune to the move", () => {
    const result = calculate(garchomp({ item: "Shell Bell" }), new Pokemon("Pelipper", { evs: { hp: 252 } }), new Move("Earthquake"), new Field())

    expect(result.recovery()).toEqual({ recovery: [0, 0], text: "" })
  })

  it("reports the drain as lost when Pain Split leaves the attacker with less HP", () => {
    const result = calculate(new Pokemon("Blissey", { evs: { hp: 252 } }), new Pokemon("Shedinja"), new Move("Pain Split"), new Field())

    expect(result.recovery()).toEqual({ recovery: [-181, -181], text: "-50 - -50% lost" })
  })

  it("drains from the combined damage range of a multi-hit move", () => {
    const result = calculate(garchomp(), blissey(), new Move("Drain Punch", { hits: 2 }), new Field())

    expect(result.recovery()).toEqual({ recovery: [181, 181], text: "98.9 - 98.9% recovered" })
  })

  it("drains from the combined damage range of both Parental Bond hits", () => {
    const attacker = new Pokemon("Kangaskhan", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })

    const result = calculate(attacker, blissey(), new Move("Drain Punch"), new Field())

    expect(result.recovery()).toEqual({ recovery: [190, 224], text: "105.5 - 124.4% recovered" })
  })

  it("averages both current HP values for Pain Split", () => {
    const result = calculate(garchomp(), blissey(), new Move("Pain Split"), new Field())

    expect(result.recovery()).toEqual({ recovery: [89, 89], text: "48.6 - 48.6% recovered" })
  })

  it("drains half of the damage dealt", () => {
    const result = calculate(garchomp(), blissey(), new Move("Drain Punch"), new Field())

    expect(result.recovery()).toEqual({ recovery: [181, 181], text: "98.9 - 98.9% recovered" })
  })

  it("increases the drained amount when the attacker holds Big Root", () => {
    const result = calculate(garchomp({ item: "Big Root" }), blissey(), new Move("Drain Punch"), new Field())

    expect(result.recovery()).toEqual({ recovery: [235, 235], text: "128.4 - 128.4% recovered" })
  })
})

describe("getRecoil — crash and self-inflicted damage", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })

  it("reports crash damage for High Jump Kick", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, blissey(), new Move("High Jump Kick"), new Field())

    expect(result.recoil()).toEqual({ recoil: 24, text: "50% crash damage" })
  })

  it("reports the fixed self-damage of Mind Blown", () => {
    const attacker = new Pokemon("Blacephalon", { evs: { spa: 252 }, nature: "Modest" })

    const result = calculate(attacker, blissey(), new Move("Mind Blown"), new Field())

    expect(result.recoil()).toEqual({ recoil: 24, text: "50% recoil damage" })
  })
})

describe("getRecoil — HP notation", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })

  it("reports struggle recoil in absolute HP", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, blissey(), new Move("Struggle"), new Field())

    expect(result.recoil("hp")).toEqual({ recoil: 25, text: "25% struggle damage" })
  })

  it("reports Mind Blown self-damage in absolute HP", () => {
    const attacker = new Pokemon("Blacephalon", { evs: { spa: 252 }, nature: "Modest" })

    const result = calculate(attacker, blissey(), new Move("Mind Blown"), new Field())

    expect(result.recoil("hp")).toEqual({ recoil: 50, text: "50% recoil damage" })
  })
})
