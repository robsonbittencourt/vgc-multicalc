import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Generations } from "@robsonbittencourt/calc"
import Commom from "./commom"

export default class DefensiveStatCalculator {
  commom = new Commom()

  getFinalDefense(attacker: Pokemon, field: Field): number {
    return this.calculateDefenseSMSSSV(true, attacker, field)
  }

  getFinalSpecialDefense(attacker: Pokemon, field: Field): number {
    return this.calculateDefenseSMSSSV(false, attacker, field)
  }

  private calculateDefenseSMSSSV(isDefense: boolean, defender: Pokemon, field: Field) {
    let defense: number

    const defenseStat = isDefense ? "def" : "spd"
    const boosts = defender.boosts[field.isWonderRoom ? (isDefense ? "spd" : "def") : defenseStat]!

    if (boosts === 0 || (field.defenderSide.isCriticalHit && boosts > 0)) {
      defense = defender.rawStats[defenseStat]!
    } else {
      defense = this.commom.getModifiedStat(defender.rawStats[defenseStat]!, boosts)
    }

    if (field.weather == "Sand" && defender.hasType("Rock") && !isDefense) {
      defense = this.commom.pokeRound((defense * 3) / 2)
    }
    if (field.weather == "Snow" && defender.hasType("Ice") && isDefense) {
      defense = this.commom.pokeRound((defense * 3) / 2)
    }

    const dfMods = this.calculateDfModsSMSSSV(isDefense, defender, field)

    return this.commom.OF16(Math.max(1, this.commom.pokeRound((defense * this.commom.chainMods(dfMods, 410, 131072)) / 4096)))
  }

  private calculateDfModsSMSSSV(isDefense: boolean, defender: Pokemon, field: Field) {
    const gen = Generations.get(9)
    const dfMods: number[] = []

    if (field.isNeutralizingGas && !defender.hasItem("Ability Shield")) {
      return dfMods
    }

    if (defender.hasAbility("Marvel Scale") && defender.status != Status.HEALTHY && isDefense) {
      dfMods.push(6144)
    } else if (defender.hasAbility("Grass Pelt") && field.terrain == "Grassy" && isDefense) {
      dfMods.push(6144)
    } else if (defender.hasAbility("Fur Coat") && isDefense) {
      dfMods.push(8192)
    }

    const isSwordOfRuinActive = field.isSwordOfRuin && !defender.hasAbility("Sword of Ruin")
    const isBeadsOfRuinActive = field.isBeadsOfRuin && !defender.hasAbility("Beads of Ruin")
    if ((isSwordOfRuinActive && isDefense) || (isBeadsOfRuinActive && !isDefense)) {
      dfMods.push(3072)
    }

    if (this.commom.isQPActive(defender, field)) {
      if ((isDefense && defender.higherStat === "def") || (!isDefense && defender.higherStat === "spd")) {
        dfMods.push(5324)
      }
    }

    if (defender.hasItem("Eviolite") && gen.species.get(this.commom.toID(defender.name))?.nfe) {
      dfMods.push(6144)
    }

    if (!isDefense && defender.hasItem("Assault Vest")) {
      dfMods.push(6144)
    }

    return dfMods
  }
}
