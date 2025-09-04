import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import Commom from "./commom"

export default class OffensiveStatCalculator {
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

    const abilityMods = this.calculateAbilityMods(isAttack, attacker, moveSmogon, field)
    const itemModifiers = this.calculateItemMods(isAttack, attacker)
    const modifiers = abilityMods.concat(itemModifiers)

    attack = this.commom.OF16(Math.max(1, this.commom.pokeRound((attack * this.commom.chainMods(modifiers, 410, 131072)) / 4096)))

    return attack
  }

  private calculateAbilityMods(isAttack: boolean, attacker: Pokemon, move: MoveSmogon, field: Field) {
    const gen = Generations.get(9)

    const abilityModifiers: number[] = []

    if (field.isNeutralizingGas && !attacker.hasItem("Ability Shield")) {
      return abilityModifiers
    }

    if (attacker.hasAbility("Slow Start") && attacker.abilityOn && isAttack) {
      abilityModifiers.push(2048)
    } else if (attacker.hasAbility("Solar Power") && field.weather == "Sun" && !isAttack) {
      abilityModifiers.push(6144)
    } else if ((attacker.hasAbility("Guts") && attacker.status != Status.HEALTHY && isAttack) || (!isAttack && attacker.abilityOn && attacker.hasAbility("Plus", "Minus"))) {
      abilityModifiers.push(6144)
    } else if (attacker.hasAbility("Flash Fire") && attacker.abilityOn && move.hasType("Fire") && ((isAttack && move.category == "Physical") || (!isAttack && move.category == "Special"))) {
      abilityModifiers.push(6144)
    } else if (
      (attacker.hasAbility("Dragon's Maw") && move.hasType("Dragon") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))) ||
      (attacker.hasAbility("Rocky Payload") && move.hasType("Rock") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack)))
    ) {
      abilityModifiers.push(6144)
    } else if (attacker.hasAbility("Transistor") && move.hasType("Electric") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))) {
      abilityModifiers.push(5325)
    } else if (attacker.hasAbility("Stakeout") && attacker.abilityOn) {
      abilityModifiers.push(8192)
    } else if ((attacker.hasAbility("Water Bubble") && move.hasType("Water") && ((isAttack && move.category == "Physical") || (!isAttack && move.category == "Special"))) || (attacker.hasAbility("Huge Power", "Pure Power") && isAttack)) {
      abilityModifiers.push(8192)
    }

    if (attacker.actualHp <= attacker.hp / 3 && ((isAttack && move.category == "Physical") || (!isAttack && move.category == "Special"))) {
      if (attacker.hasAbility("Overgrow") && move.hasType("Grass")) {
        abilityModifiers.push(6144)
      }

      if (attacker.hasAbility("Blaze") && move.hasType("Fire")) {
        abilityModifiers.push(6144)
      }

      if (attacker.hasAbility("Torrent") && move.hasType("Water")) {
        abilityModifiers.push(6144)
      }

      if (attacker.hasAbility("Swarm") && move.hasType("Bug")) {
        abilityModifiers.push(6144)
      }
    }

    if (field.isTabletsOfRuin && !attacker.hasAbility("Tablets of Ruin") && isAttack) {
      abilityModifiers.push(3072)
    }

    if (field.isVesselOfRuin && !attacker.hasAbility("Vessel of Ruin") && !isAttack) {
      abilityModifiers.push(3072)
    }

    if (this.commom.isQPActive(attacker, field)) {
      if ((isAttack && attacker.higherStat === "atk") || (!isAttack && attacker.higherStat === "spa")) {
        abilityModifiers.push(5325)
      }
    }

    if ((attacker.hasAbility("Hadron Engine") && field.terrain == "Electric" && !isAttack) || (attacker.hasAbility("Orichalcum Pulse") && field.weather == "Sun" && isAttack && !attacker.hasItem("Utility Umbrella"))) {
      abilityModifiers.push(5461)
    }

    return abilityModifiers
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
