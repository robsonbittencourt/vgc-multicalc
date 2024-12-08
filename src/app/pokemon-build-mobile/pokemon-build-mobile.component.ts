import { Component, computed, inject, input, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatChipListbox, MatChipOption } from '@angular/material/chips'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { MOVES, NATURES, TYPE_CHART } from '@smogon/calc'
import { Items } from 'src/data/items'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { Pokemon } from 'src/lib/pokemon'
import { AbilityComboBoxComponent } from '../ability-combo-box/ability-combo-box.component'
import { EvSliderComponent } from '../ev-slider/ev-slider.component'
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component'

@Component({
  selector: 'app-pokemon-build-mobile',
  templateUrl: './pokemon-build-mobile.component.html',
  styleUrls: ['./pokemon-build-mobile.component.scss'],
  standalone: true,
  imports: [MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, InputAutocompleteComponent, MatTooltip, MatCheckbox, AbilityComboBoxComponent, EvSliderComponent]
})
export class PokemonBuildMobileComponent {
  
  pokemonId = input.required<string>()
  
  pokemonChangedEvent = output<Pokemon>()

  store = inject(CalculatorStore)
  
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allItemsNames = Items.instance.allItems()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]
  
  editAttacks: boolean = false

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  activateMove1() {
    this.activateMove(1)
  }

  activateMove2() {
    this.activateMove(2)
  }

  activateMove3() {
    this.activateMove(3)
  }

  activateMove4() {
    this.activateMove(4)
  }

  private activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }

  terastalyzePokemon() {
    if (!this.pokemon().isTerapagos()) {
      this.store.teraTypeActive(this.pokemonId(), !this.pokemon().teraTypeActive)

      if (this.pokemon().isOgerpon()) {
        this.pokemon().changeTeraStatus(this.pokemon().teraTypeActive)
        this.store.ability(this.pokemonId(), this.pokemon().ability)
      }
    }
  }

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }

}
