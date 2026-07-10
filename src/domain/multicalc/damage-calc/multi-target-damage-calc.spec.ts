import { MultiTargetDamageCalc } from "@multicalc/damage-calc/multi-target-damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { MultiCalcMode } from "@multicalc/damage-calc/multi-target-damage-calc"

const ONE_VS_MANY: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: false }
const MANY_VS_ONE: MultiCalcMode = { oneVsManyActivated: false, manyVsOneActivated: true, oneVsManyBestMoveActivated: false }
const ONE_VS_MANY_BEST: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: true }

describe("MultiTargetDamageCalc", () => {
  let service: MultiTargetDamageCalc

  beforeEach(() => {
    service = new MultiTargetDamageCalc()
  })

  describe("one vs many", () => {
    it("should calculate damage from one attacker against each target", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      const result = service.calculateDamageForAll(attacker, [target1, target2, target3], new Field(), ONE_VS_MANY)

      expect(result.length).toEqual(3)

      expect(result[0].id).toEqual(attacker.id + target1.pokemon.id)
      expect(result[0].attacker.id).toEqual(attacker.id)
      expect(result[0].defender.id).toEqual(target1.pokemon.id)
      expect(result[0].move).toEqual("Thunderbolt")
      expect(result[0].damage).toEqual(48.4)
      expect(result[0].koChance).toEqual("guaranteed 3HKO")
      expect(result[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")

      expect(result[1].defender.id).toEqual(target2.pokemon.id)
      expect(result[1].move).toEqual("Thunderbolt")
      expect(result[1].damage).toEqual(180.1)
      expect(result[1].koChance).toEqual("guaranteed OHKO")

      expect(result[2].defender.id).toEqual(target3.pokemon.id)
      expect(result[2].damage).toEqual(21.6)
      expect(result[2].koChance).toEqual("possible 5HKO")
    })

    it("should combine two attackers against each target", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })
      const secondAttacker = new Pokemon("Walking Wake", { moveSet: new MoveSet(new Move("Hydro Steam"), new Move("Draco Meteor"), new Move("Flamethrower"), new Move("Protect")) })

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))

      const result = service.calculateDamageForAll(attacker, [target1, target2], new Field(), ONE_VS_MANY, secondAttacker)

      expect(result.length).toEqual(2)

      expect(result[0].defender.id).toEqual(target1.pokemon.id)
      expect(result[0].secondAttacker?.id).toEqual(attacker.id)
      expect(result[0].damage).toEqual(87.6)
      expect(result[0].koChance).toEqual("guaranteed 2HKO")
      expect(result[0].description).toEqual("0 SpA Walking Wake Hydro Steam AND 0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 94-114 (72.3 - 87.6%) -- guaranteed 2HKO")

      expect(result[1].defender.id).toEqual(target2.pokemon.id)
      expect(result[1].damage).toEqual(216.7)
      expect(result[1].koChance).toEqual("guaranteed OHKO")
      expect(result[1].description).toContain("AND")
    })

    it("should pick the best move for both attackers when oneVsManyBestMove is enabled", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Protect"), new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap")) })
      const secondAttacker = new Pokemon("Walking Wake", { moveSet: new MoveSet(new Move("Protect"), new Move("Hydro Steam"), new Move("Draco Meteor"), new Move("Flamethrower")) })

      const target = new Target(new Pokemon("Flutter Mane"))

      const best = service.calculateDamageForAll(attacker, [target], new Field(), ONE_VS_MANY_BEST, secondAttacker)
      const naive = service.calculateDamageForAll(attacker, [target], new Field(), ONE_VS_MANY, secondAttacker)

      expect(best[0].secondAttacker).toBeDefined()
      expect(best[0].damage).toBeGreaterThan(naive[0].damage)
    })

    it("should convert EVs to SP in the description when SPS mode is on", () => {
      const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")), evs: { spa: 252 } })
      const target = new Target(new Pokemon("Flutter Mane", { evs: { hp: 252, spd: 4 } }))

      const result = service.calculateDamageForAll(attacker, [target], new Field(), ONE_VS_MANY, undefined, true)

      expect(result[0].description).toEqual("32 SpA Raging Bolt Thunderbolt vs. 32 HP / 1 SpD Flutter Mane: 61-73 (37.6 - 45%) -- guaranteed 3HKO")
    })
  })

  describe("many vs one", () => {
    it("should calculate damage from each target against the active team member", () => {
      const teamMember = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })

      const target1 = new Target(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Protect"), new Move("Icy Wind")) }))
      const target2 = new Target(new Pokemon("Iron Bundle", { moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Freeze-Dry"), new Move("Protect"), new Move("Icy Wind")) }))

      const result = service.calculateDamageForAll(teamMember, [target1, target2], new Field(), MANY_VS_ONE)

      expect(result.length).toEqual(2)

      expect(result[0].id).toEqual(target1.pokemon.id + teamMember.id)
      expect(result[0].attacker.id).toEqual(target1.pokemon.id)
      expect(result[0].defender.id).toEqual(teamMember.id)
      expect(result[0].move).toEqual("Moonblast")
      expect(result[0].damage).toEqual(91)
      expect(result[0].koChance).toEqual("guaranteed 2HKO")
      expect(result[0].description).toEqual("0 SpA Flutter Mane Moonblast vs. 0 HP / 0 SpD Raging Bolt: 152-182 (76 - 91%) -- guaranteed 2HKO")

      expect(result[1].attacker.id).toEqual(target2.pokemon.id)
      expect(result[1].defender.id).toEqual(teamMember.id)
      expect(result[1].move).toEqual("Hydro Pump")
      expect(result[1].damage).toEqual(24)
      expect(result[1].koChance).toEqual("guaranteed 5HKO")
    })

    it("should combine both target pokemon against the active team member", () => {
      const teamMember = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Draco Meteor"), new Move("Thunderclap"), new Move("Protect")) })

      const target1 = new Target(
        new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Protect"), new Move("Icy Wind")) }),
        new Pokemon("Roaring Moon", { moveSet: new MoveSet(new Move("Knock Off"), new Move("Dragon Claw"), new Move("Protect"), new Move("Tailwind")) })
      )
      const target2 = new Target(new Pokemon("Iron Bundle", { moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Freeze-Dry"), new Move("Protect"), new Move("Icy Wind")) }))

      const result = service.calculateDamageForAll(teamMember, [target1, target2], new Field(), MANY_VS_ONE)

      expect(result.length).toEqual(2)

      expect(result[0].attacker.id).toEqual(target1.pokemon.id)
      expect(result[0].secondAttacker?.id).toEqual(target1.secondPokemon!.id)
      expect(result[0].defender.id).toEqual(teamMember.id)
      expect(result[0].damage).toEqual(122.5)
      expect(result[0].koChance).toEqual("guaranteed OHKO")
      expect(result[0].description).toEqual("0 SpA Flutter Mane Moonblast AND 0 Atk Roaring Moon Knock Off vs. 0 HP / 0 Def / 0 SpD Raging Bolt: 204-245 (102 - 122.5%) -- guaranteed OHKO")

      expect(result[1].attacker.id).toEqual(target2.pokemon.id)
      expect(result[1].secondAttacker).toBeUndefined()
      expect(result[1].damage).toEqual(24)
    })
  })

  describe("bestMoveIndexForTargets", () => {
    it("should assign the best move index for each eligible target against the attacker", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Thunderbolt"), new Move("Icy Wind")) }))
      const target2 = new Target(new Pokemon("Iron Bundle", { moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Freeze-Dry"), new Move("Icy Wind"), new Move("Protect")) }))

      const result = service.bestMoveIndexForTargets([target1, target2], attacker, new Field())

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ targetId: target1.pokemon.id, moveIndex: service.bestMoveIndex(target1.pokemon, attacker, new Field()) })
      expect(result[1]).toEqual({ targetId: target2.pokemon.id, moveIndex: service.bestMoveIndex(target2.pokemon, attacker, new Field()) })
    })

    it("should exclude targets with a combined second Pokémon", () => {
      const attacker = new Pokemon("Raging Bolt")
      const combinedTarget = new Target(new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")) }), new Pokemon("Roaring Moon"))

      const result = service.bestMoveIndexForTargets([combinedTarget], attacker, new Field())

      expect(result).toEqual([])
    })
  })
})
