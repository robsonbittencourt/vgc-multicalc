import { BOOSTER, MAX, MIN } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"

describe("SpeedDefinition", () => {
  it("should return true when one SpeedDefinition is equal to another", () => {
    const definitionOne = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)
    const definitionTwo = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeTrue()
  })

  it("should return false when Pokémon is not the same", () => {
    const definitionOne = new SpeedDefinition(new Pokemon("Rillaboom"), 95, MIN)
    const definitionTwo = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })

  it("should return false when speed is not the same", () => {
    const definitionOne = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)
    const definitionTwo = new SpeedDefinition(new Pokemon("Raging Bolt"), 96, MIN)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })

  it("should return false when description is not the same", () => {
    const definitionOne = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)
    const definitionTwo = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MAX)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })

  it("should return false when description does not have the same size", () => {
    const definitionOne = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MIN)
    const definitionTwo = new SpeedDefinition(new Pokemon("Raging Bolt"), 95, MAX, BOOSTER)

    const isEqual = definitionOne.equals(definitionTwo)

    expect(isEqual).toBeFalse()
  })
})
