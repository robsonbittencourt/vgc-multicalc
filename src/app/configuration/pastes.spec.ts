import { pastesEnabled } from "@configuration/pastes"

describe("pastesEnabled", () => {
  it("should keep pastes off on the production hosts", () => {
    expect(pastesEnabled("vgcmulticalc.com")).toBe(false)
    expect(pastesEnabled("www.vgcmulticalc.com")).toBe(false)
  })

  it("should turn pastes on in the dev environment and locally", () => {
    expect(pastesEnabled("daxlgsrbxnzt9.cloudfront.net")).toBe(true)
    expect(pastesEnabled("localhost")).toBe(true)
  })
})
