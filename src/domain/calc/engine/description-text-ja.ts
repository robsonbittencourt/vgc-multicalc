import { localizedName, NameKind } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DescriptionLanguage } from "@calc/engine/description-language"

const STATS_JA: Record<string, string> = { HP: "H", Atk: "A", Def: "B", SpA: "C", SpD: "D", Spe: "S" }

const NAME_KINDS: NameKind[] = ["items", "abilities", "moves", "pokemon", "types"]

const TERRAIN_MOVES: Record<string, string> = { Electric: "Electric Terrain", Grassy: "Grassy Terrain", Psychic: "Psychic Terrain", Misty: "Misty Terrain" }

const WEATHER_JA: Record<string, string> = {
  Sun: "はれ",
  Rain: "あめ",
  Sand: "すなあらし",
  Snow: "ゆき",
  "Harsh Sunshine": "おおひでり",
  "Heavy Rain": "おおあめ",
  "Strong Winds": "らんきりゅう"
}

const END_OF_TURN_JA: Record<string, string> = {
  "sandstorm damage": "すなあらしダメージ",
  "poison damage": "どくダメージ",
  "toxic damage": "もうどくダメージ",
  "burn damage": "やけどダメージ",
  "reduced burn damage": "軽減されたやけどダメージ",
  "trapping damage": "バインドダメージ",
  "Sea of Fire damage": "ひのうみダメージ"
}

export function localizeStatsJa(text: string): string {
  return text.replace(/(\d+)([+-]?) (HP|Atk|Def|SpA|SpD|Spe)\b/g, (_, value, sign, stat) => `${STATS_JA[stat]}${value}${sign}`).replace(/\b(HP|Atk|Def|SpA|SpD|Spe)\b/g, stat => STATS_JA[stat])
}

export function nameJa(name: string): string {
  for (const kind of NAME_KINDS) {
    const localized = localizedName(kind, name, "ja")

    if (localized !== name) return localized
  }

  return name
}

function typeJa(type: string): string {
  return localizedName("types", type, "ja")
}

export function typesJa(types: string): string {
  return types.split("/").map(typeJa).join("/")
}

export function translateEndOfTurnTextJa(text: string): string {
  if (END_OF_TURN_JA[text]) return END_OF_TURN_JA[text]

  const toxicTurn = text.match(/^toxic damage \(turn (\d+)\)$/)

  if (toxicTurn) return `もうどくダメージ${toxicTurn[1]}ターン目`

  const spikes = text.match(/^(\d+) layers? of Spikes$/)

  if (spikes) return `${nameJa("Spikes")}${spikes[1]}回`

  const recovery = text.match(/^(.+) recovery$/)

  if (recovery) return `${nameJa(recovery[1])}回復`

  const damage = text.match(/^(.+) damage$/)

  if (damage) return `${nameJa(damage[1])}ダメージ`

  return nameJa(text)
}

export function serializeTextJa(texts: string[]): string {
  return texts.join("・")
}

export function translateResidualTextJa(text: string): string {
  return text
    .replace(/ recovered$/, "回復")
    .replace(/ lost$/, "減少")
    .replace(/ recoil damage$/, "の反動ダメージ")
    .replace(/ crash damage$/, "の自爆ダメージ")
    .replace(/ struggle damage$/, `の${nameJa("Struggle")}ダメージ`)
}

export function buildDescriptionJa(description: RawDesc, omitDefenderItem = false) {
  return buildAttackerDescriptionJa(description) + "vs. " + buildDefenderBulkJa(description) + buildDefenderTailJa(description, omitDefenderItem)
}

export function buildAttackerDescriptionJa(description: RawDesc) {
  const parts: string[] = []

  if (description.attackBoost) parts.push(`${description.attackBoost > 0 ? "+" : ""}${description.attackBoost}`)
  if (description.attackEVs) parts.push(localizeStatsJa(description.attackEVs))
  if (description.attackerItem) parts.push(nameJa(description.attackerItem))
  if (description.attackerAbility) parts.push(nameJa(description.attackerAbility))
  if (description.attackerTera) parts.push(`${typeJa(description.attackerTera)}テラスタル`)

  parts.push(localizedName("pokemon", description.attackerName, "ja"))

  if (description.isBurned) parts.push("(やけど)")
  if (description.rivalry) parts.push(`${nameJa("Rivalry")}${description.rivalry === "buffed" ? "強化" : "弱化"}`)
  if (description.attackerTypes) parts.push(`(${typesJa(description.attackerTypes)})`)
  if (description.isStellarFirstUse) parts.push("(初回)")
  if (description.alliesFainted) parts.push(`味方${Math.min(5, description.alliesFainted)}体ひんし`)
  if (description.isBeadsOfRuin) parts.push(`${nameJa("Beads of Ruin")}あり`)
  if (description.isSwordOfRuin) parts.push(`${nameJa("Sword of Ruin")}あり`)
  if (description.isHelpingHand) parts.push(`${nameJa("Helping Hand")}あり`)
  if (description.isFlowerGiftAttacker) parts.push(`味方の${nameJa("Flower Gift")}あり`)
  if (description.isPowerTrickAttacker) parts.push(`${nameJa("Power Trick")}あり`)
  if (description.isSteelySpiritAttacker) parts.push(`味方の${nameJa("Steely Spirit")}あり`)
  if (description.isBattery) parts.push(`${nameJa("Battery")}あり`)
  if (description.isPowerSpot) parts.push(`${nameJa("Power Spot")}あり`)
  if (description.isFairyAura) parts.push(`${nameJa("Fairy Aura")}あり`)
  if (description.isSwitching) parts.push("交代時")

  parts.push("の", nameJa(description.moveName))

  if (description.moveBP && description.moveType) {
    parts.push(`(威力${description.moveBP} ${typeJa(description.moveType)})`)
  } else if (description.moveBP) {
    parts.push(`(威力${description.moveBP})`)
  } else if (description.moveType) {
    parts.push(`(${typeJa(description.moveType)})`)
  }

  if (description.hits) parts.push(`(${description.hits}回)`)
  if (description.moveTurns) parts.push(moveTurnsJa(description.moveTurns))

  return parts.join(" ") + " "
}

function moveTurnsJa(moveTurns: string): string {
  return moveTurns.replace(/^over (\d+) turns/, "($1ターン)").replace(" (stat changes considered)", " (能力変化込み)")
}

export function buildDefenderBulkJa(description: RawDesc) {
  let output = ""

  if (description.defenseBoost) {
    output += `${description.defenseBoost > 0 ? "+" : ""}${description.defenseBoost} `
  }

  if (description.hpEVs) output += `${localizeStatsJa(description.hpEVs)} `
  if (description.defenseEVs) output += `/ ${localizeStatsJa(description.defenseEVs)} `

  return output
}

export function buildDefenderTailJa(description: RawDesc, omitDefenderItem = false) {
  const parts: string[] = []

  if (!omitDefenderItem && description.defenderItem) parts.push(nameJa(description.defenderItem))
  if (description.defenderAbility) parts.push(nameJa(description.defenderAbility))
  if (description.defenderTera) parts.push(`${typeJa(description.defenderTera)}テラスタル`)

  parts.push(localizedName("pokemon", description.defenderName, "ja"))

  if (description.isProtected) parts.push(`(${nameJa("Protect")})`)
  if (description.defenderTypes) parts.push(`(${typesJa(description.defenderTypes)})`)
  if (description.isTabletsOfRuin) parts.push(`${nameJa("Tablets of Ruin")}あり`)
  if (description.isVesselOfRuin) parts.push(`${nameJa("Vessel of Ruin")}あり`)

  const conditions = [description.weather ? WEATHER_JA[description.weather] : "", description.terrain ? nameJa(TERRAIN_MOVES[description.terrain]) : ""].filter(Boolean)

  if (conditions.length) parts.push(`${conditions.join("・")}下`)

  const screens = [description.isReflect ? nameJa("Reflect") : "", description.isLightScreen ? nameJa("Light Screen") : ""].filter(Boolean)

  if (screens.length) parts.push(`${screens.join("・")}あり`)

  if (description.isFlowerGiftDefender) parts.push(`味方の${nameJa("Flower Gift")}あり`)
  if (description.isPowerTrickDefender) parts.push(`${nameJa("Power Trick")}あり`)
  if (description.isFriendGuard) parts.push(`味方の${nameJa("Friend Guard")}あり`)
  if (description.isAuroraVeil) parts.push(`${nameJa("Aurora Veil")}あり`)
  if (description.isCritical) parts.push("急所")
  if (description.isWonderRoom) parts.push(`${nameJa("Wonder Room")}下`)

  return parts.join(" ")
}

function afterJa(texts: string[]): string {
  return `${KO_PHRASES_JA.afterSeparator}${serializeTextJa(texts.map(translateEndOfTurnTextJa))}込み)`
}

function koJa(prefix: string, ko: string): string {
  return ko.endsWith("ターン") ? `${ko}で${prefix}` : `${prefix}${ko === "OHKO" ? "1発" : ko}`
}

export const KO_PHRASES_JA: KoPhrases = {
  koTurn: (n, multipleTurns) => (multipleTurns ? `${n}ターン` : `${n}発`),
  qualifier: qualifier => (qualifier ? "約" : ""),
  afterSeparator: " (",
  after: afterJa,
  afterEndOfTurn: afterJa,
  possible: ko => koJa("乱数", ko),
  guaranteed: ko => koJa("確定", ko),
  chance: (percentage, ko) => `${koJa("乱数", ko)}(${percentage}%)`,
  notAKo: "倒せない",
  tenOrMore: "10発以上"
}

export const DESCRIPTION_JA: DescriptionLanguage = {
  ko: KO_PHRASES_JA,
  description: buildDescriptionJa,
  attacker: buildAttackerDescriptionJa,
  defenderTail: buildDefenderTailJa,
  name: nameJa,
  stats: localizeStatsJa,
  residual: translateResidualTextJa,
  reducedBy: item => ` (${nameJa(item)}で軽減)`,
  staminaConsidered: () => ` (${nameJa("Stamina")}込み)`,
  statChangesConsidered: " (能力変化込み)",
  overTurns: turns => ` (${turns}ターン)`,
  and: "＆",
  worstMoveEver: "史上最悪の技かもしれない"
}
