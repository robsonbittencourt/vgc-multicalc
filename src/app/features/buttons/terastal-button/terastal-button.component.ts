import { Component, computed, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"
import { Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"

@Component({
  selector: "app-terastal-button",
  imports: [MatTooltip],
  templateUrl: "./terastal-button.component.html",
  styleUrl: "./terastal-button.component.scss"
})
export class TerastalButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  terastalyzePokemon(event: Event) {
    event.stopPropagation()

    const current = this.pokemon()
    const terastalized = current.terastalized()

    if (terastalized.name !== current.name) {
      this.store.name(this.pokemonId(), terastalized.name)
    }

    if (terastalized.ability.name !== current.ability.name) {
      this.store.ability(this.pokemonId(), terastalized.ability.name)
    }

    if (terastalized.teraTypeActive !== current.teraTypeActive) {
      this.store.teraTypeActive(this.pokemonId(), terastalized.teraTypeActive)
    }

    if (this.boostsChanged(current, terastalized)) {
      this.store.boosts(this.pokemonId(), terastalized.boosts)
      this.store.bonusBoosts(this.pokemonId(), terastalized.bonusBoosts)
    }
  }

  private boostsChanged(current: Pokemon, terastalized: Pokemon): boolean {
    const stats: (keyof Stats)[] = ["atk", "def", "spa", "spd", "spe"]

    return stats.some(stat => current.boosts[stat] !== terastalized.boosts[stat] || current.bonusBoosts[stat] !== terastalized.bonusBoosts[stat])
  }
}
