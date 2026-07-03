import { inject, Injectable } from "@angular/core"
import { getItemData } from "@data/item-data"
import { MOVESETS } from "@data/moveset-data"
import { getBasePokemonNameFromItem, MEGA_FORM_MAPPING, MEGA_FORM_REVERSE_MAPPING } from "@features/pokemon-build/utils/mega-stone-mapping"
import { CalculatorStore } from "@store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

@Injectable({ providedIn: "root" })
export class MegaStoneService {
  private store = inject(CalculatorStore)
  private previousAbilityByPokemonId = new Map<string, string>()

  isMegaStone(item: string): boolean {
    return getItemData(item)?.isMegaStone ?? false
  }

  isMegaStoneCompatible(pokemonName: string, item: string): boolean {
    if (!this.isMegaStone(item)) return false

    const itemBaseName = getBasePokemonNameFromItem(item)

    if (!itemBaseName) return false

    const reverseMappedName = MEGA_FORM_REVERSE_MAPPING[pokemonName] || pokemonName
    const baseFormName = reverseMappedName.replace(/-Mega-[A-Z]?$/, "").replace(/-Mega$/, "")
    const baseNameMatches = baseFormName === itemBaseName || baseFormName.startsWith(itemBaseName + "-")

    if (!baseNameMatches) return false

    const megaStoneLetter = this.extractMegaStoneLetter(item)
    const expectedMegaForm = MEGA_FORM_MAPPING[baseFormName] ?? MEGA_FORM_MAPPING[itemBaseName] ?? (megaStoneLetter ? `${baseFormName}-Mega-${megaStoneLetter}` : `${baseFormName}-Mega`)

    if (megaStoneLetter) {
      return pokemonName === baseFormName || pokemonName === expectedMegaForm
    }

    return pokemonName === baseFormName || pokemonName === expectedMegaForm
  }

  getBaseFormAbility(pokemonId: string): string | null {
    return this.previousAbilityByPokemonId.get(pokemonId) ?? null
  }

  getBaseName(megaName: string): string {
    return MEGA_FORM_REVERSE_MAPPING[megaName] ?? megaName.replace(/-Mega-[A-Z]$/, "").replace(/-Mega$/, "")
  }

  isMega(pokemonName: string): boolean {
    return pokemonName.includes("-Mega-") || pokemonName.endsWith("-Mega")
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
      const baseName = MEGA_FORM_REVERSE_MAPPING[currentName] || currentName.replace(/-Mega-[A-Z]$/, "").replace(/-Mega$/, "")
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
      const newName = MEGA_FORM_MAPPING[currentName] ?? (megaStoneLetter ? currentName + "-Mega-" + megaStoneLetter : currentName + "-Mega")

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
    const setdex = MOVESETS

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
