import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { DamageCalc } from "@multicalc/damage-calc"

@Component({
  selector: "app-multi-hit-combo-box",
  imports: [FormsModule, NgClass, MatCheckbox, MatButtonToggle, MatButtonToggleGroup, InputAutocompleteComponent],
  templateUrl: "./multi-hit-combo-box.component.html",
  styleUrl: "./multi-hit-combo-box.component.scss"
})
export class MultiHitComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)
  haveFocus = input(false)
  showHits = input(true)

  selected = output()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)

  private damageCalc = new DamageCalc()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  targetDamagedByAlly = computed(() => {
    if (this.pokemon().activeMoveName !== "Assurance") return false

    const ally = this.store.findCombinedAllyById(this.pokemonId())

    if (!ally) return false

    const field = this.fieldStore.field()

    return this.assuranceTargets().some(target => this.damageCalc.assuranceIsDoubledByAlly(this.pokemon(), ally, target, field))
  })

  private assuranceTargets = computed(() => {
    const targets = this.store.displayedTargets().map(target => target.pokemon)

    if (targets.length > 0) return targets

    const activePokemon = this.store.team().activePokemon()

    return activePokemon ? [activePokemon] : []
  })

  alliesFainted = ["0", "1", "2", "3"]

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  alliesFaintedSelected(value: string) {
    this.alliesFaintedChanged(value)
    this.selected.emit()
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }

  hitsTakenChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hitsTaken(this.pokemonId(), event, activeMovePosition)
  }

  lastMoveFailedChanged(event: MatCheckboxChange) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.lastMoveFailed(this.pokemonId(), event.checked, activeMovePosition)
  }

  targetDamagedChanged(event: MatCheckboxChange) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.targetDamaged(this.pokemonId(), event.checked, activeMovePosition)
  }
}
