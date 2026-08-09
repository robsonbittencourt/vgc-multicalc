import { CombinedProbability } from "@page-object/combined-probability"

const combinedProbability = new CombinedProbability()

describe("Combined Probability Calc", () => {
  beforeEach(() => {
    cy.get('[data-cy="probability-calc"]').click({ force: true })
  })

  it("should render the combined probability component", () => {
    combinedProbability.verifyContainerVisible()
  })

  it("should calculate probability correctly with all zeros", () => {
    combinedProbability.inputProbability(1, "0")
    combinedProbability.inputProbability(2, "0")
    combinedProbability.inputProbability(3, "0")
    combinedProbability.inputProbability(4, "0")
    combinedProbability.inputProbability(5, "0")

    combinedProbability.verifyResult("0")
  })

  it("should calculate probability correctly with all 100", () => {
    combinedProbability.inputProbability(1, "100")
    combinedProbability.inputProbability(2, "100")
    combinedProbability.inputProbability(3, "100")
    combinedProbability.inputProbability(4, "100")
    combinedProbability.inputProbability(5, "100")

    combinedProbability.verifyResult("100")
  })

  it("should calculate probability correctly with specific values", () => {
    combinedProbability.inputProbability(1, "20")
    combinedProbability.inputProbability(2, "30")
    combinedProbability.inputProbability(3, "40")
    combinedProbability.inputProbability(4, "50")
    combinedProbability.inputProbability(5, "60")

    combinedProbability.verifyResult("93.3")
  })

  it("should update result when input values change", () => {
    combinedProbability.inputProbability(1, "10")
    combinedProbability.inputProbability(2, "10")
    combinedProbability.inputProbability(3, "10")
    combinedProbability.inputProbability(4, "10")
    combinedProbability.inputProbability(5, "10")

    combinedProbability.verifyResult("41")

    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "50")
    combinedProbability.inputProbability(3, "50")
    combinedProbability.inputProbability(4, "50")
    combinedProbability.inputProbability(5, "50")

    combinedProbability.verifyResult("96.9")
  })

  it("should handle empty inputs as zero", () => {
    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "")
    combinedProbability.inputProbability(3, "30")
    combinedProbability.inputProbability(4, "40")
    combinedProbability.inputProbability(5, "20")

    combinedProbability.verifyResult("83.2")
  })

  it("should clamp values above 100 to 100", () => {
    combinedProbability.inputProbability(1, "150")
    combinedProbability.inputProbability(2, "200")
    combinedProbability.inputProbability(3, "300")
    combinedProbability.inputProbability(4, "400")
    combinedProbability.inputProbability(5, "500")

    combinedProbability.verifyResult("100")
  })

  it("should clamp values below 0 to 0", () => {
    combinedProbability.inputProbability(1, "-10")
    combinedProbability.inputProbability(2, "-20")
    combinedProbability.inputProbability(3, "-30")
    combinedProbability.inputProbability(4, "-40")
    combinedProbability.inputProbability(5, "-50")

    combinedProbability.verifyResult("0")
  })

  it("should calculate correctly with decimal values", () => {
    combinedProbability.inputProbability(1, "25.5")
    combinedProbability.inputProbability(2, "33.3")
    combinedProbability.inputProbability(3, "44.4")
    combinedProbability.inputProbability(4, "55.5")
    combinedProbability.inputProbability(5, "66.6")

    combinedProbability.verifyResult("95.9")
  })

  describe("Calc Types", () => {
    it("should default to at-least-one", () => {
      combinedProbability.verifyCalcTypeSelected("at-least-one")
    })

    it("should calculate correctly with All type", () => {
      combinedProbability.selectCalcType("all")
      combinedProbability.inputProbability(1, "50")
      combinedProbability.inputProbability(2, "50")
      combinedProbability.inputProbability(3, "50")
      combinedProbability.inputProbability(4, "50")
      combinedProbability.inputProbability(5, "50")

      combinedProbability.verifyResult("3.1")
    })

    it("should calculate correctly with None type", () => {
      combinedProbability.selectCalcType("none")
      combinedProbability.inputProbability(1, "50")
      combinedProbability.inputProbability(2, "50")
      combinedProbability.inputProbability(3, "50")
      combinedProbability.inputProbability(4, "50")
      combinedProbability.inputProbability(5, "50")

      combinedProbability.verifyResult("3.1")
    })

    it("should calculate All correctly with specific values", () => {
      combinedProbability.selectCalcType("all")
      combinedProbability.inputProbability(1, "20")
      combinedProbability.inputProbability(2, "30")
      combinedProbability.inputProbability(3, "40")
      combinedProbability.inputProbability(4, "50")
      combinedProbability.inputProbability(5, "60")

      combinedProbability.verifyResult("0.7")
    })

    it("should calculate None correctly with specific values", () => {
      combinedProbability.selectCalcType("none")
      combinedProbability.inputProbability(1, "20")
      combinedProbability.inputProbability(2, "30")
      combinedProbability.inputProbability(3, "40")
      combinedProbability.inputProbability(4, "50")
      combinedProbability.inputProbability(5, "60")

      combinedProbability.verifyResult("6.7")
    })

    it("should update result when switching calc types", () => {
      combinedProbability.inputProbability(1, "25")
      combinedProbability.inputProbability(2, "35")
      combinedProbability.inputProbability(3, "45")
      combinedProbability.inputProbability(4, "55")
      combinedProbability.inputProbability(5, "75")

      combinedProbability.verifyResult("97")

      combinedProbability.selectCalcType("all")
      combinedProbability.verifyResult("1.6")

      combinedProbability.selectCalcType("none")
      combinedProbability.verifyResult("3")
    })
  })
})
