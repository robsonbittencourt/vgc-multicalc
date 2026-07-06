import { computed, inject, Injectable } from "@angular/core"
import { MOVESETS } from "@data/moveset-data"
import { pokemonByRegulation } from "@adapters"
import { CalcStore } from "./calc-store"
import { SpeedCalcMode, SpeedCalcOptions, SpeedCalc, SPEED_CALC_MODES, SpeedFilterType } from "@multicalc/speed-calc"
import { patchState, signalStore, withState } from "@ngrx/signals"
import { Regulation } from "@multicalc/types"

const REGULATION_FILTER_LABELS: Record<string, Regulation> = {
  "Reg M-B": "MB"
}

const OPPONENTS_FILTER_LABEL = "Opponents"

type SpeedCalcOptionsState = {
  topUsage: string
  filterType: SpeedFilterType
  regulation: Regulation
  teamId: string
  showMyTeam: boolean
  targetName: string
  mode: SpeedCalcMode
  speedModifier: number
  speedDropActive: boolean
  paralyzedActive: boolean
}

const initialState: SpeedCalcOptionsState = {
  topUsage: "60",
  filterType: "regulation",
  regulation: "MB",
  teamId: "",
  showMyTeam: true,
  targetName: "",
  mode: SpeedCalcMode.StatsAndMeta,
  speedModifier: 0,
  speedDropActive: false,
  paralyzedActive: false
}

@Injectable({ providedIn: "root" })
export class SpeedCalcOptionsStore extends signalStore({ protectedState: false }, withState(initialState)) {
  private calcStore = inject(CalcStore)
  private speedCalcService = new SpeedCalc()

  constructor() {
    super()

    const initialMode = this.speedCalcService.hasStatisticsForRegulation(this.regulation()) ? SpeedCalcMode.StatsAndMeta : SpeedCalcMode.Stats
    patchState(this, () => ({ mode: initialMode }))
  }

  readonly options = computed(
    () =>
      new SpeedCalcOptions({
        topUsage: this.topUsage(),
        filterType: this.filterType(),
        regulation: this.regulation(),
        teamId: this.teamId(),
        showMyTeam: this.showMyTeam(),
        targetName: this.targetName(),
        mode: this.mode(),
        speedModifier: this.speedModifier(),
        speedDropActive: this.speedDropActive(),
        paralyzedActive: this.paralyzedActive()
      })
  )

  readonly filterOptions = computed(() => {
    const teamNames = this.calcStore
      .teams()
      .filter(t => !t.isEmpty())
      .map(t => t.name)

    return [...Object.keys(REGULATION_FILTER_LABELS), OPPONENTS_FILTER_LABEL, ...teamNames]
  })

  readonly selectedFilter = computed(() => {
    if (this.filterType() === "opponents") return OPPONENTS_FILTER_LABEL

    if (this.filterType() === "team") {
      return this.calcStore.teams().find(t => t.id === this.teamId())?.name ?? OPPONENTS_FILTER_LABEL
    }

    return Object.keys(REGULATION_FILTER_LABELS).find(label => REGULATION_FILTER_LABELS[label] === this.regulation()) ?? "Reg M-B"
  })

  readonly showTopUsage = computed(() => this.filterType() === "regulation")

  readonly regulationsList = computed(() => ["MB"])

  readonly availableModes = computed(() => {
    if (this.filterType() !== "regulation" || !this.speedCalcService.hasStatisticsForRegulation(this.regulation())) {
      return SPEED_CALC_MODES.filter(m => m !== SpeedCalcMode.StatsAndMeta && m !== SpeedCalcMode.Meta)
    }

    return SPEED_CALC_MODES
  })

  readonly pokemonNamesByReg = computed(() => {
    const names = this.filterType() === "regulation" ? this.regulationPokemonNames() : this.filteredPokemonNames()

    return [...new Set(names)].sort()
  })

  private regulationPokemonNames(): string[] {
    const includeAll = this.topUsage() === "All"
    return pokemonByRegulation(this.regulation() as Regulation, undefined, MOVESETS, includeAll).map(s => s.name)
  }

  private filteredPokemonNames(): string[] {
    if (this.filterType() === "opponents") {
      return this.calcStore
        .targets()
        .flatMap(t => t.pokemons())
        .map(p => p.name)
    }

    const team = this.calcStore.teams().find(t => t.id === this.teamId())

    return team ? team.teamMembers.map(m => m.pokemon).map(p => p.name) : []
  }

  toggleIcyWind(enabled: boolean) {
    const speedModifier = enabled ? -1 : 0
    patchState(this, () => ({ speedModifier: speedModifier }))
    patchState(this, () => ({ speedDropActive: enabled }))
  }

  toggleParalyze(enabled: boolean) {
    patchState(this, () => ({ paralyzedActive: enabled }))
  }

  updateSpeedModifier(speedModifier: number) {
    patchState(this, () => ({ speedModifier }))
  }

  updateFilter(filter: string) {
    if (filter === OPPONENTS_FILTER_LABEL) {
      patchState(this, () => ({ filterType: "opponents" as SpeedFilterType, ...this.modeFallback() }))
      this.clearTargetName()
      return
    }

    const regulation = REGULATION_FILTER_LABELS[filter]

    if (regulation) {
      this.updateRegulation(regulation)
      return
    }

    const team = this.calcStore.teams().find(t => t.name === filter)

    if (team) {
      patchState(this, () => ({ filterType: "team" as SpeedFilterType, teamId: team.id, ...this.modeFallback() }))
      this.clearTargetName()
    }
  }

  private modeFallback() {
    const currentModeNeedsStatistics = this.mode() === SpeedCalcMode.StatsAndMeta || this.mode() === SpeedCalcMode.Meta
    return currentModeNeedsStatistics ? { mode: SpeedCalcMode.Stats } : {}
  }

  updateRegulation(regulation: Regulation) {
    const hasStatistics = this.speedCalcService.hasStatisticsForRegulation(regulation)
    const currentModeNeedsStatistics = this.mode() === SpeedCalcMode.StatsAndMeta || this.mode() === SpeedCalcMode.Meta

    patchState(this, () => ({ filterType: "regulation" as SpeedFilterType, regulation, ...(!hasStatistics && currentModeNeedsStatistics ? { mode: SpeedCalcMode.Stats } : {}) }))
    this.clearTargetName()
  }

  toggleShowMyTeam(enabled: boolean) {
    patchState(this, () => ({ showMyTeam: enabled }))
  }

  updateTopUsage(topUsage: string) {
    patchState(this, () => ({ topUsage }))
    this.clearTargetName()
  }

  updateMode(mode: string) {
    patchState(this, () => ({ mode: mode as SpeedCalcMode }))
    this.clearTargetName()
  }

  updateTargetName(targetName: string) {
    patchState(this, () => ({ targetName }))
  }

  clearTargetName() {
    this.updateTargetName("")
  }
}
