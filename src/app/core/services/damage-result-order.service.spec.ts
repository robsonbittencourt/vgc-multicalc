import { DamageResultOrderService } from "@core/services/damage-result-order.service"
import { DamageResult } from "@multicalc/damage-calculator"
import { Pokemon } from "@multicalc/model/pokemon"
import { MultiCalcMode } from "@multicalc/types"

const ONE_VS_MANY: MultiCalcMode = { oneVsManyActivated: true, manyVsOneActivated: false, oneVsManyBestMoveActivated: false }
const MANY_VS_ONE: MultiCalcMode = { oneVsManyActivated: false, manyVsOneActivated: true, oneVsManyBestMoveActivated: false }

describe("DamageResultOrderService", () => {
  let service: DamageResultOrderService

  beforeEach(() => {
    service = new DamageResultOrderService()
    service.initialize(0)
  })

  describe("order by damage", () => {
    it("should order damage results by damage value", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(attacker, new Pokemon("Flutter Mane"), 50)
      const damageResult2 = damageResult(attacker, new Pokemon("Iron Bundle"), 20)
      const damageResult3 = damageResult(attacker, new Pokemon("Roaring Moon"), 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 0, ONE_VS_MANY)

      expect(results.length).toBe(3)
      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })
  })

  describe("default Pokémon", () => {
    it("should put defender default Pokémon at end of order when one vs many was activated", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(attacker, new Pokemon("Togepi"), 50)
      const damageResult2 = damageResult(attacker, new Pokemon("Iron Bundle"), 20)
      const damageResult3 = damageResult(attacker, new Pokemon("Roaring Moon"), 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 0, ONE_VS_MANY)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult1.id)
    })

    it("should put defender default Pokémon at end of order when one vs many was activated and it is the second", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(attacker, new Pokemon("Iron Bundle"), 20)
      const damageResult2 = damageResult(attacker, new Pokemon("Togepi"), 50)
      const damageResult3 = damageResult(attacker, new Pokemon("Roaring Moon"), 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 0, ONE_VS_MANY)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })

    it("should put attacker default Pokémon at end of order when many vs one was activated", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(new Pokemon("Togepi"), attacker, 50)
      const damageResult2 = damageResult(new Pokemon("Iron Bundle"), attacker, 20)
      const damageResult3 = damageResult(new Pokemon("Roaring Moon"), attacker, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 0, MANY_VS_ONE)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult1.id)
    })

    it("should put attacker default Pokémon at end of order when many vs one was activated and it is the second", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(new Pokemon("Iron Bundle"), attacker, 20)
      const damageResult2 = damageResult(new Pokemon("Togepi"), attacker, 50)
      const damageResult3 = damageResult(new Pokemon("Roaring Moon"), attacker, 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 0, MANY_VS_ONE)

      expect(results[0].id).toEqual(damageResult3.id)
      expect(results[1].id).toEqual(damageResult1.id)
      expect(results[2].id).toEqual(damageResult2.id)
    })
  })

  describe("scenarios mantaining order", () => {
    it("should not change order when have a change in Target with Tera quantity", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(attacker, new Pokemon("Flutter Mane"), 50)
      const damageResult2 = damageResult(attacker, new Pokemon("Iron Bundle"), 20)
      const damageResult3 = damageResult(attacker, new Pokemon("Roaring Moon"), 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 1, ONE_VS_MANY)

      expect(results[0].id).toEqual(damageResult1.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult3.id)
    })

    it("should not change order when have a change in Target with Commander quantity", () => {
      const attacker = new Pokemon("Raging Bolt")

      const damageResult1 = damageResult(attacker, new Pokemon("Flutter Mane"), 50)
      const damageResult2 = damageResult(attacker, new Pokemon("Iron Bundle"), 20)
      const damageResult3 = damageResult(attacker, new Pokemon("Dondozo"), 80)
      const results = [damageResult1, damageResult2, damageResult3]

      service.order(results, 1, ONE_VS_MANY)

      expect(results[0].id).toEqual(damageResult1.id)
      expect(results[1].id).toEqual(damageResult2.id)
      expect(results[2].id).toEqual(damageResult3.id)
    })
  })
})

function damageResult(attacker: Pokemon, defender: Pokemon, damage: number): DamageResult {
  return new DamageResult(attacker, defender, "", "", "", damage, "", [])
}
