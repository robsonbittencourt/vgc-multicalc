import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"

describe("RollLevelConfig", () => {
  it("high maps to the highest roll index", () => {
    const config = RollLevelConfig.high()

    const index = config.toRollIndex()

    expect(index).toEqual(15)
  })

  it("medium maps to the middle roll index", () => {
    const config = RollLevelConfig.medium()

    const index = config.toRollIndex()

    expect(index).toEqual(7)
  })

  it("low maps to the lowest roll index", () => {
    const config = RollLevelConfig.low()

    const index = config.toRollIndex()

    expect(index).toEqual(0)
  })

  it("high serializes to its config string", () => {
    const config = RollLevelConfig.high()

    const text = config.toConfigString()

    expect(text).toEqual("high")
  })

  it("medium serializes to its config string", () => {
    const config = RollLevelConfig.medium()

    const text = config.toConfigString()

    expect(text).toEqual("medium")
  })

  it("low serializes to its config string", () => {
    const config = RollLevelConfig.low()

    const text = config.toConfigString()

    expect(text).toEqual("low")
  })

  it("parses medium from its config string", () => {
    const config = RollLevelConfig.fromConfigString("medium")

    expect(config.medium).toBe(true)
    expect(config.toRollIndex()).toEqual(7)
  })

  it("parses low from its config string", () => {
    const config = RollLevelConfig.fromConfigString("low")

    expect(config.low).toBe(true)
    expect(config.toRollIndex()).toEqual(0)
  })

  it("defaults to high for an unknown config string", () => {
    const config = RollLevelConfig.fromConfigString("nonsense")

    expect(config.high).toBe(true)
    expect(config.toRollIndex()).toEqual(15)
  })
})
