import { Component, computed, inject } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatOption } from "@angular/material/core"
import { MatFormField } from "@angular/material/form-field"
import { MatIcon } from "@angular/material/icon"
import { MatSelect } from "@angular/material/select"
import { MatTooltip } from "@angular/material/tooltip"
import { AbilityComboBoxComponent } from "@app/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/ev-slider/ev-slider.component"
import { InputAutocompleteComponent } from "@app/input-autocomplete/input-autocomplete.component"
import { PokemonComboBoxComponent } from "@app/pokemon-combo-box/pokemon-combo-box.component"
import { SpeedScaleComponent } from "@app/speed-scale/speed-scale.component"
import { Items } from "@data/items"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { NATURES } from "@robsonbittencourt/calc"

@Component({
  selector: "app-speed-calculator-mobile",
  templateUrl: "./speed-calculator-mobile.component.html",
  styleUrls: ["./speed-calculator-mobile.component.scss"],
  imports: [
    InputAutocompleteComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent,
    MatCheckbox,
    ReactiveFormsModule,
    FormsModule,
    MatTooltip,
    EvSliderComponent,
    SpeedScaleComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon
  ]
})
export class SpeedCalculatorMobileComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonId = computed(() => this.store.speedCalcPokemon().id)
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allItemsNames = Items.instance.allItems()
  allNatureNames = Object.keys(NATURES)

  statusConditions = ["Healthy", "Paralysis"]

  statsModifiers = [
    { value: 6, viewValue: "+6" },
    { value: 5, viewValue: "+5" },
    { value: 4, viewValue: "+4" },
    { value: 3, viewValue: "+3" },
    { value: 2, viewValue: "+2" },
    { value: 1, viewValue: "+1" },
    { value: 0, viewValue: "--" },
    { value: -1, viewValue: "-1" },
    { value: -2, viewValue: "-2" },
    { value: -3, viewValue: "-3" },
    { value: -4, viewValue: "-4" },
    { value: -5, viewValue: "-5" },
    { value: -6, viewValue: "-6" }
  ]
}
