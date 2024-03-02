import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() 
  teamMember: TeamMember

  @Output() 
  pokemonActivated = new EventEmitter<number>()

  activate() {
    if (!this.teamMember.active) {
      this.teamMember.active = true
      this.pokemonActivated.emit(this.teamMember.position)
    }    
  }

}
