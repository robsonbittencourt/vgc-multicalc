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

  @Input() 
  showDeleteButton: boolean

  @Input() 
  canShowAsActivated: boolean

  @Output() 
  teamMemberActivated = new EventEmitter<number>()

  @Output() 
  pokemonRemoved = new EventEmitter<number>()

  commanderActivated = false

  activate() {
    this.teamMember.active = true
    this.teamMemberActivated.emit(this.teamMember.position)
  }

  toogleCommanderAbility() {
    this.teamMember.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
    this.teamMemberActivated.emit(this.teamMember.position)
  }

  removePokemon() {
    this.pokemonRemoved.emit(this.teamMember.position)
  }

  cardStyle(): any {
    const cardStyle = { 'border': '3px', 'border-style': 'solid', 'border-color': '#8544ee' }
    
    if (this.teamMember.active && this.canShowAsActivated) {
      return cardStyle
    }

    return null
  }

}
