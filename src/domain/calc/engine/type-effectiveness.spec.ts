import { Move } from "@calc/model/move"
import { getMoveEffectiveness } from "@calc/engine/type-effectiveness"

describe("getMoveEffectiveness", () => {
  it("matches super effective", () => {
    const m = new Move("Earthquake")
    expect(getMoveEffectiveness(m, "Fire")).toBe(2)
  })

  it("matches not very effective", () => {
    const m = new Move("Earthquake")
    expect(getMoveEffectiveness(m, "Grass")).toBe(0.5)
  })

  it("matches immunity", () => {
    const m = new Move("Earthquake")
    expect(getMoveEffectiveness(m, "Flying")).toBe(0)
  })

  it("matches Freeze-Dry against Water", () => {
    const m = new Move("Freeze-Dry")
    expect(getMoveEffectiveness(m, "Water")).toBe(2)
  })

  it("grounds a Flying type with Ring Target", () => {
    const m = new Move("Earthquake")
    expect(getMoveEffectiveness(m, "Flying", false, false, true)).toBe(1)
  })

  it("grounds a Flying type under Gravity", () => {
    const m = new Move("Earthquake")
    expect(getMoveEffectiveness(m, "Flying", false, true)).toBe(1)
  })

  it("lets a Normal move hit a revealed Ghost type", () => {
    const m = new Move("Body Slam")
    expect(getMoveEffectiveness(m, "Ghost", true)).toBe(1)
  })

  it("lets a Fighting move hit a revealed Ghost type", () => {
    const m = new Move("Close Combat")
    expect(getMoveEffectiveness(m, "Ghost", true)).toBe(1)
  })

  it("makes Nihil Light neutral against Fairy", () => {
    const m = new Move("Nihil Light")
    expect(getMoveEffectiveness(m, "Fairy")).toBe(1)
  })

  it("multiplies both types for Flying Press", () => {
    const m = new Move("Flying Press")
    expect(getMoveEffectiveness(m, "Grass")).toBe(2)
  })
})
