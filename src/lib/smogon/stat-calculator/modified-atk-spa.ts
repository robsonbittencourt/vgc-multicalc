import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import Commom from "../commom"
import { calculateAbilityMods } from "./ability/offensive-ability-strategy"

export class OffensiveStatCalculator {
  commom = new Commom()

  getFinalAttack(attacker: Pokemon, move: Move, field: Field): number {
    return this.calculateOffensiveStat(true, attacker, move, field)
  }

  getFinalSpecialAttack(attacker: Pokemon, move: Move, field: Field): number {
    return this.calculateOffensiveStat(false, attacker, move, field)
  }

  private calculateOffensiveStat(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): number {
    let attack: number
    const attackStat = isAttack ? "atk" : "spa"
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)

    if (attacker.boosts[attackStat] === 0 || (field.attackerSide.isCriticalHit && attacker.boosts[attackStat]! < 0)) {
      attack = attacker.rawStats[attackStat]!
    } else {
      attack = this.commom.getModifiedStat(attacker.rawStats[attackStat]!, attacker.boosts[attackStat]!)
    }

    if (attacker.hasAbility("Hustle") && isAttack) {
      attack = this.commom.pokeRound((attack * 3) / 2)
    }

    const abilityMods = calculateAbilityMods(isAttack, attacker, moveSmogon, field)
    const itemModifiers = this.calculateItemMods(isAttack, attacker)
    const modifiers = abilityMods.concat(itemModifiers)

    attack = this.commom.OF16(Math.max(1, this.commom.pokeRound((attack * this.commom.chainMods(modifiers, 410, 131072)) / 4096)))

    return attack
  }

  private calculateItemMods(isAttack: boolean, attacker: Pokemon) {
    const itemModifiers: number[] = []

    if (attacker.hasItem("Light Ball") && attacker.name.includes("Pikachu")) {
      itemModifiers.push(8192)
    } else if ((attacker.hasItem("Choice Band") && isAttack) || (attacker.hasItem("Choice Specs") && !isAttack)) {
      itemModifiers.push(6144)
    }

    return itemModifiers
  }
}
