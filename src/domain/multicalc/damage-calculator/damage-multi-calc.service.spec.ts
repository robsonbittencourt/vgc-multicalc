import { DamageCalculatorService } from "@multicalc/damage-calculator/damage-calculator.service"
import { DamageMultiCalcService } from "@multicalc/damage-calculator/damage-multi-calc.service"
import { DamageResult } from "@multicalc/damage-calculator/damage-result"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { MockOf, withArgs } from "@multicalc/test-utils"
import { MultiCalcMode } from "@multicalc/types"

const ONE_VS_MANY: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: false }
const MANY_VS_ONE: MultiCalcMode = { oneVsManyActivated: false, manyVsOneActivated: true, oneVsManyBestMoveActivated: false }

describe("DamageMultiCalcService", () => {
  let service: DamageMultiCalcService

  let damageCalculatorSpy: MockOf<DamageCalculatorService>

  beforeEach(() => {
    damageCalculatorSpy = { calcDamage: vi.fn(), calcDamageForTwoAttackers: vi.fn(), calcDamageAllAttacks: vi.fn() } as unknown as MockOf<DamageCalculatorService>

    service = new DamageMultiCalcService()
    service.damageCalculator = damageCalculatorSpy as unknown as DamageCalculatorService
  })

  describe("one vs many", () => {
    it("should calculate damage for one vs many with one attacker", () => {
      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(attacker, target2.pokemon)
      const damageResult3 = damageResult(attacker, target3.pokemon)

      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target1.pokemon, field, true, false).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target2.pokemon, field, true, false).returns(damageResult2)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target3.pokemon, field, true, false).returns(damageResult3)

      const result = service.calculateDamageForAll(attacker, targets, new Field(), ONE_VS_MANY)

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for one vs many with two attackers", () => {
      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")
      const secondAttacker = new Pokemon("Walking Wake")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const targets = [target1, target2]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(attacker, target2.pokemon)

      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(attacker, secondAttacker, target1.pokemon, field, true, false).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(attacker, secondAttacker, target2.pokemon, field, true, false).returns(damageResult2)

      const result = service.calculateDamageForAll(attacker, targets, new Field(), ONE_VS_MANY, secondAttacker)

      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
    })
  })

  describe("many vs one", () => {
    it("should calculate damage for many vs one with one attacker", () => {
      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(target1.pokemon, teamMember)
      const damageResult2 = damageResult(target2.pokemon, teamMember)
      const damageResult3 = damageResult(target3.pokemon, teamMember)

      withArgs(damageCalculatorSpy.calcDamage).calledWith(target1.pokemon, teamMember, field, true, false).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target2.pokemon, teamMember, field, true, false).returns(damageResult2)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target3.pokemon, teamMember, field, true, false).returns(damageResult3)

      const result = service.calculateDamageForAll(teamMember, targets, new Field(), MANY_VS_ONE)

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for many vs one with two attackers", () => {
      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"), new Pokemon("Roaring Moon"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const targets = [target1, target2]

      const damageResult1 = damageResult(target1.pokemon, teamMember, target1.secondPokemon)
      const damageResult2 = damageResult(target2.pokemon, teamMember)

      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(target1.pokemon, target1.secondPokemon!, teamMember, field, true, false).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target2.pokemon, teamMember, field, true, false).returns(damageResult2)

      const result = service.calculateDamageForAll(teamMember, targets, new Field(), MANY_VS_ONE)

      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
    })
  })
})

function damageResult(attacker: Pokemon, defender: Pokemon, secondAttacker?: Pokemon): DamageResult {
  return new DamageResult(attacker, defender, "", "", "", 1, "", [], secondAttacker)
}
