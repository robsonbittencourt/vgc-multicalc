import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

let ursalunaData: string
let baxcaliburData: string

before(() => {
  cy.fixture("ursaluna-data").then((data) => { ursalunaData = data })
  cy.fixture("baxcalibur-data").then((data) => { baxcaliburData = data })
})

describe('Edit Pokémon', () => {
  it('Show only selected Pokémon abilities when change Pokémon', () => {
    leftPokemonBuild.importPokemon(ursalunaData)

    leftPokemonBuild.selectAbility("Guts")
    leftPokemonBuild.selectAbility("Bulletproof")
    leftPokemonBuild.selectAbility("Unnerve")

    leftPokemonBuild.importPokemon(baxcaliburData)
    leftPokemonBuild.selectAbility("Thermal Exchange")
    leftPokemonBuild.selectAbility("Ice Body")
  })

})