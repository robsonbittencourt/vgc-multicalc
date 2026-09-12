import { readsTargetHp, weakensOnlyFirstHit } from "@calc/engine/target-hp"

describe("target HP dependence", () => {
  it("should flag the moves whose damage follows the target's current HP", () => {
    const moves = ["Brine", "Hard Press", "Crush Grip", "Wring Out", "Super Fang", "Ruination", "Endeavor", "Pain Split"]

    const flags = moves.map(move => readsTargetHp(move))

    expect(flags).toEqual([true, true, true, true, true, true, true, true])
  })

  it("should not flag a move whose damage ignores the target's current HP", () => {
    const move = "Earthquake"

    const flag = readsTargetHp(move)

    expect(flag).toBe(false)
  })

  it("should flag the abilities that only weaken the first hit at full HP", () => {
    const abilities = ["Multiscale", "Shadow Shield", "Tera Shell"]

    const flags = abilities.map(ability => weakensOnlyFirstHit(ability))

    expect(flags).toEqual([true, true, true])
  })

  it("should not flag an ability that weakens every hit", () => {
    const ability = "Fur Coat"

    const flag = weakensOnlyFirstHit(ability)

    expect(flag).toBe(false)
  })
})
