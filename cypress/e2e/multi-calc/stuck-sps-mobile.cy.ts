import { MOBILE_SUITE, goToMobile, goToTeamVsManyMobile } from "@cy-support/setup"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { StickyHeadersMobile } from "@page-object/sticky-headers-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const sticky = new StickyHeadersMobile()
const build = new PokemonBuildMobile()
const teamTabs = new TeamTabsMobile()

describe("Stuck SPs on Team vs Many", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should not show the stuck SPs while the build sliders are on screen", () => {
    sticky.scrollDown(400)

    sticky.movesAreStuckBelowTeamTabs()
    sticky.stuckSpsAreHidden()
  })

  it("Should show the SpA for a special move and nothing for a status move", () => {
    sticky.scrollToBottom()

    sticky.stuckSpsAre(["spa"])

    build.activateMoveChip(4)

    sticky.stuckSpsAreHidden()
  })

  it("Should show the Atk for a physical move", () => {
    teamTabs.activateTeamMember(3)
    build.nameIs("Incineroar")

    sticky.scrollToBottom()

    sticky.stuckSpsAre(["atk"])
  })

  it("Should edit the same SPs from the stuck slider", () => {
    sticky.scrollToBottom()

    sticky.inputStuckSp("spa", 20)
    sticky.scrollToTop()

    sticky.stuckSpsAreHidden()
    build.spValueIs("spa", 20)
  })
})

describe("Stuck SPs on Many vs Team", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToMobile("Many vs Team")
  })

  it("Should show the HP, Def and SpD once the build sliders scroll past", () => {
    sticky.scrollDown(400)

    sticky.stuckSpsAreHidden()

    sticky.scrollToBottom()

    sticky.stuckSpsAre(["hp", "def", "spd"])
  })
})
