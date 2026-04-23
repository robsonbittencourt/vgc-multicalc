import { FairyAuraAdjuster } from "@lib/damage-calculator/calc-adjuster/fairy-aura-adjuster"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Generations, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

describe("Fairy Aura Adjuster", () => {
  const gen = Generations.get(0)

  it("should not activate Fairy Aura when there is only one attacker", () => {
    const move = new Move("Moonblast")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Primarina")
    const secondAttacker = undefined
    const target = new SmogonPokemon(gen, "Toxapex")
    const fieldSmogon = new FieldSmogon()
    fieldSmogon.isFairyAura = false

    new FairyAuraAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isFairyAura).toBe(false)
  })

  it("should activate Fairy Aura when attacker has Fairy Aura ability", () => {
    const move = new Move("Dazzling Gleam")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Floette-Mega")
    const secondAttacker = new Pokemon("Primarina", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Hydro Pump"), new Move("Focus Blast"), new Move("Ice Beam")) })
    const target = new SmogonPokemon(gen, "Toxapex")
    const fieldSmogon = new FieldSmogon()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isFairyAura).toBe(true)
  })

  it("should activate Fairy Aura when target has Fairy Aura ability", () => {
    const move = new Move("Moonblast")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Primarina")
    const secondAttacker = new Pokemon("Indeedee", { moveSet: new MoveSet(new Move("Psychic"), new Move("Follow Me"), new Move("Trick Room"), new Move("Protect")) })
    const target = new SmogonPokemon(gen, "Floette-Mega")
    const fieldSmogon = new FieldSmogon()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isFairyAura).toBe(true)
  })

  it("should activate Fairy Aura when second attacker has Fairy Aura ability", () => {
    const move = new Move("Moonblast")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Primarina")
    const secondAttacker = new Pokemon("Floette-Mega", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Energy Ball"), new Move("Calm Mind")) })
    const target = new SmogonPokemon(gen, "Toxapex")
    const fieldSmogon = new FieldSmogon()

    new FairyAuraAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isFairyAura).toBe(true)
  })

  it("should keep Fairy Aura active when field already has it set", () => {
    const move = new Move("Moonblast")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Primarina")
    const secondAttacker = new Pokemon("Indeedee", { moveSet: new MoveSet(new Move("Psychic"), new Move("Follow Me"), new Move("Trick Room"), new Move("Protect")) })
    const target = new SmogonPokemon(gen, "Toxapex")
    const fieldSmogon = new FieldSmogon()
    const field = new Field({ isFairyAura: true })

    new FairyAuraAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker, field)

    expect(fieldSmogon.isFairyAura).toBe(true)
  })
})
