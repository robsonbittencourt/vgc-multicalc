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

  it("Should populate the opponents with the meta and turn the button into Remove Meta", () => {
    opponents.lengthIs(9)
    opponents.metaButtonLabelIs("Add Meta")

    opponents.addMeta()

    opponents.lengthIs(69)
    opponents.metaButtonLabelIs("Remove Meta")
  })

  it("Should remove only the meta Pokémon keeping the ones added by hand", () => {
    opponents.lengthIs(9)

    opponents.addMeta()
    opponents.removeMeta()

    opponents.lengthIs(9)
    opponents.metaButtonLabelIs("Add Meta")
  })

  it("Should apply the meta without asking while there is a single regulation", () => {
    opponents.addMeta()

    opponents.noRegulationDialogIsShown()

    opponents.lengthIs(69)
    opponents.metaButtonLabelIs("Remove Meta")
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
    opponents.add("Dragonite")
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
    opponents.combine("Tyranitar", "Dragonite")

    opponents.applyPhysicalBoost("+2")

    opponents.get("Dragonite").descriptionContains("+2 32 Atk Tyranitar")
    opponents.get("Dragonite").descriptionContains("+2 32+ Atk Life Orb Dragonite")
  })
})
