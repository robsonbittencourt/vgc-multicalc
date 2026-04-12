import { Component, computed, inject, input, signal } from "@angular/core"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { Natures } from "@data/natures"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-nature-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./nature-combo-box.component.html",
  styleUrl: "./nature-combo-box.component.scss"
})
export class NatureComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)
  isMobile = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  selectedNature = signal<string>("")

  allNatureNames = computed(() => {
    return Natures.instance.natures
  })

  mobileNatureList = computed(() => {
    return Natures.instance.natures
  })

  mobileNatureDisplayMap = computed(() => {
    const map: Record<string, string> = {}
    Natures.instance.natures.forEach(nature => {
      map[nature.value] = nature.value
    })
    return map
  })

  handleNatureChange(value: string) {
    this.selectedNature.set(value)
    this.store.nature(this.pokemonId(), value)
  }
}
