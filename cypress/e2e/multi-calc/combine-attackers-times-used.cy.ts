import { poke } from "@cy-support/e2e"
import { setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const opponents = new Opponent()

describe("Combining two attackers with a move used several times in a row", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
    setUpDefaultTeamOnCurrentScreen()
  })

  it("Should add up the uses of both attackers and consider the stat changes", () => {
    team.selectPokemon("Miraidon").selectAttackOne()
    team.selectTeamMember("Miraidon").combineDamage()
    team.selectTeamMember("Koraidon")
    team.selectPokemon("Koraidon").selectAttackOne()

    opponents.get("Amoonguss").descriptionDoesNotContain("over 3 turns")

    team.selectPokemon("Miraidon").timesUsed(3)

    opponents.get("Amoonguss").descriptionContains("over 3 turns")
    opponents.get("Amoonguss").descriptionContains("(stat changes considered)")
  })
})
