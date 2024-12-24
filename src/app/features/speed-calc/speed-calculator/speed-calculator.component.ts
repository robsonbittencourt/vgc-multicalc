import { Component, computed, inject } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatOption } from "@angular/material/core"
import { MatFormField } from "@angular/material/form-field"
import { MatIcon } from "@angular/material/icon"
import { MatSelect } from "@angular/material/select"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { TeamComponent } from "@app/shared/team/team/team.component"
import { TeamsComponent } from "@app/shared/team/teams/teams.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"

@Component({
  selector: "app-speed-calculator",
  templateUrl: "./speed-calculator.component.html",
  styleUrls: ["./speed-calculator.component.scss"],
  imports: [TeamComponent, TeamsComponent, FieldComponent, InputAutocompleteComponent, MatFormField, MatSelect, MatOption, MatButtonToggleGroup, MatButtonToggle, MatIcon, SpeedScaleComponent]
})
export class SpeedCalculatorComponent {
  store = inject(CalculatorStore)

  pokemonId = computed(() => this.store.team().activePokemon().id)

  optionsStore = inject(SpeedCalcOptionsStore)

  regulationsList: string[] = ["Reg G", "Reg H"]

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
