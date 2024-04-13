import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  canSelectSecondPokemon: boolean

  @Output() 
  teamMemberActivated = new EventEmitter<number>()

  @Output() 
  secondTeamMemberActivated = new EventEmitter<number>()

  @Output() 
  pokemonRemoved = new EventEmitter<number>()

  commanderActivated = false

  activate() {
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
    if(this.teamMember.damageResult) {
      return this.styleWithDamage()
    } else {
      return this.styleWithoutDamage()
    }
  }

  private styleWithDamage(): any {
    const cardStyleSelectPokemon = { 'background-color': '#e7def6' }
    const cardStyle = { 'background-color': this.cardColor(this.teamMember.damageResult.koChance) }
    const cardWithBorder = { 'border': '4px', 'border-style': 'solid', 'border-color': '#8544ee' }

    if (this.teamMember.active && this.teamMember.pokemon.isDefault()) {
      return {...cardStyleSelectPokemon, ...cardWithBorder} 
    }

    if (this.teamMember.pokemon.isDefault()) {
      return cardStyleSelectPokemon 
    }
    
    if (this.teamMember.active) {
      return {...cardStyle, ...cardWithBorder}
    }

    return cardStyle
  }

  private styleWithoutDamage() {
    const cardStyle = { 'border': '3px', 'border-style': 'solid', 'border-color': '#8544ee' }
    
    if (this.teamMember.active) {
      return cardStyle
    }

    return null
  }

  private cardColor(koChance: String) {
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

  addSecondAttacker(event: Event) {
    event.stopPropagation()
    this.secondTeamMemberActivated.emit(this.teamMember.position)
  }


  terastalyzePokemon() {
    const teraActived = !this.teamMember.pokemon.teraTypeActive
    this.teamMember.pokemon.changeTeraStatus(teraActived)

    this.teamMemberActivated.emit(this.teamMember.position)
  }
}
