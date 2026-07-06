import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonParameters } from "@multicalc/model/pokemon"
import { Pokemon as CalcPokemon } from "@calc"
import { AbilityName, ItemName, NatureName, StatIDExceptHP, StatusName, TypeName } from "@data/types"
import { higherStat } from "@multicalc/stat-calc"
import { normalizePokemonNameForCalc } from "./pokemon-name-normalizer"

const DEFAULT_TERA_TYPE = "Water"
const SELECT_POKEMON_LABEL = "Select a Pokémon"

export function fromExisting(pokemon: Pokemon, forceMaxIvs = false): CalcPokemon {
  const MAX_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }

  return fromScratch(pokemon.name, {
    nature: pokemon.nature,
    item: pokemon.item,
    ability: pokemon.ability,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    evs: pokemon.evs,
    ivs: forceMaxIvs ? MAX_IVS : pokemon.ivs,
    boosts: pokemon.boosts,
    status: pokemon.status,
    hpPercentage: pokemon.hpPercentage,
    higherStat: pokemon.higherStat
  })
}

export function fromScratch(pokemonName: string, options: PokemonParameters): CalcPokemon {
  let adjustedName = pokemonName == SELECT_POKEMON_LABEL ? "Togepi" : pokemonName
  adjustedName = normalizePokemonNameForCalc(adjustedName)

  const calcPokemon = new CalcPokemon(adjustedName, {
    nature: (options.nature ?? "Hardy") as NatureName,
    item: options.item && options.item !== "(none)" ? (options.item as ItemName) : undefined,
    teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
    evs: options.evs,
    boosts: options.boosts
  })

  calcPokemon.status = (options.status?.code as StatusName) ?? ""

  if (options.ability) {
    calcPokemon.ability = new Ability(options.ability.name).name as AbilityName
    calcPokemon.abilityOn = options.ability.on
    applyStatBoost(calcPokemon, options.ability, options.higherStat)
  }

  const hpPercentage = options.hpPercentage ?? 100
  calcPokemon.originalCurrrentHp = Math.round((calcPokemon.maxHp() * hpPercentage) / 100)

  return calcPokemon
}

function applyStatBoost(calcPokemon: CalcPokemon, ability: Ability, customHigherStat?: StatIDExceptHP) {
  if (ability.paradoxAbility && calcPokemon.abilityOn) {
    calcPokemon.boostedStat = customHigherStat ?? higherStat(calcPokemon)
  } else {
    calcPokemon.boostedStat = undefined
  }
}
