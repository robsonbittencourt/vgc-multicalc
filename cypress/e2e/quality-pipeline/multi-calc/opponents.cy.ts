import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { setUpDefaultTeam } from "@cy-support/setup"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { PokemonBuild } from "@page-object/pokemon-build"

const pokemonBuild = new PokemonBuild("your-team")
const header = new Header()
const team = new Team()
const opponents = new Opponent()

describe("Add and remove", () => {
  beforeEach(() => {
    setUpDefaultTeam()
  })

  smoke("Should create the card with the calculated result when a Pokémon is chosen", () => {
    opponents.deleteAll()
    opponents.empty()

    opponents.add("Tyranitar")

    opponents.exists("Tyranitar")
    opponents.get("Tyranitar").damageIs(129.3, 152.5).causeOHKO()
  })

  it("Should add every chosen Pokémon to the opponent side", () => {
    opponents.add("Pikachu")
    opponents.add("Tyranitar")
    opponents.add("Lugia")

    opponents.exists("Pikachu")
    opponents.exists("Tyranitar")
    opponents.exists("Lugia")
  })

  it("Should remove the opponent and give the edition back to the active team member", () => {
    opponents.add("Pikachu")

    opponents.get("Pikachu").delete()

    opponents.doesNotExists("Pikachu")
    pokemonBuild.nameIs("Miraidon")
  })

  it("Should clear every card with delete all", () => {
    opponents.deleteAll()

    opponents.empty()
  })
})

describe("Edit an opponent", () => {
  beforeEach(() => {
    setUpDefaultTeam()
  })

  it("Should open the opponent in the build and update the card when it is edited", () => {
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])

    opponents.get("Tyranitar").damageIs(123.1, 145.1)

    opponents.selectDefender("Tyranitar").selectStatsModifier("spd", "+3")

    pokemonBuild.nameIs("Tyranitar")
    opponents.get("Tyranitar").damageIs(50, 58.6).cause2HKO()
  })

  it("Should go back to the active team member when the edition is closed", () => {
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])

    opponents.selectDefender("Tyranitar")

    pokemonBuild.nameIs("Tyranitar")

    team.closeTab()

    pokemonBuild.nameIs("Miraidon")
  })

  it("Should edit the attacker of the card in Many vs Team", () => {
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])

    opponents.selectAttacker("Tyranitar").selectStatsModifier("atk", "+3")

    opponents.get("Tyranitar").damageIs(204.5, 240.9).causeOHKO()
  })

  it("Should edit the first attacker of a combined card in Many vs Team", () => {
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.combine("Tyranitar", "Flutter Mane")

    opponents.selectAttacker("Flutter Mane").selectStatsModifier("spa", "+3")

    opponents.get("Flutter Mane").damageIs(264.7, 313.6).causeOHKO()
  })

  it("Should edit the second attacker of a combined card in Many vs Team", () => {
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.combine("Tyranitar", "Flutter Mane")

    opponents.selectSecondAttacker("Tyranitar").selectStatsModifier("atk", "+1")

    opponents.get("Flutter Mane").damageIs(197.7, 234).causeOHKO()
  })
})

describe("Import while the add card is open", () => {
  beforeEach(() => {
    setUpDefaultTeam()
  })

  it("Should leave the add mode and bring the edition back to the active member", () => {
    opponents.deleteAll()

    opponents.clickOnAdd()

    opponents.addIsHidden()

    opponents.importPokemon(poke["tyranitar"])

    opponents.exists("Tyranitar")
    opponents.addIsVisible()

    pokemonBuild.nameIs("Miraidon")
  })

  it("Should keep the imported Pokémon out of the add mode when more than one is imported", () => {
    opponents.deleteAll()

    opponents.clickOnAdd()

    opponents.importPokemon(poke["default-opponents"])

    opponents.addIsVisible()

    pokemonBuild.nameIs("Miraidon")
  })
})
