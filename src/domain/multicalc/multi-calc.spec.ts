import { MultiCalc, AttackConfig } from "@multicalc/multi-calc"
import { MultiTargetDamageCalc, MultiCalcMode } from "@multicalc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"

const NO_BEST_MOVE: AttackConfig = { bestMove: false, useSpsMode: false }
const BEST_MOVE: AttackConfig = { bestMove: true, useSpsMode: false }

const ONE_VS_MANY: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: false }
const ONE_VS_MANY_BEST: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: true }
const MANY_VS_ONE: MultiCalcMode = { oneVsManyActivated: false, manyVsOneActivated: true, oneVsManyBestMoveActivated: false }

describe("MultiCalc", () => {
  describe("damageAttacking (single Pokémon)", () => {
    it("should calculate damage from the attacker against each opponent", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })
      const opponent1 = new Target(new Pokemon("Flutter Mane"))
      const opponent2 = new Target(new Pokemon("Iron Bundle"))
      const opponent3 = new Target(new Pokemon("Roaring Moon"))

      const results = MultiCalc.withOpponents([opponent1, opponent2, opponent3], new Field()).damageAttacking(attacker, NO_BEST_MOVE)

      expect(results.length).toEqual(3)

      expect(results[0].id).toEqual(attacker.id + opponent1.pokemon.id)
      expect(results[0].defender.id).toEqual(opponent1.pokemon.id)
      expect(results[0].move).toEqual("Thunderbolt")
      expect(results[0].damage).toEqual(48.4)
      expect(results[0].koChance).toEqual("guaranteed 3HKO")
      expect(results[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")

      expect(results[1].defender.id).toEqual(opponent2.pokemon.id)
      expect(results[1].damage).toEqual(180.1)
      expect(results[1].koChance).toEqual("guaranteed OHKO")

      expect(results[2].defender.id).toEqual(opponent3.pokemon.id)
      expect(results[2].damage).toEqual(21.6)
    })

    it("should pick the best move per opponent when bestMove is enabled", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })
      const opponent = new Target(new Pokemon("Roaring Moon"))

      const withBest = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, BEST_MOVE)[0]
      const withoutBest = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE)[0]

      expect(withBest.move).toEqual("Draco Meteor")
      expect(withBest.damage).toBeGreaterThan(withoutBest.damage)
    })
  })

  describe("damageAttacking (combined attackers)", () => {
    it("should sum both attackers' damage against each opponent", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })
      const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Wood Hammer"), new Move("Grassy Glide"), new Move("Fake Out"), new Move("Protect")) })
      const opponent = new Target(new Pokemon("Iron Bundle"))

      const combined = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE, secondAttacker)[0]
      const single = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE)[0]

      const involvedIds = [combined.attacker.id, combined.secondAttacker?.id]

      expect(combined.secondAttacker).toBeDefined()
      expect(involvedIds).toContain(attacker.id)
      expect(involvedIds).toContain(secondAttacker.id)
      expect(combined.damage).toBeGreaterThan(single.damage)
    })

    it("should pick the best move for both attackers when bestMove is enabled", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Protect"), new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap")) })
      const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Protect"), new Move("Wood Hammer"), new Move("Grassy Glide"), new Move("Fake Out")) })
      const opponent = new Target(new Pokemon("Iron Bundle"))

      const best = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, BEST_MOVE, secondAttacker)[0]
      const naive = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE, secondAttacker)[0]

      expect(best.secondAttacker).toBeDefined()
      expect(best.damage).toBeGreaterThan(naive.damage)
    })

    it("should fall back to single damage when the second attacker is the same instance", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })
      const opponent = new Target(new Pokemon("Iron Bundle"))

      const withSame = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE, attacker)[0]
      const single = MultiCalc.withOpponents([opponent], new Field()).damageAttacking(attacker, NO_BEST_MOVE)[0]

      expect(withSame.damage).toEqual(single.damage)
      expect(withSame.secondAttacker).toBeUndefined()
    })
  })

  describe("damageDefending (single Pokémon)", () => {
    it("should calculate damage from each opponent against the defender", () => {
      const defender = new Pokemon("Ting-Lu")
      const opponent1 = new Target(new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) }))
      const opponent2 = new Target(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Dazzling Gleam"), new Move("Protect")) }))

      const results = MultiCalc.withOpponents([opponent1, opponent2], new Field()).damageDefending(defender, false)

      expect(results.length).toEqual(2)
      expect(results[0].attacker.id).toEqual(opponent1.pokemon.id)
      expect(results[0].defender.id).toEqual(defender.id)
      expect(results[1].attacker.id).toEqual(opponent2.pokemon.id)
    })
  })

  describe("damageDefending (combined target)", () => {
    it("should sum both opponents' damage when the target is combined", () => {
      const defender = new Pokemon("Ting-Lu")
      const combinedOpponent = new Target(new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) }), new Pokemon("Chi-Yu"))
      const singleOpponent = new Target(new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) }))

      const combined = MultiCalc.withOpponents([combinedOpponent], new Field()).damageDefending(defender, false)[0]
      const single = MultiCalc.withOpponents([singleOpponent], new Field()).damageDefending(defender, false)[0]

      expect(combined.secondAttacker).toBeDefined()
      expect(combined.damage).toBeGreaterThan(single.damage)
    })
  })

  describe("bestMoveIndex", () => {
    it("should match the legacy bestMoveIndex for a single matchup", () => {
      const attacker = new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })
      const defender = new Pokemon("Ting-Lu")
      const field = new Field()

      const aggregate = MultiCalc.withOpponents([], field).bestMoveIndex(attacker, defender)
      const legacy = new MultiTargetDamageCalc().bestMoveIndex(attacker, defender, field)

      expect(aggregate).toEqual(legacy)
    })

    it("should match the legacy bestMoveIndexForTargets, excluding default and combined targets", () => {
      const attacker = new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })
      const opponents = [new Target(new Pokemon("Chi-Yu")), new Target(new Pokemon("Ting-Lu"), new Pokemon("Chien-Pao"))]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).bestMoveIndexForTargets(attacker)
      const legacy = new MultiTargetDamageCalc().bestMoveIndexForTargets(opponents, attacker, field)

      expect(aggregate).toEqual(legacy)
    })
  })

  describe("behavior parity with MultiTargetDamageCalc (single Pokémon)", () => {
    it("should match the legacy one-vs-many path without best move", () => {
      const attacker = new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })
      const opponents = [new Target(new Pokemon("Chi-Yu")), new Target(new Pokemon("Ting-Lu")), new Target(new Pokemon("Chien-Pao"))]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).damageAttacking(attacker, NO_BEST_MOVE)
      const legacy = new MultiTargetDamageCalc().calculateDamageForAll(attacker, opponents, field, ONE_VS_MANY)

      expect(aggregate.map(r => r.damage)).toEqual(legacy.map(r => r.damage))
      expect(aggregate.map(r => r.description)).toEqual(legacy.map(r => r.description))
    })

    it("should match the legacy one-vs-many path with best move", () => {
      const attacker = new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })
      const opponents = [new Target(new Pokemon("Chi-Yu")), new Target(new Pokemon("Ting-Lu")), new Target(new Pokemon("Chien-Pao"))]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).damageAttacking(attacker, BEST_MOVE)
      const legacy = new MultiTargetDamageCalc().calculateDamageForAll(attacker, opponents, field, ONE_VS_MANY_BEST)

      expect(aggregate.map(r => r.damage)).toEqual(legacy.map(r => r.damage))
      expect(aggregate.map(r => r.move)).toEqual(legacy.map(r => r.move))
    })

    it("should match the legacy one-vs-many path with a combined second attacker", () => {
      const attacker = new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })
      const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Wood Hammer"), new Move("Grassy Glide"), new Move("Fake Out"), new Move("Protect")) })
      const opponents = [new Target(new Pokemon("Chi-Yu")), new Target(new Pokemon("Ting-Lu"))]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).damageAttacking(attacker, NO_BEST_MOVE, secondAttacker)
      const legacy = new MultiTargetDamageCalc().calculateDamageForAll(attacker, opponents, field, ONE_VS_MANY, secondAttacker)

      expect(aggregate.map(r => r.damage)).toEqual(legacy.map(r => r.damage))
      expect(aggregate.map(r => r.description)).toEqual(legacy.map(r => r.description))
    })

    it("should match the legacy many-vs-one path", () => {
      const defender = new Pokemon("Ting-Lu")
      const opponents = [new Target(new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) })), new Target(new Pokemon("Chi-Yu"))]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).damageDefending(defender, false)
      const legacy = new MultiTargetDamageCalc().calculateDamageForAll(defender, opponents, field, MANY_VS_ONE)

      expect(aggregate.map(r => r.damage)).toEqual(legacy.map(r => r.damage))
      expect(aggregate.map(r => r.description)).toEqual(legacy.map(r => r.description))
    })

    it("should match the legacy many-vs-one path with a combined target", () => {
      const defender = new Pokemon("Ting-Lu")
      const opponents = [
        new Target(new Pokemon("Miraidon", { moveSet: new MoveSet(new Move("Electro Drift"), new Move("Draco Meteor"), new Move("Dazzling Gleam"), new Move("Volt Switch")) }), new Pokemon("Chi-Yu")),
        new Target(new Pokemon("Chien-Pao"))
      ]
      const field = new Field()

      const aggregate = MultiCalc.withOpponents(opponents, field).damageDefending(defender, false)
      const legacy = new MultiTargetDamageCalc().calculateDamageForAll(defender, opponents, field, MANY_VS_ONE)

      expect(aggregate.map(r => r.damage)).toEqual(legacy.map(r => r.damage))
      expect(aggregate.map(r => r.description)).toEqual(legacy.map(r => r.description))
    })
  })
})
