import { remainingHp, remainingHpPercentage } from "@multicalc/hp-calc"

describe("remainingHp", () => {
  it("should subtract the damage taken from the actual HP", () => {
    expect(remainingHp(175, 68)).toBe(107)
  })

  it("should return zero HP when the damage is exactly lethal", () => {
    expect(remainingHp(175, 175)).toBe(0)
  })

  it("should not return negative HP when the damage exceeds the actual HP", () => {
    expect(remainingHp(175, 240)).toBe(0)
  })

  it("should keep the actual HP when no damage is taken", () => {
    expect(remainingHp(175, 0)).toBe(175)
  })
})

describe("remainingHpPercentage", () => {
  it("should return the full percentage when the Pokémon is untouched", () => {
    expect(remainingHpPercentage(200, 200, 0)).toBe(100)
  })

  it("should return the percentage left after taking damage at full HP", () => {
    expect(remainingHpPercentage(200, 200, 50)).toBe(75)
  })

  it("should account for the HP already lost before the damage", () => {
    expect(remainingHpPercentage(200, 150, 50)).toBe(50)
  })

  it("should return zero when the damage is exactly lethal", () => {
    expect(remainingHpPercentage(200, 150, 150)).toBe(0)
  })

  it("should not return a negative percentage when the damage exceeds the remaining HP", () => {
    expect(remainingHpPercentage(200, 150, 400)).toBe(0)
  })
})
