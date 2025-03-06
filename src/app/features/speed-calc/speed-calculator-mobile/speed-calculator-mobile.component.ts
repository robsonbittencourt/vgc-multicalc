import { Component, computed, inject, OnInit, signal } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatIcon } from "@angular/material/icon"
import { OpponentOptionsComponent } from "@app/features/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@app/features/speed-calc/speed-insights/speed-insights.component"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@app/shared/pokemon-build/item-combo-box/item-combo-box.component"
import { NatureComboBoxComponent } from "@app/shared/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { NATURES } from "@robsonbittencourt/calc"

@Component({
  selector: "app-speed-calculator-mobile",
  templateUrl: "./speed-calculator-mobile.component.html",
  styleUrls: ["./speed-calculator-mobile.component.scss"],
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
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

  ngOnInit() {
    this.resetEvs()
  }

  resetEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }
}
