import { goToMobile } from "@cy-support/setup"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"

const shell = new MobileCalcShell()

describe("Coverage tables on a narrow screen", () => {
  beforeEach(() => {
    goToMobile("Type Calc")
  })

  it("Should scroll the tables horizontally without overflowing the page", () => {
    shell.pageDoesNotOverflowHorizontally()
  })
})
