import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"

const header = new Header()
const leftPokemonBuild = new PokemonBuild("left-pokemon")

describe("Language", () => {
  it("Should show the current language in the header", () => {
    header.languageButtonIs("English")

    header.selectLanguage("ja")

    header.languageButtonIs("日本語")
  })

  it("Should show and search the move names in Spanish", () => {
    header.selectLanguage("es")

    leftPokemonBuild.changeAttackOneByFilter("puño fu", "Fire Punch")

    leftPokemonBuild.attackIs(1, "Puño Fuego")
  })

  it("Should show and search the move names in Latin American Spanish", () => {
    header.selectLanguage("es-419")

    leftPokemonBuild.changeAttackOneByFilter("supercal", "Overheat")

    leftPokemonBuild.attackIs(1, "Supercalor")
  })

  it("Should search the Japanese move names typed in hiragana", () => {
    header.selectLanguage("ja")

    leftPokemonBuild.changeAttackOneByFilter("おーばーひ", "Overheat")

    leftPokemonBuild.attackIs(1, "オーバーヒート")
  })

  it("Should go back to the English names", () => {
    header.selectLanguage("es")
    leftPokemonBuild.changeAttackOneByFilter("puño fu", "Fire Punch")

    header.selectLanguage("en")

    leftPokemonBuild.attackIs(1, "Fire Punch")
  })

  it("Should keep the language after reloading the page", () => {
    header.selectLanguage("es")
    leftPokemonBuild.changeAttackOneByFilter("puño fu", "Fire Punch")

    cy.reload()

    leftPokemonBuild.attackIs(1, "Puño Fuego")
  })
})
