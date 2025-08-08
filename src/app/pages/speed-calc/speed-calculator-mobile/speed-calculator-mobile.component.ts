import { Component, computed, inject, OnInit, signal } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { FieldComponent } from "@features/field/field.component"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SPEED_CALCULATOR_MODES } from "@lib/speed-calculator/speed-calculator-mode"
import { Regulation } from "@lib/types"
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { NATURES } from "@robsonbittencourt/calc"

@Component({
  selector: "app-speed-calculator-mobile",
  templateUrl: "./speed-calculator-mobile.component.html",
  styleUrls: ["./speed-calculator-mobile.component.scss"],
  imports: [
    MatIcon,
    InputSelectComponent,
    InputAutocompleteComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent,
    EvSliderComponent,
    SpeedScaleComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent,
    NatureComboBoxComponent,
    FieldComponent,
    SpeedInsightsComponent,
    WidgetComponent,
    OpponentOptionsComponent
  ]
})
export class SpeedCalculatorMobileComponent implements OnInit {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  selectedPokemon = signal<Pokemon>(this.store.findPokemonById(this.store.speedCalcPokemon().id))

  pokemonId = computed(() => this.store.speedCalcPokemon().id)
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allNatureNames = Object.keys(NATURES)

  statusConditions = [Status.HEALTHY.description, Status.PARALYSIS.description]

  regulationsList: Regulation[] = ["H", "I"]

  topUsageList: string[] = ["60", "100", "125", "All"]

  speedCalculatorModes: string[] = SPEED_CALCULATOR_MODES

  ngOnInit() {
    this.resetEvs()
  }

  resetEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  updateRegulation(regulation: string) {
    this.optionsStore.updateRegulation(regulation as Regulation)
  }
}
