import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Field as FieldSmogon, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

describe("Damage Calculator Service", () => {
  let service: DamageCalculatorService
  let adjusterOneSpy: jasmine.SpyObj<CalcAdjuster>
  let adjusterTwoSpy: jasmine.SpyObj<CalcAdjuster>

  beforeEach(() => {
    adjusterOneSpy = jasmine.createSpyObj("AdjusterOne", ["adjust"])
    adjusterTwoSpy = jasmine.createSpyObj("AdjusterTwo", ["adjust"])

    TestBed.configureTestingModule({
      providers: [DamageCalculatorService, { provide: CALC_ADJUSTERS, useValue: adjusterOneSpy, multi: true }, { provide: CALC_ADJUSTERS, useValue: adjusterTwoSpy, multi: true }, provideExperimentalZonelessChangeDetection()]
    })

    service = TestBed.inject(DamageCalculatorService)
  })

  it("should calculate damage", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Thunderbolt")
    expect(damageResult.result).toEqual("40 - 48.4%")
    expect(damageResult.koChance).toEqual("guaranteed 3HKO")
    expect(damageResult.damage).toEqual(48.4)
    expect(damageResult.description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")
    expect(damageResult.rolls).toEqual([52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63])
  })

  it("should calculate damage to all attacks", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResults = service.calcDamageAllAttacks(attacker, target.pokemon, field)

    expect(damageResults.length).toEqual(4)

    expect(damageResults[0].attacker.id).toEqual(attacker.id)
    expect(damageResults[0].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[0].move).toEqual("Thunderbolt")
    expect(damageResults[0].result).toEqual("40 - 48.4%")
    expect(damageResults[0].koChance).toEqual("guaranteed 3HKO")
    expect(damageResults[0].damage).toEqual(48.4)
    expect(damageResults[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")
    expect(damageResults[0].rolls).toEqual([52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63])

    expect(damageResults[1].attacker.id).toEqual(attacker.id)
    expect(damageResults[1].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[1].move).toEqual("Thunderclap")
    expect(damageResults[1].result).toEqual("32.3 - 37.6%")
    expect(damageResults[1].koChance).toEqual("92.7% chance to 3HKO")
    expect(damageResults[1].damage).toEqual(37.6)
    expect(damageResults[1].description).toEqual("0 SpA Raging Bolt Thunderclap vs. 0 HP / 0 SpD Flutter Mane: 42-49 (32.3 - 37.6%) -- 92.7% chance to 3HKO")
    expect(damageResults[1].rolls).toEqual([42, 42, 42, 43, 43, 43, 45, 45, 45, 46, 46, 46, 48, 48, 48, 49])

    expect(damageResults[2].attacker.id).toEqual(attacker.id)
    expect(damageResults[2].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[2].move).toEqual("Draco Meteor")
    expect(damageResults[2].result).toEqual("0 - 0%")
    expect(damageResults[2].koChance).toEqual("Does not cause any damage")
    expect(damageResults[2].damage).toEqual(0)
    expect(damageResults[2].description).toEqual("Raging Bolt Draco Meteor vs. Flutter Mane: 0-0 (0 - 0%) -- possibly the worst move ever")
    expect(damageResults[2].rolls).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    expect(damageResults[3].attacker.id).toEqual(attacker.id)
    expect(damageResults[3].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[3].move).toEqual("Protect")
    expect(damageResults[2].result).toEqual("0 - 0%")
    expect(damageResults[2].koChance).toEqual("Does not cause any damage")
    expect(damageResults[2].damage).toEqual(0)
    expect(damageResults[3].description).toEqual("Raging Bolt Protect vs. Flutter Mane: 0-0 (0 - 0%)")
    expect(damageResults[2].rolls).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it("should calculate damage to two attackers", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(secondAttacker.id)
    expect(damageResult.secondAttacker!.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Grassy Glide")
    expect(damageResult.result).toEqual("72.3 - 87.6%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(87.6)
    expect(damageResult.description).toEqual("0 Atk Rillaboom Grassy Glide AND 0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 Def / 0 SpD Assault Vest Flutter Mane: 94-114 (72.3 - 87.6%) -- guaranteed 2HKO")
    expect(damageResult.rolls).toEqual([94, 97, 97, 99, 99, 101, 101, 103, 105, 106, 106, 108, 109, 110, 110, 114])
  })

  it("should calculate damage to two attackers considering speed", () => {
    const attacker = new Pokemon("Raging Bolt", { boosts: { spe: 2 }, moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.secondAttacker?.id).toEqual(secondAttacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Thunderbolt")
    expect(damageResult.result).toEqual("72.3 - 87.6%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(87.6)
    expect(damageResult.description).toEqual("0 SpA Raging Bolt Thunderbolt AND 0 Atk Rillaboom Grassy Glide vs. 0 HP / 0 Def / 0 SpD Assault Vest Flutter Mane: 94-114 (72.3 - 87.6%) -- guaranteed 2HKO")
    expect(damageResult.rolls).toEqual([94, 97, 97, 99, 99, 101, 101, 103, 105, 106, 106, 108, 109, 110, 110, 114])
  })

  it("should calculate damage to two attackers without damage", () => {
    const attacker = new Pokemon("Jolteon", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Zapdos", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Air Slash"), new Move("Protect")) })
    const target = new Target(new Pokemon("Ting-Lu"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toEqual("Jolteon Thunder AND Zapdos Thunder vs. Ting-Lu: 0-0 (0 - 0%) -- possibly the worst move ever")
  })

  it("should adjust inputs before calculation", () => {
    const activeMove = new Move("Thunderbolt")
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(activeMove, new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const targetPokemon = new Pokemon("Flutter Mane")
    const target = new Target(targetPokemon)
    const field = new Field()

    service.calcDamage(attacker, target.pokemon, field)

    expect(adjusterOneSpy.adjust).toHaveBeenCalledWith(jasmine.any(SmogonPokemon), jasmine.any(SmogonPokemon), activeMove, jasmine.any(MoveSmogon), jasmine.any(FieldSmogon), undefined, jasmine.any(Field))
    expect(adjusterTwoSpy.adjust).toHaveBeenCalledWith(jasmine.any(SmogonPokemon), jasmine.any(SmogonPokemon), activeMove, jasmine.any(MoveSmogon), jasmine.any(FieldSmogon), undefined, jasmine.any(Field))
  })

  it("should adjust inputs before calculation when have second attacker", () => {
    const activeMove = new Move("Grassy Glide")
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(activeMove, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const targetPokemon = new Pokemon("Flutter Mane")
    const target = new Target(targetPokemon)
    const field = new Field()

    service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(adjusterOneSpy.adjust).toHaveBeenCalledWith(jasmine.any(SmogonPokemon), jasmine.any(SmogonPokemon), activeMove, jasmine.any(MoveSmogon), jasmine.any(FieldSmogon), attacker, jasmine.any(Field))
    expect(adjusterTwoSpy.adjust).toHaveBeenCalledWith(jasmine.any(SmogonPokemon), jasmine.any(SmogonPokemon), activeMove, jasmine.any(MoveSmogon), jasmine.any(FieldSmogon), attacker, jasmine.any(Field))
  })
})
