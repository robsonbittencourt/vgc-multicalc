import { Items } from "@data/items"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { PokemonParameters } from "@lib/types"
import { Generations, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { AbilityName, StatusName } from "@robsonbittencourt/calc/dist/data/interface"
import { TypeName } from "@robsonbittencourt/calc/src/data/interface"
import { higherStat } from "./commom"

export function fromExisting(pokemon: Pokemon): SmogonPokemon {
  return fromScratch(pokemon.name, {
    nature: pokemon.nature,
    item: pokemon.item,
    ability: pokemon.ability,
    teraType: pokemon.teraType,
    teraTypeActive: pokemon.teraTypeActive,
    evs: pokemon.evs,
    ivs: pokemon.ivs,
    boosts: pokemon.boosts,
    status: pokemon.status,
    hpPercentage: pokemon.hpPercentage
  })
}

export function fromScratch(pokemonName: string, options: PokemonParameters): SmogonPokemon {
  const adjustedName = pokemonName == SELECT_POKEMON_LABEL ? "Togepi" : pokemonName

  const smogonPokemon = new SmogonPokemon(Generations.get(9), adjustedName, {
    nature: options.nature ?? "Hardy",
    item: options.item && options.item !== "(none)" ? options.item : undefined,
    teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
    evs: options.evs,
    ivs: options.ivs,
    boosts: options.boosts,
    level: 50,
  })

  smogonPokemon.status = (options.status?.code as StatusName) ?? ""

  if (options.ability) {
    smogonPokemon.ability = new Ability(options.ability.name).name as AbilityName
    smogonPokemon.abilityOn = options.ability.on
    applyStatBoost(smogonPokemon, options.ability)
  }

  const hpPercentage = options.hpPercentage ?? 100
  smogonPokemon.originalCurHP = Math.round((smogonPokemon.maxHP() * hpPercentage) / 100)

  return smogonPokemon
}

function applyStatBoost(smogonPokemon: SmogonPokemon, ability: Ability) {
  if (ability.paradoxAbility && smogonPokemon.abilityOn) {
    smogonPokemon.boostedStat = higherStat(smogonPokemon)
  } else {
    smogonPokemon.boostedStat = undefined
  }
}
