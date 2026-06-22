import { Move } from "@lib/model/move"
import { Move as MoveSmogon, Pokemon as SmogonPokemon, Field as FieldSmogon } from "@calc"
import { NeutralizingGasAdjuster } from "./neutralizing-gas-adjuster"
import { Field } from "@lib/model/field"
import { AbilityName } from "@calc"
import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"

describe("Neutralizing Gas Adjuster", () => {
  it("Should remove ability when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Chi-Yu")
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability and turn off if Paradox when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Flutter Mane", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const target = new SmogonPokemon("Iron Valiant", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(attacker.abilityOn).toBe(false)
    expect(attacker.boostedStat).toBeUndefined()

    expect(target.ability).toBe("Imposter" as AbilityName)
    expect(target.abilityOn).toBe(false)
    expect(target.boostedStat).toBeUndefined()
  })

  it("Should not affect ability when Neutralizing Gas was not activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Chi-Yu")
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Orichalcum Pulse" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have As One Ability", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Calyrex-Shadow")
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("As One (Spectrier)" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have Ability Shield", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Chi-Yu", { item: "Ability Shield" })
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability when attacker has Neutralizing Gas", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Weezing", { ability: "Neutralizing Gas" })
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined
    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability when second attacker has Neutralizing Gas", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Chi-Yu")
    const target = new SmogonPokemon("Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = new Pokemon("Weezing", { ability: new Ability("Neutralizing Gas", true) })

    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })
})
