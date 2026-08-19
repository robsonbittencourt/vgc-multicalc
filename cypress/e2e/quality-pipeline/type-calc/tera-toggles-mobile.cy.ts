import { poke } from "@cy-support/e2e"
import { buildSingleMemberTeamMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { DefensiveCoverageMobile } from "@page-object/defensive-coverage-mobile"
import { OffensiveCoverageMobile } from "@page-object/offensive-coverage-mobile"

const bottomNav = new BottomNav()
const defensiveCoverage = new DefensiveCoverageMobile()
const offensiveCoverage = new OffensiveCoverageMobile()

describe("Consider Tera Type on the defensive coverage", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Coverage")
  })

  it("Should offer the toggle even when there is no second team", () => {
    cy.get('[data-cy="consider-tera-type-toggle"]').scrollIntoView()

    defensiveCoverage.teraTypeToggleIsVisible()
  })

  it("Should recalculate the cells with the Tera Flying typing", () => {
    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    defensiveCoverage.cellForTypeIs("Ground", 0, "2x")
    defensiveCoverage.cellForTypeIs("Psychic", 0, "immune")

    defensiveCoverage.toggleTeraType()

    defensiveCoverage.teraTypeToggleIsChecked()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "1/2")
    defensiveCoverage.cellForTypeIs("Ground", 0, "immune")
    defensiveCoverage.cellForTypeIs("Psychic", 0, "")
  })

  it("Should restore the original typing when the toggle is turned off", () => {
    defensiveCoverage.toggleTeraType()
    defensiveCoverage.toggleTeraType()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    defensiveCoverage.cellForTypeIs("Psychic", 0, "immune")
  })

  it("Should update the totals along with the cells", () => {
    defensiveCoverage.totalWeakForTypeIs("Fighting", 1)

    defensiveCoverage.toggleTeraType()

    defensiveCoverage.totalWeakForTypeIs("Fighting", 0)
    defensiveCoverage.totalResistForTypeIs("Fighting", 1)
  })
})

describe("Consider Tera Type on the offensive coverage", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Coverage")
  })

  it("Should not offer the toggle when there is no second team", () => {
    offensiveCoverage.teraTypeToggleIsHidden()
  })
})
