import { TitleCasePipe } from "@angular/common"
import { Component, computed, inject, input, output, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { InputComponent } from "@basic/input/input.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TatsugiriButtonComponent } from "@features/buttons/tatsugiri-button/tatsugiri-button.component"

@Component({
  selector: "app-ability-combo-box",
  templateUrl: "./ability-combo-box.component.html",
  styleUrls: ["./ability-combo-box.component.scss"],
  imports: [TitleCasePipe, FormsModule, MatCheckbox, InputComponent, InputSelectComponent, TatsugiriButtonComponent]
})
export class AbilityComboBoxComponent {
  store = inject(CalculatorStore)

  pokemonId = input.required<string>()

  haveFocus = input<boolean>(false)

  tabIndex = input(0)

  isMobile = input(false)

  selected = output()

  lostFocus = output()

  valueChange = output<string>()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  availableAbilities = computed(() => this.pokemon().availableAbilities.map(a => a.name))

  abilityInput = viewChild<InputComponent>("abilityInput")

  blur() {
    this.abilityInput()?.blur()
  }
}
