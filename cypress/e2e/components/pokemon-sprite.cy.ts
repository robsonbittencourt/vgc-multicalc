import { Header } from "@page-object/header"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()

const DEFAULT_TEAM_SPRITES = ["Charizard.webp", "Dragonite.webp", "Venusaur.webp", "Incineroar.webp"]

describe("By form", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should use the sprite of the current form", () => {
    const build = team.add("Aegislash-Shield")

    teamsWidget.activeTeamSpritesAre([...DEFAULT_TEAM_SPRITES, "Aegislash-Shield.webp"])

    build.toggleAegislashForm()

    teamsWidget.activeTeamSpritesAre([...DEFAULT_TEAM_SPRITES, "Aegislash-Blade.webp"])
  })

  it("Should use the sprite of the chosen Pokémon", () => {
    team.add("Pikachu")

    teamsWidget.activeTeamSpritesAre([...DEFAULT_TEAM_SPRITES, "Pikachu.webp"])
  })
})
