import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")
const field = new Field()
const team = new Team()

describe("Automatic field option by abilities", () => {
  it("Should activate Rain when Drizzle is selected", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")
  })

  it("Should activate Rain when Drizzle is manually selected", () => {
    leftPokemonBuild.importPokemon(poke["politoad"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isNotActiveOption("rain")

    leftPokemonBuild.selectAbility("Drizzle")

    field.isActiveOption("rain")
  })

  it("Should activate Sun when Drought is selected", () => {
    leftPokemonBuild.importPokemon(poke["groudon"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("sun")
  })

  it("Should activate Sand when Sand Stream is selected", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("sand")
  })

  it("Should activate Snow when Snow Warning is selected", () => {
    leftPokemonBuild.importPokemon(poke["ninetales-alola"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("snow")
  })

  it("Should activate Neutralizing Gas when Neutralizing Gas is selected", () => {
    leftPokemonBuild.importPokemon(poke["weezing-galar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("neutralizing-gas")
  })

  it("Should activate Electric Terrain when Hadron Engine is selected", () => {
    leftPokemonBuild.importPokemon(poke["miraidon"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("eletric-terrain")
  })

  it("Should activate Grassy Terrain when Grassy Surge is selected", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")
  })

  it("Should activate Psychic Terrain when Psychic Surge is selected", () => {
    leftPokemonBuild.importPokemon(poke["indeedee-f"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("psychic-terrain")
  })

  it("Should activate Misty Terrain when Misty Surge is selected", () => {
    leftPokemonBuild.importPokemon(poke["weezing-galar-misty-surge"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("misty-terrain")
  })

  it("Should activate Tablets of Ruin when Wo-Chien is selected", () => {
    leftPokemonBuild.importPokemon(poke["wo-chien"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("tablets-of-ruin")
  })

  it("Should activate Sword of Ruin when Chien-Pao is selected", () => {
    leftPokemonBuild.importPokemon(poke["chien-pao"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("sword-of-ruin")
  })

  it("Should activate Vessel of Ruin when Ting-Lu is selected", () => {
    leftPokemonBuild.importPokemon(poke["ting-lu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("vessel-of-ruin")
  })

  it("Should activate Beads of Ruin when Chi-Yu is selected", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("beads-of-ruin")
  })
})

describe("Interactions between automatic field and user selection", () => {
  it("Should remove automatic weather previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("rain")
  })

  it("Should remove automatic weather previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")

    field.rain()

    field.isNotActiveOption("rain")
  })

  it("Should remove and come back automatic weather when user click", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")

    field.rain()

    field.isNotActiveOption("rain")

    leftPokemonBuild.importPokemon(poke["dragonite"])
    leftPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")
  })

  it("Should change automatic weather when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")

    leftPokemonBuild.importPokemon(poke["groudon"])

    field.isActiveOption("sun")
  })

  it("Should change automatic weather to a automatic terrain when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("rain")

    leftPokemonBuild.importPokemon(poke["rillaboom"])

    field.isNotActiveOption("rain")
    field.isActiveOption("grassy-terrain")
  })

  it("Should mantain weather selected when Pokémon is changed but user was selected the weather", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.sun()

    leftPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("rain")
    field.isActiveOption("sun")
  })

  it("Should remove automatic terrain previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("grassy-terrain")
  })

  it("Should remove automatic terrain previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")

    field.grassyTerrain()

    field.isNotActiveOption("grassy-terrain")
  })

  it("Should remove and come back automatic terrain when user click", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")

    field.grassyTerrain()

    field.isNotActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["dragonite"])
    leftPokemonBuild.importPokemon(poke["rillaboom"])

    field.isActiveOption("grassy-terrain")
  })

  it("Should change automatic terrain when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["indeedee-f"])

    field.isNotActiveOption("grassy-terrain")
    field.isActiveOption("psychic-terrain")
  })

  it("Should change automatic terrain to a automatic weather when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["kyogre"])

    field.isNotActiveOption("grassy-terrain")
    field.isActiveOption("rain")
  })

  it("Should mantain terrain selected when Pokémon is changed but user was selected the terrain", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.mistyTerrain()

    leftPokemonBuild.importPokemon(poke["rillaboom"])

    field.isActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("grassy-terrain")
    field.isActiveOption("misty-terrain")
  })

  it("Should remove automatic Tablets of Ruin previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["wo-chien"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("tablets-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("tablets-of-ruin")
  })

  it("Should remove automatic Tablets of Ruin previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["wo-chien"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("tablets-of-ruin")

    field.tabletsOfRuin()

    field.isNotActiveOption("tablets-of-ruin")
  })

  it("Should mantain Tablets of Ruin selected when Pokémon is changed but user was selected Tablets of Ruin", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.tabletsOfRuin()

    leftPokemonBuild.importPokemon(poke["wo-chien"])

    field.isActiveOption("tablets-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isActiveOption("tablets-of-ruin")
  })

  it("Should remove automatic Sword of Ruin previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["chien-pao"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("sword-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("sword-of-ruin")
  })

  it("Should remove automatic Sword of Ruin previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["chien-pao"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("sword-of-ruin")

    field.swordOfRuin()

    field.isNotActiveOption("sword-of-ruin")
  })

  it("Should mantain Sword of Ruin selected when Pokémon is changed but user was selected Sword of Ruin", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.swordOfRuin()

    leftPokemonBuild.importPokemon(poke["chien-pao"])

    field.isActiveOption("sword-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isActiveOption("sword-of-ruin")
  })

  it("Should remove automatic Vessel of Ruin previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["ting-lu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("vessel-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("vessel-of-ruin")
  })

  it("Should remove automatic Vessel of Ruin previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["ting-lu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("vessel-of-ruin")

    field.vesselOfRuin()

    field.isNotActiveOption("vessel-of-ruin")
  })

  it("Should mantain Vessel of Ruin selected when Pokémon is changed but user was selected Vessel of Ruin", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.vesselOfRuin()

    leftPokemonBuild.importPokemon(poke["chien-pao"])

    field.isActiveOption("vessel-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isActiveOption("vessel-of-ruin")
  })

  it("Should remove automatic Beads of Ruin previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("beads-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("beads-of-ruin")
  })

  it("Should remove automatic Beads of Ruin previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("beads-of-ruin")

    field.beadsOfRuin()

    field.isNotActiveOption("beads-of-ruin")
  })

  it("Should mantain Beads of Ruin selected when Pokémon is changed but user was selected Beads of Ruin", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.beadsOfRuin()

    leftPokemonBuild.importPokemon(poke["chien-pao"])

    field.isActiveOption("beads-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isActiveOption("beads-of-ruin")
  })

  it("Should remove automatic Neutralizing Gas previously activated when Pokémon changed", () => {
    leftPokemonBuild.importPokemon(poke["weezing-galar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("neutralizing-gas")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("neutralizing-gas")
  })

  it("Should remove automatic Neutralizing Gas previously activated when Pokémon changed and activate new ability", () => {
    leftPokemonBuild.importPokemon(poke["weezing-galar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("neutralizing-gas")

    leftPokemonBuild.importPokemon(poke["rillaboom"])

    field.isActiveOption("grassy-terrain")
  })

  it("Should remove automatic Neutralizing Gas previously activated when user click", () => {
    leftPokemonBuild.importPokemon(poke["weezing-galar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("neutralizing-gas")

    field.neutralizingGas()

    field.isNotActiveOption("neutralizing-gas")
  })

  it("Should mantain Neutralizing Gas selected when Pokémon is changed but user was selected Neutralizing Gas", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.neutralizingGas()

    leftPokemonBuild.importPokemon(poke["chien-pao"])

    field.isActiveOption("neutralizing-gas")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isActiveOption("neutralizing-gas")
  })

  it("Should select the change of rigth Pokémon when two Pokémon activate different weathers", () => {
    leftPokemonBuild.importPokemon(poke["groudon"])
    rightPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")
  })

  it("Should mantain field change of left Pokémon disabled when the user disable it and Pokémon from the right change", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    field.isActiveOption("rain")

    field.rain()
    field.isNotActiveOption("rain")

    rightPokemonBuild.importPokemon(poke["rillaboom"])

    field.isNotActiveOption("rain")
  })

  it("Should mantain field change of left Pokémon disabled when the user disable it and Pokémon from the right change multiple times", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    field.isActiveOption("rain")

    field.rain()
    field.isNotActiveOption("rain")

    rightPokemonBuild.importPokemon(poke["rillaboom"])

    field.isNotActiveOption("rain")

    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.isNotActiveOption("rain")
    field.isNotActiveOption("grassy-terrain")
  })

  it("Should made a lot of changes correctly", () => {
    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    field.rain()
    field.swordOfRuin()
    field.psychicTerrain()

    leftPokemonBuild.importPokemon(poke["groudon"])
    rightPokemonBuild.importPokemon(poke["rillaboom"])

    field.isActiveOption("sun")
    field.isNotActiveOption("rain")
    field.isActiveOption("sword-of-ruin")
    field.isActiveOption("grassy-terrain")
    field.isNotActiveOption("psychic-terrain")

    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["ting-lu"])
    field.tabletsOfRuin()

    field.isActiveOption("sword-of-ruin")
    field.isActiveOption("tablets-of-ruin")
    field.isActiveOption("vessel-of-ruin")
    field.isActiveOption("beads-of-ruin")

    leftPokemonBuild.importPokemon(poke["dragonite"])
    rightPokemonBuild.importPokemon(poke["incineroar"])
    field.tabletsOfRuin()

    field.isActiveOption("sword-of-ruin")
    field.isNotActiveOption("tablets-of-ruin")
    field.isNotActiveOption("vessel-of-ruin")
    field.isNotActiveOption("beads-of-ruin")
  })
})

describe("With two Pokémon selected", () => {
  it("Should activate field looking for the two Pokeḿon when have a second one selected", () => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })

    team.delete("Team 1")
    team.importPokemon(poke["rillaboom"])
    team.importPokemon(poke["kyogre"])

    team.selectTeamMember("Rillaboom").combineDamage()
    team.selectTeamMember("Kyogre")

    field.isActiveOption("grassy-terrain")
    field.isActiveOption("rain")
  })
})

describe("With previously localstorage field information", () => {
  it("Should mantain user selection even after a reload", () => {
    leftPokemonBuild.importPokemon(poke["rillaboom"])

    field.mistyTerrain()

    field.isActiveOption("misty-terrain")

    cy.reload()

    field.isActiveOption("grassy-terrain")

    leftPokemonBuild.importPokemon(poke["incineroar"])

    field.isActiveOption("misty-terrain")
  })
})
