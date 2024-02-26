import { Component, Output, EventEmitter } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MOVES, ITEMS, NATURES, TYPE_CHART, SPECIES, ABILITIES } from '@smogon/calc';
import { Pokemon } from '../../lib/pokemon';
import { AllPokemon } from 'src/data/all-pokemon';

@Component({
  selector: 'app-main-pokemon',
  templateUrl: './main-pokemon.component.html',
  styleUrls: ['./main-pokemon.component.scss']
})
export class MainPokemonComponent {

  controlNature = new FormControl('Timid');
  controlItem = new FormControl('Choice Specs');
  controlAbility = new FormControl('Protosynthesis');
  controlTeraType = new FormControl('Fairy');
  controlMove = new FormControl('Moon Blast');

  allMoveNames = Object.keys(MOVES[9])
  allNatureNames = Object.keys(NATURES)
  allItemsNames = Object.values(ITEMS[9]).sort()
  allAbilitiesNames = Object.values(ABILITIES[9]).sort()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1)
  allPokemonNames = new AllPokemon().allPokemonNames()

  filteredPokemonNames: Observable<string[]>;
  filteredItems: Observable<string[]>;
  filteredAbilities: Observable<string[]>;
  filteredNatures: Observable<string[]>;
  filteredTeraTypes: Observable<string[]>;
  filteredMoves: Observable<string[]>;

  MAX_EVS = 508

  private differ: KeyValueDiffer<string, any>;
  public pokemon: Pokemon

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>();

  constructor(private differs: KeyValueDiffers) {
    this.pokemon = new Pokemon("Flutter Mane", "Timid", "Choice Specs", "Protosynthesis", "Fairy", true, { spa: 252 }, "Moon Blast")
    this.pokemonChangedEvent.emit(this.pokemon)
    this.differ = this.differs.find(this.pokemon).create();
  }

  ngOnInit() {
    this.filteredNatures = this.controlNature.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allNatureNames))
    )

    this.filteredItems = this.controlItem.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allItemsNames))
    )

    this.filteredAbilities = this.controlAbility.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allAbilitiesNames))
    )

    this.filteredTeraTypes = this.controlTeraType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allTeraTypes))
    )

    this.filteredMoves = this.controlMove.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allMoveNames))
    )
  }

  ngDoCheck() {
    const change = this.differ.diff(this.pokemon)
    
    if (change) {
      this.pokemonChangedEvent.emit(this.pokemon)
    }
  }

  private _filter(value: string, values: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return values.filter(name => this._normalizeValue(name).includes(filterValue))
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '')
  }

  onNatureSelected(selectedNature: string) {
    this.pokemon.nature = selectedNature
  }

  onTeraTypeSelected(selectedTeraType: string) {
    this.pokemon.teraType = selectedTeraType
  }

  onItemSelected(selectedItem: string) {
    this.pokemon.item = selectedItem
  }

  onAbilitySelected(selectedAbility: string) {
    this.pokemon.ability = selectedAbility
  }

  onMoveSelected(selectedMove: string) {
    this.pokemon.move = selectedMove
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

}
