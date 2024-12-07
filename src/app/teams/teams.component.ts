import { NoopScrollStrategy } from '@angular/cdk/overlay'
import { Component, inject, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatInput } from '@angular/material/input'
import { DataStore } from 'src/data/data-store'
import { defaultPokemon } from 'src/lib/default-pokemon'
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service'
import { Team } from 'src/lib/team'
import { TeamMember } from 'src/lib/team-member'
import { SnackbarService } from '../../lib/snackbar.service'
import { TeamBoxComponent } from '../team-box/team-box.component'
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component'
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  standalone: true,
  imports: [MatInput, ReactiveFormsModule, FormsModule, MatButton, TeamBoxComponent]
})
export class TeamsComponent {

  teamChanged = output<Team>()
  
  data = inject(DataStore)
  private pokePasteService = inject(PokePasteParserService)
  private snackBar = inject(SnackbarService)
  private dialog = inject(MatDialog)

  async addFromPokePaste() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, { 
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      const teamToImport = this.data.teams().find(t => t.onlyHasDefaultPokemon()) ?? this.data.teams()[this.data.teams().length - 1]
      teamToImport.deleteAll()

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        teamToImport.addTeamMember(new TeamMember(pokemon))        
      }

      teamToImport.addTeamMember(new TeamMember(defaultPokemon()))

      teamToImport.activateFirstTeamMember()

      this.data.updateTeams(this.data.teams())
      this.data.updateAttacker(teamToImport.activePokemon().id)
      
      this.teamChanged.emit(teamToImport)
      
      this.snackBar.open("Team imported from PokePaste")
    })
  }

  activateTeam(team: Team) {
    this.data.teams().forEach(t => t.id == team.id ? t.active = true : t.active = false)
    this.data.updateTeams(this.data.teams())
    this.data.updateAttacker(team.activePokemon().id)

    this.teamChanged.emit(team)
  }

  export() {
    this.dialog.open(TeamExportModalComponent, { 
      data: { 
        title: this.data.team().name,
        content: this.data.team().exportToShowdownFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  deleteTeam() {
    const pokemon = defaultPokemon()
    const activeIndex = this.data.teams().findIndex(t => t.active)
    const inactiveTeams = this.data.teams().filter(t => !t.active)
    const newTeam = new Team(true, `Team ${activeIndex + 1}`, [ new TeamMember(pokemon, true) ])
    inactiveTeams.splice(activeIndex, 0, newTeam)
    
    this.data.updateTeams(inactiveTeams)
    this.data.updateAttacker(pokemon.id)

    this.teamChanged.emit(newTeam)

    this.snackBar.open("Team deleted");
  }

}
