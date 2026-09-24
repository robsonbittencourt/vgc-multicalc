import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { CombinedAttacker } from "@store/calc-store"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { SpOptimizer } from "@features/pokemon-build/sp-optimizer/sp-optimizer"
import { OptimizeMode } from "@features/pokemon-build/utils/optimize-mode"

@Component({
  selector: "app-sp-optimizer-panel",
  imports: [NgClass, FormsModule, MatButton, MatCheckbox, MatIcon, InputSelectComponent, SegmentedControlComponent],
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

  readonly optimizeModeSpacerOptions: SegmentedOption<OptimizeMode>[] = this.optimizeModeOptions.map(({ value, label }) => ({ value, label }))

  showPerAttackerOptions = computed(() => this.optimizer().isDamageMode() && this.combinedAttackers().length === 2)

  mainAttackerRow = computed(() => this.combinedAttackers()[0])

  partnerRow = computed(() => this.combinedAttackers()[1])

  attackerNames = computed(() => this.combinedAttackers().map(attacker => attacker.name))
}
