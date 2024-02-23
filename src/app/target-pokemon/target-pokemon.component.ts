import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-target-pokemon',
  templateUrl: './target-pokemon.component.html',
  styleUrls: ['./target-pokemon.component.scss']
})
export class TargetPokemonComponent {
  
  @Input() 
  targets: Target[]

  @Output() 
  targetChangedEvent = new EventEmitter<Target>()

  @Output() 
  allTargetsRemoved = new EventEmitter<any>()

  targetChanged(target: Target) {
    this.targetChangedEvent.emit(target)
  }

  targetRemoved(target: Target) {
    const index = this.targets.findIndex(t => t.pokemon.equals(target.pokemon))
    this.targets.splice(index, 1);
  }

  removeAll() {
    this.allTargetsRemoved.emit()
  }

}
