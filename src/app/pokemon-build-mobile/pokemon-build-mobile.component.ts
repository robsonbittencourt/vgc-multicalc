import { Component, input, output } from '@angular/core';
import { MOVES, NATURES, TYPE_CHART } from '@smogon/calc';
import { Items } from 'src/data/items';
import { Pokemon } from 'src/lib/pokemon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipListbox, MatChipListboxChange, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AbilityComboBoxComponent } from '../ability-combo-box/ability-combo-box.component';
import { EvSliderComponent } from '../ev-slider/ev-slider.component';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-pokemon-build-mobile',
  templateUrl: './pokemon-build-mobile.component.html',
  styleUrls: ['./pokemon-build-mobile.component.scss'],
  standalone: true,
  imports: [MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, InputAutocompleteComponent, MatTooltip, MatCheckbox, AbilityComboBoxComponent, EvSliderComponent]
})
export class PokemonBuildMobileComponent {
  
  pokemon = input.required<Pokemon>()

  pokemonChangedEvent = output<Pokemon>()
  
  MAX_EVS = 508

  allItemsNames = Items.instance.allItems()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  commanderActivated = false
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]
  
  selectedMove: string
  editAttacks: boolean = false

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  ngOnInit() {
    this.selectedMove = this.pokemon().activeMoveName
  }

  moveSelected(event: MatChipListboxChange) {
    if (!event.value || event.value == this.selectedMove) {
      event.source.value = this.selectedMove
    } else {
      this.selectedMove = event.value
    }
  }

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
    this.pokemon().moveSet.activeMoveByPosition(position)
    this.pokemonChanged()
  }

  beforeChangeEvValue() {
    if (this.pokemon().totalEvs() <= this.MAX_EVS) {
      this.pokemon().evs = this.pokemon().evs
    }
  }

  onChangeEvValue() {
    if (this.pokemon().totalEvs() <= this.MAX_EVS) {
      this.pokemon().evs = this.pokemon().evs
    } else {
      this.pokemon().evs = this.pokemon().evsStorage
    }

    this.pokemonChanged()
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
    this.activateMove1()
    this.selectedMove = this.pokemon().move1Name

    this.pokemonChanged()
  }

  terastalyzePokemon() {
    if (this.pokemon().isTerapagos()) return 

    const teraActived = !this.pokemon().teraTypeActive
    this.pokemon().changeTeraStatus(teraActived)

    this.pokemonChanged()
  }

  toogleCommanderAbility() {
    this.pokemon().commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated

    this.pokemonChanged()
  }

  toogleParadoxAbility() {
    this.pokemon().abilityOn = !this.pokemon().abilityOn
    this.pokemonChanged()
  }

  pokemonChanged() {
    this.pokemonChangedEvent.emit(this.pokemon())
  }

}
