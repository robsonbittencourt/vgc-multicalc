import { DOCUMENT, isPlatformBrowser } from "@angular/common"
import { afterNextRender, computed, inject, Injectable, Injector, PLATFORM_ID, signal, Signal } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { BackNavigationService } from "@app/services/back-navigation.service"

export interface CreationCancelResult {
  originTab: string | null
  pokemonId: string | null
}

@Injectable()
export class MobileCreationFlowService {
  private store = inject(CalcStore)
  private overlay = inject(MobileTableOverlayService)
  private backNavigation = inject(BackNavigationService)
  private injector = inject(Injector)
  private platformId = inject(PLATFORM_ID)
  private document = inject(DOCUMENT)

  readonly adding = signal(false)

  private settling = signal(false)
  private originTab: string | null = null
  private teamBeforeCreationId: string | null = null
  private editingId: Signal<string | null | undefined> = signal(null)

  readonly isCreating = computed(() => this.adding())

  readonly overlayPokemonId = computed(() => (this.adding() ? "" : (this.editingId() ?? "")))

  readonly hidingContent = computed(() => this.overlay.isAnyOpen() || this.settling() || (this.adding() && !this.editingId()))

  readonly hasNoTeamPokemon = computed(() => this.store.team().teamMembers.length === 0 && !this.adding() && !this.overlay.isAnyOpen())

  trackEditingId(editingId: Signal<string | null | undefined>) {
    this.editingId = editingId
  }

  start(originTab: string | null) {
    this.originTab = originTab
    this.adding.set(true)
    this.backNavigation.push({ kind: "creation", originTab })
  }

  currentOrigin() {
    return this.originTab
  }

  startedFromAnotherTab() {
    return this.adding() && this.originTab !== null
  }

  commit(name: string): string {
    this.originTab = null
    this.settling.set(true)

    const newId = this.store.addPokemonToTeam(name)

    this.adding.set(false)
    this.revealWhenSettled()

    return newId
  }

  private revealWhenSettled() {
    afterNextRender(() => this.settling.set(false), { injector: this.injector })
  }

  commitCustomSet(set: CustomSet): string {
    this.originTab = null
    this.settling.set(true)

    const newId = this.store.addPokemonToTeam(set.basePokemonName)

    this.adding.set(false)
    this.store.selectCustomSet(newId, set.id)
    this.revealWhenSettled()

    return newId
  }

  cancel(): CreationCancelResult {
    const originTab = this.originTab

    this.originTab = null
    this.adding.set(false)

    if (originTab !== null) {
      this.restoreTeamBeforeCreation()

      return { originTab, pokemonId: null }
    }

    return { originTab: null, pokemonId: this.activeOrFirstMemberId() }
  }

  activeOrFirstMemberId(): string | null {
    const team = this.store.team()

    return team.activePokemon()?.id ?? team.teamMembers[0]?.pokemon.id ?? null
  }

  rememberTeamBeforeCreation(teamId: string) {
    this.teamBeforeCreationId = teamId
  }

  restoreTeamBeforeCreation() {
    const previousId = this.teamBeforeCreationId

    this.teamBeforeCreationId = null

    this.ensureVisibleTeamIsActive(previousId)
    this.scrollToActiveTeam("auto")
  }

  ensureVisibleTeamIsActive(preferredId: string | null = null) {
    if (!this.store.team().isEmpty()) return

    const preferredTeam = preferredId ? this.store.teams().find(t => t.id === preferredId && !t.isEmpty()) : undefined
    const teamToActivate = preferredTeam ?? this.store.teams().find(t => !t.isEmpty())

    if (!teamToActivate) return

    this.store.activateTeam(teamToActivate.id)
  }

  scrollToActiveTeam(behavior: ScrollBehavior = "smooth") {
    if (!isPlatformBrowser(this.platformId)) return

    const activeTeamId = this.store.team().id

    requestAnimationFrame(() => {
      const teamElement = this.document.querySelector<HTMLElement>(`[data-team-id="${activeTeamId}"]`)

      if (!teamElement) return

      const container = teamElement.closest<HTMLElement>(".mobile-teams-grid")

      if (!container) return

      const teamBounds = teamElement.getBoundingClientRect()
      const containerBounds = container.getBoundingClientRect()
      const offset = teamBounds.top - containerBounds.top + container.scrollTop
      const targetTop = offset - (container.clientHeight - teamBounds.height) / 2

      container.scrollTo({ top: Math.max(0, targetTop), behavior })
    })
  }

  enterTeamsTab() {
    this.ensureVisibleTeamIsActive()
    this.scrollToActiveTeam("auto")
  }
}
