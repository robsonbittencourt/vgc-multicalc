import { Component, computed, inject, input, output, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { InputComponent } from "@shared/input/input.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { TatsugiriButtonComponent } from "@features/buttons/tatsugiri-button/tatsugiri-button.component"
import { PalafinButtonComponent } from "@features/buttons/palafin-button/palafin-button.component"
import { AegislashButtonComponent } from "@features/buttons/aegislash-button/aegislash-button.component"

@Component({
  selector: "app-ability-combo-box",
  templateUrl: "./ability-combo-box.component.html",
  styleUrls: ["./ability-combo-box.component.scss"],
  imports: [FormsModule, MatCheckbox, InputComponent, InputSelectComponent, TatsugiriButtonComponent, PalafinButtonComponent, AegislashButtonComponent]
})
export class AbilityComboBoxComponent {
  pokemonId = input.required<string>()

  haveFocus = input<boolean>(false)

  tabIndex = input(0)

  isMobile = input(false)

  selected = output()

  lostFocus = output()

  valueChange = output<string>()

  openAbilityTableRequested = output()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  availableAbilities = computed(() => this.pokemon().availableAbilities.map(a => a.name))

  stats: KeyValuePair[] = [
    { key: "Atk", value: "atk" },
    { key: "Def", value: "def" },
    { key: "Spa", value: "spa" },
    { key: "Spd", value: "spd" },
    { key: "Spe", value: "spe" }
  ]

  abilityCheckDisabled = computed(() => {
    if (this.pokemon().hasAbility("Protosynthesis") && this.fieldStore.isWeatherSun()) return true
    if (this.pokemon().hasAbility("Quark Drive") && this.fieldStore.isTerrainElectric()) return true

    return false
  })

  abilityInput = viewChild<InputComponent>("abilityInput")

  blur() {
    this.abilityInput()?.blur()
  }

  toggleAbility(event: MatCheckboxChange) {
    this.store.abilityOn(this.pokemonId(), event.checked)
    if (event.checked) {
      this.store.higherStat(this.pokemonId(), undefined)
    }
  }

  onHigherStatValueChange(stat: string) {
    this.store.higherStat(this.pokemonId(), stat)
  }
}
