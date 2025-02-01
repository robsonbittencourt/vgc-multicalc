import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, signal } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { RouterOutlet } from "@angular/router"
import { PokemonBuildComponent } from "@app/shared/pokemon-build/pokemon-build/pokemon-build.component"
import { ExportPokemonButtonComponent } from "@app/shared/team/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@app/shared/team/import-pokemon-button/import-pokemon-button.component"
import { PokemonTabComponent } from "@app/shared/team/pokemon-tab/pokemon-tab.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [WidgetComponent, PokemonTabComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, MatIcon, PokemonBuildComponent, RouterOutlet]
})
export class TeamComponent {
  store = inject(CalculatorStore)

  pokemonId = input.required<string>()
  isAttacker = input(false)

  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  combineDamageActive = signal(false)

  constructor() {
    effect(() => {
      if (!this.store.team().hasDefaultPokemon() && !this.store.team().isFull()) {
        const teamMembers = [...this.store.team().teamMembers, new TeamMember(defaultPokemon(), false)]
        const team = new Team(uuidv4(), this.store.team().active, this.store.team().name, teamMembers)

        this.store.replaceActiveTeam(team)
      }
    })
  }

  activatePokemon(pokemonId: string) {
    const members = this.store.team().teamMembers

    if (this.combineDamageActive()) {
      const active1 = members[0].pokemon.id == this.store.attackerId() || members[0].pokemon.id == pokemonId
      const active2 = members[1]?.pokemon.id == this.store.attackerId() || members[1]?.pokemon.id == pokemonId
      const active3 = members[2]?.pokemon.id == this.store.attackerId() || members[2]?.pokemon.id == pokemonId
      const active4 = members[3]?.pokemon.id == this.store.attackerId() || members[3]?.pokemon.id == pokemonId
      const active5 = members[4]?.pokemon.id == this.store.attackerId() || members[4]?.pokemon.id == pokemonId
      const active6 = members[5]?.pokemon.id == this.store.attackerId() || members[5]?.pokemon.id == pokemonId

      if (pokemonId != this.store.attackerId()) {
        this.store.updateSecondAttacker(pokemonId)
      }

      this.store.updateTeamMembersActive(active1, active2, active3, active4, active5, active6)
    } else {
      const active1 = members[0].pokemon.id == pokemonId
      const active2 = members[1]?.pokemon.id == pokemonId
      const active3 = members[2]?.pokemon.id == pokemonId
      const active4 = members[3]?.pokemon.id == pokemonId
      const active5 = members[4]?.pokemon.id == pokemonId
      const active6 = members[5]?.pokemon.id == pokemonId

      this.store.updateTeamMembersActive(active1, active2, active3, active4, active5, active6)
    }
  }

  canShowDeleteButton(): boolean {
    return !this.pokemonOnEdit().isDefault
  }

  removePokemon() {
    const activeMember = this.store.team().teamMembers.find(teamMember => teamMember.pokemon.id === this.pokemonOnEdit().id)!
    const inactiveMembers = this.store.team().teamMembers.filter(teamMember => teamMember.pokemon.id !== activeMember.pokemon.id)
    const emptyTeam = inactiveMembers.length == 0
    const haveDefaultPokemon = inactiveMembers.find(teamMember => teamMember.pokemon.isDefault)

    if (emptyTeam || !haveDefaultPokemon) {
      inactiveMembers.push(new TeamMember(defaultPokemon(), false))
    }

    const teamMembers = [new TeamMember(inactiveMembers[0].pokemon, true), ...inactiveMembers.slice(1)]
    const team = new Team(uuidv4(), this.store.team().active, this.store.team().name, teamMembers)

    this.store.replaceActiveTeam(team)

    if (this.isSecondSelection(activeMember)) {
      this.store.updateSecondAttacker("")
    }
  }

  selectSecondAttacker() {
    if (this.combineDamageActive()) {
      this.store.updateSecondAttacker("")
    }

    this.combineDamageActive.set(!this.combineDamageActive())
  }

  isSecondSelection(teamMember: TeamMember) {
    return !teamMember.pokemon.isDefault && teamMember.pokemon.id === this.store.secondAttackerId()
  }

  showTeamMemberActive(teamMember: TeamMember) {
    const isFirstActive = teamMember.active && !this.isSecondSelection(teamMember)
    const isSecondActive = this.isSecondSelection(teamMember) && this.isAttacker()

    return isFirstActive || isSecondActive
  }

  canShowCombineButton() {
    return this.isAttacker() && !this.pokemonOnEdit().isDefault && this.pokemonOnEdit().id === this.store.attackerId()
  }

  pokemonImported(pokemon: Pokemon) {
    const newTeamMember = new TeamMember(pokemon, false)

    const actualTeam = this.store.team()
    const newTeamMembers = [...actualTeam.teamMembers]
    const indexToInsert = newTeamMembers.length - 1
    const removeDefaultPokemon = newTeamMembers.length == 6

    if (removeDefaultPokemon) {
      newTeamMembers.splice(indexToInsert, 1, newTeamMember)
    } else {
      newTeamMembers.splice(indexToInsert, 0, newTeamMember)
    }

    const newTeam = new Team(actualTeam.id, actualTeam.active, actualTeam.name, newTeamMembers)

    this.store.replaceActiveTeam(newTeam)
  }

  canImportPokemon() {
    return !this.store.team().isFull()
  }

  canExportPokemon() {
    return !this.pokemonOnEdit().isDefault
  }

  teamMemberOnEdit(): boolean {
    return this.pokemonOnEdit().equals(this.store.team().activePokemon()) || this.pokemonOnEdit().id === this.store.secondAttackerId()
  }
}
