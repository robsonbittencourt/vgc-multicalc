import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MenuStore } from "@data/store/menu-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"

describe("DamageMultiCalcService", () => {
  let service: DamageMultiCalcService

  let menuStoreSpy: any
  let damageCalculatorSpy: jasmine.SpyObj<DamageCalculatorService>
  let damageOrderSpy: jasmine.SpyObj<DamageResultOrderService>

  beforeEach(() => {
    menuStoreSpy = jasmine.createSpyObj("MenuStore", ["oneVsManyActivated"])
    damageCalculatorSpy = jasmine.createSpyObj("DamageCalculatorService", ["calcDamage", "calcDamageForTwoAttackers"])
    damageOrderSpy = jasmine.createSpyObj("DamageResultOrderService", ["order"])

    TestBed.configureTestingModule({
      providers: [
        DamageMultiCalcService,
        { provide: MenuStore, useValue: menuStoreSpy },
        { provide: DamageCalculatorService, useValue: damageCalculatorSpy },
        { provide: DamageResultOrderService, useValue: damageOrderSpy },
        provideExperimentalZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DamageMultiCalcService)
  })

  describe("one vs many", () => {
    it("should calculate damage for one vs many with one attacker", () => {
      menuStoreSpy.oneVsManyActivated.and.returnValue(true)

      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(attacker, target2.pokemon)
      const damageResult3 = damageResult(attacker, target3.pokemon)

      damageCalculatorSpy.calcDamage.withArgs(attacker, target1.pokemon, field).and.returnValue(damageResult1)
      damageCalculatorSpy.calcDamage.withArgs(attacker, target2.pokemon, field).and.returnValue(damageResult2)
      damageCalculatorSpy.calcDamage.withArgs(attacker, target3.pokemon, field).and.returnValue(damageResult3)

      damageOrderSpy.order.and.callFake(results => results)

      const result = service.calculateDamageForAll(attacker, targets, new Field())

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for one vs many with two attackers", () => {
      menuStoreSpy.oneVsManyActivated.and.returnValue(true)

      const field = new Field()
      const attacker = new Pokemon("Raging Bolt")
      const secondAttacker = new Pokemon("Walking Wake")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const targets = [target1, target2]

      const damageResult1 = damageResult(attacker, target1.pokemon)
      const damageResult2 = damageResult(secondAttacker, target1.pokemon)

      const damageResult3 = damageResult(attacker, target2.pokemon)
      const damageResult4 = damageResult(secondAttacker, target2.pokemon)

      damageCalculatorSpy.calcDamageForTwoAttackers.withArgs(attacker, secondAttacker, target1.pokemon, field).and.returnValue([damageResult1, damageResult2])
      damageCalculatorSpy.calcDamageForTwoAttackers.withArgs(attacker, secondAttacker, target2.pokemon, field).and.returnValue([damageResult3, damageResult4])

      damageOrderSpy.order.and.callFake(results => results)

      const result = service.calculateDamageForAll(attacker, targets, new Field(), secondAttacker)

      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult3.id)
    })
  })

  describe("many vs one", () => {
    it("should calculate damage for many vs one with one attacker", () => {
      menuStoreSpy.oneVsManyActivated.and.returnValue(false)

      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(target1.pokemon, teamMember)
      const damageResult2 = damageResult(target2.pokemon, teamMember)
      const damageResult3 = damageResult(target3.pokemon, teamMember)

      damageCalculatorSpy.calcDamage.withArgs(target1.pokemon, teamMember, field).and.returnValue(damageResult1)
      damageCalculatorSpy.calcDamage.withArgs(target2.pokemon, teamMember, field).and.returnValue(damageResult2)
      damageCalculatorSpy.calcDamage.withArgs(target3.pokemon, teamMember, field).and.returnValue(damageResult3)

      damageOrderSpy.order.and.callFake(results => results)

      const result = service.calculateDamageForAll(teamMember, targets, new Field())

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult2.id)
      expect(result[2].id).toEqual(damageResult3.id)
    })

    it("should calculate damage for many vs one with two attacker", () => {
      menuStoreSpy.oneVsManyActivated.and.returnValue(false)

      const field = new Field()
      const teamMember = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"), true)
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"), true)
      const targets = [target1, target2, target3]

      const damageResult1 = damageResult(target1.pokemon, teamMember)
      const damageResult2 = damageResult(target2.pokemon, teamMember)
      const damageResult3 = damageResult(target3.pokemon, teamMember)

      damageCalculatorSpy.calcDamageForTwoAttackers.withArgs(target1.pokemon, target3.pokemon, teamMember, field).and.returnValue([damageResult1, damageResult3])
      damageCalculatorSpy.calcDamage.withArgs(target2.pokemon, teamMember, field).and.returnValue(damageResult2)
      damageCalculatorSpy.calcDamageForTwoAttackers.withArgs(target1.pokemon, target3.pokemon, teamMember, field).and.returnValue([damageResult1, damageResult3])

      damageOrderSpy.order.and.callFake(results => results)

      const result = service.calculateDamageForAll(teamMember, targets, new Field())

      expect(result.length).toEqual(3)
      expect(result[0].id).toEqual(damageResult1.id)
      expect(result[1].id).toEqual(damageResult3.id)
      expect(result[2].id).toEqual(damageResult2.id)
    })
  })
})

function damageResult(attacker: Pokemon, defender: Pokemon): DamageResult {
  return new DamageResult(attacker, defender, "", "", "", 1, "")
}
