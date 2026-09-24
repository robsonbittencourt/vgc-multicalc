import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { CombinedAttacker } from "@store/calc-store"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { SpOptimizer } from "@features/pokemon-build/sp-optimizer/sp-optimizer"

@Component({
  selector: "app-sp-optimizer-panel-mobile",
  imports: [NgClass, FormsModule, MatButton, MatCheckbox, MatIcon, InputSelectComponent],
  templateUrl: "./sp-optimizer-panel-mobile.component.html",
  styleUrl: "./sp-optimizer-panel-mobile.component.scss"
})
export class SpOptimizerPanelMobileComponent {
  optimizer = input.required<SpOptimizer>()
  pokemonId = input.required<string>()
  optimizationImpossible = input(false)
  combinedAttackers = input.required<CombinedAttacker[]>()

  optimize = output()
  apply = output()
  discard = output()

  showPerAttackerOptions = computed(() => this.optimizer().isDamageMode() && this.combinedAttackers().length === 2)
}
