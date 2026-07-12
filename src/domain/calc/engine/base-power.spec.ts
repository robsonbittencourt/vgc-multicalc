import { getBasePower, BasePowerContext } from "@calc/engine/base-power"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { computeFinalStats } from "@calc/engine/stats"
import { RawDesc } from "@data/types"

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

  it("scales Electro Ball to 150 when the attacker is at least 4x faster", () => {
    expect(basePower("Dragapult", { evs: { spe: 252 }, nature: "Timid" }, "Shuckle", {}, "Electro Ball").bp).toBe(150)
  })

  it("scales Electro Ball to 120 when the attacker is 3x to 4x faster", () => {
    expect(basePower("Dragapult", { evs: { spe: 252 }, nature: "Timid" }, "Aggron", {}, "Electro Ball").bp).toBe(120)
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

  it("caps Electro Ball at 40 when the defender is not slower", () => {
    expect(basePower("Torkoal", {}, "Dragapult", { evs: { spe: 252 }, nature: "Timid" }, "Electro Ball").bp).toBe(40)
  })

  it("keeps Triple Axel description base at 20 for a single hit", () => {
    const move = new Move("Triple Axel", { hits: 1 })
    const description = { attackerName: "Garchomp", defenderName: "Pelipper", moveName: "Triple Axel" } as RawDesc
    const ctx: BasePowerContext = { attacker: new Pokemon("Garchomp", {}), defender: new Pokemon("Pelipper", {}), move, field: new Field(), description, turnOrder: "first", hit: 1 }

    getBasePower(ctx)

    expect(description.moveBP).toBe(20)
  })

  it("scales Reversal to 40 for an attacker between 17/48 and 32/48 remaining HP", () => {
    const probe = new Pokemon("Garchomp", {})
    const attacker = new Pokemon("Garchomp", { curHP: Math.floor((probe.maxHp() * 20) / 48) })
    const move = new Move("Reversal")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(40)
  })

  it("scales Flail to 20 for an attacker with over 32/48 remaining HP fraction", () => {
    const attacker = new Pokemon("Garchomp", {})
    const move = new Move("Flail")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(20)
  })

  it("doubles Smelling Salts against a paralyzed target", () => {
    expect(basePower("Garchomp", {}, "Pelipper", { status: "par" }, "Smelling Salts").bp).toBe(140)
  })

  it("keeps Weather Ball base with no weather and no Mega Sol", () => {
    expect(basePower("Torkoal", {}, "Pelipper", {}, "Weather Ball").bp).toBe(50)
  })

  it("doubles Weather Ball with Mega Sol even without weather", () => {
    expect(basePower("Torkoal", { ability: "Mega Sol" }, "Pelipper", {}, "Weather Ball").bp).toBe(100)
  })

  it("keeps Terrain Pulse base when the attacker is airborne", () => {
    expect(basePower("Corviknight", {}, "Pelipper", {}, "Terrain Pulse", { terrain: "Electric" }).bp).toBe(50)
  })

  it("doubles Barb Barrage against a poisoned target", () => {
    expect(basePower("Garchomp", {}, "Pelipper", { status: "psn" }, "Barb Barrage").bp).toBe(120)
  })

  it("keeps Psyblade base with no Electric Terrain", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Psyblade").bp).toBe(80)
  })

  it("boosts Psyblade on Electric Terrain and records the terrain", () => {
    const { bp, description } = basePower("Garchomp", {}, "Pelipper", {}, "Psyblade", { terrain: "Electric" })

    expect(bp).toBe(120)
    expect(description.terrain).toBe("Electric")
  })

  it("uses 100 base power for Tera Blast with a Stellar Tera Type", () => {
    expect(basePower("Garchomp", { teraType: "Stellar" }, "Pelipper", {}, "Tera Blast").bp).toBe(100)
  })

  it("uses 80 base power for Tera Blast with a non-Stellar Tera Type", () => {
    expect(basePower("Garchomp", { teraType: "Fire" }, "Pelipper", {}, "Tera Blast").bp).toBe(80)
  })

  it("sets Triple Axel description base to 120 when the move resolves 3 hits", () => {
    const move = new Move("Triple Axel", { hits: 3 })
    const description = { attackerName: "Garchomp", defenderName: "Pelipper", moveName: "Triple Axel" } as RawDesc
    const ctx: BasePowerContext = { attacker: new Pokemon("Garchomp", {}), defender: new Pokemon("Pelipper", {}), move, field: new Field(), description, turnOrder: "first", hit: 3 }

    getBasePower(ctx)

    expect(description.moveBP).toBe(120)
  })

  it("scales Hard Press by the defender's remaining HP fraction", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Hard Press").bp).toBe(100)
  })

  it("floors Tera Blast base power at 60 for a Tera STAB move under 60 BP", () => {
    const { bp, description } = basePower("Garchomp", { teraType: "Dragon" }, "Pelipper", {}, "Tera Blast")

    expect(bp).toBe(80)
    expect(description.moveBP).toBe(80)
  })

  it("keeps Infernal Parade base against a target with no status", () => {
    expect(basePower("Dragapult", {}, "Pelipper", {}, "Infernal Parade").bp).toBe(65)
  })

  it("keeps Smelling Salts base against a target with no paralysis", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Smelling Salts").bp).toBe(70)
  })

  it("keeps Barb Barrage base against a target with no poison", () => {
    expect(basePower("Garchomp", {}, "Pelipper", {}, "Barb Barrage").bp).toBe(60)
  })

  it("scales Low Kick to 120 for a very heavy defender", () => {
    expect(basePower("Garchomp", {}, "Onix", {}, "Low Kick").bp).toBe(120)
  })

  it("scales Low Kick to 100 for a heavy defender", () => {
    expect(basePower("Garchomp", {}, "Machamp", {}, "Low Kick").bp).toBe(100)
  })

  it("scales Low Kick to 80 for a mid-weight defender", () => {
    expect(basePower("Garchomp", {}, "Corviknight", {}, "Low Kick").bp).toBe(80)
  })

  it("scales Low Kick to 60 for a lighter defender", () => {
    expect(basePower("Garchomp", {}, "Froslass", {}, "Low Kick").bp).toBe(60)
  })

  it("scales Low Kick to 40 for a light defender", () => {
    expect(basePower("Garchomp", {}, "Staraptor", {}, "Low Kick").bp).toBe(40)
  })

  it("scales Low Kick to 20 for a very light defender", () => {
    expect(basePower("Garchomp", {}, "Diglett", {}, "Low Kick").bp).toBe(20)
  })

  it("scales Heavy Slam to 120 for an extreme weight ratio", () => {
    expect(basePower("Cosmoem", {}, "Diglett", {}, "Heavy Slam").bp).toBe(120)
  })

  it("scales Heavy Slam to 100 for a large weight ratio", () => {
    expect(basePower("Metagross", {}, "Machamp", {}, "Heavy Slam").bp).toBe(100)
  })

  it("scales Heavy Slam to 80 for a moderate weight ratio", () => {
    expect(basePower("Torkoal", {}, "Froslass", {}, "Heavy Slam").bp).toBe(80)
  })

  it("scales Heavy Slam to 40 for a small weight ratio", () => {
    expect(basePower("Garchomp", {}, "Torkoal", {}, "Heavy Slam").bp).toBe(40)
  })

  it("uses 1 as a floor for Hard Press when the defender HP fraction rounds to zero", () => {
    const defender = new Pokemon("Pelipper", {})
    const attacker = new Pokemon("Garchomp", {})
    const move = new Move("Hard Press")
    const field = new Field()

    computeFinalStats(attacker, defender, field, "spe", "atk", "spa", "def", "spd")

    const description = { attackerName: "Garchomp", defenderName: "Pelipper", moveName: "Hard Press" } as RawDesc
    const ctx: BasePowerContext = { attacker, defender: new Pokemon("Pelipper", { curHP: 1 }), move, field, description, turnOrder: "first", hit: 1 }

    expect(getBasePower(ctx)).toBe(1)
  })

  it("scales Flail to 200 for an attacker at 1/48 or less remaining HP", () => {
    const attacker = new Pokemon("Garchomp", { curHP: 1 })
    const move = new Move("Flail")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(200)
  })

  it("scales Reversal to 150 for an attacker between 2/48 and 4/48 remaining HP", () => {
    const probe = new Pokemon("Garchomp", {})
    const attacker = new Pokemon("Garchomp", { curHP: Math.floor(probe.maxHp() * 0.06) })
    const move = new Move("Reversal")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(150)
  })

  it("scales Flail to 100 for an attacker between 5/48 and 9/48 remaining HP", () => {
    const probe = new Pokemon("Garchomp", {})
    const attacker = new Pokemon("Garchomp", { curHP: Math.floor((probe.maxHp() * 8) / 48) })
    const move = new Move("Flail")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(100)
  })

  it("scales Reversal to 80 for an attacker between 10/48 and 16/48 remaining HP", () => {
    const probe = new Pokemon("Garchomp", {})
    const attacker = new Pokemon("Garchomp", { curHP: Math.floor((probe.maxHp() * 14) / 48) })
    const move = new Move("Reversal")

    expect(getBasePower({ attacker, defender: new Pokemon("Pelipper", {}), move, field: new Field(), description: {} as RawDesc, turnOrder: "first", hit: 1 })).toBe(80)
  })
})
