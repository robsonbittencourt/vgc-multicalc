import { Component, computed, inject, input } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatTooltip } from "@angular/material/tooltip"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { AllPokemon } from "@data/all-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-ability-combo-box",
  templateUrl: "./ability-combo-box.component.html",
  styleUrls: ["./ability-combo-box.component.scss"],
  imports: [FormsModule, MatCheckbox, MatTooltip, InputSelectComponent]
})
export class AbilityComboBoxComponent {
  store = inject(CalculatorStore)

  pokemonId = input.required<string>()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  availableAbilities = computed(() => AllPokemon.instance.abilitiesByName(this.pokemon().name))
}
