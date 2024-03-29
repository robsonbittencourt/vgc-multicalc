import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-target-pokemon',
  templateUrl: './target-pokemon.component.html',
  styleUrls: ['./target-pokemon.component.scss']
})
export class TargetPokemonComponent {

  constructor(private pokePasteService: PokePasteParserService) {}
  
  @Input() 
  targets: Target[]

  @Input()
  canShowAsActivated: boolean

  @Output() 
  targetAdded = new EventEmitter<any>()
  
  @Output() 
  targetsAdded = new EventEmitter<Target[]>()

  @Output() 
  targetChangedEvent = new EventEmitter<Target>()

  @Output() 
  allTargetsRemoved = new EventEmitter<any>()

  @Output() 
  advanceOptionsToggled = new EventEmitter<boolean>()

  @Output()
  targetActivatedEvent = new EventEmitter<Pokemon>()

  pokePaste = ""
  errorMessagePokePaste: string = ""
  _showAdvancedOptions = false

  targetChanged(target: Target) {
    this.targetChangedEvent.emit(target)
  }

  targetActivated(target: Target) {
    this.targets.forEach(t => t.active = false)
    target.active = true
    this.targetActivatedEvent.emit(target.pokemon)
  }

  targetRemoved(target: Target) {
    const index = this.targets.findIndex(t => t.pokemon.equals(target.pokemon))
    this.targets.splice(index, 1);
  }

  removeAll() {
    this.allTargetsRemoved.emit()
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      const pokemonList = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      const targets = pokemonList.map(pokemon => new Target(pokemon))
      this.targetsAdded.emit(targets)
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  addPokemonToTargets() {
    this.targetAdded.emit()
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions
  }

  set showAdvancedOptions(active: boolean) {
    this._showAdvancedOptions = active
    this.advanceOptionsToggled.emit(this._showAdvancedOptions)
  }

}
