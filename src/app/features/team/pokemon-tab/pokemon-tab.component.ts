import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-tab",
  templateUrl: "./pokemon-tab.component.html",
  styleUrls: ["./pokemon-tab.component.scss"],
  imports: [NgClass, MatIcon, MatTooltip, PokemonSpriteComponent]
})
export class PokemonTabComponent {
  pokemonId = input.required<string>()
  active = input.required<boolean>()

  tabActivated = output<string>()
  secondTabActivated = output<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  hasDuplicateItem = computed(() => this.store.duplicateItemPokemonIds().has(this.pokemonId()))

  activateTab(event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.secondTabActivated.emit(this.pokemonId())
    } else {
      this.tabActivated.emit(this.pokemonId())
    }
  }
}
