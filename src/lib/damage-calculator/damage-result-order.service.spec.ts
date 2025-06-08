import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"

describe("DamageResultOrderService", () => {
  let service: DamageResultOrderService

  let storeSpy: any
  let menuStoreSpy: any

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj("CalculatorStore", ["targets"])
    menuStoreSpy = jasmine.createSpyObj("MenuStore", ["oneVsManyActivated", "manyVsOneActivated"])

    TestBed.configureTestingModule({
      providers: [DamageResultOrderService, { provide: CalculatorStore, useValue: storeSpy }, { provide: MenuStore, useValue: menuStoreSpy }, provideZonelessChangeDetection()]
    })
  })

  describe("order by damage", () => {
    it("should order damage results by damage value", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      menuStoreSpy.oneVsManyActivated.and.returnValue(true)
      storeSpy.targets.and.returnValue([target1, target2, target3])

      const damageResult1 = damageResult(attacker, target1.pokemon, 50)
      const damageResult2 = damageResult(attacker, target2.pokemon, 20)
      const damageResult3 = damageResult(attacker, target3.pokemon, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results.length).toBe(3)
      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })
  })

  describe("default Pokémon", () => {
    it("should put defender default Pokémon at end of order when one vs many was activated", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Togepi"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      menuStoreSpy.oneVsManyActivated.and.returnValue(true)
      storeSpy.targets.and.returnValue([target1, target2, target3])

      const damageResult1 = damageResult(attacker, target1.pokemon, 50)
      const damageResult2 = damageResult(attacker, target2.pokemon, 20)
      const damageResult3 = damageResult(attacker, target3.pokemon, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult1.id)
    })

    it("should put defender default Pokémon at end of order when one vs many was activated and it is the second", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Iron Bundle"))
      const target2 = new Target(new Pokemon("Togepi"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      menuStoreSpy.oneVsManyActivated.and.returnValue(true)
      storeSpy.targets.and.returnValue([target1, target2, target3])

      const damageResult1 = damageResult(attacker, target1.pokemon, 20)
      const damageResult2 = damageResult(attacker, target2.pokemon, 50)
      const damageResult3 = damageResult(attacker, target3.pokemon, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })

    it("should put attacker default Pokémon at end of order when many vs one was activated", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Togepi"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      menuStoreSpy.oneVsManyActivated.and.returnValue(false)
      menuStoreSpy.manyVsOneActivated.and.returnValue(true)
      storeSpy.targets.and.returnValue([target1, target2, target3])

      const damageResult1 = damageResult(target1.pokemon, attacker, 50)
      const damageResult2 = damageResult(target2.pokemon, attacker, 20)
      const damageResult3 = damageResult(target3.pokemon, attacker, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult1.id)
    })

    it("should put attacker default Pokémon at end of order when many vs one was activated and it is the second", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Iron Bundle"))
      const target2 = new Target(new Pokemon("Togepi"))
      const target3 = new Target(new Pokemon("Roaring Moon"))

      menuStoreSpy.oneVsManyActivated.and.returnValue(false)
      menuStoreSpy.manyVsOneActivated.and.returnValue(true)
      storeSpy.targets.and.returnValue([target1, target2, target3])

      const damageResult1 = damageResult(target1.pokemon, attacker, 20)
      const damageResult2 = damageResult(target2.pokemon, attacker, 50)
      const damageResult3 = damageResult(target3.pokemon, attacker, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })
  })

  describe("scenarios mantaining order", () => {
    it("should not change order when have a change in Target with Tera quantity", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Roaring Moon", { teraTypeActive: false }))
      const target3WithTera = new Target(new Pokemon("Roaring Moon", { teraTypeActive: true }))

      menuStoreSpy.oneVsManyActivated.and.returnValue(true)
      storeSpy.targets.and.returnValues([target1, target2, target3], [target1, target2, target3], [target1, target2, target3WithTera], [target1, target2, target3WithTera])

      const damageResult1 = damageResult(attacker, target1.pokemon, 50)
      const damageResult2 = damageResult(attacker, target2.pokemon, 20)
      const damageResult3 = damageResult(attacker, target3.pokemon, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult1.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult3.id)
    })

    it("should not change order when have a change in Target with Commander quantity", () => {
      const attacker = new Pokemon("Raging Bolt")

      const target1 = new Target(new Pokemon("Flutter Mane"))
      const target2 = new Target(new Pokemon("Iron Bundle"))
      const target3 = new Target(new Pokemon("Dondozo", { commanderActive: false }))
      const target3WithCommander = new Target(new Pokemon("Dondozo", { commanderActive: true }))

      menuStoreSpy.oneVsManyActivated.and.returnValue(true)
      storeSpy.targets.and.returnValues(
        [target1, target2, target3],
        [target1, target2, target3],
        [target1, target2, target3],
        [target1, target2, target3WithCommander],
        [target1, target2, target3WithCommander],
        [target1, target2, target3WithCommander]
      )

      const damageResult1 = damageResult(attacker, target1.pokemon, 50)
      const damageResult2 = damageResult(attacker, target2.pokemon, 20)
      const damageResult3 = damageResult(attacker, target3.pokemon, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service = TestBed.inject(DamageResultOrderService)
      service.order(results)

      expect(results[0].id).toEqual(damageResult1.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult3.id)
    })
  })
})

function damageResult(attacker: Pokemon, defender: Pokemon, damage: number): DamageResult {
  return new DamageResult(attacker, defender, "", "", "", damage, "")
}
