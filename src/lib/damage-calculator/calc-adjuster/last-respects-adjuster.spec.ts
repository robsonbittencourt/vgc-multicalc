import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import { Move } from '../../move'
import { MoveSet } from '../../moveset'
import { Pokemon } from '../../pokemon'
import { Target } from '../../target'
import { LastRespectsAdjuster } from './last-respects-adjuster'

describe("Last Respects Adjuster", () => {
  it("Last Respects BP should be 50 when no ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "0" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Basculegion", { moveSet: new MoveSet(move, new Move("Wave Crash"), new Move("Flip Turn"), new Move("Aqua Jet"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new LastRespectsAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(50)
  })

  it("Last Respects BP should be 100 when 1 ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "1" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Basculegion", { moveSet: new MoveSet(move, new Move("Wave Crash"), new Move("Flip Turn"), new Move("Aqua Jet"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new LastRespectsAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(100)
  })

  it("Last Respects BP should be 150 when 2 allies fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "2" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Basculegion", { moveSet: new MoveSet(move, new Move("Wave Crash"), new Move("Flip Turn"), new Move("Aqua Jet"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new LastRespectsAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Last Respects", () => {
    const move = new Move("Wave Crash")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Basculegion", { moveSet: new MoveSet(move, new Move("Surf"), new Move("Flip Turn"), new Move("Aqua Jet"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new LastRespectsAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})