import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-target-pokemon-card',
  templateUrl: './target-pokemon-card.component.html',
  styleUrls: ['./target-pokemon-card.component.scss']
})
export class TargetPokemonCardComponent {

  @Input() 
  target: Target

  @Output() 
  targetChangedEvent = new EventEmitter<Target>()

  @Output() 
  targetRemovedEvent = new EventEmitter<Target>()

  commanderActivated = false

  toogleCommanderAbility() {
    this.target.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
    this.targetChangedEvent.emit(this.target)
  }

  terastalyzePokemon() {
    const teraActived = !this.target.pokemon.teraTypeActive
    this.target.pokemon.changeTeraStatus(teraActived)

    this.targetChangedEvent.emit(this.target)
  }

  removePokemon() {
    this.targetRemovedEvent.emit(this.target)
  }

  cardColor(koChance: String) {
    if (koChance == "guaranteed OHKO") {
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
