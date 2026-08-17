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

  it("Should not offer the toggle in Many vs Team", () => {
    header.openManyVsTeam()

    opponents.bestMoveToggleIsHidden()
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
