import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"
import { CriticalHitAdjuster } from "./critical-hit-adjuster"
import { Field } from "@multicalc/model/field"

describe("Critical Hit Adjuster", () => {
  it("should force a critical hit when a high crit ratio move is used by a Leek holder", () => {
    const move = new Move("Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Farfetch’d", { item: "Leek" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })

  it("should force a critical hit for Galarian Farfetch'd holding a Leek", () => {
    const move = new Move("Night Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Farfetch’d-Galar", { item: "Leek" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })

  it("should force a critical hit for Sirfetch'd holding a Leek", () => {
    const move = new Move("Leaf Blade")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Sirfetch’d", { item: "Leek" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })

  it("should force a critical hit when Super Luck is combined with a Scope Lens and a high crit ratio move", () => {
    const move = new Move("Night Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Absol", { ability: "Super Luck", item: "Scope Lens" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })

  it("should force a critical hit when a stage two move is combined with a Scope Lens", () => {
    const move = new Move("10,000,000 Volt Thunderbolt")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Pikachu", { item: "Scope Lens" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })

  it("should NOT force a critical hit when the move alone has a high crit ratio", () => {
    const move = new Move("Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Farfetch’d")
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should NOT force a critical hit when a Scope Lens is combined with a high crit ratio move", () => {
    const move = new Move("Stone Edge")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Tyranitar", { item: "Scope Lens" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should NOT force a critical hit when Super Luck is combined with a high crit ratio move", () => {
    const move = new Move("Night Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Absol", { ability: "Super Luck" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should NOT force a critical hit when a Leek is held by a Pokemon that is not a Farfetch'd line member", () => {
    const move = new Move("Slash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { item: "Leek" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should NOT force a critical hit when a Leek holder uses a move without a high crit ratio", () => {
    const move = new Move("Brave Bird")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Farfetch’d", { item: "Leek" })
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should NOT force a critical hit for a Pokemon without any critical hit source", () => {
    const move = new Move("Flamethrower")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Arcanine")
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(false)
  })

  it("should keep a critical hit that was already set by the field toggle", () => {
    const move = new Move("Flamethrower")
    const moveCalc = new MoveCalc(move.name)
    moveCalc.isCrit = true
    const attacker = new CalcPokemon("Arcanine")
    const target = new CalcPokemon("Gardevoir")
    const calcField = new FieldCalc()

    new CriticalHitAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, new Field())

    expect(moveCalc.isCrit).toBe(true)
  })
})
