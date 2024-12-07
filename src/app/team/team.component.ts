import { Component, computed, effect, inject, input, output, signal } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { RouterOutlet } from '@angular/router'
import { DataStore } from 'src/data/data-store'
import { defaultPokemon } from 'src/lib/default-pokemon'
import { Team } from 'src/lib/team'
import { TeamMember } from 'src/lib/team-member'
import { Pokemon } from '../../lib/pokemon'
import { ExportPokemonButtonComponent } from '../export-pokemon-button/export-pokemon-button.component'
import { ImportPokemonButtonComponent } from '../import-pokemon-button/import-pokemon-button.component'
import { PokemonBuildComponent } from '../pokemon-build/pokemon-build.component'
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [PokemonTabComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, MatIcon, PokemonBuildComponent, RouterOutlet]
})
export class TeamComponent {

  data = inject(DataStore)

  pokemonId = input<string>(this.data.team().activePokemon().id)
  isAttacker = input(false)
  
  teamMemberSelected = output<string>()
  teamMemberRemoved = output()

  pokemonOnEdit = computed(() => this.data.findPokemonById(this.pokemonId()))
  
  combineDamageActive = signal(false)

  constructor() {
    effect(() => {
      if(!this.data.team().haveDefaultPokemon() && !this.data.team().isFull()) {
        const teamMembers = [ ...this.data.team().teamMembers(), new TeamMember(defaultPokemon(), false) ]
        const team = new Team(this.data.team().active, this.data.team().name, teamMembers)

        this.data.replaceActiveTeam(team)
      }
    },
    {
      allowSignalWrites: true
    }) 
  }

  activatePokemon(pokemonId: string) {
    const members = this.data.team().teamMembers()

    this.teamMemberSelected.emit(pokemonId)

    if (this.combineDamageActive()) {
      const active1 = members[0].pokemon.id == this.data.attackerId() || members[0].pokemon.id == pokemonId
      const active2 = members[1]?.pokemon.id == this.data.attackerId() || members[1]?.pokemon.id == pokemonId
      const active3 = members[2]?.pokemon.id == this.data.attackerId() || members[2]?.pokemon.id == pokemonId
      const active4 = members[3]?.pokemon.id == this.data.attackerId() || members[3]?.pokemon.id == pokemonId
      const active5 = members[4]?.pokemon.id == this.data.attackerId() || members[4]?.pokemon.id == pokemonId
      const active6 = members[5]?.pokemon.id == this.data.attackerId() || members[5]?.pokemon.id == pokemonId

      this.data.updateTeamMembersActive(active1, active2, active3, active4, active5, active6)
      this.data.updateSecondAttacker(pokemonId)  
    } else {
      const active1 = members[0].pokemon.id == pokemonId
      const active2 = members[1]?.pokemon.id == pokemonId
      const active3 = members[2]?.pokemon.id == pokemonId
      const active4 = members[3]?.pokemon.id == pokemonId
      const active5 = members[4]?.pokemon.id == pokemonId
      const active6 = members[5]?.pokemon.id == pokemonId

      this.data.updateTeamMembersActive(active1, active2, active3, active4, active5, active6)
      this.data.updateAttacker(pokemonId)
    }    
  }

  canShowDeleteButton(): boolean {
    return !this.pokemonOnEdit().isDefault()
  }

  removePokemon() {
    const activeMember = this.data.team().teamMembers().find(teamMember => teamMember.pokemon.id === this.pokemonOnEdit().id)!
    const inactiveMembers = this.data.team().teamMembers().filter(teamMember => teamMember.pokemon.id !== activeMember.pokemon.id)
    const emptyTeam = inactiveMembers.length == 0
    const haveDefaultPokemon = inactiveMembers.find(teamMember => teamMember.pokemon.isDefault())

    if (emptyTeam || !haveDefaultPokemon) {
      inactiveMembers.push(new TeamMember(defaultPokemon(), false))
    }

    const teamMembers = [ new TeamMember(inactiveMembers[0].pokemon, true), ...inactiveMembers.slice(1) ]
    const team = new Team(this.data.team().active, this.data.team().name, teamMembers)

    this.data.replaceActiveTeam(team)

    if (this.isSecondSelection(activeMember)) {
      this.data.updateSecondAttacker("")
    }

    this.teamMemberRemoved.emit()
    this.data.updateAttacker(team.activePokemon().id)
  }

  selectSecondAttacker() {
    if (this.combineDamageActive()) {
      this.data.updateSecondAttacker("")
    }

    this.combineDamageActive.set(!this.combineDamageActive())    
  }

  isSecondSelection(teamMember: TeamMember) {
    return !teamMember.pokemon.isDefault() && teamMember.pokemon.id === (this.data.secondAttackerId())
  }

  canShowCombineButton() {
    return this.isAttacker() && !this.pokemonOnEdit().isDefault() && this.pokemonOnEdit().id === this.data.attackerId()
  }

  pokemonImported(pokemon: Pokemon) {
    const teamMember = new TeamMember(pokemon, false)

    this.data.team().addTeamMember(teamMember)
      
    this.data.replaceActiveTeam(this.data.team())
  }

  canImportPokemon() {
    return !this.data.team().isFull()
  }

  canExportPokemon() {
    return !this.pokemonOnEdit().isDefault()
  }

  teamMemberOnEdit(): boolean {
    return this.pokemonOnEdit().equals(this.data.team().activePokemon()) || this.pokemonOnEdit().id === this.data.secondAttackerId()
  }

}
