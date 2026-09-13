import { calculate, Field, Move, Pokemon } from "@calc"

describe("calculate — moves whose base power resolves to zero", () => {
  const machamp = () => new Pokemon("Machamp", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = () => new Pokemon("Blissey", { sps: { hp: 32 } })

  const damageOf = (moveName: string) => calculate(machamp(), blissey(), new Move(moveName), new Field()).damage

  it("deals no damage with Counter, which depends on the damage taken", () => {
    expect(damageOf("Counter")).toEqual(0)
  })

  it("deals no damage with Mirror Coat, which depends on the damage taken", () => {
    expect(damageOf("Mirror Coat")).toEqual(0)
  })

  it("deals no damage with Bide, which depends on the damage stored", () => {
    expect(damageOf("Bide")).toEqual(0)
  })

  it("deals no damage with Return, which depends on happiness", () => {
    expect(damageOf("Return")).toEqual(0)
  })

  it("deals no damage with Beat Up, which depends on the rest of the party", () => {
    expect(damageOf("Beat Up")).toEqual(0)
  })

  it("deals no damage with Present, whose power is random", () => {
    expect(damageOf("Present")).toEqual(0)
  })
})

describe("calculate — burn applied to the attacker", () => {
  const blissey = () => new Pokemon("Blissey", { sps: { hp: 32 } })

  it("halves the physical damage of a burned attacker", () => {
    const attacker = new Pokemon("Garchomp", { sps: { atk: 32 }, nature: "Adamant", status: "brn" })

    const result = calculate(attacker, blissey(), new Move("Earthquake"), new Field())

    expect(result.description()).toEqual("32+ Atk burned Garchomp Earthquake vs. 32 HP / 0 Def Blissey: 187-221 (51.6 - 61%) -- guaranteed 2HKO")
  })

  it("ignores the burn drop when the attacker has Guts", () => {
    const attacker = new Pokemon("Ursaluna", { ability: "Guts", sps: { atk: 32 }, nature: "Adamant", status: "brn" })

    const result = calculate(attacker, blissey(), new Move("Earthquake"), new Field())

    expect(result.description()).toEqual("32+ Atk Guts Ursaluna Earthquake vs. 32 HP / 0 Def Blissey: 592-697 (163.5 - 192.5%) -- guaranteed OHKO")
  })

  it("ignores the burn drop for Facade", () => {
    const attacker = new Pokemon("Garchomp", { sps: { atk: 32 }, nature: "Adamant", status: "brn" })

    const result = calculate(attacker, blissey(), new Move("Facade"), new Field())

    expect(result.description()).toEqual("32+ Atk Garchomp Facade (140 BP) vs. 32 HP / 0 Def Blissey: 350-412 (96.6 - 113.8%) -- 81.3% chance to OHKO")
  })
})

describe("calculate — Acrobatics with a suppressed item", () => {
  const hawlucha = (options: Record<string, unknown> = {}) => new Pokemon("Hawlucha", { sps: { atk: 32 }, nature: "Adamant", ...options } as never)
  const snorlax = () => new Pokemon("Snorlax", { sps: { hp: 32 } })

  const maxDamage = (attacker: Pokemon, field: Field) => Math.max(...(calculate(attacker, snorlax(), new Move("Acrobatics"), field).damage as number[]))

  it("does not double Acrobatics when Magic Room only suppresses the item", () => {
    const withoutItem = maxDamage(hawlucha(), new Field())
    const underMagicRoom = maxDamage(hawlucha({ item: "Life Orb" }), new Field({ isMagicRoom: true } as never))

    expect(underMagicRoom).toBeLessThan(withoutItem)
  })

  it("does not double Acrobatics when Klutz only suppresses the item", () => {
    const withoutItem = maxDamage(hawlucha(), new Field())
    const withKlutz = maxDamage(hawlucha({ item: "Life Orb", ability: "Klutz" }), new Field())

    expect(withKlutz).toBeLessThan(withoutItem)
  })
})
