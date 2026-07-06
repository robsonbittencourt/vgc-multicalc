import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { CalcStore } from "@store/calc-store"

@Component({
  selector: "app-multi-hit-combo-box",
  imports: [FormsModule, NgClass, MatCheckbox, MatButtonToggle, MatButtonToggleGroup, InputAutocompleteComponent],
  templateUrl: "./multi-hit-combo-box.component.html",
  styleUrl: "./multi-hit-combo-box.component.scss"
})
export class MultiHitComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)
  haveFocus = input(false)
  showHits = input(true)

  selected = output()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  multiHitLabel = computed(() => (this.pokemon().activeMoveName !== "Rage Fist" ? "Hits" : "Hits Taken"))

  alliesFainted = ["0", "1", "2", "3"]

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  alliesFaintedSelected(value: string) {
    this.alliesFaintedChanged(value)
    this.selected.emit()
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }

  lastMoveFailedChanged(event: MatCheckboxChange) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.lastMoveFailed(this.pokemonId(), event.checked, activeMovePosition)
  }
}
