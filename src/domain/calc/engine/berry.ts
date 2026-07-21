import { getBerryResistType } from "@calc/model/items"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Damage } from "@calc/model/result"
import { getType } from "@calc/engine/types"
import { RawDesc } from "@data/types"
import { combine } from "@calc/engine/ko-chance"

export function getBerryRecovery(attacker: Pokemon, defender: Pokemon, move: Move, field?: Field): { recovery: number; threshold: number } {
  if (field?.isUnnerve || attacker.hasAbility("Unnerve", "As One (Glastrier)", "As One (Spectrier)")) {
    return { recovery: 0, threshold: 0 }
  }

  const maxHp = defender.maxHp()
  const ripen = defender.hasAbility("Ripen") ? 2 : 1

  if (defender.hasItem("Sitrus Berry")) {
    return { recovery: Math.floor(maxHp / 4) * ripen, threshold: Math.floor(maxHp / 2) }
  } else if (defender.hasItem("Oran Berry")) {
    return { recovery: 10 * ripen, threshold: Math.floor(maxHp / 2) }
  } else if (defender.hasItem("Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry")) {
    return { recovery: Math.floor(maxHp / 3) * ripen, threshold: Math.floor(maxHp / 4) }
  } else if (defender.hasItem("Enigma Berry")) {
    const moveType = getType(move.type)!
    let effectiveness: number

    if (defender.teraType && defender.teraType !== "Stellar") {
      effectiveness = moveType.effectiveness[defender.teraType]!
    } else {
      effectiveness = moveType.effectiveness[defender.types[0]]!

      if (defender.types[1]) {
        effectiveness *= moveType.effectiveness[defender.types[1]]!
      }
    }

    if (effectiveness > 1) {
      return { recovery: Math.floor(maxHp / 4) * ripen, threshold: maxHp }
    }
  }

  return { recovery: 0, threshold: 0 }
}

export function consumeBerryIfTriggered(hp: number, maxHp: number, recovery: number, threshold: number): { hp: number; consumed: boolean } {
  if (recovery > 0 && hp <= threshold && hp > 0) {
    return { hp: Math.min(hp + recovery, maxHp), consumed: true }
  }

  return { hp, consumed: false }
}

export function getDamageWithoutBerry(damageObj: Damage, rawDesc: RawDesc, move: Move, defender: Pokemon): Damage | undefined {
  if (!rawDesc.defenderItem || !move.hasType(getBerryResistType(rawDesc.defenderItem))) {
    return undefined
  }

  const reduction = defender.hasAbility("Ripen") ? 0.25 : 0.5

  if (typeof damageObj === "number") {
    return Math.floor(damageObj / reduction)
  }

  if (typeof damageObj[0] === "number") {
    return (damageObj as number[]).map(d => Math.floor(d / reduction))
  }

  const dists = damageObj as number[][]
  const firstDist = dists[0].map(d => Math.floor(d / reduction))

  return [firstDist].concat(dists.slice(1))
}

export function computeDamageWithoutBerry(damageObj: Damage, rawDesc: RawDesc, move: Move, defender: Pokemon): number[] | undefined {
  const raw = getDamageWithoutBerry(damageObj, rawDesc, move, defender)

  if (raw === undefined) {
    return undefined
  }

  if (typeof raw === "number") {
    return [raw]
  }

  if (typeof raw[0] === "number") {
    return raw as number[]
  }

  return combine(raw as number[][])[0]
}
