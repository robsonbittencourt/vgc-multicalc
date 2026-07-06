import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { StatIDExceptHP } from "@data/types"

const MAX_BOOST = 6
const MIN_BOOST = -6

const OGERPON_ABILITIES: Record<string, { active: string; inactive: string }> = {
  "Ogerpon-Wellspring": { active: "Embody Aspect (Wellspring)", inactive: "Water Absorb" },
  "Ogerpon-Hearthflame": { active: "Embody Aspect (Hearthflame)", inactive: "Mold Breaker" },
  "Ogerpon-Cornerstone": { active: "Embody Aspect (Cornerstone)", inactive: "Sturdy" },
  Ogerpon: { active: "Embody Aspect (Teal)", inactive: "Defiant" }
}

const OGERPON_BOOSTED_STAT: Record<string, StatIDExceptHP> = {
  "Ogerpon-Wellspring": "spd",
  "Ogerpon-Hearthflame": "atk",
  "Ogerpon-Cornerstone": "def"
}

export function terastalize(pokemon: Pokemon): Pokemon {
  if (pokemon.name === "Terapagos") {
    return pokemon
  }

  if (pokemon.name === "Terapagos-Stellar") {
    return pokemon.clone({ name: "Terapagos-Terastal", ability: new Ability("Tera Shell"), teraTypeActive: false })
  }

  if (pokemon.name === "Terapagos-Terastal") {
    return pokemon.clone({ name: "Terapagos-Stellar", ability: new Ability("Teraform Zero"), teraTypeActive: true })
  }

  if (pokemon.isOgerpon) {
    return terastalizeOgerpon(pokemon)
  }

  return pokemon.clone({ teraTypeActive: !pokemon.teraTypeActive })
}

function terastalizeOgerpon(pokemon: Pokemon): Pokemon {
  const teraTypeActive = !pokemon.teraTypeActive
  const ability = new Ability(ogerponAbility(pokemon.name, teraTypeActive))
  const { boosts, bonusBoosts } = ogerponBoost(pokemon, teraTypeActive)

  return pokemon.clone({ teraTypeActive, ability, boosts, bonusBoosts })
}

function ogerponAbility(name: string, teraTypeActive: boolean): string {
  const { active, inactive } = OGERPON_ABILITIES[name]

  return teraTypeActive ? active : inactive
}

function ogerponBoost(pokemon: Pokemon, teraTypeActive: boolean): { boosts: Partial<Stats>; bonusBoosts: Partial<Stats> } {
  const stat = ogerponBoostedStat(pokemon.name)
  const currentBoost = pokemon.boosts[stat] ?? 0
  const hasBonusBoost = (pokemon.bonusBoosts[stat] ?? 0) != 0

  if (teraTypeActive && currentBoost <= MAX_BOOST - 1) {
    return { boosts: { ...pokemon.boosts, [stat]: currentBoost + 1 }, bonusBoosts: { ...pokemon.bonusBoosts, [stat]: 1 } }
  }

  if (!teraTypeActive && currentBoost >= MIN_BOOST + 1 && hasBonusBoost) {
    return { boosts: { ...pokemon.boosts, [stat]: currentBoost - 1 }, bonusBoosts: { ...pokemon.bonusBoosts, [stat]: -1 } }
  }

  return { boosts: { ...pokemon.boosts }, bonusBoosts: { ...pokemon.bonusBoosts } }
}

function ogerponBoostedStat(name: string): StatIDExceptHP {
  return OGERPON_BOOSTED_STAT[name] ?? "spe"
}
