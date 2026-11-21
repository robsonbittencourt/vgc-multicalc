import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { CombinedAttacker } from "@store/calc-store"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { SpOptimizer } from "@features/pokemon-build/sp-optimizer/sp-optimizer"
import { OptimizeMode } from "@features/pokemon-build/utils/optimize-mode"
import { LocalizeNamePipe } from "@shared/localize/localize-name.pipe"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-sp-optimizer-panel",
  imports: [NgClass, FormsModule, MatButton, MatCheckbox, MatIcon, InputAutocompleteComponent, InputSelectComponent, SegmentedControlComponent, LocalizeNamePipe, TranslatePipe],
  templateUrl: "./sp-optimizer-panel.component.html",
  styleUrl: "./sp-optimizer-panel.component.scss"
})
export class SpOptimizerPanelComponent {
  optimizer = input.required<SpOptimizer>()
  editingId = input.required<string>()
  optimizationImpossible = input(false)
  combinedAttackers = input.required<CombinedAttacker[]>()

  optimize = output()
  apply = output()
  discard = output()

  readonly optimizeModeOptions: SegmentedOption<OptimizeMode>[] = [
    { value: "bulk", label: "Survive", dataCy: "optimize-mode-bulk" },
    { value: "damage", label: "KO", dataCy: "optimize-mode-damage" }
  ]

  showOptions = computed(() => this.optimizer().showOptimizeOptions() && !this.optimizationImpossible())

  showPerAttackerOptions = computed(() => this.optimizer().isDamageMode() && this.combinedAttackers().length === 2)

  mainAttackerRow = computed(() => this.combinedAttackers()[0])

  partnerRow = computed(() => this.combinedAttackers()[1])

  attackerNames = computed(() => this.combinedAttackers().map(attacker => attacker.name))
}
