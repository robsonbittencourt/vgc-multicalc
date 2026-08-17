import { readUserData, setUpDefaultTeam, visitWithUserData } from "@cy-support/setup"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const teamsWidget = new TeamsWidget()
const pokemonBuild = new PokemonBuild("your-team")

function buildTeamAndCaptureData(): Cypress.Chainable<any> {
  setUpDefaultTeam()
  teamsWidget.updateTeamName("Migration Team")
  pokemonBuild.nameIs("Miraidon")

  return readUserData().then(userData => {
    expect(userData.champions.leftPokemon).to.not.equal(undefined)

    return userData.champions
  })
}

describe("Legacy formats", () => {
  it("Should keep the team when the data is stored in the flat legacy format", () => {
    buildTeamAndCaptureData().then(championsData => {
      visitWithUserData({ ...championsData })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")
      pokemonBuild.nameIs("Miraidon")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.sv).to.equal(undefined)
        expect(migrated.game).to.equal(undefined)
      })
    })
  })

  it("Should keep the team when the data is stored under the sv key", () => {
    buildTeamAndCaptureData().then(championsData => {
      visitWithUserData({ game: "sv", sv: championsData })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")
      pokemonBuild.nameIs("Miraidon")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.sv).to.equal(undefined)
        expect(migrated.game).to.equal(undefined)
      })
    })
  })

  it("Should discard the sv data and keep champions when both are stored", () => {
    buildTeamAndCaptureData().then(championsData => {
      const staleSvData = JSON.parse(JSON.stringify(championsData))
      staleSvData.teams[0].name = "Stale SV Team"

      visitWithUserData({ game: "sv", sv: staleSvData, champions: championsData })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.sv).to.equal(undefined)
      })
    })
  })

  it("Should preserve the menu preferences while migrating the team", () => {
    buildTeamAndCaptureData().then(championsData => {
      const menuData = { orderByDamage: true, oneVsManyBestMoveActivated: true }

      visitWithUserData({ game: "sv", sv: championsData, menuData })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.menuData.orderByDamage).to.eq(true)
        expect(migrated.menuData.oneVsManyBestMoveActivated).to.eq(true)
      })
    })
  })

  it("Should preserve the theme while migrating the team", () => {
    buildTeamAndCaptureData().then(championsData => {
      const themeData = { theme: "dark", color: "blue" }

      visitWithUserData({ game: "sv", sv: championsData, themeData })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.themeData.theme).to.eq("dark")
      })
    })
  })

  it("Should not rewrite the stored data when it is already migrated", () => {
    buildTeamAndCaptureData().then(championsData => {
      visitWithUserData({ champions: championsData, menuData: { orderByDamage: true, oneVsManyBestMoveActivated: false } })

      header.openTeamVsMany()

      teamsWidget.activeTeamNameIs("Migration Team")

      readUserData().then(migrated => {
        expect(migrated.champions.teams[0].name).to.eq("Migration Team")
        expect(migrated.menuData.orderByDamage).to.eq(true)
      })
    })
  })
})

describe("Boot with unusable userData", () => {
  it("Should boot with the default team when there is no stored data", () => {
    visitWithUserData(null)

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })

  it("Should boot with the default team when the stored data is an empty object", () => {
    visitWithUserData({})

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })

  it("Should boot with the default team when champions is stored empty", () => {
    visitWithUserData({ champions: {} })

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })

  it("Should boot with the default team when champions holds an unexpected shape", () => {
    visitWithUserData({ champions: { leftPokemon: null, teams: null } })

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })

  it("Should boot with the default team when userData is not valid JSON", () => {
    visitWithUserData("this is not json")

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })

  it("Should boot with the default team when userData is an empty string", () => {
    visitWithUserData("")

    header.openTeamVsMany()
    pokemonBuild.nameIs("Charizard")
  })
})
