import { Pokemon } from '../../pokemon';
import { Target } from '../../target';
import { CommanderAdjuster } from './commander-adjuster';

describe("Commander Adjuster", () => {
  it("should apply +2 boost in all stats when Commander was activated", () => {
    const attacker = new Pokemon('Dondozo', { commanderActive: true })
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new CommanderAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boosts.atk).toBe(2)
    expect(attacker.pokemonSmogon.boosts.def).toBe(2)
    expect(attacker.pokemonSmogon.boosts.spa).toBe(2)
    expect(attacker.pokemonSmogon.boosts.spd).toBe(2)
    expect(attacker.pokemonSmogon.boosts.spe).toBe(2)
  })

  it("should not apply any boost when Commander was not activated", () => {
    const attacker = new Pokemon('Dondozo', { commanderActive: false })
    const target = new Target(new Pokemon("Flutter Mane"))
    
    new CommanderAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boosts.atk).toBe(0)
    expect(attacker.pokemonSmogon.boosts.def).toBe(0)
    expect(attacker.pokemonSmogon.boosts.spa).toBe(0)
    expect(attacker.pokemonSmogon.boosts.spd).toBe(0)
    expect(attacker.pokemonSmogon.boosts.spe).toBe(0)
  })
})