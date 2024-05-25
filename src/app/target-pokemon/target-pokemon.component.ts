import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Target } from 'src/lib/target';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-target-pokemon',
  templateUrl: './target-pokemon.component.html',
  styleUrls: ['./target-pokemon.component.scss']
})
export class TargetPokemonComponent {

  constructor(private pokePasteService: PokePasteParserService, private _snackBar: SnackbarService) {}
  
  @Input() 
  targets: Target[]

  @Input()
  isAttacker: boolean

  @Input()
  canShowDamageDescription: boolean

  @Output() 
  targetAdded = new EventEmitter<any>()
  
  @Output() 
  targetsAdded = new EventEmitter<Target[]>()

  @Output() 
  targetChangedEvent = new EventEmitter<Target>()

  @Output() 
  targetsChangedEvent = new EventEmitter<Target[]>()

  @Output() 
  allTargetsRemoved = new EventEmitter<any>()

  @Output()
  targetActivatedEvent = new EventEmitter<Target>()

  @Output()
  secondTargetDeactivatedEvent = new EventEmitter<any>()

  pokePaste = ""
  errorMessagePokePaste: string = ""
  copyMessageEnabled = false  

  targetChanged(target: Target) {
    this.targetChangedEvent.emit(target)
  }

  targetActivated(position: number) {
    const target = this.targets.find(t => t.position == position)!
    
    if(!target.active) {
      target.active = true

      this.targets.forEach(t => {
        if (t.position != position) {
          t.active = false
        }
      })
    }        
    
    this.targetActivatedEvent.emit(target)
  }

  targetRemoved(position: number) {
    const target = this.targets.find(t => t.position == position)!
    const index = this.targets.findIndex(t => t.pokemon.equals(target.pokemon))
    
    this.targets.splice(index, 1)
    this.updatePositions()
  }

  removeAll() {
    const pokemon = defaultPokemon()
    this.targets = [new Target(pokemon, 0)]
    this.allTargetsRemoved.emit()
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      const pokemonList = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      const targets = []
      
      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        const position = this.targets.length + index + 1
        targets.push(new Target(pokemon, position))        
      }

      this.targetsAdded.emit(targets)
      this._snackBar.open("Pokémon from PokePaste added");
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  addPokemonToTargets() {
    this.updatePositions()
    this.targetAdded.emit()
  }

  private updatePositions() {
    for (let index = 0; index < this.targets.length; index++) {
      this.targets[index].position = index      
    }
  }

  selectPokemonActive(): boolean {
    return this.targets.find(t => t.pokemon.isDefault()) != null
  }
  
  damageDescription() {
    return this.targets.find(t => t.active)?.damageResult.description ?? ""
  }

  copyDamageResult() {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(this.damageDescription())

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }
  
  canSelectSecondPokemon(): boolean {
    const onlyOneActive = this.targets.filter(t => t.active).length == 1
    return this.isAttacker && onlyOneActive
  }

  secondTargetActivated(position: number) {
    const target = this.targets.find(t => t.position == position)!

    if(target.active && this.canSelectSecondPokemon()) return

    if(target.active) {
      target.active = false
      this.secondTargetDeactivatedEvent.emit()
    } else {
      target.active = true
      this.targetActivatedEvent.emit(target)
    }    
  }

  pokemonChanged() {
    this.targetsChangedEvent.emit(this.targets)
  }

}
