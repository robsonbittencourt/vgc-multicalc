import { ProbabilityPercentPipe } from "./probability-percent.pipe"

describe("ProbabilityPercentPipe", () => {
  it("should delegate the formatting to the formatter", () => {
    const pipe = new ProbabilityPercentPipe()

    expect(pipe.transform(0.123)).toBe("12.3")
  })
})
