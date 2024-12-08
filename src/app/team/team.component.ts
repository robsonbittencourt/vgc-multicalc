import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { Pokemon } from '../../lib/pokemon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  @Input()
  pokemon: Pokemon

  @Input() 
  team: Team

  @Input()
  secondSelection?: Pokemon

  @Input()
  isAttacker: boolean

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>()

  @Output() 
  teamChanged = new EventEmitter<Team>()
  
  @Output() 
  secondAttackerSelected = new EventEmitter<Pokemon>()

  canShowDeleteButton(): boolean {
    return !this.pokemon.isDefault()
  }

  activatePokemon(teamMember: TeamMember) {
    this.team.deactivateAll()
    teamMember.active = true

    this.pokemon = teamMember.pokemon
    this.pokemonChangedEvent.emit(teamMember.pokemon)
  }

  removePokemon() {
    const removedTeamMember = this.team.removeActiveTeamMember()

    if (this.team.isEmpty() || !this.team.haveDefaultPokemon()) {
      this.team.addTeamMember(new TeamMember(defaultPokemon(), false))
    } 

    this.team.activateFirstTeamMember()
    this.pokemon = this.team.activePokemon()

    if (removedTeamMember.pokemon == this.secondSelection) {
      this.secondAttackerSelected.emit(removedTeamMember.pokemon)
    }

    this.pokemonChangedEvent.emit(this.pokemon)
    this.teamChanged.emit(this.team)
  }

  selectSecondAttacker() {
    this.secondAttackerSelected.emit(this.pokemon)
  }

  isSecondSelection(teamMember: TeamMember) {
    return teamMember.pokemon == this.secondSelection
  }

  secondSelectionActive() {
    return this.pokemon == this.secondSelection
  }

  canShowCombineButton() {
    return this.isAttacker && !this.pokemon.isDefault() && (!this.secondSelection || this.team.activePokemon() == this.secondSelection)
  }

  pokemonImported(pokemon: Pokemon) {
    const teamMember = new TeamMember(pokemon, true)
      
    this.team.addTeamMember(teamMember)
    this.activatePokemon(teamMember)
  }

  canImportPokemon() {
    return !this.team.isFull()
  }

  canExportPokemon() {
    return !this.pokemon.isDefault()
  }

  teamMemberOnEdit(): boolean {
    return this.team.activePokemon() == this.pokemon
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    if(!this.team.haveDefaultPokemon() && !this.team.isFull()) {
      this.team.addTeamMember(new TeamMember(defaultPokemon(), false))
    }
    
    this.pokemonChangedEvent.emit(pokemon)
  }

}
