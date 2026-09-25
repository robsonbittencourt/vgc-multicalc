import { Component, computed, inject, input, output } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { CalcStore } from "@store/calc-store"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"

@Component({
  selector: "app-pokemon-moves-mobile",
  templateUrl: "./pokemon-moves-mobile.component.html",
  styleUrl: "./pokemon-moves-mobile.component.scss",
  host: { "[class.sticky]": "sticky()", "[class.stuck]": "stuck()" },
  imports: [MatChipListbox, MatChipOption, MatIcon, MultiHitComboBoxComponent]
})
export class PokemonMovesMobileComponent {
  pokemonId = input.required<string>()
  showEdit = input<boolean>(true)
  showHits = input<boolean>(true)
  editingMoves = input<boolean>(false)
  sticky = input<boolean>(false)
  stuck = input<boolean>(false)

  editMovesRequested = output()
  closeMovesRequested = output()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  hasPossibleHits = computed(() => this.pokemon().moveSet.activeMove.possibleHits.length > 0 || this.pokemon().moveSet.activeMove.possibleHitsTaken.length > 0)
  hasAlliesFainted = computed(() => this.pokemon().activeMoveName === "Last Respects" || this.pokemon().ability.name === "Supreme Overlord")

  hasLastMoveFailed = computed(() => this.pokemon().moveSet.activeMove.dependsOnLastMoveFailed())

  hasTargetDamaged = computed(() => this.pokemon().activeMoveName === "Assurance")

  hasTargetAlreadyMoved = computed(() => this.pokemon().activeMoveName === "Payback" || this.pokemon().ability.name === "Analytic")

  hasAllyPledge = computed(() => this.pokemon().moveSet.activeMove.isPledge())

  showComboBox = computed(() => this.showHits() && !this.editingMoves() && (this.hasPossibleHits() || this.hasAlliesFainted() || this.hasLastMoveFailed() || this.hasTargetDamaged() || this.hasTargetAlreadyMoved() || this.hasAllyPledge()))

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }
}
