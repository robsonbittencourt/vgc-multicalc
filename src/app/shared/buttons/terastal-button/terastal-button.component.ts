import { Component, computed, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-terastal-button",
  imports: [MatTooltip],
  templateUrl: "./terastal-button.component.html",
  styleUrl: "./terastal-button.component.scss"
})
export class TerastalButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  terastalyzePokemon(event: Event) {
    event.stopPropagation()

    if (this.pokemon().name === "Terapagos") {
      return
    }

    if (this.pokemon().name === "Terapagos-Stellar") {
      this.store.name(this.pokemonId(), "Terapagos-Terastal")
      this.store.ability(this.pokemonId(), "Tera Shell")
      this.store.teraTypeActive(this.pokemonId(), false)
      return
    }

    if (this.pokemon().name === "Terapagos-Terastal") {
      this.store.name(this.pokemonId(), "Terapagos-Stellar")
      this.store.ability(this.pokemonId(), "Teraform Zero")
      this.store.teraTypeActive(this.pokemonId(), true)
      return
    }

    this.store.toogleTeraTypeActive(this.pokemonId())
  }
}
