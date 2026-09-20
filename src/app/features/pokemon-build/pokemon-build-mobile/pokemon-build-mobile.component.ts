import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { MatTooltip } from "@angular/material/tooltip"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { remainingSps, spToEv } from "@multicalc/utils"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { SpSliderComponent } from "@features/pokemon-build/sp-slider/sp-slider.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { ToxicCounterComboBoxComponent } from "@features/pokemon-build/toxic-counter-combo-box/toxic-counter-combo-box.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { Pokemon, Status } from "@multicalc/model"
import { getFinalAttack, getFinalSpecialAttack, getFinalDefense, getFinalSpecialDefense, getFinalSpeed } from "@multicalc/stat-calc"
import { Stats } from "@multicalc/types"
import { KoThreshold, OptimizationStatus, TargetCoverage } from "@multicalc/sp-optimizer"
import { DEFENSIVE_THRESHOLD_OPTIONS, OFFENSIVE_THRESHOLD_OPTIONS, OptimizeMode } from "@features/pokemon-build/utils/optimize-mode"
import { FeatureFlagsStore } from "@store/feature-flags-store"
import { formatBestEffortLabel, formatPendingAttackerParts, formatUnprotectedLabel } from "@features/pokemon-build/utils/best-effort-label"
import { formatOffensiveBestEffortLabel, formatOutOfReachLabel, formatPendingTargetParts } from "@features/pokemon-build/utils/offensive-best-effort-label"
import { CombinedAttacker, OptimizationCost } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { formatCostOf, formatKeptStatsLabel } from "@features/pokemon-build/utils/optimization-cost-label"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  host: { "[class.sticky-moves]": "stickyMoves()" },
  imports: [
    NgClass,
    NgStyle,
    MatButton,
    MatCheckbox,
    MatIcon,
    MatSlideToggle,
    MatTooltip,
    FormsModule,
    AbilityComboBoxComponent,
    SpSliderComponent,
    TeraComboBoxComponent,
    StatusComboBoxComponent,
    ToxicCounterComboBoxComponent,
    NatureComboBoxComponent,
    InputSelectComponent,
    PokemonMovesMobileComponent,
    TypeComboBoxComponent
  ]
})
export class PokemonBuildMobileComponent {
  features = inject(FeatureFlagsStore)

  pokemonId = input.required<string>()
  realPokemonId = input<string | null>(null)
  optimizationStatus = input<OptimizationStatus | "idle">("idle")
  optimizationKoChance = input<number | null>(null)
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)
  showOffensiveOptimization = input<boolean>(false)
  optimizationImpossible = input<boolean>(false)
  optimizationCoverage = input<TargetCoverage | null>(null)
  combinedAttackers = input<CombinedAttacker[]>([])
  optimizationCosts = input<OptimizationCost[]>([])
  showDelete = input<boolean>(true)
  manageTeamState = input<boolean>(true)
  isRightSide = input<boolean>(false)
  onlySpeed = input<boolean>(false)
  hideEvs = input<boolean>(false)
  hideEvsSpsToggleAndClear = input<boolean>(false)
  hideMoves = input<boolean>(false)
  editingMoves = input<boolean>(false)
  stickyMoves = input<boolean>(false)
  movesStuck = input<boolean>(false)
  editingAbility = input<boolean>(false)
  editingItem = input<boolean>(false)

  store = inject(CalcStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  megaStoneService = inject(MegaStoneService)

  showEvsSpsToggle = signal(true)
  MAX_EVS = 66
  spLabel = computed(() => {
    if (this.store.useSpsMode()) {
      return "SPs"
    }
    return "EVs"
  })
  remainingLabel = computed(() => "Remaining")
  remainingPoints = computed(() => {
    const remaining = remainingSps(this.pokemon().sps)

    if (this.store.useSpsMode()) {
      return remaining
    } else {
      return spToEv(remaining)
    }
  })

  optimizeMode = signal<OptimizeMode>("bulk")

  thresholdOptions = computed<KeyValuePair[]>(() => (this.isDamageMode() ? OFFENSIVE_THRESHOLD_OPTIONS : DEFENSIVE_THRESHOLD_OPTIONS))

  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")
  updateNature = false
  keepOffensiveSps = false
  partnerUpdateNature = false
  partnerKeepOtherSps = false
  private chosenThreshold: string | null = null

  get survivalThreshold(): string {
    return this.chosenThreshold ?? (this.isDamageMode() ? "1" : "2")
  }

  set survivalThreshold(value: string) {
    this.chosenThreshold = value
  }

  pokemonImportedEvent = output<Pokemon | Pokemon[]>()
  pokemonDeleted = output<string | null>()
  evsChanged = output<void>()
  editMovesRequested = output()
  closeMovesRequested = output()
  editAbilityRequested = output()
  editItemRequested = output()
  optimizationRequested = output<{ updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: number }>()
  offensiveOptimizationRequested = output<{ koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean; partnerKeepOtherSps: boolean; partnerUpdateNature: boolean }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  teamMembers = computed(() => this.store.team().teamMembers)

  effectiveRealId = computed(() => this.realPokemonId() ?? this.pokemonId())

  private resolvedPokemon = computed(() => this.store.findNullablePokemonById(this.pokemonId()))

  pokemon = computed(() => this.resolvedPokemon()!)

  isAddMode = computed(() => {
    const pokemon = this.resolvedPokemon()

    return pokemon == undefined
  })

  teamMemberOnEdit = computed(() => {
    const editId = this.pokemonId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId)
  })

  hasDuplicateItem = computed(() => this.teamMemberOnEdit() && this.store.duplicateItemPokemonIds().has(this.effectiveRealId()))

  isBadlyPoisoned = computed(() => this.pokemon().status === Status.BADLY_POISON)

  isOptimizationSupported = computed(() => {
    const isOneVsOne = this.menuStore.oneVsOneActivated()
    const isManyVsOne = this.menuStore.manyVsOneActivated()
    const isOneVsMany = this.menuStore.oneVsManyActivated()

    return isOneVsOne || ((isManyVsOne || isOneVsMany) && this.teamMemberOnEdit())
  })

  canOptimizeBulk = computed(() => {
    if (this.menuStore.oneVsManyActivated()) return false

    return this.showOptimization() && this.isOptimizationSupported()
  })

  canOptimizeDamage = computed(() => {
    if (this.menuStore.manyVsOneActivated()) return false

    return this.showOffensiveOptimization() && this.isOptimizationSupported()
  })

  canOptimize = computed(() => this.canOptimizeBulk() || this.canOptimizeDamage())

  showModeToggle = computed(() => this.canOptimizeBulk() && this.canOptimizeDamage())

  isDamageMode = computed(() => {
    if (!this.canOptimizeBulk() && this.canOptimizeDamage()) return true
    if (this.canOptimizeBulk() && !this.canOptimizeDamage()) return false

    return this.optimizeMode() === "damage"
  })

  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.sps }
  })

  modifiedHp = computed(() => this.pokemon().modifiedHp)

  hasModifiedStat = computed(() => {
    return (
      this.modifiedHp() != this.pokemon().hp ||
      this.modifiedAtk() != this.pokemon().atk ||
      this.modifiedDef() != this.pokemon().def ||
      this.modifiedSpa() != this.pokemon().spa ||
      this.modifiedSpd() != this.pokemon().spd ||
      this.modifiedSpe() != this.pokemon().spe
    )
  })

  modifiedAtk = computed(() => getFinalAttack(this.pokemon(), this.pokemon().move, this.fieldStore.field()))
  modifiedDef = computed(() => getFinalDefense(this.pokemon(), this.fieldStore.field(), this.isRightSide()))
  modifiedSpa = computed(() => getFinalSpecialAttack(this.pokemon(), this.pokemon().move, this.fieldStore.field()))
  modifiedSpd = computed(() => getFinalSpecialDefense(this.pokemon(), this.fieldStore.field(), !this.isRightSide()))
  modifiedSpe = computed(() => getFinalSpeed(this.pokemon(), this.fieldStore.field(), !this.isRightSide()))

  getModifiedStat(stat: keyof Stats): number {
    const pokemon = this.pokemon()
    const optimizedEvs = this.optimizedEvs()
    const optimizedNature = this.optimizedNature()

    if (this.hasProposal() && optimizedEvs) {
      return pokemon.clone({ sps: optimizedEvs, nature: optimizedNature || pokemon.nature }).stats[stat]
    }

    switch (stat) {
      case "hp":
        return pokemon.hp
      case "atk":
        return this.modifiedAtk()
      case "def":
        return this.modifiedDef()
      case "spa":
        return this.modifiedSpa()
      case "spd":
        return this.modifiedSpd()
      case "spe":
        return this.modifiedSpe()
    }
  }

  isHpOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.hp !== 0
  })

  isDefOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.def !== 0
  })

  isSpdOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && optimized.spd !== 0
  })

  isAtkOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && this.isDamageMode() && optimized.atk !== 0
  })

  isSpaOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    return optimized !== null && this.isDamageMode() && optimized.spa !== 0
  })

  isOptimizationValid = computed(() => {
    const optimizedEvs = this.optimizedEvs()
    const initialEvs = this.currentEvs()

    if (!optimizedEvs) return false

    return (Object.keys(optimizedEvs) as (keyof Stats)[]).every(stat => optimizedEvs[stat] >= (initialEvs as any)[stat])
  })

  hasProposal = computed(() => this.optimizationStatus() === "success" || this.optimizationStatus() === "best-effort")

  isBestEffort = computed(() => this.optimizationStatus() === "best-effort")

  isSolutionNotNeeded = computed(() => this.optimizationStatus() === "not-needed")

  clearSps() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    this.evsChanged.emit()

    if (this.hasProposal()) {
      this.optimizationDiscarded.emit()
    }
  }

  bestEffortLabel(): string {
    const koChance = this.optimizationKoChance() ?? 1
    const coverage = this.optimizationCoverage()
    const covered = coverage?.covered ?? 0
    const total = coverage?.total ?? 1
    const bestTargetName = coverage?.bestTargetName ?? null

    if (this.isDamageMode()) {
      return formatOffensiveBestEffortLabel(koChance, Number(this.survivalThreshold), covered, total, bestTargetName)
    }

    return formatBestEffortLabel(koChance, Number(this.survivalThreshold), covered, total, bestTargetName)
  }

  outOfReachLabel(): string {
    const coverage = this.optimizationCoverage()

    if (coverage == null || coverage.covered > 0) return ""

    if (this.isDamageMode()) {
      return formatOutOfReachLabel(coverage.outOfReach, coverage.total)
    }

    if (!this.isBestEffort()) return ""

    return formatUnprotectedLabel(coverage.outOfReach, coverage.total)
  }

  pendingTargetParts(): { target: string; chance: string } | null {
    const coverage = this.optimizationCoverage()

    if (coverage == null || coverage.covered === 0) return null

    if (this.isDamageMode()) {
      return formatPendingTargetParts(this.optimizationKoChance() ?? 0, Number(this.survivalThreshold), coverage.bestTargetName)
    }

    if (coverage.outOfReach === 0) return null

    return formatPendingAttackerParts(this.optimizationKoChance() ?? coverage.bestTargetKoChance ?? 0, Number(this.survivalThreshold), coverage.bestTargetName)
  }

  showPerAttackerOptions(): boolean {
    return this.isDamageMode() && this.combinedAttackers().length === 2
  }

  showOptimizeOptions = computed(() => {
    if (!this.isOptimizationSupported()) return false

    return !(this.optimizedEvs() !== null || this.isSolutionNotNeeded())
  })

  showOptimizationSuccess = computed(() => this.isOptimizationSupported() && this.optimizedEvs() !== null && !this.isSolutionNotNeeded())

  showSolutionNotNeeded = computed(() => this.isOptimizationSupported() && this.isSolutionNotNeeded())

  impossibleLabel = computed(() => {
    if (this.isDamageMode()) return "No spread reaches this KO"

    const coverage = this.optimizationCoverage()
    const bestTargetName = coverage?.bestTargetName ?? null

    return bestTargetName && (coverage?.total ?? 1) > 1 ? `No spread survives ${bestTargetName}` : "No spread survives this attack"
  })

  goalLabel = computed(() => (this.isDamageMode() ? "KO" : "survive"))

  goalTailLabel = computed(() => (this.isDamageMode() ? "the target with" : "the attacker's"))

  private thresholdLabel = computed(() => {
    const threshold = Number(this.survivalThreshold)

    if (this.isDamageMode()) return threshold === 1 ? "OHKO" : `${threshold}HKO`

    return threshold === 2 ? "OHKO" : `${threshold - 1}HKO`
  })

  solutionNotNeededLabel = computed(() => {
    const hko = this.thresholdLabel()

    if (this.isDamageMode()) return `Already reaches the ${hko} with no ${this.spLabel()}`

    const coverage = this.optimizationCoverage()

    if (coverage && coverage.total > 1 && coverage.covered < coverage.total) {
      return `Already survives ${coverage.covered} of ${coverage.total} attackers with no ${this.spLabel()}`
    }

    return `Already survives the ${hko} with no ${this.spLabel()}`
  })

  optimizationVerdictLabel = computed(() => {
    const hko = this.thresholdLabel()

    if (this.isBestEffort()) return this.bestEffortLabel()

    const coverage = this.optimizationCoverage()
    const total = coverage?.total ?? 1
    const covered = coverage?.covered ?? total

    if (this.isDamageMode()) {
      return total > 1 ? `Knocks out all ${total} targets` : `Reaches the ${hko}`
    }

    if (total > 1 && covered < total) {
      return `Survives ${covered} of ${total} attackers`
    }

    return total > 1 ? `Survives all ${total} attackers` : `Survives the ${hko}`
  })

  optimizationCostLabel = computed(() => {
    const optimized = this.optimizedEvs()

    if (optimized === null) return ""

    const cost = this.costOf(optimized, this.originalEvs())

    return cost === "" ? `No ${this.spLabel()} needed` : `Costs ${cost}`
  })

  private costOf(optimized: Stats, original: Stats) {
    return formatCostOf(optimized, original, this.spLabel(), this.store.useSpsMode(), this.keepOffensiveSps)
  }

  optimizationNotes = computed(() => {
    const optimized = this.optimizedEvs()

    if (optimized === null) return []

    const notes: string[] = []
    const nature = this.optimizedNature()
    const previousNature = this.originalNature()

    if (nature !== null && nature !== previousNature) {
      notes.push(`Nature changed from ${previousNature} to ${nature}`)
    }

    const kept = this.keepOffensiveSps ? formatKeptStatsLabel(this.originalEvs(), optimized) : ""

    if (kept !== "") {
      notes.push(`Kept your ${kept}`)
    }

    return notes
  })

  combinedCosts = computed(() => {
    const costs = this.optimizationCosts()

    if (costs.length < 2) return []

    return costs.map(cost => {
      const label = this.costOf(cost.sps, cost.originalSps)

      return { pokemonId: cost.pokemonId, name: cost.name, cost: label === "" ? "Unchanged" : label }
    })
  })

  hasCombinedCosts = computed(() => this.combinedCosts().length > 0)

  toggleSpsMode() {
    this.store.toggleSpsMode()
  }

  optimizeSps() {
    const pokemon = this.pokemon()

    this.originalEvs.set({ ...pokemon.sps })
    this.originalNature.set(pokemon.nature)

    if (this.isDamageMode()) {
      this.offensiveOptimizationRequested.emit({
        koThreshold: parseInt(this.survivalThreshold) as KoThreshold,
        keepOtherSps: this.keepOffensiveSps,
        updateNature: this.updateNature,
        partnerKeepOtherSps: this.partnerKeepOtherSps,
        partnerUpdateNature: this.partnerUpdateNature
      })

      return
    }

    this.optimizationRequested.emit({
      updateNature: this.updateNature,
      keepOffensiveSps: this.keepOffensiveSps,
      survivalThreshold: parseInt(this.survivalThreshold)
    })
  }

  selectOptimizeMode(mode: OptimizeMode) {
    if (this.optimizeMode() === mode) return

    this.optimizeMode.set(mode)
    this.chosenThreshold = null
  }

  applyOptimization() {
    this.optimizationApplied.emit()
  }

  discardOptimization() {
    this.optimizationDiscarded.emit()
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    this.pokemonImportedEvent.emit(pokemon)
  }

  removeActivePokemon() {
    this.pokemonDeleted.emit(null)
  }

  isMegaStone() {
    return this.megaStoneService.isMegaStone(this.pokemon().item)
  }

  isMegaStoneCompatible() {
    return this.megaStoneService.isMegaStoneCompatible(this.pokemon().name, this.pokemon().item)
  }

  getMegaStoneSprite() {
    return this.megaStoneService.getMegaStoneSprite(this.pokemon().item)
  }

  toggleMega() {
    this.megaStoneService.toggleMega(this.effectiveRealId(), this.pokemon().name, this.pokemon().item)
  }

  blurActiveInput() {
    const active = document.activeElement as HTMLElement | null
    active?.blur()
  }

  gridTemplateColumns(): any {
    const base = "34px 56px 56px minmax(0, 1fr) 44px"
    const extra = this.hasModifiedStat() ? " 30px" : ""

    return { "grid-template-columns": base + extra }
  }
}
