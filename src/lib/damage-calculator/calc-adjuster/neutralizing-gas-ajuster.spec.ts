import { Move } from "@lib/model/move"
import { Generations, Move as MoveSmogon, Pokemon as SmogonPokemon, Field as FieldSmogon } from "@robsonbittencourt/calc"
import { NeutralizingGasAdjuster } from "./neutralizing-gas-adjuster"
import { Field } from "@lib/model/field"
import { AbilityName } from "@robsonbittencourt/calc/dist/data/interface"

describe("Neutralizing Gas Adjuster", () => {
  const gen = Generations.get(9)

  it("Should remove ability when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Chi-Yu")
    const target = new SmogonPokemon(gen, "Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should remove ability and turn off if Paradox when Neutralizing Gas was activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Flutter Mane", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const target = new SmogonPokemon(gen, "Iron Valiant", { item: "Booster Energy", abilityOn: true, evs: { spa: 252 } })
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Imposter" as AbilityName)
    expect(attacker.abilityOn).toBeFalse()
    expect(attacker.boostedStat).toBeUndefined()

    expect(target.ability).toBe("Imposter" as AbilityName)
    expect(target.abilityOn).toBeFalse()
    expect(target.boostedStat).toBeUndefined()
  })

  it("Should not affect ability when Neutralizing Gas was not activated", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Chi-Yu")
    const target = new SmogonPokemon(gen, "Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: false })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Orichalcum Pulse" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have As One Ability", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Calyrex-Shadow")
    const target = new SmogonPokemon(gen, "Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("As One (Spectrier)" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })

  it("Should not affect ability when Neutralizing Gas was activated but the Pokémon have Ability Shield", () => {
    const move = new Move("Overheat")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Chi-Yu", { item: "Ability Shield" })
    const target = new SmogonPokemon(gen, "Koraidon")
    const smogonField = new FieldSmogon()
    const secondAttacker = undefined

    const field = new Field({ isNeutralizingGas: true })

    new NeutralizingGasAdjuster().adjust(attacker, target, move, moveSmogon, smogonField, secondAttacker, field)

    expect(attacker.ability).toBe("Beads of Ruin" as AbilityName)
    expect(target.ability).toBe("Imposter" as AbilityName)
  })
})
