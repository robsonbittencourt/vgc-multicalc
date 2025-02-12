import { Component, computed, inject, OnInit } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatIcon } from "@angular/material/icon"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { InputAutocompleteComponent, KeyValuePair } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@app/shared/pokemon-build/item-combo-box/item-combo-box.component"
import { NatureComboBoxComponent } from "@app/shared/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
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
    InputSelectComponent
  ]
})
export class SpeedCalculatorMobileComponent implements OnInit {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonId = computed(() => this.store.speedCalcPokemon().id)
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allNatureNames = Object.keys(NATURES)

  statusConditions = [Status.HEALTHY.description, Status.PARALYSIS.description]

  statsModifiers: KeyValuePair[] = [
    { key: "+6", value: "6" },
    { key: "+5", value: "5" },
    { key: "+4", value: "4" },
    { key: "+3", value: "3" },
    { key: "+2", value: "2" },
    { key: "+1", value: "1" },
    { key: "--", value: "0" },
    { key: "-1", value: "-1" },
    { key: "-2", value: "-2" },
    { key: "-3", value: "-3" },
    { key: "-4", value: "-4" },
    { key: "-5", value: "-5" },
    { key: "-6", value: "-6" }
  ]

  ngOnInit() {
    this.resetEvs()
  }

  resetEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  updateSpeedModifier(event: string) {
    this.optionsStore.updateSpeedModifier(parseInt(event))
  }
}
