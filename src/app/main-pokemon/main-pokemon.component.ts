import { Component, Output, EventEmitter, Input } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { MOVES, ITEMS, NATURES, TYPE_CHART, ABILITIES } from '@smogon/calc';
import { Pokemon } from '../../lib/pokemon';
import { AllPokemon } from 'src/data/all-pokemon';

@Component({
  selector: 'app-main-pokemon',
  templateUrl: './main-pokemon.component.html',
  styleUrls: ['./main-pokemon.component.scss']
})
export class MainPokemonComponent {

  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allItemsNames = Object.values(ITEMS[9]).sort()
  allAbilitiesNames = Object.values(ABILITIES[9]).sort()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = new AllPokemon().allPokemonNames()

  MAX_EVS = 508

  private differ: KeyValueDiffer<string, any>;
  
  @Input()
  pokemon: Pokemon

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>();

  constructor(private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.pokemonChangedEvent.emit(this.pokemon)
    this.differ = this.differs.find(this.pokemon).create();
  }

  ngDoCheck() {
    const changed = this.differ.diff(this.pokemon)
    
    if (changed) {
      this.pokemonChangedEvent.emit(this.pokemon)
    }
  }

  onItemChange(item: string) {
    if (item == "Booster Energy" && this.isParadoxAbility()) {
      this.pokemon.paradoxAbilityActivated = true
    }
   }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  onChangeStatModifier() {
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  isParadoxAbility() {
    return this.pokemon.ability == "Protosynthesis" || this.pokemon.ability == "Quark Drive"
  }

}
