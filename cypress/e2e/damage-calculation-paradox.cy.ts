import { DamageResult } from "@page-object/damage-result"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Test calcs with Paradox Pokémon and ability activated", () => {
  describe("Prothosynthesis", () => {
    it("with atk as high stat", () => {
      leftPokemonBuild.importPokemon(poke["great-tusk-high-atk"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftDamageResult.damageIs(0, 44.9, 53.6, 93, 11)

      leftPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 58.4, 69.5, 121, 144)
    })

    it("with def as high stat", () => {
      leftPokemonBuild.importPokemon(poke["rillaboom"])
      rightPokemonBuild.importPokemon(poke["great-tusk-high-def"])

      leftDamageResult.damageIs(0, 83.1, 98.9, 158, 188)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 63.1, 75.7, 120, 144)
    })

    it("with spa as high stat", () => {
      leftPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftDamageResult.damageIs(0, 28, 33.3, 58, 69)

      leftPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 36.7, 43.4, 76, 90)
    })

    it("with spd as high stat", () => {
      leftPokemonBuild.importPokemon(poke["tornadus"])
      rightPokemonBuild.importPokemon(poke["flutter-mane-high-spd"])

      leftDamageResult.damageIs(0, 33, 40, 43, 52)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 26.1, 32.3, 34, 42)
    })

    it("with spe as high stat", () => {
      leftPokemonBuild.importPokemon(poke["bronzong"])
      rightPokemonBuild.importPokemon(poke["flutter-mane-high-spe"])

      leftPokemonBuild.selectAttackThree()
      leftDamageResult.damageIs(2, 103, 121.5, 134, 158)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(2, 153.8, 181.5, 200, 236)
    })
  })

  describe("Quark Drive", () => {
    it("with atk as high stat", () => {
      leftPokemonBuild.importPokemon(poke["iron-treads-high-atk"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftDamageResult.damageIs(0, 25.1, 29.9, 52, 62)

      leftPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 32.8, 39.1, 68, 81)
    })

    it("with def as high stat", () => {
      leftPokemonBuild.importPokemon(poke["rillaboom"])
      rightPokemonBuild.importPokemon(poke["iron-treads-high-def"])

      leftDamageResult.damageIs(0, 51.5, 61.8, 85, 102)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 40.6, 47.8, 67, 79)
    })

    it("with spa as high stat", () => {
      leftPokemonBuild.importPokemon(poke["iron-moth-high-spa"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftDamageResult.damageIs(0, 44.4, 53.1, 92, 110)

      leftPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 57.9, 69.5, 120, 144)
    })

    it("with spd as high stat", () => {
      leftPokemonBuild.importPokemon(poke["tornadus"])
      rightPokemonBuild.importPokemon(poke["iron-moth-high-spd"])

      leftDamageResult.damageIs(0, 29.6, 35.4, 46, 55)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 23.2, 27.7, 36, 43)
    })

    it("with spe as high stat", () => {
      leftPokemonBuild.importPokemon(poke["bronzong"])
      rightPokemonBuild.importPokemon(poke["iron-moth-high-spe"])

      leftPokemonBuild.selectAttackThree()
      leftDamageResult.damageIs(2, 18.7, 22.5, 29, 35)

      rightPokemonBuild.activateAbility()

      leftDamageResult.damageIs(2, 28.3, 33.5, 44, 52)
    })
  })
})

describe("Test calcs with Paradox Pokémon in opponent side", () => {
  const pokemonBuild = new PokemonBuild("your-team")
  const team = new Team()
  const opponents = new Opponent()

  describe("in Team x Many", () => {
    beforeEach(() => {
      cy.get('[data-cy="team-vs-many"]').click()

      team.delete("Team 1")
      opponents.deleteAll()
    })

    it("team Pokémon with booster in spa x opponent Pokémon", () => {
      pokemonBuild.importPokemon(poke["flutter-mane-high-spa"])
      opponents.importPokemon(poke["tornadus"])

      team.selectPokemon("Flutter Mane").activateAbility()

      opponents.get("Tornadus").damageIs(76.1, 90.9).cause2HKO()
    })

    it("team Pokémon x opponent Pokémon with booster in spd", () => {
      pokemonBuild.importPokemon(poke["tornadus"])
      opponents.importPokemon(poke["flutter-mane-high-spd"])

      team.selectPokemon("Tornadus")
      opponents.selectDefender("Flutter Mane").activateAbility()

      opponents.get("Flutter Mane").damageIs(26.1, 32.3).cause4HKO()
    })
  })

  describe("in Many x Team", () => {
    beforeEach(() => {
      cy.get('[data-cy="many-vs-team"]').click()

      team.delete("Team 1")
      opponents.deleteAll()
    })

    it("opponent Pokémon x team Pokémon with booster in spd", () => {
      pokemonBuild.importPokemon(poke["flutter-mane-high-spd"])
      opponents.importPokemon(poke["tornadus"])

      team.selectPokemon("Flutter Mane").activateAbility()
      opponents.selectAttacker("Tornadus")

      opponents.get("Tornadus").damageIs(26.1, 32.3).cause4HKO()
    })

    it("opponent Pokémon with booster in spa x team Pokémon", () => {
      pokemonBuild.importPokemon(poke["tornadus"])
      opponents.importPokemon(poke["flutter-mane-high-spa"])

      team.selectPokemon("Tornadus")
      opponents.selectAttacker("Flutter Mane").activateAbility()

      opponents.get("Flutter Mane").damageIs(76.1, 90.9).cause2HKO()
    })
  })
})
