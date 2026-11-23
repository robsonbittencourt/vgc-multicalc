import { Language, localizedName, NameKind } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DescriptionLanguage } from "@calc/engine/description-language"

const STATS_ZH: Record<string, string> = { HP: "H", Atk: "A", Def: "B", SpA: "C", SpD: "D", Spe: "S" }

const NAME_KINDS: NameKind[] = ["items", "abilities", "moves", "pokemon", "types"]

const TERRAIN_MOVES: Record<string, string> = { Electric: "Electric Terrain", Grassy: "Grassy Terrain", Psychic: "Psychic Terrain", Misty: "Misty Terrain" }

export type ChineseWords = {
  weather: Record<string, string>
  endOfTurn: Record<string, string>
  toxicTurn: string
  layers: string
  recovery: string
  damage: string
  recovered: string
  lost: string
  recoil: string
  crash: string
  struggle: string
  tera: string
  burned: string
  buffed: string
  nerfed: string
  firstUse: string
  ally: string
  fainted: string
  active: string
  allyActive: string
  switching: string
  power: string
  hits: string
  turns: string
  statChanges: string
  under: string
  critical: string
  considering: string
  reducedBy: string
  turnKo: string
  hitKo: string
  within: string
  chance: string
  guaranteed: string
  approximately: string
  notAKo: string
  orMore: string
  worstMoveEver: string
}

export function createChineseDescription(language: Language, words: ChineseWords) {
  const localizeStats = (text: string): string => text.replace(/(\d+)([+-]?) (HP|Atk|Def|SpA|SpD|Spe)\b/g, (_, value, sign, stat) => `${STATS_ZH[stat]}${value}${sign}`).replace(/\b(HP|Atk|Def|SpA|SpD|Spe)\b/g, stat => STATS_ZH[stat])

  const nameOf = (name: string): string => {
    for (const kind of NAME_KINDS) {
      const localized = localizedName(kind, name, language)

      if (localized !== name) return localized
    }

    return name
  }

  const typeOf = (type: string): string => localizedName("types", type, language)

  const typesOf = (types: string): string => types.split("/").map(typeOf).join("/")

  const translateEndOfTurnText = (text: string): string => {
    if (words.endOfTurn[text]) return words.endOfTurn[text]

    const toxicTurn = text.match(/^toxic damage \(turn (\d+)\)$/)

    if (toxicTurn) return words.toxicTurn.replace("{n}", toxicTurn[1])

    const spikes = text.match(/^(\d+) layers? of Spikes$/)

    if (spikes) return `${nameOf("Spikes")}${spikes[1]}${words.layers}`

    const recovery = text.match(/^(.+) recovery$/)

    if (recovery) return `${nameOf(recovery[1])}${words.recovery}`

    const damage = text.match(/^(.+) damage$/)

    if (damage) return `${nameOf(damage[1])}${words.damage}`

    return nameOf(text)
  }

  const serializeText = (texts: string[]): string => texts.join("、")

  const translateResidualText = (text: string): string =>
    text
      .replace(/ recovered$/, words.recovered)
      .replace(/ lost$/, words.lost)
      .replace(/ recoil damage$/, words.recoil)
      .replace(/ crash damage$/, words.crash)
      .replace(/ struggle damage$/, words.struggle.replace("{name}", nameOf("Struggle")))

  const active = (name: string) => words.active.replace("{name}", nameOf(name))

  const allyActive = (name: string) => words.allyActive.replace("{name}", nameOf(name))

  const buildAttackerDescription = (description: RawDesc) => {
    const parts: string[] = []

    if (description.attackBoost) parts.push(`${description.attackBoost > 0 ? "+" : ""}${description.attackBoost}`)
    if (description.attackEVs) parts.push(localizeStats(description.attackEVs))
    if (description.attackerItem) parts.push(nameOf(description.attackerItem))
    if (description.attackerAbility) parts.push(nameOf(description.attackerAbility))
    if (description.attackerTera) parts.push(`${typeOf(description.attackerTera)}${words.tera}`)

    parts.push(localizedName("pokemon", description.attackerName, language))

    if (description.isBurned) parts.push(words.burned)
    if (description.rivalry) parts.push(`${nameOf("Rivalry")}${description.rivalry === "buffed" ? words.buffed : words.nerfed}`)
    if (description.attackerTypes) parts.push(`(${typesOf(description.attackerTypes)})`)
    if (description.isStellarFirstUse) parts.push(words.firstUse)
    if (description.alliesFainted) parts.push(`${words.ally}${Math.min(5, description.alliesFainted)}${words.fainted}`)
    if (description.isBeadsOfRuin) parts.push(active("Beads of Ruin"))
    if (description.isSwordOfRuin) parts.push(active("Sword of Ruin"))
    if (description.isHelpingHand) parts.push(active("Helping Hand"))
    if (description.isFlowerGiftAttacker) parts.push(allyActive("Flower Gift"))
    if (description.isPowerTrickAttacker) parts.push(active("Power Trick"))
    if (description.isSteelySpiritAttacker) parts.push(allyActive("Steely Spirit"))
    if (description.isBattery) parts.push(active("Battery"))
    if (description.isPowerSpot) parts.push(active("Power Spot"))
    if (description.isFairyAura) parts.push(active("Fairy Aura"))
    if (description.isSwitching) parts.push(words.switching)

    parts.push(nameOf(description.moveName))

    if (description.moveBP && description.moveType) {
      parts.push(`(${words.power}${description.moveBP} ${typeOf(description.moveType)})`)
    } else if (description.moveBP) {
      parts.push(`(${words.power}${description.moveBP})`)
    } else if (description.moveType) {
      parts.push(`(${typeOf(description.moveType)})`)
    }

    if (description.hits) parts.push(`(${description.hits}${words.hits})`)
    if (description.moveTurns) parts.push(description.moveTurns.replace(/^over (\d+) turns/, `($1${words.turns})`).replace(" (stat changes considered)", words.statChanges))

    return parts.join(" ") + " "
  }

  const buildDefenderBulk = (description: RawDesc) => {
    let output = ""

    if (description.defenseBoost) {
      output += `${description.defenseBoost > 0 ? "+" : ""}${description.defenseBoost} `
    }

    if (description.hpEVs) output += `${localizeStats(description.hpEVs)} `
    if (description.defenseEVs) output += `/ ${localizeStats(description.defenseEVs)} `

    return output
  }

  const buildDefenderTail = (description: RawDesc, omitDefenderItem = false) => {
    const parts: string[] = []

    if (!omitDefenderItem && description.defenderItem) parts.push(nameOf(description.defenderItem))
    if (description.defenderAbility) parts.push(nameOf(description.defenderAbility))
    if (description.defenderTera) parts.push(`${typeOf(description.defenderTera)}${words.tera}`)

    parts.push(localizedName("pokemon", description.defenderName, language))

    if (description.isProtected) parts.push(`(${nameOf("Protect")})`)
    if (description.defenderTypes) parts.push(`(${typesOf(description.defenderTypes)})`)
    if (description.isTabletsOfRuin) parts.push(active("Tablets of Ruin"))
    if (description.isVesselOfRuin) parts.push(active("Vessel of Ruin"))

    const conditions = [description.weather ? words.weather[description.weather] : "", description.terrain ? nameOf(TERRAIN_MOVES[description.terrain]) : ""].filter(Boolean)

    if (conditions.length) parts.push(`${conditions.join("·")}${words.under}`)

    const screens = [description.isReflect ? nameOf("Reflect") : "", description.isLightScreen ? nameOf("Light Screen") : ""].filter(Boolean)

    if (screens.length) parts.push(words.active.replace("{name}", screens.join("·")))

    if (description.isFlowerGiftDefender) parts.push(allyActive("Flower Gift"))
    if (description.isPowerTrickDefender) parts.push(active("Power Trick"))
    if (description.isFriendGuard) parts.push(allyActive("Friend Guard"))
    if (description.isAuroraVeil) parts.push(active("Aurora Veil"))
    if (description.isCritical) parts.push(words.critical)
    if (description.isWonderRoom) parts.push(`${nameOf("Wonder Room")}${words.under}`)

    return parts.join(" ")
  }

  const buildDescription = (description: RawDesc, omitDefenderItem = false) => buildAttackerDescription(description) + "vs. " + buildDefenderBulk(description) + buildDefenderTail(description, omitDefenderItem)

  const after = (texts: string[]): string => ` (${words.considering}${serializeText(texts.map(translateEndOfTurnText))})`

  const koOf = (prefix: string, ko: string): string => (ko.endsWith(words.turnKo) ? `${ko}${words.within}${prefix}` : `${prefix}${ko === "OHKO" ? `1${words.hitKo}` : ko}`)

  const ko: KoPhrases = {
    koTurn: (n, multipleTurns) => `${n}${multipleTurns ? words.turnKo : words.hitKo}`,
    qualifier: qualifier => (qualifier ? words.approximately : ""),
    afterSeparator: " (",
    after,
    afterEndOfTurn: after,
    possible: value => koOf(words.chance, value),
    guaranteed: value => koOf(words.guaranteed, value),
    chance: (percentage, value) => `${koOf(words.chance, value)}(${percentage}%)`,
    notAKo: words.notAKo,
    tenOrMore: `10${words.hitKo}${words.orMore}`
  }

  const description: DescriptionLanguage = {
    ko,
    description: buildDescription,
    attacker: buildAttackerDescription,
    defenderTail: buildDefenderTail,
    name: nameOf,
    stats: localizeStats,
    residual: translateResidualText,
    reducedBy: item => ` (${words.reducedBy.replace("{name}", nameOf(item))})`,
    staminaConsidered: () => ` (${words.considering}${nameOf("Stamina")})`,
    statChangesConsidered: words.statChanges,
    overTurns: turns => ` (${turns}${words.turns})`,
    and: "＆",
    worstMoveEver: words.worstMoveEver
  }

  return { description, helpers: { localizeStats, nameOf, typesOf, translateEndOfTurnText, serializeText, translateResidualText, buildDescription, buildAttackerDescription, buildDefenderBulk, buildDefenderTail } }
}

export const SIMPLIFIED = createChineseDescription("zh-Hans", {
  weather: { Sun: "晴天", Rain: "雨天", Sand: "沙暴", Snow: "雪天", "Harsh Sunshine": "大日照", "Heavy Rain": "大雨", "Strong Winds": "乱流" },
  endOfTurn: {
    "sandstorm damage": "沙暴伤害",
    "poison damage": "中毒伤害",
    "toxic damage": "剧毒伤害",
    "burn damage": "灼伤伤害",
    "reduced burn damage": "减轻的灼伤伤害",
    "trapping damage": "束缚伤害",
    "Sea of Fire damage": "火海伤害"
  },
  toxicTurn: "剧毒伤害第{n}回合",
  layers: "层",
  recovery: "回复",
  damage: "伤害",
  recovered: "回复",
  lost: "减少",
  recoil: "的反作用力伤害",
  crash: "的失败伤害",
  struggle: "的{name}伤害",
  tera: "太晶",
  burned: "(灼伤)",
  buffed: "强化",
  nerfed: "弱化",
  firstUse: "(首次)",
  ally: "同伴",
  fainted: "只濒死",
  active: "{name}生效",
  allyActive: "同伴的{name}生效",
  switching: "替换时",
  power: "威力",
  hits: "次",
  turns: "回合",
  statChanges: " (含能力变化)",
  under: "下",
  critical: "击中要害",
  considering: "含",
  reducedBy: "因{name}减轻",
  turnKo: "回合",
  hitKo: "发",
  within: "内",
  chance: "乱数",
  guaranteed: "确定",
  approximately: "约",
  notAKo: "无法击倒",
  orMore: "以上",
  worstMoveEver: "可能是史上最差的招式"
})

export const TRADITIONAL = createChineseDescription("zh-Hant", {
  weather: { Sun: "晴天", Rain: "雨天", Sand: "沙暴", Snow: "雪天", "Harsh Sunshine": "大日照", "Heavy Rain": "大雨", "Strong Winds": "亂流" },
  endOfTurn: {
    "sandstorm damage": "沙暴傷害",
    "poison damage": "中毒傷害",
    "toxic damage": "劇毒傷害",
    "burn damage": "灼傷傷害",
    "reduced burn damage": "減輕的灼傷傷害",
    "trapping damage": "束縛傷害",
    "Sea of Fire damage": "火海傷害"
  },
  toxicTurn: "劇毒傷害第{n}回合",
  layers: "層",
  recovery: "回復",
  damage: "傷害",
  recovered: "回復",
  lost: "減少",
  recoil: "的反作用力傷害",
  crash: "的失敗傷害",
  struggle: "的{name}傷害",
  tera: "太晶",
  burned: "(灼傷)",
  buffed: "強化",
  nerfed: "弱化",
  firstUse: "(首次)",
  ally: "同伴",
  fainted: "隻瀕死",
  active: "{name}生效",
  allyActive: "同伴的{name}生效",
  switching: "替換時",
  power: "威力",
  hits: "次",
  turns: "回合",
  statChanges: " (含能力變化)",
  under: "下",
  critical: "擊中要害",
  considering: "含",
  reducedBy: "因{name}減輕",
  turnKo: "回合",
  hitKo: "發",
  within: "內",
  chance: "亂數",
  guaranteed: "確定",
  approximately: "約",
  notAKo: "無法擊倒",
  orMore: "以上",
  worstMoveEver: "可能是史上最差的招式"
})

export const DESCRIPTION_ZH_HANS = SIMPLIFIED.description
export const DESCRIPTION_ZH_HANT = TRADITIONAL.description
