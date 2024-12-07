import { Component, computed, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatOption } from '@angular/material/core'
import { MatFormField } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatSelect } from '@angular/material/select'
import { MatTooltip } from '@angular/material/tooltip'
import { NATURES } from '@smogon/calc'
import { DataStore } from 'src/data/data-store'
import { Items } from 'src/data/items'
import { FieldStore } from 'src/data/store/field-store'
import { SpeedCalcOptionsStore } from 'src/data/store/speed-calc-options-store'
import { AbilityComboBoxComponent } from '../ability-combo-box/ability-combo-box.component'
import { EvSliderComponent } from '../ev-slider/ev-slider.component'
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component'
import { PokemonComboBoxComponent } from '../pokemon-combo-box/pokemon-combo-box.component'
import { SpeedScaleComponent } from '../speed-scale/speed-scale.component'

@Component({
  selector: 'app-speed-calculator-mobile',
  templateUrl: './speed-calculator-mobile.component.html',
  styleUrls: ['./speed-calculator-mobile.component.scss'],
  standalone: true,
  imports: [InputAutocompleteComponent, PokemonComboBoxComponent, AbilityComboBoxComponent, MatCheckbox, ReactiveFormsModule, FormsModule, MatTooltip, EvSliderComponent, SpeedScaleComponent, MatFormField, MatSelect, MatOption, MatButtonToggleGroup, MatButtonToggle, MatIcon]
})
export class SpeedCalculatorMobileComponent {
  
  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonId = computed(() => this.data.leftPokemon().id)
  pokemon = computed(() => this.data.findPokemonById(this.pokemonId()))
  
  allItemsNames = Items.instance.allItems()
  allNatureNames = Object.keys(NATURES)
  
  MAX_EVS = 508
  
  statusConditions = [
    "Healthy", "Paralysis"
  ]

  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

}
