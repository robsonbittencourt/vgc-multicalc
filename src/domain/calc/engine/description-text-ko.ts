import { localizedName, NameKind } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DescriptionLanguage } from "@calc/engine/description-language"

const STATS_KO: Record<string, string> = { HP: "H", Atk: "A", Def: "B", SpA: "C", SpD: "D", Spe: "S" }

const NAME_KINDS: NameKind[] = ["items", "abilities", "moves", "pokemon", "types"]

const TERRAIN_MOVES: Record<string, string> = { Electric: "Electric Terrain", Grassy: "Grassy Terrain", Psychic: "Psychic Terrain", Misty: "Misty Terrain" }

const WEATHER_KO: Record<string, string> = {
  Sun: "쾌청",
  Rain: "비",
  Sand: "모래바람",
  Snow: "설경",
  "Harsh Sunshine": "아주 강한 햇살",
  "Heavy Rain": "강한 비",
  "Strong Winds": "난기류"
}

const END_OF_TURN_KO: Record<string, string> = {
  "sandstorm damage": "모래바람 데미지",
  "poison damage": "독 데미지",
  "toxic damage": "맹독 데미지",
  "burn damage": "화상 데미지",
  "reduced burn damage": "감소된 화상 데미지",
  "trapping damage": "속박 데미지",
  "Sea of Fire damage": "불바다 데미지"
}

export function localizeStatsKo(text: string): string {
  return text.replace(/(\d+)([+-]?) (HP|Atk|Def|SpA|SpD|Spe)\b/g, (_, value, sign, stat) => `${STATS_KO[stat]}${value}${sign}`).replace(/\b(HP|Atk|Def|SpA|SpD|Spe)\b/g, stat => STATS_KO[stat])
}

export function nameKo(name: string): string {
  for (const kind of NAME_KINDS) {
    const localized = localizedName(kind, name, "ko")

    if (localized !== name) return localized
  }

  return name
}

function typeKo(type: string): string {
  return localizedName("types", type, "ko")
}

export function typesKo(types: string): string {
  return types.split("/").map(typeKo).join("/")
}

export function translateEndOfTurnTextKo(text: string): string {
  if (END_OF_TURN_KO[text]) return END_OF_TURN_KO[text]

  const toxicTurn = text.match(/^toxic damage \(turn (\d+)\)$/)

  if (toxicTurn) return `맹독 데미지 ${toxicTurn[1]}턴째`

  const spikes = text.match(/^(\d+) layers? of Spikes$/)

  if (spikes) return `${nameKo("Spikes")} ${spikes[1]}회`

  const recovery = text.match(/^(.+) recovery$/)

  if (recovery) return `${nameKo(recovery[1])} 회복`

  const damage = text.match(/^(.+) damage$/)

  if (damage) return `${nameKo(damage[1])} 데미지`

  return nameKo(text)
}

export function serializeTextKo(texts: string[]): string {
  return texts.join("·")
}

export function translateResidualTextKo(text: string): string {
  return text
    .replace(/ recovered$/, " 회복")
    .replace(/ lost$/, " 감소")
    .replace(/ recoil damage$/, " 반동 데미지")
    .replace(/ crash damage$/, " 실패 데미지")
    .replace(/ struggle damage$/, ` ${nameKo("Struggle")} 데미지`)
}

export function buildDescriptionKo(description: RawDesc, omitDefenderItem = false) {
  return buildAttackerDescriptionKo(description) + "vs. " + buildDefenderBulkKo(description) + buildDefenderTailKo(description, omitDefenderItem)
}

export function buildAttackerDescriptionKo(description: RawDesc) {
  const parts: string[] = []

  if (description.attackBoost) parts.push(`${description.attackBoost > 0 ? "+" : ""}${description.attackBoost}`)
  if (description.attackEVs) parts.push(localizeStatsKo(description.attackEVs))
  if (description.attackerItem) parts.push(nameKo(description.attackerItem))
  if (description.attackerAbility) parts.push(nameKo(description.attackerAbility))
  if (description.attackerTera) parts.push(`${typeKo(description.attackerTera)} 테라스탈`)

  parts.push(localizedName("pokemon", description.attackerName, "ko"))

  if (description.isBurned) parts.push("(화상)")
  if (description.rivalry) parts.push(`${nameKo("Rivalry")} ${description.rivalry === "buffed" ? "강화" : "약화"}`)
  if (description.attackerTypes) parts.push(`(${typesKo(description.attackerTypes)})`)
  if (description.isStellarFirstUse) parts.push("(첫 사용)")
  if (description.alliesFainted) parts.push(`아군 ${Math.min(5, description.alliesFainted)}마리 기절`)
  if (description.isBeadsOfRuin) parts.push(`${nameKo("Beads of Ruin")} 적용`)
  if (description.isSwordOfRuin) parts.push(`${nameKo("Sword of Ruin")} 적용`)
  if (description.isHelpingHand) parts.push(`${nameKo("Helping Hand")} 적용`)
  if (description.isFlowerGiftAttacker) parts.push(`아군의 ${nameKo("Flower Gift")} 적용`)
  if (description.isPowerTrickAttacker) parts.push(`${nameKo("Power Trick")} 적용`)
  if (description.isSteelySpiritAttacker) parts.push(`아군의 ${nameKo("Steely Spirit")} 적용`)
  if (description.isBattery) parts.push(`${nameKo("Battery")} 적용`)
  if (description.isPowerSpot) parts.push(`${nameKo("Power Spot")} 적용`)
  if (description.isFairyAura) parts.push(`${nameKo("Fairy Aura")} 적용`)
  if (description.isSwitching) parts.push("교체 시")

  parts.push(nameKo(description.moveName))

  if (description.moveBP && description.moveType) {
    parts.push(`(위력 ${description.moveBP} ${typeKo(description.moveType)})`)
  } else if (description.moveBP) {
    parts.push(`(위력 ${description.moveBP})`)
  } else if (description.moveType) {
    parts.push(`(${typeKo(description.moveType)})`)
  }

  if (description.hits) parts.push(`(${description.hits}회)`)
  if (description.moveTurns) parts.push(moveTurnsKo(description.moveTurns))

  return parts.join(" ") + " "
}

function moveTurnsKo(moveTurns: string): string {
  return moveTurns.replace(/^over (\d+) turns/, "($1턴)").replace(" (stat changes considered)", " (능력 변화 포함)")
}

export function buildDefenderBulkKo(description: RawDesc) {
  let output = ""

  if (description.defenseBoost) {
    output += `${description.defenseBoost > 0 ? "+" : ""}${description.defenseBoost} `
  }

  if (description.hpEVs) output += `${localizeStatsKo(description.hpEVs)} `
  if (description.defenseEVs) output += `/ ${localizeStatsKo(description.defenseEVs)} `

  return output
}

export function buildDefenderTailKo(description: RawDesc, omitDefenderItem = false) {
  const parts: string[] = []

  if (!omitDefenderItem && description.defenderItem) parts.push(nameKo(description.defenderItem))
  if (description.defenderAbility) parts.push(nameKo(description.defenderAbility))
  if (description.defenderTera) parts.push(`${typeKo(description.defenderTera)} 테라스탈`)

  parts.push(localizedName("pokemon", description.defenderName, "ko"))

  if (description.isProtected) parts.push(`(${nameKo("Protect")})`)
  if (description.defenderTypes) parts.push(`(${typesKo(description.defenderTypes)})`)
  if (description.isTabletsOfRuin) parts.push(`${nameKo("Tablets of Ruin")} 적용`)
  if (description.isVesselOfRuin) parts.push(`${nameKo("Vessel of Ruin")} 적용`)

  const conditions = [description.weather ? WEATHER_KO[description.weather] : "", description.terrain ? nameKo(TERRAIN_MOVES[description.terrain]) : ""].filter(Boolean)

  if (conditions.length) parts.push(`${conditions.join("·")} 상태`)

  const screens = [description.isReflect ? nameKo("Reflect") : "", description.isLightScreen ? nameKo("Light Screen") : ""].filter(Boolean)

  if (screens.length) parts.push(`${screens.join("·")} 적용`)

  if (description.isFlowerGiftDefender) parts.push(`아군의 ${nameKo("Flower Gift")} 적용`)
  if (description.isPowerTrickDefender) parts.push(`${nameKo("Power Trick")} 적용`)
  if (description.isFriendGuard) parts.push(`아군의 ${nameKo("Friend Guard")} 적용`)
  if (description.isAuroraVeil) parts.push(`${nameKo("Aurora Veil")} 적용`)
  if (description.isCritical) parts.push("급소")
  if (description.isWonderRoom) parts.push(`${nameKo("Wonder Room")} 상태`)

  return parts.join(" ")
}

function afterKo(texts: string[]): string {
  return `${KO_PHRASES_KO.afterSeparator}${serializeTextKo(texts.map(translateEndOfTurnTextKo))} 포함)`
}

function koKo(prefix: string, ko: string): string {
  return ko.endsWith("턴") ? `${ko} ${prefix}` : `${prefix} ${ko === "OHKO" ? "1타" : ko}`
}

export const KO_PHRASES_KO: KoPhrases = {
  koTurn: (n, multipleTurns) => (multipleTurns ? `${n}턴` : `${n}타`),
  qualifier: qualifier => (qualifier ? "약 " : ""),
  afterSeparator: " (",
  after: afterKo,
  afterEndOfTurn: afterKo,
  possible: ko => koKo("난수", ko),
  guaranteed: ko => koKo("확정", ko),
  chance: (percentage, ko) => `${koKo("난수", ko)}(${percentage}%)`,
  notAKo: "쓰러뜨릴 수 없음",
  tenOrMore: "10타 이상"
}

export const DESCRIPTION_KO: DescriptionLanguage = {
  ko: KO_PHRASES_KO,
  description: buildDescriptionKo,
  attacker: buildAttackerDescriptionKo,
  defenderTail: buildDefenderTailKo,
  name: nameKo,
  stats: localizeStatsKo,
  residual: translateResidualTextKo,
  reducedBy: item => ` (${nameKo(item)} 효과로 감소)`,
  staminaConsidered: () => ` (${nameKo("Stamina")} 포함)`,
  statChangesConsidered: " (능력 변화 포함)",
  overTurns: turns => ` (${turns}턴)`,
  and: "＆",
  worstMoveEver: "역대 최악의 기술일지도 모른다"
}
