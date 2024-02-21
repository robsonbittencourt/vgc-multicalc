import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-target-pokemon',
  templateUrl: './target-pokemon.component.html',
  styleUrls: ['./target-pokemon.component.scss']
})
export class TargetPokemonComponent {
  
  @Input() 
  targets: Pokemon[]

  @Output() 
  targetChangedEvent = new EventEmitter<Pokemon[]>()

  targetChanged() {
    this.targetChangedEvent.emit(this.targets)
  }

  targetRemoved(pokemon: Pokemon) {
    const index = this.targets.findIndex(target => target.equals(pokemon))
    this.targets.splice(index, 1);
  }

  removeAll() {
    this.targets = []
    this.targetChangedEvent.emit(this.targets)
  }

}
