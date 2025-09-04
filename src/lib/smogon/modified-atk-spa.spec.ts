import { Ability } from "@lib/model/ability"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import OffensiveStatCalculator from "./modified-atk-spa"

fdescribe("Calculate final attack stat with modifiers", () => {
  const calculator = new OffensiveStatCalculator()

  it("should return raw attack stat when does not have any modification", () => {
    const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 } })

    const result = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())

    expect(result).toBe(183)
  })

  it("should return modified attack when have positive stat modifiers", () => {
    const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: 2 } })

    const result = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())

    expect(result).toBe(366)
  })

  it("should not ignore positive stats modifiers when is a critical hit", () => {
    const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: 2 } })
    const field = new Field({ attackerSide: new FieldSide({ isCriticalHit: true }) })

    const result = calculator.getFinalAttack(pokemon, new Move("Protect"), field)

    expect(result).toBe(366)
  })

  it("should return modified attack when have negative stat modifiers", () => {
    const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: -4 } })

    const result = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())

    expect(result).toBe(61)
  })

  it("should ignore negative stats modifiers when is a critical hit", () => {
    const pokemon = new Pokemon("Tyranitar", { nature: "Adamant", evs: { atk: 100 }, boosts: { atk: -4 } })
    const field = new Field({ attackerSide: new FieldSide({ isCriticalHit: true }) })

    const result = calculator.getFinalAttack(pokemon, new Move("Protect"), field)

    expect(result).toBe(183)
  })

  it("should return modified attack when have Hustle ability", () => {
    const pokemon = new Pokemon("Deino", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Hustle") })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(150)
    expect(spa).toBe(58)
  })

  it("should return modified attack when have Slow Start ability active", () => {
    const pokemon = new Pokemon("Regigigas", { nature: "Adamant", evs: { atk: 12 }, ability: new Ability("Slow Start", true) })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(100)
    expect(spa).toBe(90)
  })

  it("should return modified attack when have Slow Start ability but not active", () => {
    const pokemon = new Pokemon("Regigigas", { nature: "Adamant", evs: { atk: 12 }, ability: new Ability("Slow Start", false) })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(200)
    expect(spa).toBe(90)
  })

  it("should return modified attack when have Guts ability and have some status condition", () => {
    const pokemon = new Pokemon("Ursaluna", { nature: "Adamant", evs: { atk: 172 }, ability: new Ability("Guts"), status: Status.BURN })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(300)
    expect(spa).toBe(58)
  })

  it("should return modified attack when have Guts ability but don't have any status condition", () => {
    const pokemon = new Pokemon("Ursaluna", { nature: "Adamant", evs: { atk: 172 }, ability: new Ability("Guts"), status: Status.HEALTHY })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(200)
    expect(spa).toBe(58)
  })

  it("should return modified attack when have Overgrow ability and have less then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Torterra", { nature: "Adamant", evs: { atk: 60 }, ability: new Ability("Overgrow"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bullet Seed"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bullet Seed"), new Field())

    expect(atk).toBe(225)
    expect(spa).toBe(85)
  })

  it("should return modified attack when have Overgrow ability and have more then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Torterra", { nature: "Adamant", evs: { atk: 60 }, ability: new Ability("Overgrow"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bullet Seed"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bullet Seed"), new Field())

    expect(atk).toBe(150)
    expect(spa).toBe(85)
  })

  it("should return modified attack when have Blaze ability and have less then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Blaziken", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Blaze"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Fire Punch"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Fire Punch"), new Field())

    expect(atk).toBe(240)
    expect(spa).toBe(117)
  })

  it("should return modified attack when have Blaze ability and have more then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Blaziken", { nature: "Adamant", evs: { atk: 44 }, ability: new Ability("Blaze"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Fire Punch"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Fire Punch"), new Field())

    expect(atk).toBe(160)
    expect(spa).toBe(117)
  })

  it("should return modified attack when have Torrent ability and have less then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Empoleon", { nature: "Adamant", evs: { atk: 244 }, ability: new Ability("Torrent"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Aqua Jet"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Aqua Jet"), new Field())

    expect(atk).toBe(225)
    expect(spa).toBe(117)
  })

  it("should return modified attack when have Torrent ability and have more then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Empoleon", { nature: "Adamant", evs: { atk: 244 }, ability: new Ability("Torrent"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Aqua Jet"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Aqua Jet"), new Field())

    expect(atk).toBe(150)
    expect(spa).toBe(117)
  })

  it("should return modified attack when have Swarm ability and have less then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Scyther", { nature: "Adamant", evs: { atk: 52 }, ability: new Ability("Swarm"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bug Bite"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bug Bite"), new Field())

    expect(atk).toBe(225)
    expect(spa).toBe(67)
  })

  it("should return modified attack when have Swarm ability and have more then 33% of HP and use a physical move", () => {
    const pokemon = new Pokemon("Scyther", { nature: "Adamant", evs: { atk: 52 }, ability: new Ability("Swarm"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bug Bite"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bug Bite"), new Field())

    expect(atk).toBe(150)
    expect(spa).toBe(67)
  })
})

fdescribe("Calculate final special attack stat with modifiers", () => {
  const calculator = new OffensiveStatCalculator()

  it("should return modified attack when have Solar Power ability and Sun is active", () => {
    const pokemon = new Pokemon("Charizard", { nature: "Timid", evs: { spa: 244 }, ability: new Ability("Solar Power") })
    const field = new Field({ weather: "Sun" })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), field)
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), field)

    expect(atk).toBe(93)
    expect(spa).toBe(240)
  })

  it("should return modified special attack when have Overgrow ability and have less then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Torterra", { nature: "Modest", evs: { spa: 188 }, ability: new Ability("Overgrow"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Solar Beam"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Solar Beam"), new Field())

    expect(atk).toBe(116)
    expect(spa).toBe(195)
  })

  it("should return modified special attack when have Overgrow ability and have more then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Torterra", { nature: "Modest", evs: { spa: 188 }, ability: new Ability("Overgrow"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Solar Beam"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Solar Beam"), new Field())

    expect(atk).toBe(116)
    expect(spa).toBe(130)
  })

  it("should return modified special attack when have Blaze ability and have less then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Blaziken", { nature: "Modest", evs: { spa: 52 }, ability: new Ability("Blaze"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Fire Blast"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Fire Blast"), new Field())

    expect(atk).toBe(126)
    expect(spa).toBe(225)
  })

  it("should return modified special attack when have Blaze ability and have more then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Blaziken", { nature: "Modest", evs: { spa: 52 }, ability: new Ability("Blaze"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Fire Blast"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Fire Blast"), new Field())

    expect(atk).toBe(126)
    expect(spa).toBe(150)
  })

  it("should return modified special attack when have Torrent ability and have less then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Empoleon", { nature: "Modest", evs: { spa: 44 }, ability: new Ability("Torrent"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Surf"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Surf"), new Field())

    expect(atk).toBe(95)
    expect(spa).toBe(225)
  })

  it("should return modified special attack when have Torrent ability and have more then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Empoleon", { nature: "Modest", evs: { spa: 44 }, ability: new Ability("Torrent"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Surf"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Surf"), new Field())

    expect(atk).toBe(95)
    expect(spa).toBe(150)
  })

  it("should return modified special attack when have Swarm ability and have less then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Scyther", { nature: "Modest", evs: { spa: 124 }, ability: new Ability("Swarm"), hpPercentage: 32 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bug Buzz"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bug Buzz"), new Field())

    expect(atk).toBe(117)
    expect(spa).toBe(150)
  })

  it("should return modified special attack when have Swarm ability and have more then 33% of HP and use a special move", () => {
    const pokemon = new Pokemon("Scyther", { nature: "Modest", evs: { spa: 124 }, ability: new Ability("Swarm"), hpPercentage: 35 })

    const atk = calculator.getFinalAttack(pokemon, new Move("Bug Buzz"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Bug Buzz"), new Field())

    expect(atk).toBe(117)
    expect(spa).toBe(100)
  })

  it("should return modified special attack when have Plus ability is active", () => {
    const pokemon = new Pokemon("Toxtricity", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Plus", true) })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(106)
    expect(spa).toBe(225)
  })

  it("should return modified special attack when have Plus ability but not  active", () => {
    const pokemon = new Pokemon("Toxtricity", { nature: "Modest", evs: { spa: 20 }, ability: new Ability("Plus", false) })

    const atk = calculator.getFinalAttack(pokemon, new Move("Protect"), new Field())
    const spa = calculator.getFinalSpecialAttack(pokemon, new Move("Protect"), new Field())

    expect(atk).toBe(106)
    expect(spa).toBe(150)
  })
})
