import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"
import { NeutralizingGasAdjuster } from "./neutralizing-gas-adjuster"
import { Field } from "@multicalc/model/field"
import { AbilityName } from "@data/types"
import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"

describe("Neutralizing Gas Adjuster", () => {
  it("Should remove ability when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu")
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability and turn off if Paradox when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Flutter Mane", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const target = new CalcPokemon("Iron Valiant", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(attacker.abilityOn).toBe(false)
    expect(attacker.boostedStat).toBeUndefined()

    expect(target.ability).toBe("Imposter" as AbilityName)
    expect(target.abilityOn).toBe(false)
    expect(target.boostedStat).toBeUndefined()
  })

  it("Should not affect ability when Neutralizing Gas was not activated", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu")
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Orichalcum Pulse" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have As One Ability", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Calyrex-Shadow")
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("As One (Spectrier)" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have Ability Shield", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu", { item: "Ability Shield" })
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should not affect the target when it holds an Ability Shield while the attacker is affected", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu")
    const target = new CalcPokemon("Koraidon", { item: "Ability Shield" })
    const calcField = new FieldCalc()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Orichalcum Pulse" as AbilityName)
  })

  it("Should remove ability when attacker has Neutralizing Gas", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Weezing", { ability: "Neutralizing Gas" })
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = undefined
    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability when second attacker has Neutralizing Gas", () => {
    const move = new Move("Overheat")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu")
    const target = new CalcPokemon("Koraidon")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Weezing", { ability: new Ability("Neutralizing Gas", true) })

    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })
})
