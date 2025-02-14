import { Component, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatFormField, MatInput } from "@angular/material/input"
import { ImportPokemonButtonComponent } from "@app/shared/buttons/import-pokemon-button/import-pokemon-button.component"
import { TeamBoxComponent } from "@app/shared/team/team-box/team-box.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { SnackbarService } from "@lib/snackbar.service"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
  imports: [WidgetComponent, MatFormField, MatInput, FormsModule, MatButton, TeamBoxComponent, WidgetComponent, ImportPokemonButtonComponent]
})
export class TeamsComponent {
  store = inject(CalculatorStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const pokemonList = pokemon as Pokemon[]

    const teamSlotToImport = this.store.teams().find(t => t.onlyHasDefaultPokemon()) ?? this.store.teams()[this.store.teams().length - 1]

    const teamMembers: TeamMember[] = []

    for (let index = 0; index < pokemonList.length; index++) {
      const pokemon = pokemonList[index]
      const active = index == 0
      teamMembers.push(new TeamMember(pokemon, active))
    }

    if (teamMembers.length < 6) {
      teamMembers.push(new TeamMember(defaultPokemon()))
    }

    const teamToImport = new Team(uuidv4(), teamSlotToImport.active, teamSlotToImport.name, teamMembers)

    this.store.replaceTeam(teamToImport, teamSlotToImport.id)

    this.snackBar.open("Team imported from PokePaste")
  }

  activateTeam(team: Team) {
    this.store.activateTeam(team.id)
  }

  updateTeamName(event: Event) {
    const teamName = (event.target as HTMLInputElement).value
    this.store.updateActiveTeamName(teamName)
  }

  export() {
    const pokemon = this.store.team().teamMembers.map(tm => tm.pokemon)
    this.exportPokeService.export(this.store.team().name, ...pokemon)
  }

  deleteTeam() {
    const pokemon = defaultPokemon()
    const activeIndex = this.store.teams().findIndex(t => t.active)
    const inactiveTeams = this.store.teams().filter(t => !t.active)
    const newTeam = new Team(uuidv4(), true, `Team ${activeIndex + 1}`, [new TeamMember(pokemon, true)])
    inactiveTeams.splice(activeIndex, 0, newTeam)

    this.store.updateTeams(inactiveTeams)

    this.snackBar.open("Team deleted")
  }
}
