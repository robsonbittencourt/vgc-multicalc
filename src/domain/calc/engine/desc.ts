import { getBerryResistType } from "@calc/model/items"
import { Field, Side } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Damage, damageRange, multiDamageRange } from "@calc/model/result"
import { isGrounded } from "@calc/engine/stats"
import { RawDesc, StatID } from "@data/types"
import { getNatureData } from "@data/nature-data"
import { getType } from "@calc/engine/types"

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

function error(err: boolean, message: string) {
  if (err) {
    throw new Error(message)
  }
}

export function display(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damage: Damage, rawDesc: RawDesc, notation: string, err: boolean) {
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

export function displayMove(attacker: Pokemon, defender: Pokemon, move: Move, damage: Damage, notation: string) {
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

    const maxHealing = Math.round(defender.currrentHp() / 8)
    recovery[0] = Math.min(recovery[0], maxHealing)
    recovery[1] = Math.min(recovery[1], maxHealing)
  }

  if (move.named("Pain Split")) {
    const average = Math.floor((attacker.currrentHp() + defender.currrentHp()) / 2)
    recovery[0] = recovery[1] = average - attacker.currrentHp()
  }

  if (move.drain) {
    if (attacker.hasAbility("Parental Bond") || move.hits > 1) {
      ;[minD, maxD] = multiDamageRange(damage) as [number[], number[]]
    }

    const percentHealed = move.drain[0] / move.drain[1]
    const attackerHasBigRoot = attacker.hasItem("Big Root")
    let maxDrain = Math.round(defender.currrentHp() * percentHealed)

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

  const damageOverflow = min > defender.currrentHp() || max > defender.currrentHp()

  if (move.recoil) {
    const mod = (move.recoil[0] / move.recoil[1]) * 100
    let minRecoilDamage
    let maxRecoilDamage

    if (damageOverflow) {
      minRecoilDamage = toDisplay(notation, defender.currrentHp() * mod, attacker.maxHp(), 100)
      maxRecoilDamage = toDisplay(notation, defender.currrentHp() * mod, attacker.maxHp(), 100)
    } else {
      minRecoilDamage = toDisplay(notation, Math.min(min, defender.currrentHp()) * mod, attacker.maxHp(), 100)
      maxRecoilDamage = toDisplay(notation, Math.min(max, defender.currrentHp()) * mod, attacker.maxHp(), 100)
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

export function getKOChance(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damageObj: Damage, rawDesc: RawDesc, err = true) {
  const [damage, approximate] = combine(damageObj)

  if (isNaN(damage[0])) {
    error(err, "damage[0] must be a number.")

    return { chance: 0, n: 0, text: "", berryConsumed: false }
  }

  if (damage[damage.length - 1] === 0) {
    error(err, "damage[damage.length - 1] === 0.")

    return { chance: 0, n: 0, text: "", berryConsumed: false }
  }

  if (move.timesUsedWithMetronome === undefined) {
    move.timesUsedWithMetronome = 1
  }

  if (damage[0] >= defender.maxHp() && move.timesUsed === 1 && move.timesUsedWithMetronome === 1 && move.hits === 1) {
    return { chance: 1, n: 1, text: "guaranteed OHKO", berryConsumed: false }
  }

  const hazards = getHazards(defender, field.defenderSide)
  const eot = getEndOfTurn(attacker, defender, move, field)
  const toxicCounter = defender.hasStatus("tox") && !defender.hasAbility("Magic Guard", "Poison Heal") ? defender.toxicCounter : 0

  const qualifier = approximate ? "approx. " : ""

  const { recovery: berryRecovery, threshold: berryThreshold } = getBerryRecovery(attacker, defender, move, field)

  let berryText = ""

  if (berryRecovery > 0) {
    berryText = (defender.item || "Berry") + " recovery"
  }

  const damageWithoutBerry = computeDamageWithoutBerry(damageObj, rawDesc, move, defender)

  function roundChance(chance: number) {
    return Math.max(Math.min(Math.round(chance * 1000), 999), 1) / 10
  }

  function KOChance(chanceWithoutEot: number | undefined, chanceWithEot: number | undefined, n: number, multipleTurns = false, berryRelevant = false, firstBerryTurn?: number, anyBerryConsumed = false) {
    const combinedTexts = hazards.texts.concat(eot.texts)

    if (berryRelevant && berryText) {
      combinedTexts.push(berryText)
    }

    const hazardsText = hazards.texts.length > 0 ? " after " + serializeText(hazards.texts) : ""
    const afterText = combinedTexts.length > 0 ? " after " + serializeEndOfTurnTexts(combinedTexts) : ""
    const afterTextNoHazards = eot.texts.length > 0 || (berryRelevant && berryText) ? " after " + serializeEndOfTurnTexts(berryRelevant && berryText ? eot.texts.concat([berryText]) : eot.texts) : ""
    const KOTurnText = n === 1 ? "OHKO" : multipleTurns ? `KO in ${n} turns` : `${n}HKO`

    let text = qualifier
    let chance = undefined

    if (chanceWithoutEot === undefined || chanceWithEot === undefined) {
      text += `possible ${KOTurnText}${afterText}`
    } else if (chanceWithoutEot + chanceWithEot === 0) {
      chance = 0
      text += "not a KO"
    } else if (chanceWithoutEot === 1) {
      chance = chanceWithoutEot
      text = "guaranteed "
      text += `OHKO${hazardsText}`
    } else if (chanceWithoutEot > 0) {
      chance = chanceWithEot

      if (chanceWithEot === 1) {
        text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText} ` + `(guaranteed ${KOTurnText}${afterTextNoHazards})`
      } else if (chanceWithEot > chanceWithoutEot) {
        text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText} ` + `(${qualifier}${roundChance(chanceWithEot)}% chance to ` + `${KOTurnText}${afterTextNoHazards})`
      } else if (chanceWithoutEot > 0) {
        text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText}`
      }
    } else if (chanceWithoutEot === 0) {
      chance = chanceWithEot

      if (chanceWithEot === 1) {
        text = "guaranteed "
        text += `${KOTurnText}${afterText}`
      } else if (chanceWithEot > 0) {
        text += `${roundChance(chanceWithEot)}% chance to ${KOTurnText}${afterText}`
      }
    }

    return { chance, n, text, berryConsumed: berryRelevant, anyBerryConsumed, firstBerryTurn }
  }

  if (move.timesUsed === 1 && move.timesUsedWithMetronome === 1) {
    const hits = move.timesUsed
    let hasOHKOChance = false
    let berryConsumed = false

    if (move.hits > 1 && hits === 1 && damageObj && Array.isArray(damageObj) && Array.isArray(damageObj[0])) {
      const damageMatrix = damageObj as number[][]

      if (damageMatrix.length > 1) {
        const res = computeMultiHitKOChance(damageMatrix, defender.currrentHp() - hazards.damage, 0, defender.maxHp(), berryRecovery, berryThreshold)
        const resWithEot = computeMultiHitKOChance(damageMatrix, defender.currrentHp() - hazards.damage, eot.damage, defender.maxHp(), berryRecovery, berryThreshold)

        if (res.chance + resWithEot.chance > 0) {
          return KOChance(res.chance, resWithEot.chance, 1, false, res.berryConsumed || resWithEot.berryConsumed, res.firstBerryTurn || resWithEot.firstBerryTurn, res.anyBerryConsumed || resWithEot.anyBerryConsumed)
        }

        if (res.berryConsumed || resWithEot.berryConsumed) {
          berryConsumed = true
        }

        hasOHKOChance = true
      }
    }

    if (!hasOHKOChance) {
      const res = computeKOChance(damage, defender.currrentHp() - hazards.damage, 0, hits, 1, defender.maxHp(), 0, berryRecovery, berryThreshold, false, damageWithoutBerry)
      const resWithEot = computeKOChance(damage, defender.currrentHp() - hazards.damage, eot.damage, hits, 1, defender.maxHp(), toxicCounter, berryRecovery, berryThreshold, false, damageWithoutBerry)

      if (res.chance + resWithEot.chance > 0) {
        return KOChance(res.chance, resWithEot.chance, 1, false, res.berryConsumed || resWithEot.berryConsumed, res.firstBerryTurn || resWithEot.firstBerryTurn, res.anyBerryConsumed || resWithEot.anyBerryConsumed)
      }
    }

    for (let i = 2; i <= 4; i++) {
      const res = computeKOChance(damage, defender.currrentHp() - hazards.damage, eot.damage, i, 1, defender.maxHp(), toxicCounter, berryRecovery, berryThreshold, false, damageWithoutBerry)

      if (res.chance > 0) {
        return KOChance(0, res.chance, i, false, res.berryConsumed || berryConsumed, res.firstBerryTurn || (berryConsumed ? 1 : undefined), res.anyBerryConsumed || berryConsumed)
      }
    }

    for (let i = 5; i <= 9; i++) {
      const totalMin = predictTotal(damage[0], eot.damage, i, 1, toxicCounter, defender.maxHp())
      const requiredHP = defender.currrentHp() - hazards.damage

      if (totalMin >= requiredHP + berryRecovery) {
        return KOChance(0, 1, i, false, berryRecovery > 0 || berryConsumed)
      } else if (predictTotal(damage[damage.length - 1], eot.damage, i, 1, toxicCounter, defender.maxHp()) >= requiredHP + berryRecovery) {
        return KOChance(undefined, undefined, i, false, berryRecovery > 0 || berryConsumed)
      }
    }
  } else {
    const hits = move.hits || 1
    const timesUsed = move.timesUsed
    const res = computeKOChance(damage, defender.maxHp() - hazards.damage, eot.damage, hits, timesUsed, defender.maxHp(), toxicCounter, berryRecovery, berryThreshold)

    if (res.chance > 0) {
      return KOChance(0, res.chance, timesUsed, res.chance === 1, res.berryConsumed, res.firstBerryTurn, res.anyBerryConsumed)
    }

    const totalMin = predictTotal(damage[0], eot.damage, 1, timesUsed, toxicCounter, defender.maxHp())
    const requiredHP = defender.currrentHp() - hazards.damage

    if (totalMin >= requiredHP + berryRecovery) {
      return KOChance(0, 1, timesUsed, true, berryRecovery > 0)
    } else if (predictTotal(damage[damage.length - 1], eot.damage, 1, timesUsed, toxicCounter, defender.maxHp()) >= requiredHP + berryRecovery) {
      return KOChance(undefined, undefined, timesUsed, true, berryRecovery > 0)
    }

    return KOChance(0, 0, timesUsed)
  }

  return { chance: 0, n: 0, text: "", berryConsumed: false, anyBerryConsumed: false, firstBerryTurn: undefined }
}

export function computeMultiHitKOChance(
  damageMatrix: number[][],
  hp: number,
  eot: number,
  maxHP: number,
  berryRecovery: number | number[],
  berryThreshold: number | number[],
  rowsPerTurn?: number,
  toxicCounter = 0
): { chance: number; berryConsumed: boolean; anyBerryConsumed: boolean; firstBerryTurn?: number } {
  let state = new Map<number, number>()
  let stateBerry = new Map<number, number>()

  const startHP = Math.min(maxHP, Math.max(0, hp))

  if (startHP <= 0) {
    return { chance: 1, berryConsumed: false, anyBerryConsumed: false }
  }

  state.set(startHP, 1)

  let koChance = 0
  let firstBerryTurn: number | undefined
  let berryConsumedInKO = false
  let anyBerryConsumed = false

  for (let i = 0; i < damageMatrix.length; i++) {
    const damageRow = damageMatrix[i]
    const nextState = new Map<number, number>()
    const nextStateBerry = new Map<number, number>()
    const rowProb = 1 / damageRow.length

    const currentRecovery = Array.isArray(berryRecovery) ? berryRecovery[i] : berryRecovery
    const currentThreshold = Array.isArray(berryThreshold) ? berryThreshold[i] : berryThreshold

    for (const [currentHP, currentProb] of state) {
      for (const dmg of damageRow) {
        let nextHP = currentHP - dmg
        const prob = currentProb * rowProb

        if (currentRecovery > 0 && nextHP <= currentThreshold && nextHP > 0) {
          nextHP += currentRecovery

          if (nextHP > maxHP) {
            nextHP = maxHP
          }

          nextStateBerry.set(nextHP, (nextStateBerry.get(nextHP) || 0) + prob)
          anyBerryConsumed = true

          if (firstBerryTurn === undefined) {
            firstBerryTurn = i + 1
          }
        } else if (nextHP <= 0) {
          koChance += prob
        } else {
          nextState.set(nextHP, (nextState.get(nextHP) || 0) + prob)
        }
      }
    }

    for (const [currentHP, currentProb] of stateBerry) {
      for (const dmg of damageRow) {
        const nextHP = currentHP - dmg
        const prob = currentProb * rowProb

        if (nextHP <= 0) {
          koChance += prob
          berryConsumedInKO = true
        } else {
          nextStateBerry.set(nextHP, (nextStateBerry.get(nextHP) || 0) + prob)
        }
      }
    }

    state = nextState
    stateBerry = nextStateBerry

    if (anyBerryConsumed && firstBerryTurn === undefined) {
      firstBerryTurn = i + 1
    }

    if (rowsPerTurn && (i + 1) % rowsPerTurn === 0) {
      let toxicDamage = 0

      if (toxicCounter > 0) {
        toxicDamage = Math.floor((toxicCounter * maxHP) / 16)
        toxicCounter++
      }

      let turnEot = eot

      if (turnEot - toxicDamage <= 0) {
        turnEot -= toxicDamage
      }

      if (turnEot !== 0) {
        const nextStateEot = new Map<number, number>()
        const nextStateBerryEot = new Map<number, number>()

        for (const [currentHP, currentProb] of state) {
          let nextHP = currentHP + turnEot

          if (nextHP <= 0) {
            koChance += currentProb
          } else {
            if (nextHP > maxHP) {
              nextHP = maxHP
            }

            nextStateEot.set(nextHP, (nextStateEot.get(nextHP) || 0) + currentProb)
          }
        }

        for (const [currentHP, currentProb] of stateBerry) {
          let nextHP = currentHP + turnEot

          if (nextHP <= 0) {
            koChance += currentProb
            berryConsumedInKO = true
          } else {
            if (nextHP > maxHP) {
              nextHP = maxHP
            }

            nextStateBerryEot.set(nextHP, (nextStateBerryEot.get(nextHP) || 0) + currentProb)
          }
        }

        state = nextStateEot
        stateBerry = nextStateBerryEot
      }
    }
  }

  if (!rowsPerTurn && eot !== 0) {
    const finalState = new Map<number, number>()
    const finalStateBerry = new Map<number, number>()

    for (const [currentHP, currentProb] of state) {
      let nextHP = currentHP + eot

      if (nextHP <= 0) {
        koChance += currentProb
      } else if ((Array.isArray(berryRecovery) ? berryRecovery[0] : berryRecovery) > 0 && nextHP <= (Array.isArray(berryThreshold) ? berryThreshold[0] : berryThreshold) && nextHP > 0) {
        nextHP += Array.isArray(berryRecovery) ? berryRecovery[0] : berryRecovery

        if (nextHP > maxHP) {
          nextHP = maxHP
        }

        anyBerryConsumed = true

        if (firstBerryTurn === undefined) {
          firstBerryTurn = 1
        }

        finalStateBerry.set(nextHP, (finalStateBerry.get(nextHP) || 0) + currentProb)
      } else {
        if (nextHP > maxHP) {
          nextHP = maxHP
        }

        finalState.set(nextHP, (finalState.get(nextHP) || 0) + currentProb)
      }
    }

    for (const [currentHP, currentProb] of stateBerry) {
      const nextHP = currentHP + eot

      if (nextHP <= 0) {
        koChance += currentProb
        berryConsumedInKO = true
      } else {
        const h = Math.min(maxHP, nextHP)
        finalStateBerry.set(h, (finalStateBerry.get(h) || 0) + currentProb)
      }
    }
  }

  if (anyBerryConsumed && firstBerryTurn === undefined) {
    firstBerryTurn = 1
  }

  return { chance: koChance, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
}

function combine(damage: Damage): [number[], boolean] {
  if (typeof damage === "number") {
    return [[damage], false]
  }

  const damageArray = damage as number[] | number[][]

  if (damageArray.length >= 16 && typeof damageArray[0] === "number") {
    return [damageArray as number[], false]
  }

  if (typeof damageArray[0] === "number" && typeof damageArray[1] === "number") {
    return [[(damageArray[0] as number) + (damageArray[1] as number)], false]
  }

  function reduce(dist: number[], scaleValue: number): number[] {
    const newLength = dist.length / scaleValue
    const reduced = []
    reduced[0] = dist[0]
    reduced[newLength - 1] = dist[dist.length - 1]

    for (let i = 1; i < newLength - 1; i++) {
      reduced[i] = dist[Math.round(i * scaleValue + scaleValue / 2)]
    }

    return reduced
  }

  function combineTwo(dist1: number[], dist2: number[]): number[] {
    return dist1.flatMap(val1 => dist2.map(val2 => val1 + val2)).sort((a, b) => a - b)
  }

  function combineDistributions(dists: number[][]): [number[], boolean] {
    let combined = [0]
    const numRolls = dists[0].length
    const numAccuracy = numRolls === 16 && dists.length === 3 ? 3 : 2
    let approximate = false

    for (let i = 0; i < dists.length; i++) {
      const distribution = dists[i]
      combined = combineTwo(combined, distribution)

      if (i >= numAccuracy) {
        combined = reduce(combined, distribution.length)
        approximate = true
      }
    }

    return [combined, approximate]
  }

  return combineDistributions(damageArray as number[][])
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

function computeDamageWithoutBerry(damageObj: Damage, rawDesc: RawDesc, move: Move, defender: Pokemon): number[] | undefined {
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

export function getBerryRecovery(attacker: Pokemon, defender: Pokemon, move: Move, field?: Field): { recovery: number; threshold: number } {
  if (field?.isUnnerve || attacker.hasAbility("Unnerve", "As One (Glastrier)", "As One (Spectrier)")) {
    return { recovery: 0, threshold: 0 }
  }

  if (defender.hasItem("Sitrus Berry")) {
    let recovery = Math.floor(defender.maxHp() / 4)

    if (defender.hasAbility("Ripen")) {
      recovery *= 2
    }

    return { recovery, threshold: Math.floor(defender.maxHp() / 2) }
  } else if (defender.hasItem("Oran Berry")) {
    let recovery = 10

    if (defender.hasAbility("Ripen")) {
      recovery *= 2
    }

    return { recovery, threshold: Math.floor(defender.maxHp() / 2) }
  } else if (defender.hasItem("Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry")) {
    let recovery = Math.floor(defender.maxHp() / 3)

    if (defender.hasAbility("Ripen")) {
      recovery *= 2
    }

    return { recovery, threshold: Math.floor(defender.maxHp() / 4) }
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
      let recovery = Math.floor(defender.maxHp() / 4)

      if (defender.hasAbility("Ripen")) {
        recovery *= 2
      }

      return { recovery, threshold: defender.maxHp() }
    }
  }

  return { recovery: 0, threshold: 0 }
}

const TRAPPING = ["Bind", "Clamp", "Fire Spin", "Infestation", "Magma Storm", "Sand Tomb", "Thunder Cage", "Whirlpool", "Wrap"]

function getHazards(defender: Pokemon, defenderSide: Side) {
  let damage = 0
  const texts: string[] = []

  if (defender.hasItem("Heavy-Duty Boots")) {
    return { damage, texts }
  }

  if (defenderSide.isSR && !defender.hasAbility("Magic Guard", "Mountaineer")) {
    const rockType = getType("rock")!
    const effectiveness = defender.teraType && defender.teraType !== "Stellar" ? rockType.effectiveness[defender.teraType]! : rockType.effectiveness[defender.types[0]]! * (defender.types[1] ? rockType.effectiveness[defender.types[1]]! : 1)
    damage += Math.floor((effectiveness * defender.maxHp()) / 8)
    texts.push("Stealth Rock")
  }

  if (!defender.hasType("Flying") && !defender.hasAbility("Magic Guard", "Levitate", "Eelevate") && !defender.hasItem("Air Balloon")) {
    if (defenderSide.spikes === 1) {
      damage += Math.floor(defender.maxHp() / 8)
      texts.push("1 layer of Spikes")
    } else if (defenderSide.spikes === 2) {
      damage += Math.floor(defender.maxHp() / 6)
      texts.push("2 layers of Spikes")
    } else if (defenderSide.spikes === 3) {
      damage += Math.floor(defender.maxHp() / 4)
      texts.push("3 layers of Spikes")
    }
  }

  return { damage, texts }
}

export function getEndOfTurn(attacker: Pokemon, defender: Pokemon, move: Move, field: Field) {
  let damage = 0
  const texts = []

  const loseItem = move.named("Knock Off") && !defender.hasAbility("Sticky Hold")
  const healBlock = move.named("Psychic Noise") && !(attacker.hasAbility("Sheer Force") || defender.hasItem("Covert Cloak") || defender.hasAbility("Shield Dust", "Aroma Veil"))

  if (field.hasWeather("Sun")) {
    if (defender.hasAbility("Dry Skin", "Solar Power")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push(defender.ability + " damage")
    }
  } else if (field.hasWeather("Rain") && !healBlock) {
    if (defender.hasAbility("Dry Skin")) {
      damage += Math.floor(defender.maxHp() / 8)
      texts.push("Dry Skin recovery")
    } else if (defender.hasAbility("Rain Dish")) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Rain Dish recovery")
    }
  } else if (field.hasWeather("Sand")) {
    if (!defender.hasType("Rock", "Ground", "Steel") && !defender.hasAbility("Magic Guard", "Overcoat", "Sand Force", "Sand Rush", "Sand Veil") && !defender.hasItem("Safety Goggles")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("sandstorm damage")
    }
  } else if (field.hasWeather("Hail", "Snow")) {
    if (defender.hasAbility("Ice Body") && !healBlock) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Ice Body recovery")
    } else if (!defender.hasType("Ice") && !defender.hasAbility("Magic Guard", "Overcoat", "Snow Cloak") && !defender.hasItem("Safety Goggles") && field.hasWeather("Hail")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("hail damage")
    }
  }

  if (defender.hasItem("Leftovers") && !loseItem && !healBlock) {
    damage += Math.floor(defender.maxHp() / 16)
    texts.push("Leftovers recovery")
  } else if (defender.hasItem("Black Sludge") && !loseItem) {
    if (defender.hasType("Poison")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 16)
        texts.push("Black Sludge recovery")
      }
    } else if (!defender.hasAbility("Magic Guard", "Klutz")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("Black Sludge damage")
    }
  } else if (defender.hasItem("Sticky Barb") && !loseItem && !defender.hasAbility("Magic Guard", "Klutz")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Sticky Barb damage")
  }

  if (field.defenderSide.isSeeded) {
    if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("Leech Seed damage")
    }
  }

  if (field.attackerSide.isSeeded && !attacker.hasAbility("Magic Guard")) {
    let recovery = Math.floor(attacker.maxHp() / 8)

    if (defender.hasItem("Big Root")) {
      recovery = Math.trunc((recovery * 5324) / 4096)
    }

    if (attacker.hasAbility("Liquid Ooze")) {
      damage -= recovery
      texts.push("Liquid Ooze damage")
    } else if (!healBlock) {
      damage += recovery
      texts.push("Leech Seed recovery")
    }
  }

  if (field.hasTerrain("Grassy")) {
    if (isGrounded(defender, field) && !healBlock) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Grassy Terrain recovery")
    }
  }

  if (defender.hasStatus("psn")) {
    if (defender.hasAbility("Poison Heal")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 8)
        texts.push("Poison Heal")
      }
    } else if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("poison damage")
    }
  } else if (defender.hasStatus("tox")) {
    if (defender.hasAbility("Poison Heal")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 8)
        texts.push("Poison Heal")
      }
    } else if (!defender.hasAbility("Magic Guard")) {
      texts.push("toxic damage")
    }
  } else if (defender.hasStatus("brn")) {
    if (defender.hasAbility("Heatproof")) {
      damage -= Math.floor(defender.maxHp() / 32)
      texts.push("reduced burn damage")
    } else if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("burn damage")
    }
  } else if ((defender.hasStatus("slp") || defender.hasAbility("Comatose")) && attacker.hasAbility("Bad Dreams") && !defender.hasAbility("Magic Guard")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Bad Dreams")
  }

  if (!defender.hasAbility("Magic Guard") && TRAPPING.includes(move.name)) {
    if (attacker.hasItem("Binding Band")) {
      damage -= Math.floor(defender.maxHp() / 6)
      texts.push("trapping damage")
    } else {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("trapping damage")
    }
  }

  if (field.defenderSide.isSaltCured && !defender.hasAbility("Magic Guard")) {
    const isWaterOrSteel = defender.hasType("Water", "Steel")
    const divisor = isWaterOrSteel ? 8 : 16
    damage -= Math.floor(defender.maxHp() / divisor)
    texts.push("Salt Cure")
  }

  if (!defender.hasType("Fire") && !defender.hasAbility("Magic Guard") && move.named("Fire Pledge (Grass Pledge Boosted)", "Grass Pledge (Fire Pledge Boosted)")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Sea of Fire damage")
  }

  return { damage, texts }
}

function computeKOChance(
  damage: number[],
  hp: number,
  eot: number,
  hits: number,
  timesUsed: number,
  maxHP: number,
  toxicCounter: number,
  berryRecovery: number,
  berryThreshold: number,
  berryConsumed = false,
  damageWithoutBerry?: number[]
): { chance: number; berryConsumed: boolean; anyBerryConsumed: boolean; firstBerryTurn?: number } {
  let toxicDamage = 0

  if (toxicCounter > 0) {
    toxicDamage = Math.floor((toxicCounter * maxHP) / 16)
    toxicCounter++
  }

  const n = damage.length

  if (hits === 1) {
    if (eot - toxicDamage > 0) {
      eot = 0
      toxicDamage = 0
    }

    let totalChance = 0
    let anyBerryConsumed = false
    let berryConsumedInKO = false
    let firstBerryTurn: number | undefined

    for (let i = 0; i < n; i++) {
      let hpAfterDamage = hp - damage[i]
      let consumedNow = berryConsumed

      if (!consumedNow && berryRecovery > 0 && hpAfterDamage <= berryThreshold && hpAfterDamage > 0) {
        hpAfterDamage += berryRecovery

        if (hpAfterDamage > maxHP) {
          hpAfterDamage = maxHP
        }

        consumedNow = true
      }

      if (consumedNow) {
        anyBerryConsumed = true

        if (firstBerryTurn === undefined) {
          firstBerryTurn = 1
        }
      }

      if (hpAfterDamage + eot - toxicDamage <= 0) {
        totalChance += 1

        if (consumedNow) {
          berryConsumedInKO = true
        }
      }
    }

    return { chance: totalChance / n, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
  }

  let sum = 0
  let lastc = 0
  let lastBerry = false
  let lastTurn: number | undefined
  let anyBerryConsumed = false
  let berryConsumedInKO = false
  let firstBerryTurn: number | undefined

  for (let i = 0; i < n; i++) {
    let c
    let berry
    let turn: number | undefined

    if (i === 0 || damage[i] !== damage[i - 1]) {
      let hpAfterDamage = hp - damage[i]
      let consumed = berryConsumed

      if (!consumed && berryRecovery > 0 && hpAfterDamage <= berryThreshold && hpAfterDamage > 0) {
        hpAfterDamage += berryRecovery

        if (hpAfterDamage > maxHP) {
          hpAfterDamage = maxHP
        }

        consumed = true
      }

      const result = computeKOChance(damageWithoutBerry || damage, hpAfterDamage + eot - toxicDamage, eot, hits - 1, timesUsed, maxHP, toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry ? true : consumed, damageWithoutBerry)
      c = result.chance
      berry = result.berryConsumed
      const anyBerry = result.anyBerryConsumed

      if (hp - damage[i] <= berryThreshold) {
        turn = 1
      } else if (result.firstBerryTurn !== undefined) {
        turn = result.firstBerryTurn + 1
      }

      if (anyBerry) {
        anyBerryConsumed = true

        if (turn !== undefined && (firstBerryTurn === undefined || turn < firstBerryTurn)) {
          firstBerryTurn = turn
        }
      }

      if (berry) {
        berryConsumedInKO = true
      }
    } else {
      c = lastc
      berry = lastBerry
      turn = lastTurn
    }

    sum += c
    lastc = c
    lastBerry = berry
    lastTurn = turn
  }

  return { chance: sum / n, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
}

function predictTotal(damage: number, eot: number, hits: number, timesUsed: number, toxicCounter: number, maxHP: number) {
  let toxicDamage = 0
  let lastTurnEot = eot

  if (toxicCounter > 0) {
    for (let i = 0; i < hits - 1; i++) {
      toxicDamage += Math.floor(((toxicCounter + i) * maxHP) / 16)
    }

    lastTurnEot -= Math.floor(((toxicCounter + (hits - 1)) * maxHP) / 16)
  }

  let total: number

  if (hits > 1 && timesUsed === 1) {
    total = damage * hits - eot * (hits - 1) + toxicDamage
  } else {
    total = damage - eot * (hits - 1) + toxicDamage
  }

  if (lastTurnEot < 0) {
    total -= lastTurnEot
  }

  return total
}

function buildDescription(description: RawDesc, omitDefenderItem = false) {
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
  output += "vs. "

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

function serializeText(arr: string[]) {
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

function toDisplay(notation: string, a: number, b: number, f = 1) {
  return notation === "%" ? Math.floor((a * (1000 / f)) / b) / 10 : Math.floor((a * (48 / f)) / b)
}
