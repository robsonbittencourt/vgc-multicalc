import { inject, Injectable } from "@angular/core"
import { MOVESETS } from "@data/moveset-data"
import { CalcStore } from "@store/calc-store"
import { getBaseName, getMegaFormName, isMega, isMegaStone, isMegaStoneCompatible } from "@multicalc/model"

@Injectable({ providedIn: "root" })
export class MegaStoneService {
  private store = inject(CalcStore)
  private previousAbilityByPokemonId = new Map<string, string>()

  isMegaStone(item: string): boolean {
    return isMegaStone(item)
  }

  isMegaStoneCompatible(pokemonName: string, item: string): boolean {
    return isMegaStoneCompatible(pokemonName, item)
  }

  getBaseFormAbility(pokemonId: string): string | null {
    return this.previousAbilityByPokemonId.get(pokemonId) ?? null
  }

  getBaseName(megaName: string): string {
    return getBaseName(megaName)
  }

  isMega(pokemonName: string): boolean {
    return isMega(pokemonName)
  }

  hasMegaForm(pokemonName: string, item: string): boolean {
    return isMegaStone(item) || pokemonName.includes("-Mega")
  }

  toggleMega(pokemonId: string, currentName: string, currentItem: string) {
    const pokemon = this.store.findPokemonById(pokemonId)

    if (!pokemon) return

    const currentAbility = pokemon.ability.name

    if (isMega(currentName)) {
      const baseName = getBaseName(currentName)
      const previousAbility = this.previousAbilityByPokemonId.get(pokemonId)
      this.previousAbilityByPokemonId.delete(pokemonId)
      this.store.name(pokemonId, baseName)

      if (previousAbility) {
        this.store.ability(pokemonId, previousAbility)
      }
    } else {
      this.previousAbilityByPokemonId.set(pokemonId, currentAbility)
      const newName = getMegaFormName(currentName, currentItem)

      this.store.name(pokemonId, newName)
      this.store.ability(pokemonId, this.getAbilityFromMoveset(newName))
    }
  }

  private getAbilityFromMoveset(pokemonName: string): string {
    const setdex = MOVESETS
    const movesetData = setdex[pokemonName as keyof typeof setdex]

    return movesetData.ability
  }

  getMegaStoneSprite(item: string): string {
    return item.toLowerCase().replace(/\s+/g, "-")
  }
}
