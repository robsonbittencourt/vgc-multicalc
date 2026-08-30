import { CombinedProbability } from "@page-object/combined-probability"
import { Header } from "@page-object/header"

const header = new Header()
const combinedProbability = new CombinedProbability()

function clearAllProbabilities() {
  for (let i = 1; i <= 5; i++) {
    combinedProbability.inputProbability(i, "")
  }
}

function fillFiveProbabilities() {
  clearAllProbabilities()
  combinedProbability.inputProbability(1, "20")
  combinedProbability.inputProbability(2, "30")
  combinedProbability.inputProbability(3, "40")
  combinedProbability.inputProbability(4, "50")
  combinedProbability.inputProbability(5, "60")
}

describe("Calculation", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should combine the filled probabilities as at least one by default", () => {
    combinedProbability.calcTypeIs("at-least-one")

    fillFiveProbabilities()

    combinedProbability.resultIs("93.3")
  })

  it("Should give a different result for each calc type", () => {
    fillFiveProbabilities()

    combinedProbability.resultIs("93.3")

    combinedProbability.selectCalcType("all")

    combinedProbability.resultIs("0.7")

    combinedProbability.selectCalcType("none")

    combinedProbability.resultIs("6.7")
  })

  it("Should recalculate when a probability is edited", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "50")

    combinedProbability.resultIs("75")

    combinedProbability.inputProbability(2, "100")

    combinedProbability.resultIs("100")
  })

  it("Should start with the first two probabilities already filled", () => {
    combinedProbability.inputValueIs(1, "30")
    combinedProbability.inputValueIs(2, "25")

    combinedProbability.resultIs("47.5")
  })

  it("Should treat the empty fields as out of the calculation", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "50")

    combinedProbability.resultIs("50")
  })
})

describe("Input normalization", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should bring a value above one hundred back to one hundred in the field", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "150")

    combinedProbability.inputValueIs(1, "100")
    combinedProbability.resultIs("100")
  })

  it("Should never let a negative value stay in the field", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "-10")

    combinedProbability.resultIs("0")
  })

  it("Should keep a decimal value as it was typed", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "25.5")

    combinedProbability.inputValueIs(1, "25.5")
    combinedProbability.resultIs("25.5")
  })

  it("Should drop a non numeric value out of the calculation", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "50")

    combinedProbability.resultIs("75")

    combinedProbability.inputProbability(2, "abc")

    combinedProbability.resultIs("50")
  })

  it("Should keep the other probabilities working after a non numeric value", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "abc")
    combinedProbability.inputProbability(2, "40")

    combinedProbability.resultIs("40")
  })
})
