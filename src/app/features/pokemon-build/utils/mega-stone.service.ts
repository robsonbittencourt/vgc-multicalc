import { inject, Injectable } from "@angular/core"
import { ITEM_DETAILS } from "@data/item-details"
import { getBasePokemonNameFromItem } from "@features/pokemon-build/utils/mega-stone-mapping"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

@Injectable({ providedIn: "root" })
export class MegaStoneService {
  private store = inject(CalculatorStore)
  private previousAbilityByPokemonId = new Map<string, string>()

  isMegaStone(item: string): boolean {
    const itemKey = Object.keys(ITEM_DETAILS).find(key => ITEM_DETAILS[key as keyof typeof ITEM_DETAILS].name === item)

    if (!itemKey) return false

    return ITEM_DETAILS[itemKey as keyof typeof ITEM_DETAILS]?.isMegaStone ?? false
  }

  isMegaStoneCompatible(pokemonName: string, item: string): boolean {
    if (!this.isMegaStone(item)) return false

    const itemBaseName = getBasePokemonNameFromItem(item)

    if (!itemBaseName) return false

    const currentBaseName = pokemonName.replace(/-Mega-[A-Z]?$/, "").replace(/-Mega$/, "")
    const baseNameMatches = currentBaseName === itemBaseName || currentBaseName.startsWith(itemBaseName + "-")

    if (!baseNameMatches) return false

    const megaStoneLetter = this.extractMegaStoneLetter(item)

    if (megaStoneLetter) {
      return pokemonName === currentBaseName || pokemonName === `${currentBaseName}-Mega-${megaStoneLetter}`
    }

    return pokemonName === currentBaseName || pokemonName === `${currentBaseName}-Mega`
  }

  hasMegaForm(pokemonName: string, item: string): boolean {
    return this.isMegaStone(item) || pokemonName.includes("-Mega")
  }

  toggleMega(pokemonId: string, currentName: string, currentItem: string) {
    const pokemon = this.store.findPokemonById(pokemonId)

    if (!pokemon) return

    const isMega = currentName.includes("-Mega-") || currentName.endsWith("-Mega")
    const currentAbility = pokemon.ability.name

    if (isMega) {
      const baseName = currentName.replace(/-Mega-[A-Z]$/, "").replace(/-Mega$/, "")
      const previousAbility = this.previousAbilityByPokemonId.get(pokemonId)
      this.previousAbilityByPokemonId.delete(pokemonId)
      this.store.name(pokemonId, baseName)

      if (previousAbility) {
        this.store.ability(pokemonId, previousAbility)
      } else {
        this.restoreAbilityFromMoveset(pokemonId, baseName)
      }
    } else {
      this.previousAbilityByPokemonId.set(pokemonId, currentAbility)
      const megaStoneLetter = this.extractMegaStoneLetter(currentItem)
      const newName = megaStoneLetter ? currentName + "-Mega-" + megaStoneLetter : currentName + "-Mega"

      this.store.name(pokemonId, newName)
      this.setAbilityForMegaForm(pokemonId, newName)
    }
  }

  private setAbilityForMegaForm(pokemonId: string, megaFormName: string) {
    const abilityFromMoveset = this.getAbilityFromMoveset(megaFormName)

    if (abilityFromMoveset) {
      this.store.ability(pokemonId, abilityFromMoveset)
    } else {
      const tempPokemon = new Pokemon(megaFormName)
      const megaAbility = tempPokemon.ability.name
      this.store.ability(pokemonId, megaAbility)
    }
  }

  private restoreAbilityFromMoveset(pokemonId: string, baseName: string) {
    const ability = this.getAbilityFromMoveset(baseName)

    if (ability) {
      this.store.ability(pokemonId, ability)
    }
  }

  private getAbilityFromMoveset(pokemonName: string): string | null {
    const setdex = this.store.activeSetdex()

    for (const dexKey in setdex) {
      if (dexKey === pokemonName) {
        const movesetData = setdex[dexKey as keyof typeof setdex]
        return movesetData.ability ?? null
      }
    }

    const baseName = pokemonName.replace(/-Mega-?[A-Z]?$/, "").replace(/-Mega$/, "")

    for (const dexKey in setdex) {
      if (dexKey === baseName) {
        const movesetData = setdex[dexKey as keyof typeof setdex]
        return movesetData.ability ?? null
      }
    }

    return null
  }

  getMegaStoneSprite(item: string): string {
    return item.toLowerCase().replace(/\s+/g, "-")
  }

  extractMegaStoneLetter(item: string): string | null {
    const match = item.match(/([A-Z])$/)
    return match ? match[1] : null
  }
}
