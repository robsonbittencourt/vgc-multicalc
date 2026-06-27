import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MenuStore } from "@data/store/menu-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { MockOf, withArgs } from "@lib/test-utils"

describe("DamageMultiCalcService", () => {
  let service: DamageMultiCalcService

  let menuStoreSpy: MockOf<MenuStore>
  let damageCalculatorSpy: MockOf<DamageCalculatorService>
  let damageOrderSpy: MockOf<DamageResultOrderService>

  beforeEach(() => {
    menuStoreSpy = { oneVsManyActivated: vi.fn(), oneVsManyBestMoveActivated: vi.fn() } as unknown as MockOf<MenuStore>
    damageCalculatorSpy = { calcDamage: vi.fn(), calcDamageForTwoAttackers: vi.fn(), calcDamageAllAttacks: vi.fn() } as unknown as MockOf<DamageCalculatorService>
    damageOrderSpy = { order: vi.fn() } as unknown as MockOf<DamageResultOrderService>

    TestBed.configureTestingModule({
      providers: [
        DamageMultiCalcService,
        { provide: MenuStore, useValue: menuStoreSpy },
        { provide: DamageCalculatorService, useValue: damageCalculatorSpy },
        { provide: DamageResultOrderService, useValue: damageOrderSpy },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DamageMultiCalcService)
  })

  describe("one vs many", () => {
    it("should calculate damage for one vs many with one attacker", () => {
      menuStoreSpy.oneVsManyActivated.mockReturnValue(true)

      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(attacker, target2.pokemon)
      const damageResult3 = damageResult(attacker, target3.pokemon)

      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target1.pokemon, field, true).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target2.pokemon, field, true).returns(damageResult2)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(attacker, target3.pokemon, field, true).returns(damageResult3)

      damageOrderSpy.order.mockImplementation(results => results)

      const result = service.calculateDamageForAll(attacker, targets, new Field(), true)

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for one vs many with two attackers", () => {
      menuStoreSpy.oneVsManyActivated.mockReturnValue(true)

      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")
      const secondAttacker = new Pokemon("Walking Wake")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const targets = [target1, target2]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(attacker, target2.pokemon)

      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(attacker, secondAttacker, target1.pokemon, field, true).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(attacker, secondAttacker, target2.pokemon, field, true).returns(damageResult2)

      damageOrderSpy.order.mockImplementation(results => results)

      const result = service.calculateDamageForAll(attacker, targets, new Field(), true, secondAttacker)

      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
    })
  })

  describe("many vs one", () => {
    it("should calculate damage for many vs one with one attacker", () => {
      menuStoreSpy.oneVsManyActivated.mockReturnValue(false)

      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(target1.pokemon, teamMember)
      const damageResult2 = damageResult(target2.pokemon, teamMember)
      const damageResult3 = damageResult(target3.pokemon, teamMember)

      withArgs(damageCalculatorSpy.calcDamage).calledWith(target1.pokemon, teamMember, field, true).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target2.pokemon, teamMember, field, true).returns(damageResult2)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target3.pokemon, teamMember, field, true).returns(damageResult3)

      damageOrderSpy.order.mockImplementation(results => results)

      const result = service.calculateDamageForAll(teamMember, targets, new Field(), true)

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for many vs one with two attackers", () => {
      menuStoreSpy.oneVsManyActivated.mockReturnValue(false)

      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"), new Pokemon("Roaring Moon"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const targets = [target1, target2]

      const damageResult1 = damageResult(target1.pokemon, teamMember, target1.secondPokemon)
      const damageResult2 = damageResult(target2.pokemon, teamMember)

      withArgs(damageCalculatorSpy.calcDamageForTwoAttackers).calledWith(target1.pokemon, target1.secondPokemon!, teamMember, field, true).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target2.pokemon, teamMember, field, true).returns(damageResult2)

      damageOrderSpy.order.mockImplementation(results => results)

      const result = service.calculateDamageForAll(teamMember, targets, new Field(), true)

      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
    })

    it("should calculate damage without order the results", () => {
      menuStoreSpy.oneVsManyActivated.mockReturnValue(false)

      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(target1.pokemon, teamMember)
      const damageResult2 = damageResult(target2.pokemon, teamMember)
      const damageResult3 = damageResult(target3.pokemon, teamMember)

      withArgs(damageCalculatorSpy.calcDamage).calledWith(target1.pokemon, teamMember, field, true).returns(damageResult1)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target2.pokemon, teamMember, field, true).returns(damageResult2)
      withArgs(damageCalculatorSpy.calcDamage).calledWith(target3.pokemon, teamMember, field, true).returns(damageResult3)

      service.calculateDamageForAll(teamMember, targets, new Field(), false)

      expect(damageOrderSpy.order).not.toHaveBeenCalled()
    })
  })
})

function damageResult(attacker: Pokemon, defender: Pokemon, secondAttacker?: Pokemon): DamageResult {
  return new DamageResult(attacker, defender, "", "", "", 1, "", [], secondAttacker)
}
