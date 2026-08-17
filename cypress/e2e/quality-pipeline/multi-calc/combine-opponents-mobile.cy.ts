import { goToMobile } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"

const opponents = new Opponent()

function openManyVsTeamMobile() {
  goToMobile("Many vs Team")
}

describe("Combine by dragging", () => {
  beforeEach(() => {
    openManyVsTeamMobile()
    opponents.lengthIs(9)
  })

  it("Should merge the dragged card into the target", () => {
    opponents.combine("Blastoise", "Arcanine")

    opponents.lengthIs(8)
    opponents.doesNotExists("Blastoise")
    opponents.get("Arcanine").attackerSpritesAre(["Arcanine", "Blastoise"])
  })

  it("Should merge into a target that starts off screen", () => {
    opponents.combine("Blastoise", "Charizard")

    opponents.lengthIs(8)
    opponents.doesNotExists("Blastoise")
    opponents.get("Charizard").attackerSpritesAre(["Charizard", "Blastoise"])
  })

  it("Should split the combined card with the move down icon", () => {
    opponents.combine("Blastoise", "Arcanine")

    opponents.lengthIs(8)

    opponents.separate("Arcanine")

    opponents.lengthIs(9)
    opponents.exists("Blastoise")
    opponents.exists("Arcanine")
  })
})

describe("Short drag does not combine", () => {
  beforeEach(() => {
    openManyVsTeamMobile()
    opponents.lengthIs(9)
  })

  it("Should keep the two cards apart after a drag shorter than the threshold", () => {
    opponents.dragShort("Blastoise", 30)

    opponents.lengthIs(9)
    opponents.exists("Blastoise")
  })

  it("Should keep the cards apart even at the edge of the threshold", () => {
    opponents.dragShort("Blastoise", 60)

    opponents.lengthIs(9)
    opponents.exists("Blastoise")
  })
})
