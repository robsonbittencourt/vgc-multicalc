import { getBasePower, BasePowerContext } from "@lib/calc/engine/base-power"
import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { computeFinalStats } from "@lib/calc/engine/stats"
import { RawDesc } from "@vgc-types/calc-types"

function basePower(
  attackerName: string,
  attackerOptions: Record<string, unknown>,
  defenderName: string,
  defenderOptions: Record<string, unknown>,
  moveName: string,
  fieldOptions: Record<string, unknown> = {},
  hit = 1
): { bp: number; description: RawDesc } {
  const attacker = new Pokemon(attackerName, attackerOptions as never)
  const defender = new Pokemon(defenderName, defenderOptions as never)
  const move = new Move(moveName, { item: attacker.item } as never)
  const field = new Field(fieldOptions as never)

  computeFinalStats(attacker, defender, field, "spe", "atk", "spa", "def", "spd")

  const description = { attackerName, defenderName, moveName } as RawDesc
  const turnOrder = attacker.stats.spe > defender.stats.spe ? "first" : "last"
  const ctx: BasePowerContext = { attacker, defender, move, field, description, turnOrder, hit }

  return { bp: getBasePower(ctx), description }
}

describe("Base power strategy table (gen 0)", () => {
  it("falls back to the move base power for ordinary moves", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Earthquake").bp).toBe(100)
  })

  it("doubles Payback when moving last", () => {
    expect(basePower("Torkoal", {}, "Garchomp", { evs: { spe: 252 }, nature: "Jolly" }, "Payback").bp).toBe(100)
  })

  it("keeps Payback base when moving first", () => {
    expect(basePower("Garchomp", { evs: { spe: 252 }, nature: "Jolly" }, "Torkoal", {}, "Payback").bp).toBe(50)
  })

  it("scales Electro Ball by the speed ratio", () => {
    expect(basePower("Dragapult", { evs: { spe: 252 }, nature: "Timid" }, "Torkoal", {}, "Electro Ball").bp).toBe(150)
  })

  it("scales Gyro Ball inversely by speed", () => {
    expect(basePower("Torkoal", {}, "Dragapult", { evs: { spe: 252 }, nature: "Timid" }, "Gyro Ball").bp).toBe(134)
  })

  it("scales Punishment by defender boosts", () => {
    expect(basePower("Garchomp", {}, "Pelipper", { boosts: { spa: 2 } }, "Punishment").bp).toBe(100)
  })

  it("scales Low Kick by defender weight", () => {
    expect(basePower("Garchomp", {}, "Garchomp", {}, "Low Kick").bp).toBe(80)
  })

  it("scales Heavy Slam by the weight ratio", () => {
    expect(basePower("Corviknight", {}, "Pelipper", {}, "Heavy Slam").bp).toBe(60)
  })

  it("doubles Stored Power per positive boost", () => {
    expect(basePower("Garchomp", { boosts: { atk: 2 } }, "Pelipper", {}, "Stored Power").bp).toBe(60)
  })

  it("doubles Acrobatics without an item", () => {
    expect(basePower("Corviknight", {}, "Pelipper", {}, "Acrobatics").bp).toBe(110)
  })

  it("keeps Acrobatics base with an item", () => {
    expect(basePower("Corviknight", { item: "Leftovers" }, "Pelipper", {}, "Acrobatics").bp).toBe(55)
  })

  it("doubles Hex against a statused target", () => {
    expect(basePower("Dragapult", {}, "Pelipper", { status: "brn" }, "Hex").bp).toBe(130)
  })

  it("doubles Weather Ball under weather", () => {
    expect(basePower("Torkoal", {}, "Pelipper", {}, "Weather Ball", { weather: "Sun" }).bp).toBe(100)
  })

  it("doubles Terrain Pulse on terrain when grounded", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", { terrain: "Electric" }).bp).toBe(100)
  })

  it("doubles Rising Voltage against a grounded target on Electric Terrain", () => {
    expect(basePower("Dragapult", {}, "Garchomp", {}, "Rising Voltage", { terrain: "Electric" }).bp).toBe(140)
  })

  it("keeps Rising Voltage base against an airborne target", () => {
    expect(basePower("Dragapult", {}, "Pelipper", {}, "Rising Voltage", { terrain: "Electric" }).bp).toBe(70)
  })

  it("scales Eruption by current HP", () => {
    expect(basePower("Torkoal", {}, "Pelipper", {}, "Eruption").bp).toBe(150)
  })

  it("scales Reversal by remaining HP at full health", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Reversal").bp).toBe(20)
  })

  it("increases Triple Axel per hit", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Triple Axel", {}, 2).bp).toBe(40)
  })

  it("computes Fling power from the held item", () => {
    expect(basePower("Garchomp", { item: "Iron Ball" }, "Pelipper", {}, "Fling").bp).toBe(130)
  })

  it("records moveBP in the description", () => {
    const { description } = basePower("Dragapult", {}, "Pelipper", { status: "brn" }, "Hex")

    expect(description.moveBP).toBe(130)
  })

  it("does not record moveBP for Assurance", () => {
    const { description } = basePower("Garchomp", {}, "Pelipper", {}, "Assurance")

    expect(description.moveBP).toBeUndefined()
  })
})
