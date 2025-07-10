import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

let ursalunaData: string
let baxcaliburData: string

before(() => {
  cy.fixture("ursaluna-data").then(data => {
    ursalunaData = data
  })
  cy.fixture("baxcalibur-data").then(data => {
    baxcaliburData = data
  })
})

describe("Edit Pokémon", () => {
  it("Show only selected Pokémon abilities when change Pokémon", () => {
    leftPokemonBuild.importPokemon(ursalunaData)

    leftPokemonBuild.selectAbility("Guts")
    leftPokemonBuild.selectAbility("Bulletproof")
    leftPokemonBuild.selectAbility("Unnerve")

    leftPokemonBuild.importPokemon(baxcaliburData)
    leftPokemonBuild.selectAbility("Thermal Exchange")
    leftPokemonBuild.selectAbility("Ice Body")
  })
})

describe("Terapagos Terastal", () => {
  it("Terapagos can't terastalyze", () => {
    leftPokemonBuild.selectPokemon("Terapagos")

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.isNotTerastalyzed()
  })

  it("Terapagos-Terastal turns Terapagos-Stellar when terastalyze", () => {
    leftPokemonBuild.selectPokemon("Terapagos-Terastal")
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
  })

  it("Terapagos-Stellar turns Terapagos-Terastal when terastalyze", () => {
    leftPokemonBuild.selectPokemon("Terapagos-Stellar")
    leftPokemonBuild.isTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Terastal")
  })

  it("Toogle Terapagos terastal multiple times", () => {
    leftPokemonBuild.selectPokemon("Terapagos-Terastal")
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
    leftPokemonBuild.isTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Terastal")
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
    leftPokemonBuild.isTerastalyzed()
  })
})
