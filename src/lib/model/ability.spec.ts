import { Ability } from "./ability"

describe("Ability", () => {
  it("should initialize with the correct name and default on value", () => {
    const ability = new Ability("Levitate")

    expect(ability.name).toBe("Levitate")
    expect(ability.on).toBe(false)
  })

  it("should initialize with the correct name and on value", () => {
    const ability = new Ability("Levitate", true)

    expect(ability.name).toBe("Levitate")
    expect(ability.on).toBe(true)
  })

  it("should return the correct simpleName for Embody Aspect abilities", () => {
    const ability = new Ability("Embody Aspect - Fire")

    expect(ability.simpleName).toBe("Embody Aspect")
  })

  it("should return the correct simpleName for non-Embody Aspect abilities", () => {
    const ability = new Ability("Levitate")

    expect(ability.simpleName).toBe("Levitate")
  })

  it("should return true for paradoxAbility if ability is Protosynthesis", () => {
    const ability = new Ability("Protosynthesis")

    expect(ability.paradoxAbility).toBe(true)
  })

  it("should return true for paradoxAbility if ability is Quark Drive", () => {
    const ability = new Ability("Quark Drive")

    expect(ability.paradoxAbility).toBe(true)
  })

  it("should return false for paradoxAbility if ability is not Protosynthesis or Quark Drive", () => {
    const ability = new Ability("Levitate")

    expect(ability.paradoxAbility).toBe(false)
  })

  it("should return true for protosynthesis if ability is Protosynthesis", () => {
    const ability = new Ability("Protosynthesis")

    expect(ability.protosynthesis).toBe(true)
  })

  it("should return false for protosynthesis if ability is not Protosynthesis", () => {
    const ability = new Ability("Levitate")

    expect(ability.protosynthesis).toBe(false)
  })

  it("should return true for quarkDrive if ability is Quark Drive", () => {
    const ability = new Ability("Quark Drive")

    expect(ability.quarkDrive).toBe(true)
  })

  it("should return false for quarkDrive if ability is not Quark Drive", () => {
    const ability = new Ability("Levitate")

    expect(ability.quarkDrive).toBe(false)
  })

  it("should return true for actionableAbility if ability is Slow Start", () => {
    const ability = new Ability("Slow Start")

    expect(ability.actionableAbility).toBe(true)
  })

  it("should return true for actionableAbility if ability is Unburden", () => {
    const ability = new Ability("Unburden")

    expect(ability.actionableAbility).toBe(true)
  })

  it("should return false for actionableAbility if ability is not Slow Start or Unburden", () => {
    const ability = new Ability("Levitate")

    expect(ability.actionableAbility).toBe(false)
  })

  it("should return true for is method if ability name matches", () => {
    const ability = new Ability("Levitate")

    expect(ability.is("Levitate")).toBe(true)
  })

  it("should return false for is method if ability name does not match", () => {
    const ability = new Ability("Levitate")

    expect(ability.is("Intimidate")).toBe(false)
  })

  it("should return true for isNot method if ability name does not match", () => {
    const ability = new Ability("Levitate")

    expect(ability.isNot("Intimidate")).toBe(true)
  })

  it("should return false for isNot method if ability name matches", () => {
    const ability = new Ability("Levitate")

    expect(ability.isNot("Levitate")).toBe(false)
  })
})
