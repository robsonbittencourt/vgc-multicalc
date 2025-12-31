import { RuinationCalculator } from "@lib/damage-calculator/specific-damage-calculator/ruination-calculator"
import { Field as FieldSmogon, Generations, Move as MoveSmogon, Pokemon as PokemonSmogon, calculate } from "@robsonbittencourt/calc"

describe("Ruination Calculator", () => {
  const gen = Generations.get(9)
  let calculator: RuinationCalculator

  beforeEach(() => {
    calculator = new RuinationCalculator()
  })

  it("should return true for isApplicable when move is Ruination", () => {
    const moveModel = new MoveSmogon(gen, "Ruination")

    const result = calculator.isApplicable(moveModel)

    expect(result).toBe(true)
  })

  it("should return false for isApplicable when move is not Ruination", () => {
    const moveModel = new MoveSmogon(gen, "Thunderbolt")

    const result = calculator.isApplicable(moveModel)

    expect(result).toBe(false)
  })

  it("should calculate damage as half of defender HP rounded down", () => {
    const attacker = new PokemonSmogon(gen, "Wo-Chien", { level: 50 })
    const target = new PokemonSmogon(gen, "Flutter Mane", { level: 50 })
    target.originalCurHP = 130
    const move = new MoveSmogon(gen, "Ruination")
    const field = new FieldSmogon()
    const baseResult = calculate(gen, attacker, target, move, field)

    const result = calculator.calculate(target, baseResult)

    expect(result.damage).toBe(65)
    expect(result.desc()).toEqual("Wo-Chien Ruination vs. 0 HP Flutter Mane: 65-65 (50 - 50%)")
  })

  it("should calculate damage with minimum 1 damage when target has very low HP", () => {
    const attacker = new PokemonSmogon(gen, "Wo-Chien")
    const target = new PokemonSmogon(gen, "Flutter Mane")
    target.originalCurHP = 1
    const move = new MoveSmogon(gen, "Ruination")
    const field = new FieldSmogon()
    const baseResult = calculate(gen, attacker, target, move, field)

    const result = calculator.calculate(target, baseResult)

    expect(result.damage).toBe(1)
    expect(Array(16).fill(result.damage)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })

  it("should not modify description when result is guaranteed OHKO", () => {
    const attacker = new PokemonSmogon(gen, "Wo-Chien")
    const target = new PokemonSmogon(gen, "Flutter Mane")
    target.originalCurHP = 1
    const move = new MoveSmogon(gen, "Ruination")
    const field = new FieldSmogon()
    const baseResult = calculate(gen, attacker, target, move, field)
    const originalDesc = baseResult.desc

    const result = calculator.calculate(target, baseResult)

    expect(result.desc.toString()).toBe(originalDesc.toString())
  })

  it("should remove KO chance from description when result is not guaranteed OHKO", () => {
    const attacker = new PokemonSmogon(gen, "Wo-Chien", { level: 50 })
    const target = new PokemonSmogon(gen, "Flutter Mane", { level: 50 })
    target.originalCurHP = 130
    const move = new MoveSmogon(gen, "Ruination")
    const field = new FieldSmogon()
    const baseResult = calculate(gen, attacker, target, move, field)

    const result = calculator.calculate(target, baseResult)

    expect(result.desc()).toEqual("Wo-Chien Ruination vs. 0 HP Flutter Mane: 65-65 (50 - 50%)")
  })
})
