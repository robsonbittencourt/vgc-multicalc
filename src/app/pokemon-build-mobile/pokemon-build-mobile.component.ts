import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { MOVES, NATURES, TYPE_CHART } from '@smogon/calc';
import { Items } from 'src/data/items';
import { Move } from 'src/lib/move';
import { Pokemon } from 'src/lib/pokemon';

import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';
import { AbilityComboBoxComponent } from '../ability-combo-box/ability-combo-box.component';
import { EvSliderComponent } from '../ev-slider/ev-slider.component';

@Component({
    selector: 'app-pokemon-build-mobile',
    templateUrl: './pokemon-build-mobile.component.html',
    styleUrls: ['./pokemon-build-mobile.component.scss'],
    standalone: true,
    imports: [MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, InputAutocompleteComponent, MatTooltip, MatCheckbox, AbilityComboBoxComponent, EvSliderComponent]
})
export class PokemonBuildMobileComponent {

  allItemsNames = Items.instance.allItems()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  commanderActivated = false
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]
  
  MAX_EVS = 508
  editAttacks: boolean = false

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  selectedMove: string

  private differ: KeyValueDiffer<string, any>
  private differStatusModifiers: KeyValueDiffer<string, any>

  @Input()
  pokemon: Pokemon

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>()

  constructor(
    private differs: KeyValueDiffers,
    private differsStatusModifiers: KeyValueDiffers
  ) { }

  ngOnInit() {
    this.differ = this.differs.find(this.pokemon).create()
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
    this.selectedMove = this.pokemon.activeMoveName
  }

  ngDoCheck() {
    const pokemonChanged = this.differ.diff(this.pokemon)
    const boostsChanged = this.differStatusModifiers.diff(this.pokemon.boosts) 
    
    if (pokemonChanged || boostsChanged) {
      this.pokemonChangedEvent.emit(this.pokemon)
    }
  }

  moveChanged() {
    setTimeout(() => {
      if (!this.selectedMove) {
        this.selectedMove = this.pokemon.activeMoveName
      }
    }, 0)
  }

  activateMove(position: number, move: Move) {
    this.pokemon.moveSet.activeMoveByPosition(position, move)
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  onChangeIvValue() {
    this.pokemon.ivs = this.pokemon.ivs
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }

  pokemonChanged() {
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  terastalyzePokemon(event: Event) {
    if (this.pokemon.isTerapagos()) return 

    const teraActived = !this.pokemon.teraTypeActive
    this.pokemon.changeTeraStatus(teraActived)

    this.pokemonChangedEvent.emit(this.pokemon)
  }

  toogleCommanderAbility() {
    this.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
  }

  toogleParadoxAbility() {
    this.pokemon.abilityOn = !this.pokemon.abilityOn
  }

}
