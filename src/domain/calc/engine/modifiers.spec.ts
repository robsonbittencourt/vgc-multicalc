import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { getAtMods, getBpMods, getDfMods, getFinalMods, ModifierContext } from "@calc/engine/modifiers"
import { RawDesc } from "@data/types"

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
})

describe("getFinalMods", () => {
  it("Life Orb boosts final mods", () => {
    const attacker = new Pokemon("Garchomp", { item: "Life Orb" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getFinalMods(ctx)).toContain(5324)
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
