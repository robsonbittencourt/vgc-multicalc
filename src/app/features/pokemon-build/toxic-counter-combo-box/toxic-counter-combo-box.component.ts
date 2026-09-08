import { Component, computed, inject, input, output } from "@angular/core"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { CalcStore } from "@store/calc-store"
import { Status } from "@multicalc/model"

const MAX_TOXIC_STAGE = 15

@Component({
  selector: "app-toxic-counter-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./toxic-counter-combo-box.component.html",
  styleUrl: "./toxic-counter-combo-box.component.scss"
})
export class ToxicCounterComboBoxComponent {
  pokemonId = input.required<string>()
  haveFocus = input(false)

  selected = output()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  isBadlyPoisoned = computed(() => this.pokemon().status === Status.BADLY_POISON)

  turns = Array.from({ length: MAX_TOXIC_STAGE }, (_, index) => `${index + 1}`)

  turnChanged(turn: string) {
    this.store.toxicCounter(this.pokemonId(), Number(turn))
  }
}
