import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { Header } from "@page-object/header"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const header = new Header()
const team = new Team()

describe("EVs and SPs", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.importPokemon(poke["chi-yu"])
    new PokemonBuild("your-team").ensureEvMode()
  })

  it("Should switch the exported values when the SP toggle is used", () => {
    const exportModal = team.exportPokemon("Chi-Yu")

    exportModal.containsLine("EVs: 44 HP / 252 Atk / 12 Def / 32 SpA / 124 SpD / 40 Spe")

    exportModal.toggleSpsMode()

    exportModal.doesNotContainLine("EVs: 44 HP / 252 Atk / 12 Def / 32 SpA / 124 SpD / 40 Spe")
    exportModal.containsLine("EVs: 6 HP / 32 Atk / 2 Def / 4 SpA / 16 SpD / 5 Spe")
  })
})

describe("A Pokémon and a team", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  smoke("Should open the modal with the paste of the exported Pokémon", () => {
    const exportModal = team.exportPokemon("Charizard")

    exportModal.titleIs("Charizard")
    exportModal.pokemonCountIs(1)
    exportModal.containsLine("Charizard @ Charizardite Y")
    exportModal.containsLine("Ability: Solar Power")
    exportModal.containsLine("- Solar Beam")
  })

  it("Should open the modal with every Pokémon of the team", () => {
    teamsWidget.importPokepaste(poke["default-team"])

    const exportModal = teamsWidget.exportTeam("Team 2")

    exportModal.titleIs("Team 2")
    exportModal.pokemonCountIs(2)
    exportModal.containsLine("Miraidon @ Choice Specs")
    exportModal.containsLine("Koraidon @ Clear Amulet")
  })

  it("Should confirm the content was copied", () => {
    const exportModal = team.exportPokemon("Charizard")

    exportModal.copyButtonIs("Copy")

    exportModal.copy()

    exportModal.copyButtonIs("Copied")
  })
})
