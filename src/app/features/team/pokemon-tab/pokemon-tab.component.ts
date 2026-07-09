import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { CalcStore } from "@store/calc-store"

@Component({
  selector: "app-pokemon-tab",
  templateUrl: "./pokemon-tab.component.html",
  styleUrls: ["./pokemon-tab.component.scss"],
  imports: [NgClass, MatIcon, MatTooltip, PokemonSpriteComponent]
})
export class PokemonTabComponent {
  pokemonId = input<string>()
  active = input.required<boolean>()

  tabActivated = output<string>()
  secondTabActivated = output<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()!))
  isAddMode = computed(() => {
    const id = this.pokemonId()

    return id == undefined
  })
  hasDuplicateItem = computed(() => {
    const id = this.pokemonId()

    return id != undefined && this.store.duplicateItemPokemonIds().has(id)
  })

  activateTab(event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.secondTabActivated.emit(this.pokemonId() ?? "")
    } else {
      this.tabActivated.emit(this.pokemonId() ?? "")
    }
  }
}
