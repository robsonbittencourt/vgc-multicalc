import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output, signal, viewChild } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { PokemonTabComponent } from "@features/team/pokemon-tab/pokemon-tab.component"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { Stats } from "@lib/types"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatIcon, WidgetComponent, PokemonTabComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, PokemonBuildComponent]
})
export class TeamComponent {
  store = inject(CalculatorStore)

  pokemonId = input.required<string>()
  isAttacker = input(false)
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)

  teamMemberSelected = output<string>()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  combineDamageActive = signal(false)

  pokemonBuild = viewChild<PokemonBuildComponent>("pokemonBuild")

  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  canImportPokemon = computed(() => !this.store.team().isFull())

  canExportPokemon = computed(() => !this.pokemonOnEdit().isDefault)

  teamMemberOnEdit = computed(() => this.pokemonOnEdit().equals(this.store.team().activePokemon()) || this.pokemonOnEdit().id === this.store.secondAttackerId())

  targetOnEdit = computed(() => this.store.targets().some(t => t.pokemon.id === this.pokemonOnEdit().id))

  constructor() {
    effect(() => {
      if (!this.store.team().hasDefaultPokemon() && !this.store.team().isFull()) {
        const teamMembers = [...this.store.team().teamMembers, new TeamMember(defaultPokemon(), false)]
        const team = new Team(uuidv4(), this.store.team().active, this.store.team().name, teamMembers)

        this.store.replaceActiveTeam(team)
      }
    })
  }

  scrollToPokemonSelector() {
    this.pokemonBuild()?.scrollToPokemonSelector()
  }

  activatePokemon(pokemonId: string) {
    if (this.combineDamageActive()) {
      this.selectedPokemon(pokemonId)
    } else {
      this.selectedPokemonRemovingSecond(pokemonId)
    }

    setTimeout(() => {
      if (this.pokemonOnEdit().isDefault) {
        this.pokemonBuild()?.focusPokemonSelector()
      } else {
        this.pokemonBuild()?.showDefaultView()
      }
    }, 0)

    this.teamMemberSelected.emit(pokemonId)
  }

  activateSecondPokemon(pokemonId: string) {
    if (this.isAttacker()) {
      this.selectedPokemon(pokemonId)
    } else {
      this.selectedPokemonRemovingSecond(pokemonId)
    }
  }

  private selectedPokemon(pokemonId: string) {
    const members = this.store.team().teamMembers

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
  }

  private selectedPokemonRemovingSecond(pokemonId: string) {
    const members = this.store.team().teamMembers

    this.store.updateSecondAttacker("")

    const active1 = members[0].pokemon.id == pokemonId
    const active2 = members[1]?.pokemon.id == pokemonId
    const active3 = members[2]?.pokemon.id == pokemonId
    const active4 = members[3]?.pokemon.id == pokemonId
    const active5 = members[4]?.pokemon.id == pokemonId
    const active6 = members[5]?.pokemon.id == pokemonId

    this.store.updateTeamMembersActive(active1, active2, active3, active4, active5, active6)
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
    this.teamMemberSelected.emit(team.activePokemon().id)

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

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const actualTeam = this.store.team()

    const newTeamMemberActive = actualTeam.activePokemon().isDefault
    const newTeamMember = new TeamMember(pokemon as Pokemon, newTeamMemberActive)

    const newTeamMembers = [...actualTeam.teamMembers]
    const indexToInsert = newTeamMembers.length - 1
    const removeDefaultPokemon = newTeamMembers.length == 6

    if (removeDefaultPokemon) {
      newTeamMembers.splice(indexToInsert, 1, newTeamMember)
    } else {
      newTeamMembers.splice(indexToInsert, 0, newTeamMember)
    }

    const newTeam = new Team(actualTeam.id, actualTeam.active, actualTeam.name, newTeamMembers)

    this.teamMemberSelected.emit((pokemon as Pokemon).id)
    this.store.replaceActiveTeam(newTeam)
  }
}
