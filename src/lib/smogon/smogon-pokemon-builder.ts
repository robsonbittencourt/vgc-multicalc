import { Injectable } from "@angular/core"
import { AllPokemon } from "@data/all-pokemon"
import { Items } from "@data/items"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { PokemonParameters } from "@lib/types"
import { Generations, Pokemon as PokemonSmogon } from "@robsonbittencourt/calc"
import { TypeName } from "@robsonbittencourt/calc/src/data/interface"

@Injectable({
  providedIn: "root"
})
export class SmogonPokemonBuilder {
  private smogonFunctions = new SmogonFunctions()

  fromExisting(pokemon: Pokemon): PokemonSmogon {
    return this.fromScratch(pokemon.name, {
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

  fromScratch(pokemonName: string, options: PokemonParameters): PokemonSmogon {
    const adjustedName = pokemonName == SELECT_POKEMON_LABEL ? "Togepi" : pokemonName
    const ability = options.ability ?? new Ability(AllPokemon.instance.abilitiesByName(adjustedName)[0])

    const pokemonSmogon = new PokemonSmogon(Generations.get(9), adjustedName, {
      nature: options.nature ?? "Hardy",
      item: options.item != Items.instance.withoutItem() ? options.item : undefined,
      ability: ability.name,
      abilityOn: ability.on,
      teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
      evs: options.evs,
      ivs: options.ivs,
      boosts: options.boosts,
      status: Status.getByDescription(options.status ?? "Healthy").code,
      level: 50
    })

    const hpPercentage = options.hpPercentage ?? 100
    pokemonSmogon.originalCurHP = Math.round((pokemonSmogon.maxHP() * hpPercentage) / 100)

    this.applyStatBoost(pokemonSmogon, ability)

    return pokemonSmogon
  }
  private applyStatBoost(pokemonSmogon: PokemonSmogon, ability: Ability) {
    if (ability.paradoxAbility && pokemonSmogon.abilityOn) {
      pokemonSmogon.boostedStat = this.smogonFunctions.higherStat(pokemonSmogon)
    } else {
      pokemonSmogon.boostedStat = undefined
    }
  }
}
