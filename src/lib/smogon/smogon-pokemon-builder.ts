import { Injectable } from "@angular/core"
import { AllPokemon } from "@data/all-pokemon"
import { Items } from "@data/items"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL, STATUS_CONDITIONS } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { PokemonParameters } from "@lib/types"
import { Generations, Pokemon as PokemonSmogon } from "@robsonbittencourt/calc"
import { StatusName, TypeName } from "@robsonbittencourt/calc/src/data/interface"

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
      abilityOn: pokemon.abilityOn,
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

    const pokemonSmogon = new PokemonSmogon(Generations.get(9), adjustedName, {
      nature: options.nature ?? "Hardy",
      item: options.item != Items.instance.withoutItem() ? options.item : undefined,
      ability: options.ability ?? AllPokemon.instance.abilitiesByName(adjustedName)[0],
      abilityOn: options.abilityOn ?? false,
      teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
      evs: options.evs,
      ivs: options.ivs,
      boosts: options.boosts,
      status: this.statusCodeByDescription(options.status ?? "Healthy"),
      level: 50
    })

    const hpPercentage = options.hpPercentage ?? 100
    pokemonSmogon.originalCurHP = Math.round((pokemonSmogon.maxHP() * hpPercentage) / 100)

    this.applyStatBoost(pokemonSmogon)

    return pokemonSmogon
  }

  private statusCodeByDescription(description: string): StatusName {
    return STATUS_CONDITIONS.find(s => s.description === description)!.code as StatusName
  }

  private applyStatBoost(pokemonSmogon: PokemonSmogon) {
    const isParadoxAbility = this.isSmogonParadoxAbility(pokemonSmogon)

    if (isParadoxAbility && pokemonSmogon.abilityOn) {
      pokemonSmogon.boostedStat = this.smogonFunctions.higherStat(pokemonSmogon)
    } else {
      pokemonSmogon.boostedStat = undefined
    }
  }

  private isSmogonParadoxAbility(pokemonSmogon: PokemonSmogon): boolean {
    return pokemonSmogon.ability == "Protosynthesis" || pokemonSmogon.ability == "Quark Drive"
  }
}
