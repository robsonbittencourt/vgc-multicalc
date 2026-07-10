import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — move guards and special-case damage", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Photon Geyser: uses the higher offensive stat to pick its category", () => {
    const attacker = new Pokemon("Necrozma", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4, spd: 4 } })
    const move = new Move("Photon Geyser")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Necrozma Photon Geyser vs. 252 HP / 4 Def Amoonguss: 218-258 (98.6 - 116.7%) -- 87.5% chance to OHKO")
  })

  it("Shell Side Arm: goes physical when it deals more that way", () => {
    const attacker = new Pokemon("Slowking-Galar", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
    const move = new Move("Shell Side Arm")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Slowking-Galar Shell Side Arm vs. 252 HP / 4 Def Blissey: 210-247 (58 - 68.2%) -- guaranteed 2HKO")
  })

  it("Steel Roller: does nothing without terrain", () => {
    const attacker = new Pokemon("Iron Treads", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Steel Roller")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Poltergeist: is immune against an itemless target", () => {
    const attacker = new Pokemon("Dragapult", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Poltergeist")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Super Fang: deals half the target's current HP", () => {
    const attacker = new Pokemon("Raticate", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 4 } })
    const move = new Move("Super Fang")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(133)
  })

  it("Final Gambit: deals damage equal to the user's current HP", () => {
    const attacker = new Pokemon("Staraptor", { evs: { hp: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 4 } })
    const move = new Move("Final Gambit")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(192)
  })

  it("Endeavor: brings the target down to the user's current HP", () => {
    const attacker = new Pokemon("Sableye", { evs: { hp: 252 }, nature: "Bold", curHP: 40 })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 4 } })
    const move = new Move("Endeavor")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(227)
  })

  it("Wonder Guard: is immune to a neutral hit", () => {
    const attacker = new Pokemon("Palafin", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Shedinja", { ability: "Wonder Guard" })
    const move = new Move("Liquidation")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Bulletproof: blocks a ballistic move", () => {
    const attacker = new Pokemon("Chandelure", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Kommo-o", { evs: { hp: 252, spd: 4 }, ability: "Bulletproof" })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Queenly Majesty: blocks a priority move", () => {
    const attacker = new Pokemon("Metagross", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tsareena", { evs: { hp: 252, def: 4 }, ability: "Queenly Majesty" })
    const move = new Move("Bullet Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Psychic Terrain: blocks a priority move against a grounded target", () => {
    const attacker = new Pokemon("Metagross", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Bullet Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Psychic" }))

    expect(result.damage).toEqual(0)
  })

  it("Tera Shell: halves a super-effective hit at full HP", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Terapagos-Terastal", { evs: { hp: 252, def: 4 }, ability: "Tera Shell" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Tera Shell Terapagos-Terastal: 54-65 (26.7 - 32.1%) -- guaranteed 4HKO")
  })
})
