import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

let ursalunaData: string
let baxcaliburData: string
let terapagosData: string
let terapagosTerastalData: string
let terapagosStellarData: string
let ogerponData: string
let ogerponCornerstoneData: string
let ogerponHearthflameData: string
let ogerponWellspringData: string

before(() => {
  cy.fixture("ursaluna-data").then(data => {
    ursalunaData = data
  })
  cy.fixture("terapagos-data").then(data => {
    terapagosData = data
  })
  cy.fixture("terapagos-terastal-data").then(data => {
    terapagosTerastalData = data
  })
  cy.fixture("terapagos-stellar-data").then(data => {
    terapagosStellarData = data
  })
  cy.fixture("baxcalibur-data").then(data => {
    baxcaliburData = data
  })
  cy.fixture("baxcalibur-data").then(data => {
    baxcaliburData = data
  })
  cy.fixture("ogerpon-data").then(data => {
    ogerponData = data
  })
  cy.fixture("ogerpon-cornerstone-data").then(data => {
    ogerponCornerstoneData = data
  })
  cy.fixture("ogerpon-hearthflame-data").then(data => {
    ogerponHearthflameData = data
  })
  cy.fixture("ogerpon-wellspring-data").then(data => {
    ogerponWellspringData = data
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
    leftPokemonBuild.importPokemon(terapagosData)

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.isNotTerastalyzed()
  })

  it("Terapagos-Terastal turns Terapagos Stellar when terastalyze", () => {
    leftPokemonBuild.importPokemon(terapagosTerastalData)
    leftPokemonBuild.isNotTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Stellar")
  })

  it("Terapagos-Stellar turns Terapagos Terastal when terastalyze", () => {
    leftPokemonBuild.importPokemon(terapagosStellarData)
    leftPokemonBuild.isTerastalyzed()

    leftPokemonBuild.terastalyze()

    leftPokemonBuild.nameIs("Terapagos-Terastal")
  })

  it("Toogle Terapagos terastal multiple times", () => {
    leftPokemonBuild.importPokemon(terapagosTerastalData)
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

describe("Ogerpon Terastal", () => {
  describe("Ability and boost", () => {
    it("Ogerpon Teal should change ability when terastalyze", () => {
      leftPokemonBuild.importPokemon(ogerponData)
      leftPokemonBuild.abilityIs("Defiant")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Embody Aspect (Teal)")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 1)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Defiant")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.selectStatsModifier("spe", "+4")
      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 5)

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 4)
    })

    it("Ogerpon Cornerstone should change ability when terastalyze", () => {
      leftPokemonBuild.importPokemon(ogerponCornerstoneData)
      leftPokemonBuild.abilityIs("Sturdy")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Embody Aspect (Cornerstone)")
      leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Sturdy")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.selectStatsModifier("def", "+2")
      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 3, 0, 0, 0)

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 2, 0, 0, 0)
    })

    it("Ogerpon Hearthflame should change ability when terastalyze", () => {
      leftPokemonBuild.importPokemon(ogerponHearthflameData)
      leftPokemonBuild.abilityIs("Mold Breaker")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Embody Aspect (Hearthflame)")
      leftPokemonBuild.boostsIs(1, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Mold Breaker")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.selectStatsModifier("atk", "+3")
      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(4, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(3, 0, 0, 0, 0)
    })

    it("Ogerpon Wellspring should change ability when terastalyze", () => {
      leftPokemonBuild.importPokemon(ogerponWellspringData)
      leftPokemonBuild.abilityIs("Water Absorb")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Embody Aspect (Wellspring)")
      leftPokemonBuild.boostsIs(0, 0, 0, 1, 0)

      leftPokemonBuild.terastalyze()

      leftPokemonBuild.abilityIs("Water Absorb")
      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

      leftPokemonBuild.selectStatsModifier("spd", "+1")
      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 2, 0)

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 1, 0)
    })

    it("Should not increase and decrease when stats already +6", () => {
      leftPokemonBuild.importPokemon(ogerponWellspringData)
      leftPokemonBuild.selectStatsModifier("spd", "+6")

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 6, 0)

      leftPokemonBuild.terastalyze()
      leftPokemonBuild.boostsIs(0, 0, 0, 6, 0)
    })
  })

  describe("Disabled fields", () => {
    describe("Items", () => {
      it("Ogerpon Teal can change item", () => {
        leftPokemonBuild.importPokemon(ogerponData)

        leftPokemonBuild.selectItem("Choice Band")
        leftPokemonBuild.itemIs("Choice Band")

        leftPokemonBuild.selectItem("Life Orb")
        leftPokemonBuild.itemIs("Life Orb")
      })

      it("Ogerpon Cornerstone cannot change item", () => {
        leftPokemonBuild.importPokemon(ogerponCornerstoneData)

        leftPokemonBuild.itemIs("Cornerstone Mask")
        leftPokemonBuild.itemIsDisabled()
      })

      it("Ogerpon Hearthflame cannot change item", () => {
        leftPokemonBuild.importPokemon(ogerponHearthflameData)

        leftPokemonBuild.itemIs("Hearthflame Mask")
        leftPokemonBuild.itemIsDisabled()
      })

      it("Ogerpon Wellspring cannot change item", () => {
        leftPokemonBuild.importPokemon(ogerponWellspringData)

        leftPokemonBuild.itemIs("Wellspring Mask")
        leftPokemonBuild.itemIsDisabled()
      })
    })

    describe("Tera", () => {
      it("Ogerpon Teal cannot change Tera type", () => {
        leftPokemonBuild.importPokemon(ogerponData)

        leftPokemonBuild.teraIsDisabled()
      })

      it("Ogerpon Cornerstone cannot change Tera type", () => {
        leftPokemonBuild.importPokemon(ogerponCornerstoneData)

        leftPokemonBuild.teraIsDisabled()
      })

      it("Ogerpon Hearthflame cannot change Tera type", () => {
        leftPokemonBuild.importPokemon(ogerponHearthflameData)

        leftPokemonBuild.teraIsDisabled()
      })

      it("Ogerpon Wellspring cannot change Tera type", () => {
        leftPokemonBuild.importPokemon(ogerponWellspringData)

        leftPokemonBuild.teraIsDisabled()
      })
    })
  })
})
