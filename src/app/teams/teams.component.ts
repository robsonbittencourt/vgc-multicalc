import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  pokePaste = ""
  errorMessagePokePaste: string = ""

  @Input() 
  team: TeamMember[]

  @Output() 
  teamChanged = new EventEmitter<TeamMember[]>()

  constructor(private pokePasteService: PokePasteParserService, private _snackBar: MatSnackBar) { }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      const pokemonList = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      this.team = []

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        this.team.push(new TeamMember(pokemon, index))        
      }

      this.team[0].active = true
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

}
