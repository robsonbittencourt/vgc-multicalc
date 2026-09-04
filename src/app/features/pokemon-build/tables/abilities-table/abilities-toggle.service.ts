import { Injectable, inject, signal } from "@angular/core"
import { CalcStore } from "@store/calc-store"

@Injectable({ providedIn: "root" })
export class AbilitiesToggleService {
  private store = inject(CalcStore)

  private lastPokemonId = ""

  showAllAbilities = signal(false)

  hasNonNativeAbility(pokemonId: string): boolean {
    if (!pokemonId) return false

    const pokemon = this.store.findPokemonById(pokemonId)

    return !pokemon.availableAbilities.map(ability => ability.name).includes(pokemon.ability.name)
  }

  resetForPokemon(pokemonId: string) {
    if (pokemonId === this.lastPokemonId) return

    this.lastPokemonId = pokemonId
    this.showAllAbilities.set(false)
  }

  toggleShowAllAbilities() {
    this.showAllAbilities.set(!this.showAllAbilities())
  }
}
