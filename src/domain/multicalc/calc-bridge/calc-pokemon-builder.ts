import { Ability } from "@multicalc/model/ability"
import { PokemonParameters } from "@multicalc/model/pokemon-parameters"
import { Pokemon as CalcPokemon } from "@calc"
import { AbilityName, ItemName, NatureName, StatIDExceptHP, StatusName, TypeName } from "@data/types"
import { higherStat } from "@multicalc/stat-calc"

export type CalcPokemonSource = PokemonParameters & { name: string }

const DEFAULT_TERA_TYPE = "Water"
const SELECT_POKEMON_LABEL = "Select a Pokémon"

export function fromExisting(pokemon: CalcPokemonSource, forceMaxIvs = false): CalcPokemon {
  const MAX_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }

  return fromScratch(pokemon.name, {
    nature: pokemon.nature,
    item: pokemon.item,
    ability: pokemon.ability,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    sps: pokemon.sps,
    ivs: forceMaxIvs ? MAX_IVS : pokemon.ivs,
    boosts: pokemon.boosts,
    status: pokemon.status,
    toxicCounter: pokemon.toxicCounter,
    hpPercentage: pokemon.hpPercentage,
    higherStat: pokemon.higherStat,
    overrideTypes: pokemon.overrideTypes,
    staminaOff: pokemon.staminaOff
  })
}

export function fromScratch(pokemonName: string, options: PokemonParameters): CalcPokemon {
  const adjustedName = pokemonName == SELECT_POKEMON_LABEL ? "Togepi" : pokemonName

  const calcPokemon = new CalcPokemon(adjustedName, {
    nature: (options.nature ?? "Hardy") as NatureName,
    item: options.item && options.item !== "(none)" ? (options.item as ItemName) : undefined,
    teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
    sps: options.sps,
    boosts: options.boosts,
    overrides: options.overrideTypes ? { types: options.overrideTypes } : undefined
  })

  calcPokemon.status = (options.status?.code as StatusName) ?? ""

  if (calcPokemon.status === "tox") {
    calcPokemon.toxicCounter = options.toxicCounter ?? 1
  }

  if (options.ability) {
    calcPokemon.ability = new Ability(options.ability.name).name as AbilityName
    calcPokemon.abilityOn = options.ability.on
    applyStatBoost(calcPokemon, options.ability, options.higherStat)
  }

  if (calcPokemon.hasAbility("Stamina")) {
    calcPokemon.abilityOn = !options.staminaOff
  }

  const hpPercentage = options.hpPercentage ?? 100
  calcPokemon.originalCurrentHp = Math.round((calcPokemon.maxHp() * hpPercentage) / 100)

  return calcPokemon
}

function applyStatBoost(calcPokemon: CalcPokemon, ability: Ability, customHigherStat?: StatIDExceptHP) {
  if (ability.paradoxAbility && calcPokemon.abilityOn) {
    calcPokemon.boostedStat = customHigherStat ?? higherStat(calcPokemon)
  } else {
    calcPokemon.boostedStat = undefined
  }
}
