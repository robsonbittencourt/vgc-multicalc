import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, output } from "@angular/core"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { Pokemon } from "@multicalc/model"
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { localizedOptions } from "@shared/localize/localized-options"
import { LanguageStore } from "@store/language-store"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-speed-list",
  templateUrl: "./speed-list.component.html",
  styleUrl: "./speed-list.component.scss",
  imports: [WidgetComponent, InputAutocompleteComponent, InputSelectComponent, SpeedScaleComponent, OpponentOptionsComponent, MatSlideToggle, TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeedListComponent {
  store = inject(CalcStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private languageStore = inject(LanguageStore)
  pokemonOptions = computed(() => localizedOptions("pokemon", this.optionsStore.pokemonNamesByReg(), this.languageStore.language()))

  pokemonSelected = output<Pokemon | undefined>()
  selectionChanged = output<Pokemon | undefined>()
  outspeedRequested = output<Pokemon>()

  pokemonId = computed(() => this.store.team().activePokemon()!.id)

  topUsageList: string[] = ["30", "60", "100", "125", "All"]
}
