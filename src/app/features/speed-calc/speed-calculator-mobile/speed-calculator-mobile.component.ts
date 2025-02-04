import { Component, computed, inject, OnInit } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatOption } from "@angular/material/core"
import { MatFormField } from "@angular/material/form-field"
import { MatIcon } from "@angular/material/icon"
import { MatSelect } from "@angular/material/select"
import { MatTooltip } from "@angular/material/tooltip"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { Items } from "@data/items"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Status } from "@lib/model/status"
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
export class SpeedCalculatorMobileComponent implements OnInit {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonId = computed(() => this.store.speedCalcPokemon().id)
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allItemsNames = Items.instance.allItems()
  allNatureNames = Object.keys(NATURES)

  statusConditions = [Status.HEALTHY.description, Status.PARALYSIS.description]

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

  ngOnInit() {
    this.resetEvs()
  }

  resetEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }
}
