import { poke } from "@cy-support/e2e"
import { setUpDefaultTeam, setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { Header } from "@page-object/header"
import { MultiCalcLayout } from "@page-object/multi-calc-layout"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const header = new Header()
const layout = new MultiCalcLayout()
const opponents = new Opponent()
const team = new Team()

describe("Side by Side layout", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.add("Blissey")
    opponents.add("Pikachu")
  })

  it("Should start stacked and switch between the two layouts", () => {
    layout.isStacked()

    layout.useSideBySide()

    layout.isSideBySide()

    layout.useStacked()

    layout.isStacked()
  })

  it("Should keep the layout after a reload and share it with Many vs Team", () => {
    layout.useSideBySide()

    cy.reload()
    header.openTeamVsMany()

    layout.isSideBySide()

    header.openManyVsTeam()

    opponents.isShowingAttackers()
    layout.isSideBySide()
  })

  it("Should keep the opponents on screen while the page scrolls", () => {
    layout.useSideBySide()

    layout.opponentsStayOnScreenWhenPageScrolls()
  })

  it("Should show two cards per row", () => {
    layout.useSideBySide()

    layout.cardsPerRowIs(2)
  })

  it("Should hide the calc options until they are requested", () => {
    layout.useSideBySide()

    layout.calcOptionsAreHidden()

    layout.toggleCalcOptions()

    layout.calcOptionsAreVisible()

    layout.toggleCalcOptions()

    layout.calcOptionsAreHidden()
  })

  it("Should reorder the cards by damage", () => {
    layout.useSideBySide()
    layout.toggleCalcOptions()

    opponents.cardOrderIs(["Blissey", "Pikachu"])

    opponents.toggleOrderByDamage()

    opponents.cardOrderIs(["Pikachu", "Blissey"])
  })

  it("Should change the roll level", () => {
    layout.useSideBySide()
    layout.toggleCalcOptions()

    opponents.selectRollLevel("low")

    opponents.rollLevelIs("low")
  })

  it("Should filter the cards by Pokémon", () => {
    layout.useSideBySide()

    opponents.filterByPokemon("Pikachu")

    opponents.exists("Pikachu")
    opponents.doesNotExists("Blissey")

    opponents.clearPokemonFilter()

    opponents.exists("Blissey")
    opponents.exists("Pikachu")
  })

  it("Should add and delete opponents", () => {
    layout.useSideBySide()

    opponents.add("Garchomp")

    opponents.exists("Garchomp")

    opponents.deleteAll()

    opponents.empty()
  })

  it("Should keep the filters and the options when switching layouts", () => {
    opponents.filterByPokemon("Pikachu")

    layout.useSideBySide()

    opponents.exists("Pikachu")
    opponents.doesNotExists("Blissey")

    layout.toggleCalcOptions()
    opponents.applySpecialBoost("+2")

    layout.useStacked()

    opponents.specialBoostSelectionIs("+2")
    opponents.exists("Pikachu")
    opponents.doesNotExists("Blissey")
  })
})

describe("Side by Side boosts", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.add("Tyranitar")
    opponents.add("Blissey")
  })

  it("Should apply the chosen boost to every opponent", () => {
    layout.useSideBySide()
    layout.toggleCalcOptions()

    opponents.applySpecialBoost("+2")

    opponents.get("Tyranitar").descriptionContains("+2 2 HP / 0 SpD Tyranitar")
    opponents.get("Blissey").descriptionContains("+2 2 HP / 32+ SpD Blissey")
  })
})

describe("Side by Side combining opponent cards", () => {
  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
    setUpDefaultTeamOnCurrentScreen()
    layout.useSideBySide()
  })

  it("Should merge the dragged card into the target summing the two attacks", () => {
    opponents.lengthIs(13)

    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.lengthIs(12)
    opponents.doesNotExists("Urshifu Rapid Strike")
    opponents.get("Dragonite").attackerSpritesAre(["Urshifu-Rapid-Strike", "Dragonite"])
    opponents.get("Dragonite").damageIs(200.5, 240.3).causeOHKO()
  })

  it("Should split the combined card back into two", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.separate("Urshifu Rapid Strike")

    opponents.lengthIs(13)
    opponents.get("Urshifu Rapid Strike").damageIs(58.5, 69.8).cause2HKO()
    opponents.get("Dragonite").damageIs(142, 170.4).causeOHKO()
  })
})

describe("Side by Side combining team attackers", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
    setUpDefaultTeamOnCurrentScreen()
    layout.useSideBySide()
  })

  it("Should show both sprites and sum the two attacks", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2).causeOHKO()
  })
})
