import { ChanceCellFormatter } from "@app/pages/probability-calc/general-probability/probability-card/chance-cell-formatter"

describe("ChanceCellFormatter", () => {
  const formatter = new ChanceCellFormatter()

  it("should keep a cell that is not a percentage", () => {
    const cell = "5 turns"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("5 turns")
  })

  it("should keep a percentage without decimals", () => {
    const cell = "33%"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("33%")
  })

  it("should keep a percentage with up to three decimals", () => {
    const cell = "0.015%"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("0.015%")
  })

  it("should round a percentage with more than three decimals", () => {
    const cell = "0.0017%"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("0.002%")
  })

  it("should drop the trailing zeros left by the rounding", () => {
    const cell = "1.20004%"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("1.2%")
  })

  it("should show a percentage that rounds to zero as below the smallest decimal", () => {
    const cell = "0.00019%"

    const formatted = formatter.format(cell)

    expect(formatted).toBe("<0.001%")
  })
})
