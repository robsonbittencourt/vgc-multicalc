import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Header } from "@page-object/header"

const header = new Header()
const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Bar and icons", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])
  })

  it("Should show the item icon of the Pokémon", () => {
    leftDamageResult.withPokemonIcon("flame-orb")
    rightDamageResult.withPokemonIcon("choice-band")
  })

  it("Should show the fainted state when the damage is lethal", () => {
    rightDamageResult.isFainted()
    rightDamageResult.remainingHpIsZero()
    rightDamageResult.hpBarIsEmpty()
  })

  it("Should show a green bar when the remaining hp is above 50%", () => {
    leftPokemonBuild.selectAttackTwo()

    rightDamageResult.surviveWithThisHpAmmount(159)
    rightDamageResult.hpBarColorIs("green")
  })

  it("Should show a yellow bar when the remaining hp is 50% or below", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"])
    rightPokemonBuild.importPokemon(poke["rillaboom"])
    rightPokemonBuild.selectItem("(none)")
    leftPokemonBuild.selectAttackFour()

    rightDamageResult.surviveWithThisHpAmmount(87)
    rightDamageResult.hpBarColorIs("yellow")
  })

  it("Should show a red bar when the remaining hp is below 20%", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"])
    rightPokemonBuild.importPokemon(poke["rillaboom"])
    leftPokemonBuild.selectAttackFour()

    rightDamageResult.surviveWithThisHpAmmount(29)
    rightDamageResult.hpBarColorIs("red")
  })

  it("Should show the status icon when the Pokémon is not fainted", () => {
    leftPokemonBuild.burned()

    leftDamageResult.hasStatusIcon()
  })
})
