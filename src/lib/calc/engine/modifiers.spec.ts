import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { getAtMods, getBpMods, getDfMods, getFinalMods, ModifierContext } from "@lib/calc/engine/modifiers"
import { RawDesc } from "@lib/calc/model/types"

function makeCtx(overrides: Partial<ModifierContext> & { attacker: Pokemon; defender: Pokemon; move: Move }): ModifierContext {
  return {
    field: new Field(),
    description: {} as RawDesc,
    isCritical: false,
    turnOrder: "first",
    hasAteAbilityTypeChange: false,
    basePower: overrides.move.bp,
    typeEffectiveness: 1,
    hitCount: 0,
    hit: 1,
    hitsPhysical: overrides.move.category === "Physical",
    ...overrides
  }
}

describe("getBpMods", () => {
  it("Facade + status doubles BP", () => {
    const attacker = new Pokemon("Tauros", { status: "brn" })
    const defender = new Pokemon("Garchomp")
    const move = new Move("Facade")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getBpMods(ctx)).toContain(8192)
  })

  it("Facade without status: no mod", () => {
    const attacker = new Pokemon("Tauros")
    const defender = new Pokemon("Garchomp")
    const move = new Move("Facade")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getBpMods(ctx)).not.toContain(8192)
  })

  it("Helping Hand boosts BP", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Garchomp")
    const move = new Move("Shadow Ball")
    const field = new Field({ attackerSide: { isHelpingHand: true } })
    const ctx = makeCtx({ attacker, defender, move, field })
    expect(getBpMods(ctx)).toContain(6144)
  })

  it("Electric terrain + Electric move boosts BP", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Garchomp")
    const move = new Move("Thunderbolt")
    const field = new Field({ terrain: "Electric" })
    const ctx = makeCtx({ attacker, defender, move, field })
    expect(getBpMods(ctx)).toContain(5325)
  })

  it("Grassy terrain halves Earthquake", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Garchomp")
    const move = new Move("Earthquake")
    const field = new Field({ terrain: "Grassy" })
    const ctx = makeCtx({ attacker, defender, move, field })
    expect(getBpMods(ctx)).toContain(2048)
  })

  it("Life Orb boosts final mods", () => {
    const attacker = new Pokemon("Garchomp", { item: "Life Orb" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getFinalMods(ctx)).toContain(5324)
  })

  it("Reflect reduces physical damage in singles", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")
    const field = new Field({ defenderSide: { isReflect: true } })
    const ctx = makeCtx({ attacker, defender, move, field })
    expect(getFinalMods(ctx)).toContain(2048)
  })

  it("Friend Guard reduces damage", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")
    const field = new Field({ defenderSide: { isFriendGuard: true } })
    const ctx = makeCtx({ attacker, defender, move, field })
    expect(getFinalMods(ctx)).toContain(3072)
  })
})

describe("getAtMods", () => {
  it("Choice Band boosts Physical", () => {
    const attacker = new Pokemon("Garchomp", { item: "Choice Band" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getAtMods(ctx)).toContain(6144)
  })

  it("Choice Specs boosts Special", () => {
    const attacker = new Pokemon("Gengar", { item: "Choice Specs" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Shadow Ball")
    const ctx = makeCtx({ attacker, defender, move, hitsPhysical: false })
    expect(getAtMods(ctx)).toContain(6144)
  })

  it("Huge Power doubles Physical atk", () => {
    const attacker = new Pokemon("Azumarill", { ability: "Huge Power" })
    const defender = new Pokemon("Garchomp")
    const move = new Move("Play Rough")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getAtMods(ctx)).toContain(8192)
  })
})

describe("getDfMods", () => {
  it("Fur Coat halves Physical damage", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Furfrou", { ability: "Fur Coat" })
    const move = new Move("Earthquake")
    const ctx = makeCtx({ attacker, defender, move })
    expect(getDfMods(ctx)).toContain(8192)
  })

  it("Fur Coat no mod on Special", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Furfrou", { ability: "Fur Coat" })
    const move = new Move("Shadow Ball")
    const ctx = makeCtx({ attacker, defender, move, hitsPhysical: false })
    expect(getDfMods(ctx)).not.toContain(8192)
  })
})
