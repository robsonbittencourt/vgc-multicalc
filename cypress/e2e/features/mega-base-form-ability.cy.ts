import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuild("your-team")

const SALAMENCE_MEGA_WITH_BASE_ABILITY = "Salamence-Mega @ Salamencite\nAbility: Moxie\nLevel: 50\nEVs: 32 SpA / 32 Spe\nModest Nature\n- Air Slash\n- Body Slam\n- Brick Break\n- Crunch"
const TWO_MEGAS_WITH_DIFFERENT_BASE_ABILITIES =
  "Salamence-Mega @ Salamencite\nAbility: Moxie\nLevel: 50\nEVs: 32 SpA / 32 Spe\nModest Nature\n- Air Slash\n\nGyarados-Mega @ Gyaradosite\nAbility: Intimidate\nLevel: 50\nEVs: 32 Atk / 32 Spe\nAdamant Nature\n- Waterfall"

describe("Mega base form ability from an imported paste", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should force the mega ability on import and restore the declared one when reverting to the base form", () => {
    teamsWidget.importPokepaste(SALAMENCE_MEGA_WITH_BASE_ABILITY)

    build.nameIs("Salamence-Mega")
    build.abilityIs("Aerilate")

    build.toggleMega()

    build.nameIs("Salamence")
    build.abilityIs("Moxie")
  })

  it("Should keep each slot base ability isolated when reverting only one of the megas", () => {
    teamsWidget.importPokepaste(TWO_MEGAS_WITH_DIFFERENT_BASE_ABILITIES)

    team.selectPokemon("Salamence")
    build.toggleMega()

    build.nameIs("Salamence")
    build.abilityIs("Moxie")

    team.selectPokemon("Gyarados")

    build.nameIs("Gyarados-Mega")
    build.abilityIs("Mold Breaker")

    build.toggleMega()

    build.nameIs("Gyarados")
    build.abilityIs("Intimidate")
  })
})
