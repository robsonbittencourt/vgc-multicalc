import { computed, effect, inject, Injectable } from "@angular/core"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { Regulation, SpeedFilterType } from "@lib/types"
import { SPEED_CALCULATOR_MODES } from "@lib/speed-calculator/speed-calculator-mode"
import { patchState, signalStore, withState } from "@ngrx/signals"

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
  mode: SpeedCalculatorMode
  speedModifier: number
  speedDropActive: boolean
  paralyzedActive: boolean
  choiceScarfActive: boolean
}

const initialState: SpeedCalcOptionsState = {
  topUsage: "60",
  filterType: "regulation",
  regulation: "I",
  teamId: "",
  showMyTeam: true,
  targetName: "",
  mode: SpeedCalculatorMode.StatsAndMeta,
  speedModifier: 0,
  speedDropActive: false,
  paralyzedActive: false,
  choiceScarfActive: false
}

@Injectable({ providedIn: "root" })
export class SpeedCalcOptionsStore extends signalStore({ protectedState: false }, withState(initialState)) {
  private calculatorStore = inject(CalculatorStore)
  private speedCalculatorService = inject(SpeedCalculatorService)

  constructor() {
    super()

    const initialRegulation = (this.calculatorStore.game() === "champions" ? "MB" : "I") as Regulation
    const initialMode = this.speedCalculatorService.hasStatisticsForRegulation(initialRegulation) ? SpeedCalculatorMode.StatsAndMeta : SpeedCalculatorMode.Stats
    patchState(this, () => ({ regulation: initialRegulation, mode: initialMode }))

    effect(() => {
      const game = this.calculatorStore.game()
      const newRegulation = (game === "champions" ? "MB" : "I") as Regulation
      const newMode = this.speedCalculatorService.hasStatisticsForRegulation(newRegulation) ? SpeedCalculatorMode.StatsAndMeta : SpeedCalculatorMode.Stats

      patchState(this, () => ({ regulation: newRegulation, mode: newMode }))

      if (game === "champions" && this.choiceScarfActive()) {
        patchState(this, () => ({ choiceScarfActive: false }))
      }
    })
  }

  readonly options = computed(
    () =>
      new SpeedCalculatorOptions({
        topUsage: this.topUsage(),
        filterType: this.filterType(),
        regulation: this.regulation(),
        teamId: this.teamId(),
        showMyTeam: this.showMyTeam(),
        targetName: this.targetName(),
        mode: this.mode(),
        speedModifier: this.speedModifier(),
        speedDropActive: this.speedDropActive(),
        paralyzedActive: this.paralyzedActive(),
        choiceScarfActive: this.choiceScarfActive()
      })
  )

  readonly filterOptions = computed(() => {
    const teamNames = this.calculatorStore
      .teams()
      .filter(t => t.teamMembers.some(m => !m.pokemon.isDefault))
      .map(t => t.name)

    return [...Object.keys(REGULATION_FILTER_LABELS), OPPONENTS_FILTER_LABEL, ...teamNames]
  })

  readonly selectedFilter = computed(() => {
    if (this.filterType() === "opponents") return OPPONENTS_FILTER_LABEL

    if (this.filterType() === "team") {
      return this.calculatorStore.teams().find(t => t.id === this.teamId())?.name ?? OPPONENTS_FILTER_LABEL
    }

    return Object.keys(REGULATION_FILTER_LABELS).find(label => REGULATION_FILTER_LABELS[label] === this.regulation()) ?? "Reg M-B"
  })

  readonly showTopUsage = computed(() => this.filterType() === "regulation")

  readonly regulationsList = computed(() => {
    return this.calculatorStore.game() === "champions" ? ["MB"] : ["I"]
  })

  readonly availableModes = computed(() => {
    if (this.filterType() !== "regulation" || !this.speedCalculatorService.hasStatisticsForRegulation(this.regulation())) {
      return SPEED_CALCULATOR_MODES.filter(m => m !== SpeedCalculatorMode.StatsAndMeta && m !== SpeedCalculatorMode.Meta)
    }

    return SPEED_CALCULATOR_MODES
  })

  readonly pokemonNamesByReg = computed(() => {
    const names = this.filterType() === "regulation" ? this.regulationPokemonNames() : this.filteredPokemonNames()

    return [...new Set(names)].sort()
  })

  private regulationPokemonNames(): string[] {
    const includeAll = this.topUsage() === "All"
    return pokemonByRegulation(this.regulation() as Regulation, undefined, this.calculatorStore.activeSetdex(), includeAll, this.calculatorStore.isChampions()).map(s => s.name)
  }

  private filteredPokemonNames(): string[] {
    if (this.filterType() === "opponents") {
      return this.calculatorStore
        .targets()
        .flatMap(t => [t.pokemon, t.secondPokemon])
        .filter(p => p != null && !p.isDefault)
        .map(p => p!.name)
    }

    const team = this.calculatorStore.teams().find(t => t.id === this.teamId())

    return team
      ? team.teamMembers
          .map(m => m.pokemon)
          .filter(p => !p.isDefault)
          .map(p => p.name)
      : []
  }

  toggleIcyWind(enabled: boolean) {
    const speedModifier = enabled ? -1 : 0
    patchState(this, () => ({ speedModifier: speedModifier }))
    patchState(this, () => ({ speedDropActive: enabled }))
  }

  toggleParalyze(enabled: boolean) {
    patchState(this, () => ({ paralyzedActive: enabled }))
  }

  toggleChoiceScarf(enabled: boolean) {
    patchState(this, () => ({ choiceScarfActive: enabled }))
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

    const team = this.calculatorStore.teams().find(t => t.name === filter)

    if (team) {
      patchState(this, () => ({ filterType: "team" as SpeedFilterType, teamId: team.id, ...this.modeFallback() }))
      this.clearTargetName()
    }
  }

  private modeFallback() {
    const currentModeNeedsStatistics = this.mode() === SpeedCalculatorMode.StatsAndMeta || this.mode() === SpeedCalculatorMode.Meta
    return currentModeNeedsStatistics ? { mode: SpeedCalculatorMode.Stats } : {}
  }

  updateRegulation(regulation: Regulation) {
    const hasStatistics = this.speedCalculatorService.hasStatisticsForRegulation(regulation)
    const currentModeNeedsStatistics = this.mode() === SpeedCalculatorMode.StatsAndMeta || this.mode() === SpeedCalculatorMode.Meta

    patchState(this, () => ({ filterType: "regulation" as SpeedFilterType, regulation, ...(!hasStatistics && currentModeNeedsStatistics ? { mode: SpeedCalculatorMode.Stats } : {}) }))
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
    patchState(this, () => ({ mode: mode as SpeedCalculatorMode }))
    this.clearTargetName()
  }

  updateTargetName(targetName: string) {
    patchState(this, () => ({ targetName }))
  }

  clearTargetName() {
    this.updateTargetName("")
  }
}
