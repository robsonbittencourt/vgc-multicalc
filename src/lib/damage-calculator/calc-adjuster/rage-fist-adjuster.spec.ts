import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import { Move } from '../../move'
import { MoveSet } from '../../moveset'
import { Pokemon } from '../../pokemon'
import { Target } from '../../target'
import { RageFistAdjuster } from './rage-fist-adjuster'

describe("Rage Fist Adjuster", () => {
  it("Rage Fist BP should be 50 when no hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "0" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(move, new Move("Drain Punch"), new Move("Final Gambit"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new RageFistAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(50)
  })

  it("Rage Fist BP should be 100 when 1 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "1" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(move, new Move("Drain Punch"), new Move("Final Gambit"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new RageFistAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(100)
  })

  it("Rage Fist BP should be 150 when 2 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "2" })
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(move, new Move("Drain Punch"), new Move("Final Gambit"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new RageFistAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Rage Fist", () => {
    const move = new Move("Drain Punch")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(move, new Move("Close Combat"), new Move("Final Gambit"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new RageFistAdjuster().adjust(attacker, target.pokemon, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})