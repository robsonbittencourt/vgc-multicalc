import { poke } from "@cy-support/e2e"
import { setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"

const pokemonBuild = new PokemonBuild("your-team")
const header = new Header()
const opponents = new Opponent()

function setUpDefaultTeamAndOpponents() {
  header.openManyVsTeam()
  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
  setUpDefaultTeamOnCurrentScreen()
}

describe("Combining two cards", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should merge the dragged card into the target summing the two attacks", () => {
    opponents.lengthIs(13)

    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.lengthIs(12)
    opponents.doesNotExists("Urshifu Rapid Strike")
    opponents.get("Dragonite").attackerSpritesAre(["Urshifu-Rapid-Strike", "Dragonite"])
    opponents.get("Dragonite").descriptionContains("AND")
    opponents.get("Dragonite").damageIs(200.5, 240.3).causeOHKO()
  })

  it("Should split the combined card back into two", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.lengthIs(12)

    opponents.separate("Urshifu Rapid Strike")

    opponents.lengthIs(13)
    opponents.get("Urshifu Rapid Strike").damageIs(58.5, 69.8).cause2HKO()
    opponents.get("Dragonite").damageIs(142, 170.4).causeOHKO()
  })

  it("Should offer the combine handle only in Many vs Team", () => {
    opponents.combineHandleIsVisible("Dragonite")

    header.openTeamVsMany()

    opponents.combineHandleIsHidden("Dragonite")
  })
})

describe("Assurance in a combined card", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should double the base power when its user is the slower attacker of the combination", () => {
    opponents.selectAttacker("Incineroar")
    pokemonBuild.changeAttackOneByFilter("Assurance", "Assurance")
    pokemonBuild.selectAttackOne()

    opponents.combine("Urshifu Rapid Strike", "Incineroar")

    opponents.get("Incineroar").descriptionContains("120 BP")
    opponents.get("Incineroar").damageIs(102.8, 122.7)
  })

  it("Should auto-check and disable the target damaged flag once the pair is combined", () => {
    opponents.selectAttacker("Incineroar")
    pokemonBuild.changeAttackOneByFilter("Assurance", "Assurance")
    pokemonBuild.selectAttackOne()

    pokemonBuild.targetDamagedIsUncheckedAndEnabled()

    opponents.combine("Urshifu Rapid Strike", "Incineroar")

    opponents.selectSecondAttacker("Incineroar")
    pokemonBuild.targetDamagedIsCheckedAndDisabled()
  })
})

describe("Guard against a third card", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should not combine a third card into an already combined target", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.combine("Rillaboom", "Dragonite")

    opponents.lengthIs(12)
    opponents.exists("Rillaboom")
    opponents.get("Dragonite").attackerSpritesAre(["Urshifu-Rapid-Strike", "Dragonite"])
    opponents.get("Dragonite").damageIs(200.5, 240.3).causeOHKO()
    opponents.get("Rillaboom").damageIs(30.6, 36.9).haveChanceOfToCause3HKO(72.3)
  })
})

describe("Edit a combined opponent", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should open each attacker of the combined card in the build", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")

    opponents.selectAttacker("Urshifu Rapid Strike")

    pokemonBuild.nameIs("Urshifu-Rapid-Strike")

    opponents.selectSecondAttacker("Dragonite")

    pokemonBuild.nameIs("Dragonite")
  })
})
