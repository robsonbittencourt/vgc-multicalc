import { ParadoxAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/paradox-ability-adjuster"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"

describe("Paradox Ability Adjuster", () => {
  it("should set atk as boosted stat when this stat is the highest", () => {
    const attacker = new Pokemon("Iron Treads", { abilityOn: true, nature: "Adamant" })
    const target = new Target(new Pokemon("Iron Treads", { abilityOn: true, nature: "Adamant" }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("atk")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("atk")
  })

  it("should set def as boosted stat when this stat is the highest", () => {
    const attacker = new Pokemon("Iron Treads", { abilityOn: true, nature: "Bashful" })
    const target = new Target(new Pokemon("Iron Treads", { abilityOn: true, nature: "Bashful" }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("def")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("def")
  })

  it("should set spa as boosted stat when this stat is the highest", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: true, evs: { spa: 116 } })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: true, evs: { spa: 116 } }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("spa")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("spa")
  })

  it("should set spd as boosted stat when this stat is the highest", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: true, evs: { spd: 116 } })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: true, evs: { spd: 116 } }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("spd")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("spd")
  })

  it("should set spe as boosted stat when this stat is the highest", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: true, nature: "Timid" })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: true, nature: "Timid" }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("spe")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("spe")
  })

  it("should set atk as boosted stat when this stat is the same of def", () => {
    const attacker = new Pokemon("Iron Treads", { abilityOn: true, nature: "Bashful", evs: { atk: 252, def: 188 } })
    const target = new Target(new Pokemon("Iron Treads", { abilityOn: true, nature: "Bashful", evs: { atk: 252, def: 188 } }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("atk")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("atk")
  })

  it("should set def as boosted stat when this stat is the same of spa", () => {
    const attacker = new Pokemon("Iron Treads", { abilityOn: true, nature: "Mild", evs: { def: 92, spa: 252 } })
    const target = new Target(new Pokemon("Iron Treads", { abilityOn: true, nature: "Mild", evs: { def: 92, spa: 252 } }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("def")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("def")
  })

  it("should set spa as boosted stat when this stat is the same of spd", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: true, nature: "Bashful" })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: true, nature: "Bashful" }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("spa")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("spa")
  })

  it("should set spd as boosted stat when this stat is the same of spe", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: true, nature: "Bashful", evs: { spd: 4, spe: 4 } })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: true, nature: "Bashful", evs: { spd: 4, spe: 4 } }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe("spd")
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe("spd")
  })

  it("should not set any stat as boosted when Pokémon does not have Paradox ability", () => {
    const attacker = new Pokemon("Tyranitar")
    const target = new Target(new Pokemon("Garchomp"))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe(undefined)
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe(undefined)
  })

  it("should not set any stat as boosted when Pokémon have Paradox ability but it is not activated", () => {
    const attacker = new Pokemon("Flutter Mane", { abilityOn: false })
    const target = new Target(new Pokemon("Flutter Mane", { abilityOn: false }))

    new ParadoxAbilityAdjuster().adjust(attacker, target.pokemon)

    expect(attacker.pokemonSmogon.boostedStat).toBe(undefined)
    expect(target.pokemon.pokemonSmogon.boostedStat).toBe(undefined)
  })
})
