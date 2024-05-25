import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Target } from 'src/lib/target';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { SnackbarService } from '../snackbar.service';
import { Koffing } from 'koffing';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  team: Team
  teamText = ""
  errorMessagePokePaste: string = ""

  @Input() 
  teams: Team[]

  @Output() 
  teamChanged = new EventEmitter<Team>()

  @Output() 
  targetsAdded = new EventEmitter<Target[]>()

  constructor(private pokePasteService: PokePasteParserService, private _snackBar: SnackbarService) { }

  ngOnInit() {
    this.team = this.activeTeam()
  }

  activeTeam(): Team {
    return this.teams.find(t => t.active)!
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""

      const pokemonList = await this.pokePasteService.parse(this.teamText)
      this.team.deleteAll()

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        this.team.addTeamMember(new TeamMember(pokemon, index))        
      }

      this.team.activateFirstTeamMember()
      this.teamChanged.emit(this.team)
      
      this._snackBar.open("Team imported from PokePaste");
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid PokePaste. Check if it is the version with EVs"
    } finally {
      this.teamText = ""
    }
  }

  activateTeam(team: Team) {
    this.teams.forEach(t => t.active = false)
    team.active = true
    this.team = team

    this.teamChanged.emit(this.team)
  }

  addToTargets() {
    const targets = this.team.teamMembers().map(t => new Target(t.pokemon, t.position))
    this.targetsAdded.emit(targets)
    this._snackBar.open("Team added to Opponent side");
  }

  deleteTeam() {
    this.team.deleteAll()
    this.team.addTeamMember(new TeamMember(defaultPokemon(), 0, true))
    this.teamChanged.emit(this.team)
    this._snackBar.open("Team deleted");
  }

}
