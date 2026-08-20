import { increasedStatByNature, natureEffect } from "@multicalc/model/nature"

describe("increasedStatByNature", () => {
  it("should return the increased stat of a nature", () => {
    expect(increasedStatByNature("Adamant")).toBe("atk")
    expect(increasedStatByNature("Bold")).toBe("def")
    expect(increasedStatByNature("Modest")).toBe("spa")
    expect(increasedStatByNature("Calm")).toBe("spd")
    expect(increasedStatByNature("Jolly")).toBe("spe")
  })

  it("should return undefined for a neutral nature", () => {
    expect(increasedStatByNature("Serious")).toBeUndefined()
  })
})

describe("natureEffect", () => {
  it("should return + when the nature increases the stat", () => {
    expect(natureEffect("Adamant", "atk")).toBe("+")
  })

  it("should return - when the nature decreases the stat", () => {
    expect(natureEffect("Adamant", "spa")).toBe("-")
  })

  it("should return empty when the nature does not affect the stat", () => {
    expect(natureEffect("Adamant", "spe")).toBe("")
  })

  it("should return empty for a neutral nature", () => {
    expect(natureEffect("Serious", "atk")).toBe("")
  })
})
