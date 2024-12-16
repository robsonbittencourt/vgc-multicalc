import { META, MIN } from "../constants"
import { SpeedDefinition } from "./speed-definition"


describe("SpeedDefinition", () => {
  it("should return true when one SpeedDefinition is equal to another", () => {
    const definitionOne = new SpeedDefinition("Raging Bolt", 95, MIN)
    const definitionTwo = new SpeedDefinition("Raging Bolt", 95, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeTrue()
  })

  it("should return false when Pokémon is not the same", () => {
    const definitionOne = new SpeedDefinition("Rillaboom", 95, MIN)
    const definitionTwo = new SpeedDefinition("Raging Bolt", 95, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })

  it("should return false when speed is not the same", () => {
    const definitionOne = new SpeedDefinition("Raging Bolt", 95, MIN)
    const definitionTwo = new SpeedDefinition("Raging Bolt", 96, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })

  it("should return false when description is not the same", () => {
    const definitionOne = new SpeedDefinition("Raging Bolt", 95, MIN)
    const definitionTwo = new SpeedDefinition("Raging Bolt", 95, META)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })
})