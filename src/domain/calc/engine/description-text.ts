import { getBerryResistType } from "@calc/model/items"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Damage, damageRange, multiDamageRange } from "@calc/model/result"
import { RawDesc, StatID } from "@data/types"
import { getNatureData } from "@data/nature-data"
import { getKOChance } from "@calc/engine/ko-chance"

const STAT_DISPLAY_NAMES: Record<StatID, string> = { hp: "HP", atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe" }

export function getStatDescriptionText(pokemon: Pokemon, stat: StatID, powerTrickActive?: boolean, wonderRoomActive?: boolean): string {
  const initialStat = stat

  if (wonderRoomActive) {
    if (stat === "def") {
      stat = "spd"
    } else if (stat === "spd") {
      stat = "def"
    }
  }

  if (powerTrickActive) {
    if (stat === "atk") {
      stat = "def"
    } else if (stat === "def") {
      stat = "atk"
    }
  }

  const nature = getNatureData(pokemon.nature)!
  const sign = stat === "hp" || nature.plus === nature.minus ? "" : nature.plus === stat ? "+" : nature.minus === stat ? "-" : ""

  let description = `${pokemon.evs[stat]}${sign} ${STAT_DISPLAY_NAMES[initialStat]}`

  if (stat !== initialStat) {
    description += ` (${STAT_DISPLAY_NAMES[stat]})`
  }

  return description
}

export function error(err: boolean, message: string) {
  if (err) {
    throw new Error(message)
  }
}

export function roundChance(chance: number): number {
  return Math.max(Math.min(Math.round(chance * 1000), 999), 1) / 10
}

export function formatResultDescription(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damage: Damage, rawDesc: RawDesc, notation: string, err: boolean) {
  const [min, max] = damageRange(damage)

  const minDisplay = toDisplay(notation, min, defender.maxHp())
  const maxDisplay = toDisplay(notation, max, defender.maxHp())

  const berryResistType = getBerryResistType(rawDesc.defenderItem)
  const isBerryResist = !!berryResistType && move.hasType(berryResistType)
  const description = buildDescription(rawDesc, isBerryResist)
  const damageText = `${min}-${max} (${minDisplay} - ${maxDisplay}${notation})`
  const berryResistText = isBerryResist ? ` reduced by ${rawDesc.defenderItem}` : ""

  if (move.category === "Status") {
    return `${description}: ${damageText}`
  }

  const koChanceText = getKOChance(attacker, defender, move, field, damage, rawDesc, err).text

  return koChanceText ? `${description}: ${damageText}${berryResistText} -- ${koChanceText}` : `${description}: ${damageText}${berryResistText}`
}

export function formatDamageSummary(attacker: Pokemon, defender: Pokemon, move: Move, damage: Damage, notation: string) {
  const [min, max] = damageRange(damage)

  const minDisplay = toDisplay(notation, min, defender.maxHp())
  const maxDisplay = toDisplay(notation, max, defender.maxHp())

  const recoveryText = getRecovery(attacker, defender, move, damage, notation).text
  const recoilText = getRecoil(attacker, defender, move, damage, notation).text

  return `${minDisplay} - ${maxDisplay}${notation}${recoveryText && ` (${recoveryText})`}${recoilText && ` (${recoilText})`}`
}

export function getRecovery(attacker: Pokemon, defender: Pokemon, move: Move, damage: Damage, notation: string) {
  const [minDamage, maxDamage] = damageRange(damage)
  let minD
  let maxD

  if (move.timesUsed > 1) {
    ;[minD, maxD] = multiDamageRange(damage) as [number[], number[]]
  } else {
    minD = [minDamage]
    maxD = [maxDamage]
  }

  const recovery = [0, 0] as [number, number]
  let text = ""

  if (attacker.hasItem("Shell Bell")) {
    for (let i = 0; i < minD.length; i++) {
      recovery[0] += minD[i] > 0 ? Math.max(Math.round(minD[i] / 8), 1) : 0
      recovery[1] += maxD[i] > 0 ? Math.max(Math.round(maxD[i] / 8), 1) : 0
    }

    const maxHealing = Math.round(defender.currentHp() / 8)
    recovery[0] = Math.min(recovery[0], maxHealing)
    recovery[1] = Math.min(recovery[1], maxHealing)
  }

  if (move.named("Pain Split")) {
    const average = Math.floor((attacker.currentHp() + defender.currentHp()) / 2)
    recovery[0] = recovery[1] = average - attacker.currentHp()
  }

  if (move.drain) {
    if (attacker.hasAbility("Parental Bond") || move.hits > 1) {
      ;[minD, maxD] = multiDamageRange(damage) as [number[], number[]]
    }

    const percentHealed = move.drain[0] / move.drain[1]
    const attackerHasBigRoot = attacker.hasItem("Big Root")
    let maxDrain = Math.round(defender.currentHp() * percentHealed)

    if (attackerHasBigRoot) {
      maxDrain = Math.trunc((maxDrain * 5324) / 4096)
    }

    for (let i = 0; i < minD.length; i++) {
      const range = [minD[i], maxD[i]]

      for (const j in recovery) {
        let drained = Math.max(Math.round(range[j] * percentHealed), 1)

        if (attackerHasBigRoot) {
          drained = Math.trunc((drained * 5324) / 4096)
        }

        recovery[j] += Math.min(drained, maxDrain)
      }
    }
  }

  if (recovery[1] === 0) {
    return { recovery, text }
  }

  const minHealthRecovered = toDisplay(notation, recovery[0], attacker.maxHp())
  const maxHealthRecovered = toDisplay(notation, recovery[1], attacker.maxHp())
  const change = recovery[0] > 0 ? "recovered" : "lost"
  text = `${minHealthRecovered} - ${maxHealthRecovered}${notation} ${change}`

  return { recovery, text }
}

export function getRecoil(attacker: Pokemon, defender: Pokemon, move: Move, damage: Damage, notation = "%") {
  const [min, max] = damageRange(damage)

  let recoil: [number, number] | number = [0, 0]
  let text = ""

  const damageOverflow = min > defender.currentHp() || max > defender.currentHp()

  if (move.recoil) {
    const mod = (move.recoil[0] / move.recoil[1]) * 100
    let minRecoilDamage
    let maxRecoilDamage

    if (damageOverflow) {
      minRecoilDamage = toDisplay(notation, defender.currentHp() * mod, attacker.maxHp(), 100)
      maxRecoilDamage = toDisplay(notation, defender.currentHp() * mod, attacker.maxHp(), 100)
    } else {
      minRecoilDamage = toDisplay(notation, Math.min(min, defender.currentHp()) * mod, attacker.maxHp(), 100)
      maxRecoilDamage = toDisplay(notation, Math.min(max, defender.currentHp()) * mod, attacker.maxHp(), 100)
    }

    if (!attacker.hasAbility("Rock Head")) {
      recoil = [minRecoilDamage, maxRecoilDamage]
      text = `${minRecoilDamage} - ${maxRecoilDamage}${notation} recoil damage`
    }
  } else if (move.hasCrashDamage) {
    recoil = notation === "%" ? 24 : 50
    text = "50% crash damage"
  } else if (move.struggleRecoil) {
    recoil = notation === "%" ? 12 : 25
    text = "25% struggle damage"
  } else if (move.mindBlownRecoil) {
    recoil = notation === "%" ? 24 : 50
    text = "50% recoil damage"
  }

  return { recoil, text }
}

export function buildDescription(description: RawDesc, omitDefenderItem = false) {
  return buildAttackerDescription(description) + "vs. " + buildDefenderDescription(description, omitDefenderItem)
}

export function buildAttackerDescription(description: RawDesc) {
  let output = ""

  if (description.attackBoost) {
    if (description.attackBoost > 0) {
      output += "+"
    }

    output += description.attackBoost + " "
  }

  output = appendIfSet(output, description.attackEVs)
  output = appendIfSet(output, description.attackerItem)
  output = appendIfSet(output, description.attackerAbility)
  output = appendIfSet(output, description.rivalry)

  if (description.isBurned) {
    output += "burned "
  }

  if (description.alliesFainted) {
    output += Math.min(5, description.alliesFainted) + ` ${description.alliesFainted === 1 ? "ally" : "allies"} fainted `
  }

  if (description.attackerTera) {
    output += `Tera ${description.attackerTera} `
  }

  if (description.isStellarFirstUse) {
    output += "(First Use) "
  }

  if (description.isBeadsOfRuin) {
    output += "Beads of Ruin "
  }

  if (description.isSwordOfRuin) {
    output += "Sword of Ruin "
  }

  output += description.attackerName + " "

  if (description.isHelpingHand) {
    output += "Helping Hand "
  }

  if (description.isFlowerGiftAttacker) {
    output += "with an ally's Flower Gift "
  }

  if (description.isPowerTrickAttacker) {
    output += "with Power Trick "
  }

  if (description.isSteelySpiritAttacker) {
    output += "with an ally's Steely Spirit "
  }

  if (description.isBattery) {
    output += "Battery boosted "
  }

  if (description.isPowerSpot) {
    output += "Power Spot boosted "
  }

  if (description.isFairyAura) {
    output += "Fairy Aura "
  }

  if (description.isSwitching) {
    output += "switching boosted "
  }

  output += description.moveName + " "

  if (description.moveBP && description.moveType) {
    output += "(" + description.moveBP + " BP " + description.moveType + ") "
  } else if (description.moveBP) {
    output += "(" + description.moveBP + " BP) "
  } else if (description.moveType) {
    output += "(" + description.moveType + ") "
  }

  if (description.hits) {
    output += "(" + description.hits + " hits) "
  }

  output = appendIfSet(output, description.moveTurns)

  return output
}

export function buildDefenderDescription(description: RawDesc, omitDefenderItem = false) {
  return buildDefenderBulk(description) + buildDefenderTail(description, omitDefenderItem)
}

export function buildDefenderBulk(description: RawDesc) {
  let output = ""

  if (description.defenseBoost) {
    if (description.defenseBoost > 0) {
      output += "+"
    }

    output += description.defenseBoost + " "
  }

  output = appendIfSet(output, description.hpEVs)

  if (description.defenseEVs) {
    output += "/ " + description.defenseEVs + " "
  }

  return output
}

export function buildDefenderTail(description: RawDesc, omitDefenderItem = false) {
  let output = ""

  if (!omitDefenderItem) {
    output = appendIfSet(output, description.defenderItem)
  }

  output = appendIfSet(output, description.defenderAbility)

  if (description.isTabletsOfRuin) {
    output += "Tablets of Ruin "
  }

  if (description.isVesselOfRuin) {
    output += "Vessel of Ruin "
  }

  if (description.isProtected) {
    output += "protected "
  }

  if (description.defenderTera) {
    output += `Tera ${description.defenderTera} `
  }

  output += description.defenderName

  if (description.weather && description.terrain) {
    output += " in " + description.weather + " and " + description.terrain + " Terrain"
  } else if (description.weather) {
    output += " in " + description.weather
  } else if (description.terrain) {
    output += " in " + description.terrain + " Terrain"
  }

  if (description.isReflect) {
    output += " through Reflect"
  } else if (description.isLightScreen) {
    output += " through Light Screen"
  }

  if (description.isFlowerGiftDefender) {
    output += " with an ally's Flower Gift"
  }

  if (description.isPowerTrickDefender) {
    output += " with Power Trick"
  }

  if (description.isFriendGuard) {
    output += " with an ally's Friend Guard"
  }

  if (description.isAuroraVeil) {
    output += " with an ally's Aurora Veil"
  }

  if (description.isCritical) {
    output += " on a critical hit"
  }

  if (description.isWonderRoom) {
    output += " in Wonder Room"
  }

  return output
}

export function serializeEndOfTurnTexts(texts: string[]) {
  const recoveryIndices: number[] = []

  for (let i = 0; i < texts.length; i++) {
    if (texts[i].endsWith(" recovery")) {
      recoveryIndices.push(i)
    }
  }

  if (recoveryIndices.length > 1) {
    for (let i = 0; i < recoveryIndices.length - 1; i++) {
      const idx = recoveryIndices[i]
      texts[idx] = texts[idx].replace(" recovery", "")
    }
  }

  return serializeText(texts)
}

export function serializeText(arr: string[]) {
  if (arr.length === 0) {
    return ""
  } else if (arr.length === 1) {
    return arr[0]
  } else if (arr.length === 2) {
    return arr[0] + " and " + arr[1]
  } else {
    let text = ""

    for (let i = 0; i < arr.length - 1; i++) {
      text += arr[i] + ", "
    }

    return text + "and " + arr[arr.length - 1]
  }
}

function appendIfSet(str: string, toAppend?: string) {
  return toAppend ? `${str}${toAppend} ` : str
}

export function toDisplay(notation: string, a: number, b: number, f = 1) {
  return notation === "%" ? Math.floor((a * (1000 / f)) / b) / 10 : Math.floor((a * (48 / f)) / b)
}
