import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-target-pokemon-card',
  templateUrl: './target-pokemon-card.component.html',
  styleUrls: ['./target-pokemon-card.component.scss']
})
export class TargetPokemonCardComponent {

  @Input() 
  target: Pokemon

  @Output() 
  targetChangedEvent = new EventEmitter<Pokemon>()

  @Output() 
  targetRemovedEvent = new EventEmitter<Pokemon>()

  terastalyzePokemon() {
    const teraActived = this.target.teraTypeActive()
    this.target.changeTeraStatus(!teraActived)
    this.targetChangedEvent.emit(this.target)
  }

  removePokemon() {
    this.targetRemovedEvent.emit(this.target)
  }

  cardColor(koChance: String) {
    if (koChance == "Guaranteed OHKO") {
      return "#dbd8e3" //gray
    }

    if (koChance.includes("chance to OHKO")) {
      return "#f33d42" //red
    }

    if (koChance.includes("2HKO")) {
      return "#fe9901" //yellow
    }

    return "#30ca2e" //green
  }

}
