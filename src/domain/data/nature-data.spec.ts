import { getNatureData, NATURE_DETAILS, NatureData } from "@data/nature-data"

describe("getNatureData", () => {
  it("should find a nature by its display name", () => {
    expect(getNatureData("Adamant")).toEqual({ name: "Adamant", plus: "atk", minus: "spa" })
  })

  it("should find a nature regardless of casing and separators", () => {
    expect(getNatureData("ADAMANT")).toEqual(getNatureData("Adamant"))
  })

  it("should return undefined for a nature that does not exist", () => {
    expect(getNatureData("Not A Nature")).toBeUndefined()
  })
})

describe("NATURE_DETAILS — invariants relied on by the EV optimizer", () => {
  const natures = Object.values(NATURE_DETAILS)

  it("should contain the twenty-five natures of the game", () => {
    expect(natures.length).toBe(25)
  })

  it("should never boost more than one stat per nature", () => {
    const boostingTwoStats = natures.filter(nature => Array.isArray(nature.plus))

    expect(boostingTwoStats).toEqual([])
  })

  it("should never raise Def and SpD with the same nature", () => {
    const raisesDef = (nature: NatureData) => nature.plus === "def" && nature.minus !== "def"
    const raisesSpd = (nature: NatureData) => nature.plus === "spd" && nature.minus !== "spd"

    const raisingBothDefences = natures.filter(nature => raisesDef(nature) && raisesSpd(nature))

    expect(raisingBothDefences).toEqual([])
  })

  it("should lower one of the defences whenever it raises the other", () => {
    const raisesDef = natures.filter(nature => nature.plus === "def" && nature.minus !== "def")
    const raisesSpd = natures.filter(nature => nature.plus === "spd" && nature.minus !== "spd")

    expect(raisesDef.every(nature => nature.plus !== "spd")).toBe(true)
    expect(raisesSpd.every(nature => nature.plus !== "def")).toBe(true)
  })

  it("should keep Impish and Bold as Def-boosting natures", () => {
    expect(getNatureData("Impish")!.plus).toBe("def")
    expect(getNatureData("Bold")!.plus).toBe("def")
  })

  it("should keep Careful and Calm as SpD-boosting natures", () => {
    expect(getNatureData("Careful")!.plus).toBe("spd")
    expect(getNatureData("Calm")!.plus).toBe("spd")
  })

  it("should not let any nature reach a higher Def multiplier than Impish and Bold", () => {
    const defBoosting = natures.filter(nature => nature.plus === "def" && nature.minus !== "def")

    expect(defBoosting.map(nature => nature.name).sort()).toEqual(["Bold", "Impish", "Lax", "Relaxed"])
  })

  it("should not let any nature reach a higher SpD multiplier than Careful and Calm", () => {
    const spdBoosting = natures.filter(nature => nature.plus === "spd" && nature.minus !== "spd")

    expect(spdBoosting.map(nature => nature.name).sort()).toEqual(["Calm", "Careful", "Gentle", "Sassy"])
  })
})
