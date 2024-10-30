import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { SnackbarService } from '../../lib/snackbar.service';
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component';
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component';

import { TeamBoxComponent } from '../team-box/team-box.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  standalone: true,
  imports: [MatInput, ReactiveFormsModule, FormsModule, MatButton, TeamBoxComponent]
})
export class TeamsComponent {
  
  teams = input.required<Team[]>()

  teamChanged = output<Team>()

  private pokePasteService = inject(PokePasteParserService)
  private snackBar = inject(SnackbarService)
  private dialog = inject(MatDialog)

  team: Team

  ngOnInit() {
    this.team = this.activeTeam()
  }

  activeTeam(): Team {
    return this.teams().find(t => t.active)!
  }

  async addFromPokePaste() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, { 
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      const teamToImport = this.teams().find(t => t.onlyHasDefaultPokemon()) ?? this.teams()[this.teams.length - 1]
      teamToImport.deleteAll()

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        teamToImport.addTeamMember(new TeamMember(pokemon))        
      }

      teamToImport.activateFirstTeamMember()
      this.teamChanged.emit(teamToImport)
      
      this.snackBar.open("Team imported from PokePaste");
    })
  }

  activateTeam(team: Team) {
    this.teams().forEach(t => t.active = false)
    team.active = true
    this.team = team

    this.teamChanged.emit(this.team)
  }

  export() {
    this.dialog.open(TeamExportModalComponent, { 
      data: { 
        title: this.team.name,
        content: this.team.exportToShowdownFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  deleteTeam() {
    this.team.deleteAll()
    this.team.addTeamMember(new TeamMember(defaultPokemon(), true))
    this.teamChanged.emit(this.team)
    this.snackBar.open("Team deleted");
  }

}
