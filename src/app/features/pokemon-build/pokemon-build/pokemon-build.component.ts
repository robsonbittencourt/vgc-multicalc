import { NgClass, NgStyle } from "@angular/common"
import { spsToEvs } from "@multicalc/utils"
import { ChangeDetectorRef, Component, computed, effect, inject, input, linkedSignal, output, signal, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { InputComponent } from "@shared/input/input.component"
import { CalcStore, CombinedAttacker } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { MAX_SPS, remainingSps, spToEv } from "@multicalc/utils"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { SpSliderComponent } from "@features/pokemon-build/sp-slider/sp-slider.component"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { ToxicCounterComboBoxComponent } from "@features/pokemon-build/toxic-counter-combo-box/toxic-counter-combo-box.component"
import { AbilitiesTableComponent } from "@features/pokemon-build/tables/abilities-table/abilities-table.component"
import { ItemsTableComponent } from "@features/pokemon-build/tables/items-table/items-table.component"
import { MovesTableComponent } from "@features/pokemon-build/tables/moves-table/moves-table.component"
import { PokemonTableComponent } from "@features/pokemon-build/tables/pokemon-table/pokemon-table.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { SpriteService } from "@app/services/sprite.service"
import { getFinalAttack, getFinalSpecialAttack, getFinalDefense, getFinalSpecialDefense, getFinalSpeed } from "@multicalc/stat-calc"
import { Stats } from "@multicalc/types"
import { KoThreshold, OptimizationStatus, SurvivalThreshold, TargetCoverage } from "@multicalc/sp-optimizer"
import { DEFENSIVE_THRESHOLD_OPTIONS, OFFENSIVE_THRESHOLD_OPTIONS, OptimizeMode } from "@features/pokemon-build/utils/optimize-mode"
import { FeatureFlagsStore } from "@store/feature-flags-store"
import { formatBestEffortLabel, formatPendingAttackerLabel, formatUnprotectedLabel } from "@features/pokemon-build/utils/best-effort-label"
import { formatOffensiveBestEffortLabel, formatOutOfReachLabel, formatPendingTargetLabel } from "@features/pokemon-build/utils/offensive-best-effort-label"
import { formatCostOf, formatKeptStatsLabel } from "@features/pokemon-build/utils/optimization-cost-label"

export type OptimizationCost = { pokemonId: string; name: string; sps: Stats; originalSps: Stats }

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [
    NgStyle,
    NgClass,
    MatButton,
    MatCheckbox,
    MatIcon,
    MatTooltip,
    FormsModule,
    AbilityComboBoxComponent,
    SpSliderComponent,
    TeraComboBoxComponent,
    MultiHitComboBoxComponent,
    StatusComboBoxComponent,
    ToxicCounterComboBoxComponent,
    TypeComboBoxComponent,
    NatureComboBoxComponent,
    MovesTableComponent,
    InputComponent,
    InputSelectComponent,
    AbilitiesTableComponent,
    ItemsTableComponent,
    PokemonTableComponent
  ]
})
export class PokemonBuildComponent {
  features = inject(FeatureFlagsStore)

  pokemonId = input<string>()
  reverse = input<boolean>(false)
  hasFocus = input<boolean>(true)
  optimizationStatus = input<OptimizationStatus | "idle">("idle")
  optimizationKoChance = input<number | null>(null)
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)
  optimizationImpossible = input<boolean>(false)
  optimizationCoverage = input<TargetCoverage | null>(null)
  optimizationCosts = input<OptimizationCost[]>([])
  combinedAttackers = input<CombinedAttacker[]>([])

  selected = output()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: SurvivalThreshold }>()
  offensiveOptimizeRequested = output<{ koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean; partnerKeepOtherSps: boolean; partnerUpdateNature: boolean }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()
  pokemonAdded = output<string>()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)
  megaStoneService = inject(MegaStoneService)
  spriteService = inject(SpriteService)
  changeDetector = inject(ChangeDetectorRef)

  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")
  updateNature = signal<boolean>(false)
  keepOffensiveSps = signal<boolean>(false)
  partnerUpdateNature = signal<boolean>(false)
  partnerKeepOtherSps = signal<boolean>(false)
  survivalThreshold = linkedSignal<string>(() => (this.isDamageMode() ? "1" : "2"))
  optimizeMode = signal<OptimizeMode>("bulk")

  isDamageMode = computed(() => {
    if (!this.canOptimizeBulk() && this.canOptimizeDamage()) return true
    if (this.canOptimizeBulk() && !this.canOptimizeDamage()) return false

    return this.optimizeMode() === "damage"
  })

  thresholdOptions = computed(() => (this.isDamageMode() ? OFFENSIVE_THRESHOLD_OPTIONS : DEFENSIVE_THRESHOLD_OPTIONS))

  activeMoveIndex = signal<number | null>(null)

  firstMoveFromList = signal<string>("")
  firstAbilityFromList = signal<string>("")
  firstItemFromList = signal<string>("")
  firstPokemonFromList = signal<string>("")

  activeTable = signal<string>("evs")

  showPokemonTable = computed(() => this.activeTable() == "pokemon")
  showItemsTable = computed(() => !this.isAddMode() && this.activeTable() == "items")
  showAbilitiesTable = computed(() => !this.isAddMode() && this.activeTable() == "abilities")
  showMovesTable = computed(() => !this.isAddMode() && this.activeTable() == "moves")
  showEvsTable = computed(() => !this.isAddMode() && this.activeTable() == "evs")

  pokemonTabIndex = computed(() => (this.reverse() ? 14 : 1))
  itemTabIndex = computed(() => (this.reverse() ? 13 : 2))
  abilityTabIndex = computed(() => (this.reverse() ? 12 : 3))

  tabIndexMove1 = computed(() => (this.reverse() ? 8 : 4))
  tabIndexMove2 = computed(() => (this.reverse() ? 9 : 5))
  tabIndexMove3 = computed(() => (this.reverse() ? 10 : 6))
  tabIndexMove4 = computed(() => (this.reverse() ? 11 : 7))

  pokemonDataFilter = signal<string>("")
  itemDataFilter = signal<string>("")
  abilityDataFilter = signal<string>("")
  moveDataFilter = signal<string>("")

  pokemonHasFocus = signal(false)
  itemHasFocus = signal(false)
  abilityHasFocus = signal(false)
  move1HasFocus = signal(false)
  move2HasFocus = signal(false)
  move3HasFocus = signal(false)
  move4HasFocus = signal(false)
  statusHaveFocus = signal(false)
  toxicCounterHaveFocus = signal(false)
  multiHitHasFocus = signal(false)
  teraHasFocus = signal(false)
  moveWasTyped = signal(false)

  shouldAnimate = signal(false)

  modifiedAtk = signal<number>(0)
  modifiedDef = signal<number>(0)
  modifiedSpa = signal<number>(0)
  modifiedSpd = signal<number>(0)
  modifiedSpe = signal<number>(0)

  someMoveHasFocus = computed(() => {
    return this.move1HasFocus() || this.move2HasFocus() || this.move3HasFocus() || this.move4HasFocus()
  })

  tableWasActive = computed(() => {
    return this.hasFocus() && (this.someMoveHasFocus() || this.pokemonHasFocus() || this.itemHasFocus() || this.abilityHasFocus())
  })

  editingId = computed(() => this.pokemonId()!)
  private resolvedPokemon = computed(() => {
    const id = this.pokemonId()

    return id != undefined ? this.store.findNullablePokemonById(id) : undefined
  })
  pokemon = computed(() => this.resolvedPokemon()!)
  homeSpritePath = computed(() => this.spriteService.homePath(this.pokemon().name))
  isAddMode = computed(() => this.resolvedPokemon() == undefined)
  selectPokemonLabel = SELECT_POKEMON_LABEL
  isTeamMember = computed(() => this.store.team().teamMembers.some(member => member.pokemon.id === this.editingId()))
  hasDuplicateItem = computed(() => this.isTeamMember() && this.store.duplicateItemPokemonIds().has(this.editingId()))
  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.sps }
  })

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

  maxPoints = computed(() => (this.store.useSpsMode() ? MAX_SPS : spToEv(MAX_SPS)))

  noPointsLeft = computed(() => remainingSps(this.pokemon().sps) === 0)

  isBestEffort = computed(() => this.optimizationStatus() === "best-effort")

  bestEffortLabel = computed(() => {
    const koChance = this.optimizationKoChance() ?? 1
    const coverage = this.optimizationCoverage()
    const covered = coverage?.covered ?? 0
    const total = coverage?.total ?? 1
    const bestTargetName = coverage?.bestTargetName ?? null

    if (this.isDamageMode()) {
      return formatOffensiveBestEffortLabel(koChance, Number(this.survivalThreshold()), covered, total, bestTargetName)
    }

    return formatBestEffortLabel(koChance, Number(this.survivalThreshold()), covered, total, bestTargetName)
  })

  isSolutionNotNeeded = computed(() => {
    return this.optimizationStatus() === "not-needed"
  })

  canOptimizeBulk = computed(() => {
    if (this.menuStore.oneVsOneActivated()) return true

    return this.menuStore.manyVsOneActivated() && this.isTeamMember()
  })

  canOptimizeDamage = computed(() => {
    if (this.menuStore.oneVsOneActivated()) return true

    return this.menuStore.oneVsManyActivated() && this.isTeamMember()
  })

  isOptimizationSupported = computed(() => this.canOptimizeBulk() || this.canOptimizeDamage())

  showModeToggle = computed(() => this.canOptimizeBulk() && this.canOptimizeDamage())

  showOptimizeOptions = computed(() => {
    if (!this.isOptimizationSupported()) return false

    const isOptimizing = this.optimizedEvs() !== null
    const solutionNotNeeded = this.isSolutionNotNeeded()

    return !(isOptimizing || solutionNotNeeded)
  })

  showOptimizationSuccess = computed(() => {
    return this.isOptimizationSupported() && this.optimizedEvs() !== null && !this.isSolutionNotNeeded()
  })

  showSolutionNotNeeded = computed(() => {
    return this.isOptimizationSupported() && this.isSolutionNotNeeded()
  })

  impossibleLabel = computed(() => {
    if (this.isDamageMode()) return "No spread reaches this KO"

    const coverage = this.optimizationCoverage()
    const bestTargetName = coverage?.bestTargetName ?? null

    return bestTargetName && (coverage?.total ?? 1) > 1 ? `No spread survives ${bestTargetName}` : "No spread survives this attack"
  })

  goalLabel = computed(() => (this.isDamageMode() ? "KO" : "survive"))

  goalTailLabel = computed(() => (this.isDamageMode() ? "the target with" : "the attacker's"))

  solutionNotNeededLabel = computed(() => {
    const hko = this.thresholdLabel()

    if (this.isDamageMode()) return `Already reaches the ${hko} with no ${this.spLabel()}`

    const coverage = this.optimizationCoverage()

    if (coverage && coverage.total > 1 && coverage.covered < coverage.total) {
      return `Already survives ${coverage.covered} of ${coverage.total} attackers with no ${this.spLabel()}`
    }

    return `Already survives the ${hko} with no ${this.spLabel()}`
  })

  optimizationCostLabel = computed(() => {
    const optimized = this.optimizedEvs()

    if (optimized === null) return ""

    const cost = this.costOf(optimized, this.originalEvs())

    return cost === "" ? `No ${this.spLabel()} needed` : `Costs ${cost}`
  })

  private costOf(optimized: Stats, original: Stats) {
    return formatCostOf(optimized, original, this.spLabel(), this.store.useSpsMode(), this.keepOffensiveSps())
  }

  optimizationNotes = computed(() => {
    if (this.optimizedEvs() === null) return []

    const notes: string[] = []
    const nature = this.optimizedNature()
    const previousNature = this.originalNature()

    if (nature !== null && nature !== previousNature) {
      notes.push(`Nature changed from ${previousNature} to ${nature}`)
    }

    const kept = this.keptStatsLabel()

    if (kept !== "") {
      notes.push(`Kept your ${kept}`)
    }

    return notes
  })

  private keptStatsLabel() {
    if (!this.keepOffensiveSps()) return ""

    const original = this.originalEvs()
    const optimized = this.optimizedEvs()

    if (optimized === null) return ""

    return formatKeptStatsLabel(original, optimized)
  }

  combinedCosts = computed(() => {
    const costs = this.optimizationCosts()

    if (costs.length < 2) return []

    return costs.map(cost => {
      const label = this.costOf(cost.sps, cost.originalSps)

      return { pokemonId: cost.pokemonId, name: cost.name, cost: label === "" ? "Unchanged" : label }
    })
  })

  hasCombinedCosts = computed(() => this.combinedCosts().length > 0)

  showPerAttackerOptions = computed(() => this.isDamageMode() && this.combinedAttackers().length === 2)

  mainAttackerRow = computed(() => this.combinedAttackers()[0])

  partnerRow = computed(() => this.combinedAttackers()[1])

  attackerNames = computed(() => this.combinedAttackers().map(attacker => attacker.name))

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

  outOfReachLabel = computed(() => {
    const coverage = this.optimizationCoverage()

    if (coverage == null) return ""

    const threshold = Number(this.survivalThreshold())

    if (this.isDamageMode()) {
      if (!this.isBestEffort()) return ""

      if (coverage.covered > 0) {
        return formatPendingTargetLabel(this.optimizationKoChance() ?? 0, threshold, coverage.bestTargetName)
      }

      return formatOutOfReachLabel(coverage.outOfReach, coverage.total)
    }

    if (coverage.covered > 0 && coverage.outOfReach > 0) {
      return formatPendingAttackerLabel(this.optimizationKoChance() ?? coverage.bestTargetKoChance ?? 0, threshold, coverage.bestTargetName)
    }

    if (!this.isBestEffort()) return ""

    return formatUnprotectedLabel(coverage.outOfReach, coverage.total)
  })

  private thresholdLabel = computed(() => {
    const threshold = Number(this.survivalThreshold())

    if (this.isDamageMode()) return threshold === 1 ? "OHKO" : `${threshold}HKO`

    return threshold === 2 ? "OHKO" : `${threshold - 1}HKO`
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

  pokemonInput = viewChild<InputComponent>("pokemonInput")
  itemInput = viewChild<InputComponent>("itemInput")
  abilityInput = viewChild<InputComponent>("abilityInput")

  moveWasSelected = false
  withoutItem = "(none)"

  constructor() {
    queueMicrotask(() => {
      this.shouldAnimate.set(true)
    })

    effect(() => {
      if (!this.showMovesTable() && !this.showAbilitiesTable() && !this.showItemsTable() && !this.showPokemonTable()) {
        this.activeTable.set("evs")
      }

      if (!this.hasFocus()) {
        this.showDefaultView()
      }
    })

    effect(() => {
      const id = this.pokemonId()
      const activatedPokemon = id != undefined ? this.store.findNullablePokemonById(id) : undefined

      if (this.fieldStore.field() && activatedPokemon != undefined) {
        this.modifiedAtk.set(getFinalAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedDef.set(getFinalDefense(activatedPokemon, this.fieldStore.field(), this.reverse()))
        this.modifiedSpa.set(getFinalSpecialAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedSpd.set(getFinalSpecialDefense(activatedPokemon, this.fieldStore.field(), !this.reverse()))
        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), !this.reverse()))
      }
    })
  }

  focusPokemonSelector() {
    this.pokemonHasFocus.set(true)
    this.pokemonInput()?.focus()
  }

  openPokemonTable() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  scrollToPokemonSelector() {
    this.pokemonInput()?.scrollTo()
  }

  setSpsMode(useSps: boolean) {
    if (this.store.useSpsMode() === useSps) return

    this.store.toggleSpsMode()
  }

  showDefaultView() {
    this.removeFocusFromAllFields()
    this.activeTable.set("evs")
  }

  moveSelectorDisabled(index: number): boolean {
    return this.pokemon().activeMoveIndex !== index
  }

  activateMove(position: number) {
    this.activeMoveIndex.set(null)
    this.store.activateMoveByPosition(this.editingId(), position)
    this.showDefaultView()
  }

  moveSelectorOnClick(position: number) {
    this.setMoveSelectorFocus(position - 1)
    this.store.activateMoveByPosition(this.editingId(), position)
    this.activeMoveIndex.set(position - 1)
    this.selected.emit()
  }

  selectMoveOnly(position: number) {
    this.store.activateMoveByPosition(this.editingId(), position)
    this.activeMoveIndex.set(position - 1)
  }

  onMoveValueChange(value: string) {
    this.moveWasTyped.set(true)
    this.moveDataFilter.set(value)
  }

  moveSelected(move: string) {
    this.moveWasSelected = true
    this.setMoveSelectorFocus(this.activeMoveIndex()!)
    this.store.updateMove(this.editingId(), move, this.activeMoveIndex()!)
    this.store.activateMove(this.editingId(), this.activeMoveIndex()!)
    this.moveDataFilter.set("")
    this.activeTable.set("evs")
  }

  moveSelectorLostFocus(position: number) {
    const filter = this.moveDataFilter()
    const firstMove = this.firstMoveFromList()

    if (!this.moveWasSelected && this.moveWasTyped()) {
      if (filter === "") {
        this.store.updateMove(this.editingId(), "", position - 1)
      } else {
        this.store.updateMove(this.editingId(), firstMove, position - 1)

        if (this.activeMoveIndex() === position - 1) {
          this.store.activateMove(this.editingId(), position - 1)
        }
      }
    }

    this.moveDataFilter.set("")
    this.moveWasSelected = false
    this.moveWasTyped.set(false)
  }

  private setMoveSelectorFocus(moveIndex: number) {
    this.removeFocusFromAllFields()
    this.activeTable.set("moves")

    switch (moveIndex) {
      case 0:
        this.move1HasFocus.set(true)
        break
      case 1:
        this.move2HasFocus.set(true)
        break
      case 2:
        this.move3HasFocus.set(true)
        break
      default:
        this.move4HasFocus.set(true)
        break
    }
  }

  abilitySelected(ability: string) {
    this.abilityDataFilter.set("")
    this.store.ability(this.editingId(), ability)
    this.showDefaultView()
    this.abilityInput()?.blur()
  }

  abilitySelectorOnClick() {
    this.removeFocusFromAllFields()
    this.abilityHasFocus.set(true)
    this.activeTable.set("abilities")
    this.selected.emit()
  }

  abilitySelectorLostFocus() {
    if (this.abilityDataFilter() != "") {
      this.store.ability(this.editingId(), this.firstAbilityFromList())
      this.abilityDataFilter.set("")
    }
  }

  itemSelected(item: string) {
    this.itemDataFilter.set("")

    if (!this.isItemDisabled()) {
      this.store.item(this.editingId(), item)
    }

    this.showDefaultView()
    this.itemInput()?.blur()
  }

  itemSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.itemHasFocus.set(true)
    this.activeTable.set("items")
    this.selected.emit()
  }

  itemSelectorLostFocus() {
    if (this.itemDataFilter() != "") {
      this.store.item(this.editingId(), this.firstItemFromList())
      this.itemDataFilter.set("")
    }
  }

  pokemonSelected(pokemon: string) {
    this.pokemonDataFilter.set("")

    if (this.isAddMode()) {
      this.pokemonAdded.emit(pokemon)
    } else {
      this.store.loadPokemonInfo(this.editingId(), pokemon)
    }

    this.showDefaultView()
    this.pokemonInput()?.blur()
  }

  onCustomSetEditRequested(set: CustomSet) {
    this.store.enterCustomSetEditMode(this.editingId(), set.id)
    this.showDefaultView()
  }

  pokemonSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  pokemonSelectorLostFocus() {
    if (this.pokemonDataFilter() != "") {
      this.store.loadPokemonInfo(this.editingId(), this.firstPokemonFromList())
      this.pokemonDataFilter.set("")
    }
  }

  pokemonSelectorTabPressed() {
    if (this.pokemonDataFilter() == "") return

    this.pokemonSelectorLostFocus()
    this.changeDetector.detectChanges()
  }

  newPokemonSelectorLostFocus() {
    if (this.pokemonDataFilter() != "") {
      if (this.isAddMode()) {
        this.pokemonAdded.emit(this.firstPokemonFromList())
      } else {
        this.store.loadPokemonInfo(this.editingId(), this.firstPokemonFromList())
      }

      this.pokemonDataFilter.set("")
      this.showDefaultView()
      this.pokemonInput()?.blur()
    }
  }

  private removeFocusFromAllFields() {
    this.pokemonHasFocus.set(false)
    this.itemHasFocus.set(false)
    this.abilityHasFocus.set(false)
    this.move1HasFocus.set(false)
    this.move2HasFocus.set(false)
    this.move3HasFocus.set(false)
    this.move4HasFocus.set(false)
    this.statusHaveFocus.set(false)
    this.toxicCounterHaveFocus.set(false)
    this.multiHitHasFocus.set(false)
    this.teraHasFocus.set(false)
  }

  statusOnClick() {
    this.removeFocusFromAllFields()
    this.showDefaultView()
    this.selected.emit()
  }

  toxicCounterOnClick() {
    this.removeFocusFromAllFields()
    this.showDefaultView()
    this.selected.emit()
  }

  multiHitOnClick() {
    this.multiHitHasFocus.set(true)
    this.showDefaultView()
    this.selected.emit()
  }

  teraOnClick() {
    this.teraHasFocus.set(true)
    this.showDefaultView()
    this.selected.emit()
  }

  isItemDisabled() {
    const ogerponForms = ["Ogerpon-Wellspring", "Ogerpon-Hearthflame", "Ogerpon-Cornerstone"]
    return ogerponForms.includes(this.pokemon().name) || this.pokemon().name.includes("-Mega")
  }

  hasMegaForm() {
    return this.megaStoneService.hasMegaForm(this.pokemon().name, this.pokemon().item)
  }

  toggleMega() {
    this.megaStoneService.toggleMega(this.editingId(), this.pokemon().name, this.pokemon().item)
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

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }

  gridTemplateColumns(): any {
    return { "grid-template-columns": this.hasModifiedStat() ? "64px 64px 67px 64px 1fr 64px 30px" : "64px 64px 67px 64px 1fr 64px" }
  }

  totalsGridColumns(): any {
    return { "grid-template-columns": "64px 64px 67px 64px auto auto 1fr" }
  }

  clearSps() {
    this.store.evs(this.editingId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  optimizeSps() {
    const pokemon = this.store.findPokemonById(this.editingId())
    this.originalEvs.set({ ...pokemon.sps })
    this.originalNature.set(pokemon.nature)

    if (this.isDamageMode()) {
      this.offensiveOptimizeRequested.emit({
        koThreshold: Number(this.survivalThreshold()) as KoThreshold,
        keepOtherSps: this.keepOffensiveSps(),
        updateNature: this.updateNature(),
        partnerKeepOtherSps: this.partnerKeepOtherSps(),
        partnerUpdateNature: this.partnerUpdateNature()
      })

      return
    }

    this.optimizeRequested.emit({
      updateNature: this.updateNature(),
      keepOffensiveSps: this.keepOffensiveSps(),
      survivalThreshold: Number(this.survivalThreshold()) as SurvivalThreshold
    })
  }

  selectOptimizeMode(mode: OptimizeMode) {
    if (this.optimizeMode() === mode) return

    this.optimizeMode.set(mode)
  }

  applyOptimization() {
    const optimized = this.optimizedEvs()

    if (optimized) {
      this.store.evs(this.editingId(), spsToEvs(optimized))
    }

    this.optimizationApplied.emit()
  }

  discardOptimization() {
    const original = this.originalEvs()
    this.store.evs(this.editingId(), spsToEvs(original))

    const originalNature = this.originalNature()
    this.store.nature(this.editingId(), originalNature)

    this.optimizationDiscarded.emit()
  }
}
