import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"

const header = new Header()

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Damage result", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  smoke("Should show the result of both sides", () => {
    leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)
    rightDamageResult.damageIs(0, 31.3, 36.8, 69, 81)
  })

  it("Should change the own result when another move is activated", () => {
    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 12.3, 14.5, 23, 27)
    rightDamageResult.surviveWithThisHpAmmount(159)
  })

  it("Should keep the opponent result when only the own move is activated", () => {
    leftPokemonBuild.selectAttackTwo()

    rightDamageResult.damageIs(0, 31.3, 36.8, 69, 81)
    leftDamageResult.surviveWithThisHpAmmount(139)
  })

  it("Should disable the chip of an empty move", () => {
    leftPokemonBuild.clearAttack(4).clickOutside()

    leftDamageResult.moveChipIsDisabled(4)
  })

  it("Should show how many hits a multi hit move has", () => {
    leftPokemonBuild.importPokemon(poke["dragapult"])
    leftPokemonBuild.hitsTaken(2)

    leftDamageResult.rollsHaveHits(2)
  })
})

describe("Hp badge integration", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should show the max hp of the Pokémon of each side", () => {
    leftDamageResult.withMaxHpValue(220)
    rightDamageResult.withMaxHpValue(186)
  })
})

describe("Copy result", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should confirm the description was copied", () => {
    leftDamageResult.copyDescription()

    leftDamageResult.copyWasConfirmed()
  })
})

describe("EV optimizer fed by the roll level", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["flutter-mane"])
    leftPokemonBuild.clearEvs()
    rightPokemonBuild.importPokemon(poke["urshifu-rapid-strike"])
  })

  it("Should ask for the least investment against the low roll", () => {
    rightDamageResult.withLowRoll()

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.applyOptimization()

    leftPokemonBuild.evsIs(68, 0, 132, 0, 0, 0)
  })

  it("Should ask for more investment against the medium roll", () => {
    rightDamageResult.withMediumRoll()

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.applyOptimization()

    leftPokemonBuild.evsIs(68, 0, 204, 0, 0, 0)
  })

  it("Should ask for the most investment against the high roll", () => {
    rightDamageResult.withHighRoll()

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.applyOptimization()

    leftPokemonBuild.evsIs(140, 0, 236, 0, 0, 0)
  })
})
