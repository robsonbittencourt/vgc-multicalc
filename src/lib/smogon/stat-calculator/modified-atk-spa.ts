import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import Commom from "../commom"
import { abilityStrategies } from "./ability/offensive-ability-strategy"
import { itemStrategies } from "./item/offensive-item-strategy"

export class OffensiveStatCalculator {
  commom = new Commom()

  getFinalAttack(attacker: Pokemon, move: Move, field: Field): number {
    return this.calculateOffensiveStat(true, attacker, move, field)
  }

  getFinalSpecialAttack(attacker: Pokemon, move: Move, field: Field): number {
    return this.calculateOffensiveStat(false, attacker, move, field)
  }

  private calculateOffensiveStat(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): number {
    let statValue: number
    const attackStat = isAttack ? "atk" : "spa"
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)

    if (attacker.boosts[attackStat] === 0 || (field.attackerSide.isCriticalHit && attacker.boosts[attackStat]! < 0)) {
      statValue = attacker.rawStats[attackStat]!
    } else {
      statValue = this.commom.getModifiedStat(attacker.rawStats[attackStat]!, attacker.boosts[attackStat]!)
    }

    if (attacker.hasAbility("Hustle") && isAttack) {
      statValue = this.commom.pokeRound((statValue * 3) / 2)
    }

    const modifiers = this.calculateModifiers(isAttack, attacker, moveSmogon, field)
    statValue = this.calculateStatValueWithModifiers(statValue, modifiers)

    return statValue
  }

  private calculateModifiers(isAttack: boolean, attacker: Pokemon, moveSmogon: MoveSmogon, field: Field): number[] {
    let modifiers: number[] = []

    if (!(field.isNeutralizingGas && !attacker.hasItem("Ability Shield"))) {
      modifiers = modifiers.concat(abilityStrategies.filter(s => s.shouldApply(isAttack, attacker, moveSmogon, field)).map(s => s.getModifier()))
    }

    modifiers = modifiers.concat(itemStrategies.filter(s => s.shouldApply(isAttack, attacker)).map(s => s.getModifier()))

    return modifiers
  }

  private calculateStatValueWithModifiers(statValue: number, modifiers: number[]) {
    return this.commom.OF16(Math.max(1, this.commom.pokeRound((statValue * this.commom.chainMods(modifiers, 410, 131072)) / 4096)))
  }
}
