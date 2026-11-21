import { localizedName, NameKind } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DescriptionLanguage } from "@calc/engine/description-language"

const STATS_ES: Record<string, string> = { HP: "PS", Atk: "Atq", Def: "Def", SpA: "AtEsp", SpD: "DefEsp", Spe: "Vel" }

const NAME_KINDS: NameKind[] = ["items", "abilities", "moves", "pokemon", "types"]

const TERRAIN_MOVES: Record<string, string> = { Electric: "Electric Terrain", Grassy: "Grassy Terrain", Psychic: "Psychic Terrain", Misty: "Misty Terrain" }

const WEATHER_ES: Record<string, string> = {
  Sun: "Sol",
  Rain: "Lluvia",
  Sand: "Tormenta de Arena",
  Snow: "Nieve",
  "Harsh Sunshine": "Sol Abrasador",
  "Heavy Rain": "Diluvio",
  "Strong Winds": "Turbulencias"
}

const END_OF_TURN_ES: Record<string, string> = {
  "sandstorm damage": "daño de Tormenta de Arena",
  "poison damage": "daño por veneno",
  "toxic damage": "daño por veneno grave",
  "burn damage": "daño por quemadura",
  "reduced burn damage": "daño por quemadura reducido",
  "trapping damage": "daño por atrapamiento",
  "Sea of Fire damage": "daño del mar de llamas"
}

export function localizeStats(text: string): string {
  return text.replace(/\b(HP|Atk|Def|SpA|SpD|Spe)\b/g, stat => STATS_ES[stat])
}

export function nameEs(name: string): string {
  for (const kind of NAME_KINDS) {
    const localized = localizedName(kind, name, "es")

    if (localized !== name) return localized
  }

  return name
}

export function typesEs(types: string): string {
  return types
    .split("/")
    .map(type => localizedName("types", type, "es"))
    .join("/")
}

export function translateEndOfTurnTextEs(text: string): string {
  if (END_OF_TURN_ES[text]) return END_OF_TURN_ES[text]

  const toxicTurn = text.match(/^toxic damage \(turn (\d+)\)$/)

  if (toxicTurn) return `daño por veneno grave (turno ${toxicTurn[1]})`

  const spikes = text.match(/^(\d+) layers? of Spikes$/)

  if (spikes) return `${spikes[1]} ${spikes[1] === "1" ? "capa" : "capas"} de ${nameEs("Spikes")}`

  const recovery = text.match(/^(.+) recovery$/)

  if (recovery) return `recuperación de ${nameEs(recovery[1])}`

  const damage = text.match(/^(.+) damage$/)

  if (damage) return `daño de ${nameEs(damage[1])}`

  return nameEs(text)
}

export function serializeTextEs(texts: string[]): string {
  if (texts.length <= 1) return texts.join("")

  return `${texts.slice(0, -1).join(", ")} y ${texts[texts.length - 1]}`
}

export function translateResidualTextEs(text: string): string {
  return text
    .replace(/ recovered$/, " recuperado")
    .replace(/ lost$/, " perdido")
    .replace(/ recoil damage$/, " de daño de retroceso")
    .replace(/ crash damage$/, " de daño por choque")
    .replace(/ struggle damage$/, " de daño de Forcejeo")
}

export function buildDescriptionEs(description: RawDesc, omitDefenderItem = false) {
  return buildAttackerDescriptionEs(description) + "vs. " + buildDefenderBulkEs(description) + buildDefenderTailEs(description, omitDefenderItem)
}

export function buildAttackerDescriptionEs(description: RawDesc) {
  const parts: string[] = []

  if (description.attackBoost) parts.push(`${description.attackBoost > 0 ? "+" : ""}${description.attackBoost}`)
  if (description.attackEVs) parts.push(localizeStats(description.attackEVs))
  if (description.attackerItem) parts.push(nameEs(description.attackerItem))
  if (description.attackerAbility) parts.push(nameEs(description.attackerAbility))
  if (description.attackerTera) parts.push(`Tera ${localizedName("types", description.attackerTera, "es")}`)

  parts.push(localizedName("pokemon", description.attackerName, "es"))

  if (description.isBurned) parts.push("quemado")
  if (description.rivalry) parts.push(description.rivalry === "buffed" ? "potenciado por Rivalidad" : "debilitado por Rivalidad")
  if (description.attackerTypes) parts.push(`(${typesEs(description.attackerTypes)})`)
  if (description.isStellarFirstUse) parts.push("(Primer Uso)")

  if (description.alliesFainted) {
    const fainted = Math.min(5, description.alliesFainted)

    parts.push(`con ${fainted} ${description.alliesFainted === 1 ? "aliado debilitado" : "aliados debilitados"}`)
  }

  if (description.isBeadsOfRuin) parts.push(`con ${nameEs("Beads of Ruin")}`)
  if (description.isSwordOfRuin) parts.push(`con ${nameEs("Sword of Ruin")}`)
  if (description.isHelpingHand) parts.push(`con ${nameEs("Helping Hand")}`)
  if (description.isFlowerGiftAttacker) parts.push(`con ${nameEs("Flower Gift")} del aliado`)
  if (description.isPowerTrickAttacker) parts.push(`con ${nameEs("Power Trick")}`)
  if (description.isSteelySpiritAttacker) parts.push(`con ${nameEs("Steely Spirit")} del aliado`)
  if (description.isBattery) parts.push(`potenciado por ${nameEs("Battery")}`)
  if (description.isPowerSpot) parts.push(`potenciado por ${nameEs("Power Spot")}`)
  if (description.isFairyAura) parts.push(`con ${nameEs("Fairy Aura")}`)
  if (description.isSwitching) parts.push("potenciado por el cambio")

  parts.push(nameEs(description.moveName))

  if (description.moveBP && description.moveType) {
    parts.push(`(${description.moveBP} Pot ${localizedName("types", description.moveType, "es")})`)
  } else if (description.moveBP) {
    parts.push(`(${description.moveBP} Pot)`)
  } else if (description.moveType) {
    parts.push(`(${localizedName("types", description.moveType, "es")})`)
  }

  if (description.hits) parts.push(`(${description.hits} golpes)`)
  if (description.moveTurns) parts.push(moveTurnsEs(description.moveTurns))

  return parts.join(" ") + " "
}

function moveTurnsEs(moveTurns: string): string {
  return moveTurns.replace(/^over (\d+) turns/, "en $1 turnos").replace(" (stat changes considered)", " (considerando cambios de características)")
}

export function buildDefenderBulkEs(description: RawDesc) {
  let output = ""

  if (description.defenseBoost) {
    output += `${description.defenseBoost > 0 ? "+" : ""}${description.defenseBoost} `
  }

  if (description.hpEVs) output += `${localizeStats(description.hpEVs)} `
  if (description.defenseEVs) output += `/ ${localizeStats(description.defenseEVs)} `

  return output
}

export function buildDefenderTailEs(description: RawDesc, omitDefenderItem = false) {
  const parts: string[] = []

  if (!omitDefenderItem && description.defenderItem) parts.push(nameEs(description.defenderItem))
  if (description.defenderAbility) parts.push(nameEs(description.defenderAbility))
  if (description.defenderTera) parts.push(`Tera ${localizedName("types", description.defenderTera, "es")}`)

  parts.push(localizedName("pokemon", description.defenderName, "es"))

  if (description.isProtected) parts.push("protegido")
  if (description.defenderTypes) parts.push(`(${typesEs(description.defenderTypes)})`)
  if (description.isTabletsOfRuin) parts.push(`con ${nameEs("Tablets of Ruin")}`)
  if (description.isVesselOfRuin) parts.push(`con ${nameEs("Vessel of Ruin")}`)

  const weather = description.weather ? `con ${WEATHER_ES[description.weather]}` : ""
  const terrain = description.terrain ? `en ${nameEs(TERRAIN_MOVES[description.terrain])}` : ""

  if (weather && terrain) {
    parts.push(`${weather} y ${terrain}`)
  } else if (weather || terrain) {
    parts.push(weather || terrain)
  }

  if (description.isReflect && description.isLightScreen) {
    parts.push(`a través de ${nameEs("Reflect")} y ${nameEs("Light Screen")}`)
  } else if (description.isReflect) {
    parts.push(`a través de ${nameEs("Reflect")}`)
  } else if (description.isLightScreen) {
    parts.push(`a través de ${nameEs("Light Screen")}`)
  }

  if (description.isFlowerGiftDefender) parts.push(`con ${nameEs("Flower Gift")} del aliado`)
  if (description.isPowerTrickDefender) parts.push(`con ${nameEs("Power Trick")}`)
  if (description.isFriendGuard) parts.push(`con ${nameEs("Friend Guard")} del aliado`)
  if (description.isAuroraVeil) parts.push(`con ${nameEs("Aurora Veil")} del aliado`)
  if (description.isCritical) parts.push("con golpe crítico")
  if (description.isWonderRoom) parts.push(`en ${nameEs("Wonder Room")}`)

  return parts.join(" ")
}

export const KO_PHRASES_ES: KoPhrases = {
  koTurn: (n, multipleTurns) => (n === 1 ? "OHKO" : multipleTurns ? `KO en ${n} turnos` : `${n}HKO`),
  qualifier: qualifier => (qualifier ? "aprox. " : ""),
  afterSeparator: " tras ",
  after: texts => KO_PHRASES_ES.afterSeparator + serializeTextEs(texts.map(translateEndOfTurnTextEs)),
  afterEndOfTurn: texts => KO_PHRASES_ES.afterSeparator + serializeTextEs(texts.map(translateEndOfTurnTextEs)),
  possible: ko => `${ko} posible`,
  guaranteed: ko => `${ko} garantizado`,
  chance: (percentage, ko) => `${percentage}% de probabilidad de ${ko}`,
  notAKo: "no hace KO",
  tenOrMore: "10HKO o más"
}

export const DESCRIPTION_ES: DescriptionLanguage = {
  ko: KO_PHRASES_ES,
  description: buildDescriptionEs,
  attacker: buildAttackerDescriptionEs,
  defenderTail: buildDefenderTailEs,
  name: nameEs,
  stats: localizeStats,
  residual: translateResidualTextEs,
  reducedBy: item => ` reducido por ${nameEs(item)}`,
  staminaConsidered: () => ` (considerando ${nameEs("Stamina")})`,
  statChangesConsidered: " (considerando cambios de características)",
  overTurns: turns => ` en ${turns} turnos`,
  and: "Y",
  worstMoveEver: "posiblemente el peor movimiento de la historia"
}
