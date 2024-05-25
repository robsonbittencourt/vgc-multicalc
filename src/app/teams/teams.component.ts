import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  team: Team
  pokePaste = ""
  errorMessagePokePaste: string = ""

  @Input() 
  teams: Team[]

  @Output() 
  teamChanged = new EventEmitter<Team>()

  constructor(private pokePasteService: PokePasteParserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.team = this.activeTeam()
  }

  activeTeam(): Team {
    return this.teams.find(t => t.active)!
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      const pokemonList = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      this.team.deleteAll()

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        this.team.addTeamMember(new TeamMember(pokemon, index))        
      }

      this.team.activateFirstTeamMember()
      this.teamChanged.emit(this.team)
      
      // this.pokemon = this.team[0].pokemon
      // this.pokemonChangedEvent.emit(this.pokemon)
      this._snackBar.open("Pokémon from PokePaste added!", "", { duration: 4000 });
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  activateTeam(team: Team) {
    this.teams.forEach(t => t.active = false)
    team.active = true
    this.team = team

    this.teamChanged.emit(this.team)
  }

}
