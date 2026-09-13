import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — move guards and special-case damage", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Photon Geyser: uses the higher offensive stat to pick its category", () => {
    const attacker = new Pokemon("Necrozma", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1, spd: 1 } })
    const move = new Move("Photon Geyser")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Necrozma Photon Geyser vs. 32 HP / 1 Def Amoonguss: 218-258 (98.6 - 116.7%) -- 87.5% chance to OHKO")
  })

  it("Shell Side Arm: goes physical when it deals more that way", () => {
    const attacker = new Pokemon("Slowking-Galar", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 1 } })
    const move = new Move("Shell Side Arm")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Slowking-Galar Shell Side Arm vs. 32 HP / 1 Def Blissey: 210-247 (58 - 68.2%) -- guaranteed 2HKO")
  })

  it("Steel Roller: does nothing without terrain", () => {
    const attacker = new Pokemon("Iron Treads", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Steel Roller")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Poltergeist: is immune against an itemless target", () => {
    const attacker = new Pokemon("Dragapult", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Poltergeist")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Super Fang: deals half the target's current HP", () => {
    const attacker = new Pokemon("Raticate", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, def: 1 } })
    const move = new Move("Super Fang")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(133)
  })

  it("Final Gambit: deals damage equal to the user's current HP", () => {
    const attacker = new Pokemon("Staraptor", { sps: { hp: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, def: 1 } })
    const move = new Move("Final Gambit")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(192)
  })

  it("Endeavor: brings the target down to the user's current HP", () => {
    const attacker = new Pokemon("Sableye", { sps: { hp: 32 }, nature: "Bold", curHP: 40 })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, def: 1 } })
    const move = new Move("Endeavor")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(227)
  })

  it("Wonder Guard: is immune to a neutral hit", () => {
    const attacker = new Pokemon("Palafin", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Shedinja", { ability: "Wonder Guard" })
    const move = new Move("Liquidation")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Bulletproof: blocks a ballistic move", () => {
    const attacker = new Pokemon("Chandelure", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Kommo-o", { sps: { hp: 32, spd: 1 }, ability: "Bulletproof" })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Queenly Majesty: blocks a priority move", () => {
    const attacker = new Pokemon("Metagross", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Tsareena", { sps: { hp: 32, def: 1 }, ability: "Queenly Majesty" })
    const move = new Move("Bullet Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Psychic Terrain: blocks a priority move against a grounded target", () => {
    const attacker = new Pokemon("Metagross", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Bullet Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Psychic" }))

    expect(result.damage).toEqual(0)
  })

  it("Tera Shell: halves a super-effective hit at full HP", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Terapagos-Terastal", { sps: { hp: 32, def: 1 }, ability: "Tera Shell" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Close Combat vs. 32 HP / 1 Def Tera Shell Terapagos-Terastal: 54-65 (26.7 - 32.1%) -- guaranteed 2HKO")
  })
})
