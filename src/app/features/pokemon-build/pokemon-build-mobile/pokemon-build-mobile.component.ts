import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { CalcStore, CombinedAttacker } from "@store/calc-store"
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
import { FeatureFlagsStore } from "@store/feature-flags-store"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { OptimizationCost, SpOptimizer } from "@features/pokemon-build/sp-optimizer/sp-optimizer"
import { SpOptimizerPanelMobileComponent } from "@features/pokemon-build/sp-optimizer/sp-optimizer-panel-mobile/sp-optimizer-panel-mobile.component"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  host: { "[class.sticky-moves]": "stickyMoves()" },
  imports: [
    NgClass,
    NgStyle,
    MatButton,
    MatIcon,
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
    TypeComboBoxComponent,
    SegmentedControlComponent,
    SpOptimizerPanelMobileComponent
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
  remainingLabel = computed(() => "Remaining")
  remainingPoints = computed(() => {
    const remaining = remainingSps(this.pokemon().sps)

    if (this.store.useSpsMode()) {
      return remaining
    } else {
      return spToEv(remaining)
    }
  })

  readonly pointsModeOptions: SegmentedOption<boolean>[] = [
    { value: true, label: "SP", dataCy: "points-mode-sp-mobile" },
    { value: false, label: "EV", dataCy: "points-mode-ev-mobile" }
  ]

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

  readonly optimizer = new SpOptimizer({
    status: () => this.optimizationStatus(),
    koChance: () => this.optimizationKoChance(),
    optimizedEvs: () => this.optimizedEvs(),
    optimizedNature: () => this.optimizedNature(),
    coverage: () => this.optimizationCoverage(),
    costs: () => this.optimizationCosts(),
    useSpsMode: () => this.store.useSpsMode(),
    isSupported: () => this.isOptimizationSupported(),
    canOptimizeBulk: () => this.canOptimizeBulk(),
    canOptimizeDamage: () => this.canOptimizeDamage()
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

  isOptimizationValid = computed(() => {
    const optimizedEvs = this.optimizedEvs()
    const initialEvs = this.currentEvs()

    if (!optimizedEvs) return false

    return (Object.keys(optimizedEvs) as (keyof Stats)[]).every(stat => optimizedEvs[stat] >= (initialEvs as any)[stat])
  })

  hasProposal = computed(() => this.optimizationStatus() === "success" || this.optimizationStatus() === "best-effort")

  clearSps() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    this.evsChanged.emit()

    if (this.hasProposal()) {
      this.optimizationDiscarded.emit()
    }
  }

  setSpsMode(useSps: boolean) {
    if (this.store.useSpsMode() === useSps) return

    this.store.toggleSpsMode()
  }

  optimizeSps() {
    const pokemon = this.pokemon()

    this.optimizer.rememberOriginal(pokemon.sps, pokemon.nature)

    if (this.optimizer.isDamageMode()) {
      this.offensiveOptimizationRequested.emit(this.optimizer.offensiveRequest())

      return
    }

    this.optimizationRequested.emit(this.optimizer.defensiveRequest())
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
