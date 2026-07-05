import { FairyAuraAdjuster } from "@multicalc/calc-adjuster/fairy-aura-adjuster"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Fairy Aura Adjuster", () => {
  it("should not activate Fairy Aura when there is only one attacker", () => {
    const move = new Move("Moonblast")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Primarina")
    const secondAttacker = undefined
    const target = new CalcPokemon("Toxapex")
    const fieldCalc = new FieldCalc()
    fieldCalc.isFairyAura = false

    new FairyAuraAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isFairyAura).toBe(false)
  })

  it("should activate Fairy Aura when attacker has Fairy Aura ability", () => {
    const move = new Move("Dazzling Gleam")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Floette-Mega")
    const secondAttacker = new Pokemon("Primarina", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Hydro Pump"), new Move("Focus Blast"), new Move("Ice Beam")) })
    const target = new CalcPokemon("Toxapex")
    const fieldCalc = new FieldCalc()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isFairyAura).toBe(true)
  })

  it("should activate Fairy Aura when target has Fairy Aura ability", () => {
    const move = new Move("Moonblast")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Primarina")
    const secondAttacker = new Pokemon("Indeedee", { moveSet: new MoveSet(new Move("Psychic"), new Move("Follow Me"), new Move("Trick Room"), new Move("Protect")) })
    const target = new CalcPokemon("Floette-Mega")
    const fieldCalc = new FieldCalc()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isFairyAura).toBe(true)
  })

  it("should activate Fairy Aura when second attacker has Fairy Aura ability", () => {
    const move = new Move("Moonblast")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Primarina")
    const secondAttacker = new Pokemon("Floette-Mega", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Energy Ball"), new Move("Calm Mind")) })
    const target = new CalcPokemon("Toxapex")
    const fieldCalc = new FieldCalc()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isFairyAura).toBe(true)
  })

  it("should keep Fairy Aura active when field already has it set", () => {
    const move = new Move("Moonblast")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Primarina")
    const secondAttacker = new Pokemon("Indeedee", { moveSet: new MoveSet(new Move("Psychic"), new Move("Follow Me"), new Move("Trick Room"), new Move("Protect")) })
    const target = new CalcPokemon("Toxapex")
    const fieldCalc = new FieldCalc()
    const field = new Field({ isFairyAura: true })

    new FairyAuraAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker, field)

    expect(fieldCalc.isFairyAura).toBe(true)
  })
})
