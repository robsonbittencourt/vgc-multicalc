import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, model, output, signal, viewChild } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { PokemonTabComponent } from "@features/team/pokemon-tab/pokemon-tab.component"
import { Pokemon, TeamMember } from "@multicalc/model"
import { SnackbarService } from "@app/services/snackbar.service"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer"
import { DeviceDetectorService } from "@app/services/device-detector.service"

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatIcon, WidgetComponent, PokemonTabComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, SaveSetButtonComponent, PokemonBuildComponent]
})
export class TeamComponent {
  store = inject(CalcStore)
  private snackbar = inject(SnackbarService)
  deviceDetectorService = inject(DeviceDetectorService)

  pokemonId = input<string>()
  isAttacker = input(false)
  addTargetMode = input(false)
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)

  teamMemberSelected = output<string>()
  targetAddedByName = output<string>()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  combineDamageActive = signal(false)

  openBuildPokemonTable() {
    this.pokemonBuild()?.openPokemonTable()
  }

  pokemonBuild = viewChild<PokemonBuildComponent>("pokemonBuild")

  pokemonOnEdit = computed(() => {
    const pokemon = this.store.findNullablePokemonById(this.pokemonId() ?? "")
    return pokemon || this.store.team().activePokemon()
  })

  addingPokemon = model(false)

  buildPokemonId = computed(() => (this.addingPokemon() || this.addTargetMode() ? undefined : this.pokemonId()))

  isAddMode = computed(() => this.addingPokemon() || this.addTargetMode())

  showAddTab = computed(() => !this.store.team().isFull())

  canImportPokemon = computed(() => !this.store.team().isFull())

  private hasRealPokemonOnEdit = computed(() => {
    const pokemon = this.pokemonOnEdit()
    return pokemon != undefined
  })

  canDuplicatePokemon = computed(() => !this.isAddMode() && this.deviceDetectorService.isDesktop() && this.teamMemberOnEdit() && this.hasRealPokemonOnEdit() && !this.store.team().isFull())

  canExportPokemon = computed(() => this.hasRealPokemonOnEdit())

  teamMemberOnEdit = computed(() => {
    const onEdit = this.pokemonOnEdit()

    if (onEdit == undefined) return true

    const active = this.store.team().activePokemon()

    return (active != undefined && onEdit.equals(active)) || onEdit.id === this.store.secondAttackerId()
  })

  targetOnEdit = computed(() => {
    const onEdit = this.pokemonOnEdit()

    if (onEdit == undefined) return false

    return this.store.targets().some(t => t.pokemon.id === onEdit.id || t.secondPokemon?.id === onEdit.id)
  })

  isEditingCustomSet = computed(() => this.store.isEditingCustomSet())

  exitCustomSetEditMode() {
    this.store.exitCustomSetEditMode()
  }

  scrollToPokemonSelector() {
    this.pokemonBuild()?.scrollToPokemonSelector()
  }

  focusPokemonSelector() {
    this.pokemonBuild()?.focusPokemonSelector()
  }

  startAddingPokemon() {
    this.addingPokemon.set(true)

    setTimeout(() => this.pokemonBuild()?.focusPokemonSelector(), 0)
  }

  pokemonAdded(pokemonName: string) {
    if (this.addTargetMode()) {
      this.addingPokemon.set(false)
      this.targetAddedByName.emit(pokemonName)

      return
    }

    const id = this.store.addPokemonToTeam(pokemonName)

    this.store.activateTeamMemberByPokemonId(id)
    this.addingPokemon.set(false)
    this.teamMemberSelected.emit(id)
  }

  backToActivePokemon() {
    const active = this.store.team().activePokemon()

    if (active != undefined) {
      this.activatePokemon(active.id)
    } else {
      this.startAddingPokemon()
    }
  }

  activatePokemon(pokemonId: string) {
    this.addingPokemon.set(false)
    this.store.clearActiveSet()

    if (this.combineDamageActive()) {
      this.selectedPokemon(pokemonId)
    } else {
      this.selectedPokemonRemovingSecond(pokemonId)
    }

    setTimeout(() => {
      const onEdit = this.pokemonOnEdit()

      if (onEdit == undefined) {
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
    return this.hasRealPokemonOnEdit()
  }

  duplicatePokemon() {
    const previousTeam = this.store.team()
    const memberId = this.pokemonOnEdit()!.id
    const team = previousTeam.duplicateMember(memberId)

    this.store.replaceActiveTeam(team)
    this.snackbar.open("Pokemon duplicated")
  }

  removePokemon() {
    const previousTeam = this.store.team()
    const activeMember = previousTeam.teamMembers.find(teamMember => teamMember.pokemon.id === this.pokemonOnEdit()!.id)!
    const team = previousTeam.removeMember(activeMember.pokemon.id)

    this.store.replaceActiveTeam(team)

    const newActive = team.activePokemon()

    if (newActive != undefined) {
      this.teamMemberSelected.emit(newActive.id)
    } else {
      this.startAddingPokemon()
    }

    if (this.isSecondSelection(activeMember)) {
      this.store.updateSecondAttacker("")
    }

    this.snackbar.open("Pokemon deleted")
  }

  selectSecondAttacker() {
    if (this.combineDamageActive()) {
      this.store.updateSecondAttacker("")
    }

    this.combineDamageActive.set(!this.combineDamageActive())
  }

  isSecondSelection(teamMember: TeamMember) {
    return teamMember.pokemon.id === this.store.secondAttackerId()
  }

  showTeamMemberActive(teamMember: TeamMember) {
    const isFirstActive = teamMember.active && !this.isSecondSelection(teamMember)
    const isSecondActive = this.isSecondSelection(teamMember) && this.isAttacker()

    return isFirstActive || isSecondActive
  }

  canShowCombineButton() {
    return this.isAttacker() && this.hasRealPokemonOnEdit() && this.pokemonOnEdit()!.id === this.store.attackerId()
  }

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const wasAddingPokemon = this.addingPokemon()
    const previousTeam = this.store.team()
    const importedPokemon = pokemon as Pokemon
    const team = previousTeam.addMember(importedPokemon)

    this.store.replaceActiveTeam(team)

    if (wasAddingPokemon) {
      this.store.activateTeamMemberByPokemonId(importedPokemon.id)
    }

    this.addingPokemon.set(false)
    this.teamMemberSelected.emit(importedPokemon.id)
    this.snackbar.open("Pokemon imported")
  }
}
