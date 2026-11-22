import { Language, localizedName, NameKind } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DescriptionLanguage } from "@calc/engine/description-language"

const NAME_KINDS: NameKind[] = ["items", "abilities", "moves", "pokemon", "types"]

const TERRAIN_MOVES: Record<string, string> = { Electric: "Electric Terrain", Grassy: "Grassy Terrain", Psychic: "Psychic Terrain", Misty: "Misty Terrain" }

export type DescriptionWords = {
  stats: Record<string, string>
  weather: Record<string, string>
  endOfTurn: Record<string, string>
  toxicTurn: (turn: string) => string
  spikes: (layers: string, spikes: string) => string
  recovery: (name: string) => string
  damage: (name: string) => string
  and: string
  recovered: string
  lost: string
  recoil: string
  crash: string
  struggle: (name: string) => string
  burned: string
  rivalry: (buffed: boolean, name: string) => string
  firstUse: string
  alliesFainted: (count: number) => string
  with: (name: string) => string
  allyWith: (name: string) => string
  boostedBy: (name: string) => string
  switching: string
  tera: (type: string) => string
  power: string
  hits: (count: number) => string
  overTurns: (turns: string) => string
  statChanges: string
  protected: string
  inWeather: (weather: string) => string
  onTerrain: (terrain: string) => string
  through: (screens: string) => string
  critical: string
  inRoom: (name: string) => string
  reducedBy: (item: string) => string
  considering: (name: string) => string
  attackersAnd: string
  worstMoveEver: string
  ko: Omit<KoPhrases, "after" | "afterEndOfTurn">
}

export function createLatinDescription(language: Language, words: DescriptionWords) {
  const statPattern = new RegExp(`\\b(${Object.keys(words.stats).join("|")})\\b`, "g")

  function localizeStats(text: string): string {
    return text.replace(statPattern, stat => words.stats[stat])
  }

  function nameOf(name: string): string {
    for (const kind of NAME_KINDS) {
      const localized = localizedName(kind, name, language)

      if (localized !== name) return localized
    }

    return name
  }

  function typeOf(type: string): string {
    return localizedName("types", type, language)
  }

  function typesOf(types: string): string {
    return types.split("/").map(typeOf).join("/")
  }

  function translateEndOfTurnText(text: string): string {
    if (words.endOfTurn[text]) return words.endOfTurn[text]

    const toxicTurn = text.match(/^toxic damage \(turn (\d+)\)$/)

    if (toxicTurn) return words.toxicTurn(toxicTurn[1])

    const spikes = text.match(/^(\d+) layers? of Spikes$/)

    if (spikes) return words.spikes(spikes[1], nameOf("Spikes"))

    const recovery = text.match(/^(.+) recovery$/)

    if (recovery) return words.recovery(nameOf(recovery[1]))

    const damage = text.match(/^(.+) damage$/)

    if (damage) return words.damage(nameOf(damage[1]))

    return nameOf(text)
  }

  function serializeText(texts: string[]): string {
    if (texts.length <= 1) return texts.join("")

    return `${texts.slice(0, -1).join(", ")}${words.and}${texts[texts.length - 1]}`
  }

  function translateResidualText(text: string): string {
    return text
      .replace(/ recovered$/, words.recovered)
      .replace(/ lost$/, words.lost)
      .replace(/ recoil damage$/, words.recoil)
      .replace(/ crash damage$/, words.crash)
      .replace(/ struggle damage$/, words.struggle(nameOf("Struggle")))
  }

  function buildDescription(description: RawDesc, omitDefenderItem = false) {
    return buildAttackerDescription(description) + "vs. " + buildDefenderBulk(description) + buildDefenderTail(description, omitDefenderItem)
  }

  function buildAttackerDescription(description: RawDesc) {
    const parts: string[] = []

    if (description.attackBoost) parts.push(`${description.attackBoost > 0 ? "+" : ""}${description.attackBoost}`)
    if (description.attackEVs) parts.push(localizeStats(description.attackEVs))
    if (description.attackerItem) parts.push(nameOf(description.attackerItem))
    if (description.attackerAbility) parts.push(nameOf(description.attackerAbility))
    if (description.attackerTera) parts.push(words.tera(typeOf(description.attackerTera)))

    parts.push(localizedName("pokemon", description.attackerName, language))

    if (description.isBurned) parts.push(words.burned)
    if (description.rivalry) parts.push(words.rivalry(description.rivalry === "buffed", nameOf("Rivalry")))
    if (description.attackerTypes) parts.push(`(${typesOf(description.attackerTypes)})`)
    if (description.isStellarFirstUse) parts.push(words.firstUse)
    if (description.alliesFainted) parts.push(words.alliesFainted(Math.min(5, description.alliesFainted)))
    if (description.isBeadsOfRuin) parts.push(words.with(nameOf("Beads of Ruin")))
    if (description.isSwordOfRuin) parts.push(words.with(nameOf("Sword of Ruin")))
    if (description.isHelpingHand) parts.push(words.with(nameOf("Helping Hand")))
    if (description.isFlowerGiftAttacker) parts.push(words.allyWith(nameOf("Flower Gift")))
    if (description.isPowerTrickAttacker) parts.push(words.with(nameOf("Power Trick")))
    if (description.isSteelySpiritAttacker) parts.push(words.allyWith(nameOf("Steely Spirit")))
    if (description.isBattery) parts.push(words.boostedBy(nameOf("Battery")))
    if (description.isPowerSpot) parts.push(words.boostedBy(nameOf("Power Spot")))
    if (description.isFairyAura) parts.push(words.with(nameOf("Fairy Aura")))
    if (description.isSwitching) parts.push(words.switching)

    parts.push(nameOf(description.moveName))

    if (description.moveBP && description.moveType) {
      parts.push(`(${description.moveBP} ${words.power} ${typeOf(description.moveType)})`)
    } else if (description.moveBP) {
      parts.push(`(${description.moveBP} ${words.power})`)
    } else if (description.moveType) {
      parts.push(`(${typeOf(description.moveType)})`)
    }

    if (description.hits) parts.push(`(${words.hits(description.hits)})`)
    if (description.moveTurns) parts.push(moveTurns(description.moveTurns))

    return parts.join(" ") + " "
  }

  function moveTurns(text: string): string {
    return text.replace(/^over (\d+) turns/, (_, turns) => words.overTurns(turns)).replace(" (stat changes considered)", words.statChanges)
  }

  function buildDefenderBulk(description: RawDesc) {
    let output = ""

    if (description.defenseBoost) {
      output += `${description.defenseBoost > 0 ? "+" : ""}${description.defenseBoost} `
    }

    if (description.hpEVs) output += `${localizeStats(description.hpEVs)} `
    if (description.defenseEVs) output += `/ ${localizeStats(description.defenseEVs)} `

    return output
  }

  function buildDefenderTail(description: RawDesc, omitDefenderItem = false) {
    const parts: string[] = []

    if (!omitDefenderItem && description.defenderItem) parts.push(nameOf(description.defenderItem))
    if (description.defenderAbility) parts.push(nameOf(description.defenderAbility))
    if (description.defenderTera) parts.push(words.tera(typeOf(description.defenderTera)))

    parts.push(localizedName("pokemon", description.defenderName, language))

    if (description.isProtected) parts.push(words.protected)
    if (description.defenderTypes) parts.push(`(${typesOf(description.defenderTypes)})`)
    if (description.isTabletsOfRuin) parts.push(words.with(nameOf("Tablets of Ruin")))
    if (description.isVesselOfRuin) parts.push(words.with(nameOf("Vessel of Ruin")))

    const weather = description.weather ? words.inWeather(words.weather[description.weather]) : ""
    const terrain = description.terrain ? words.onTerrain(nameOf(TERRAIN_MOVES[description.terrain])) : ""

    if (weather && terrain) {
      parts.push(`${weather}${words.and}${terrain}`)
    } else if (weather || terrain) {
      parts.push(weather || terrain)
    }

    const screens = [description.isReflect ? nameOf("Reflect") : "", description.isLightScreen ? nameOf("Light Screen") : ""].filter(Boolean)

    if (screens.length) parts.push(words.through(screens.join(words.and)))

    if (description.isFlowerGiftDefender) parts.push(words.allyWith(nameOf("Flower Gift")))
    if (description.isPowerTrickDefender) parts.push(words.with(nameOf("Power Trick")))
    if (description.isFriendGuard) parts.push(words.allyWith(nameOf("Friend Guard")))
    if (description.isAuroraVeil) parts.push(words.allyWith(nameOf("Aurora Veil")))
    if (description.isCritical) parts.push(words.critical)
    if (description.isWonderRoom) parts.push(words.inRoom(nameOf("Wonder Room")))

    return parts.join(" ")
  }

  const koPhrases: KoPhrases = {
    ...words.ko,
    after: texts => koPhrases.afterSeparator + serializeText(texts.map(translateEndOfTurnText)),
    afterEndOfTurn: texts => koPhrases.afterSeparator + serializeText(texts.map(translateEndOfTurnText))
  }

  const description: DescriptionLanguage = {
    ko: koPhrases,
    description: buildDescription,
    attacker: buildAttackerDescription,
    defenderTail: buildDefenderTail,
    name: nameOf,
    stats: localizeStats,
    residual: translateResidualText,
    reducedBy: item => words.reducedBy(nameOf(item)),
    staminaConsidered: () => words.considering(nameOf("Stamina")),
    statChangesConsidered: words.statChanges,
    overTurns: turns => ` ${words.overTurns(String(turns))}`,
    and: words.attackersAnd,
    worstMoveEver: words.worstMoveEver
  }

  return {
    description,
    helpers: { localizeStats, nameOf, typesOf, translateEndOfTurnText, serializeText, translateResidualText, buildDescription, buildAttackerDescription, buildDefenderBulk, buildDefenderTail }
  }
}
