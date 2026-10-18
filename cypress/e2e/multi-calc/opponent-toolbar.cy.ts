import { poke } from "@cy-support/e2e"
import { setUpDefaultTeam } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { Header } from "@page-object/header"

const header = new Header()
const opponents = new Opponent()

describe("Order by damage", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.add("Blissey")
    opponents.add("Pikachu")
  })

  it("Should reorder the cards by damage and restore the original order", () => {
    opponents.cardOrderIs(["Blissey", "Pikachu"])

    opponents.toggleOrderByDamage()

    opponents.cardOrderIs(["Pikachu", "Blissey"])

    opponents.toggleOrderByDamage()

    opponents.cardOrderIs(["Blissey", "Pikachu"])
  })

  it("Should keep the ordering preference after a reload", () => {
    opponents.toggleOrderByDamage()

    opponents.cardOrderIs(["Pikachu", "Blissey"])

    cy.reload()
    header.openTeamVsMany()

    opponents.cardOrderIs(["Pikachu", "Blissey"])
  })
})

describe("Best move toggle", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.add("Hatterene")
  })

  it("Should change the move shown per target", () => {
    opponents.get("Hatterene").descriptionContains("Draco Meteor")
    opponents.get("Hatterene").doesNotCauseAnyDamage()

    opponents.toggleBestMove()

    opponents.get("Hatterene").descriptionContains("Electro Drift")
  })
})

describe("Meta", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should show the meta Pokémon as opponents and go back to My List", () => {
    opponents.lengthIs(9)

    opponents.selectSource("Meta")

    opponents.lengthIs(60)
    opponents.addIsHidden()
    opponents.listActionsAreHidden()

    opponents.selectSource("My List")

    opponents.lengthIs(9)
    opponents.addIsVisible()
    opponents.listActionsAreVisible()
  })

  it("Should keep the changes to a meta Pokémon until the page is reloaded", () => {
    opponents.selectSource("Meta")
    opponents.selectDefender("Rillaboom").selectNature("Hasty")

    opponents.selectSource("My List")
    opponents.selectSource("Meta")

    opponents.selectDefender("Rillaboom").natureIs("Hasty")

    cy.reload()

    opponents.sourceIs("Meta")
    opponents.selectDefender("Rillaboom").natureIs("Sassy")
  })

  it("Should export the meta Pokémon", () => {
    opponents.selectSource("Meta")

    opponents.export().containsLine("Rillaboom").doesNotContainLine("Machamp")
  })

  it("Should combine two meta attackers", () => {
    header.openManyVsTeam()
    opponents.selectSource("Meta")

    opponents.combine("Sneasler", "Rillaboom")

    opponents.lengthIs(59)
    opponents.doesNotExists("Sneasler")
    opponents.get("Rillaboom").attackerSpritesAre(["Sneasler", "Rillaboom"])
  })
})

describe("Team as opponents", () => {
  it("Should combine two attackers of the team without changing the team", () => {
    header.openManyVsTeam()
    opponents.selectSource("Team 1")

    opponents.lengthIs(4)

    opponents.combine("Charizard", "Dragonite")

    opponents.lengthIs(3)
    opponents.get("Dragonite").attackerSpritesAre(["Charizard", "Dragonite"])

    opponents.selectSource("My List")
    opponents.selectSource("Team 1")

    opponents.lengthIs(3)
  })
})

describe("Export", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])
  })

  it("Should export one description per card", () => {
    const exportModal = opponents.exportCalcs()

    exportModal.containsLine("Tyranitar")
    exportModal.containsLine("Miraidon")
  })

  it("Should export the opponents as a PokePaste", () => {
    const exportModal = opponents.export()

    exportModal.containsLine("Tyranitar @")
    exportModal.containsLine("Ability:")
  })
})

describe("Opponent boosts", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    opponents.deleteAll()
    opponents.add("Tyranitar")
    opponents.add("Blissey")
  })

  it("Should label the selects as Def and SpD on Team vs Many", () => {
    opponents.physicalBoostLabelIs("Def")
    opponents.specialBoostLabelIs("SpD")
  })

  it("Should apply the chosen boost to every opponent", () => {
    opponents.get("Tyranitar").descriptionContains("0 SpD Tyranitar")
    opponents.get("Blissey").descriptionContains("32+ SpD Blissey")

    opponents.applySpecialBoost("+2")

    opponents.get("Tyranitar").descriptionContains("+2 2 HP / 0 SpD Tyranitar")
    opponents.get("Blissey").descriptionContains("+2 2 HP / 32+ SpD Blissey")
  })

  it("Should keep the applied boost selected", () => {
    opponents.applySpecialBoost("+2")

    opponents.specialBoostSelectionIs("+2")
  })

  it("Should replace a previously applied boost instead of stacking it", () => {
    opponents.applySpecialBoost("+2")

    opponents.get("Tyranitar").descriptionContains("+2 2 HP / 0 SpD Tyranitar")

    opponents.applySpecialBoost("-1")

    opponents.get("Tyranitar").descriptionContains("-1 2 HP / 0 SpD Tyranitar")
  })
})

describe("Opponent boosts on Many vs Team", () => {
  beforeEach(() => {
    setUpDefaultTeam()
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.add("Tyranitar")
    opponents.add("Kingambit")
  })

  it("Should label the selects as Atk and SpA", () => {
    opponents.physicalBoostLabelIs("Atk")
    opponents.specialBoostLabelIs("SpA")
  })

  it("Should apply the physical boost to every opponent attacker", () => {
    opponents.applyPhysicalBoost("+2")

    opponents.get("Tyranitar").descriptionContains("+2 32 Atk Tyranitar")
  })

  it("Should apply the boost to both Pokémon of a combined card", () => {
    opponents.combine("Tyranitar", "Kingambit")

    opponents.applyPhysicalBoost("+2")

    opponents.get("Kingambit").descriptionContains("+2 32 Atk Tyranitar")
    opponents.get("Kingambit").descriptionContains("+2 32+ Atk Life Orb Kingambit")
  })
})
