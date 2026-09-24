import { Component, computed, effect, ElementRef, inject, OnDestroy, signal, viewChild } from "@angular/core"
import { spsToEvs } from "@multicalc/utils"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { RollLevelConfig } from "@multicalc/damage-calc"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { KoThreshold, OptimizationStatus, SurvivalThreshold, TargetCoverage } from "@multicalc/sp-optimizer"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { HeaderVisibilityService } from "@app/services/header-visibility.service"
import { Pokemon, Target } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { SimpleCalcService } from "@pages/simple-calc/simple-calc.service"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { MobileBuildEditingService } from "@features/pokemon-build/mobile-build-editing/mobile-build-editing.service"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { MobileCalcShellComponent } from "@shared/mobile-calc-shell/mobile-calc-shell.component"
import { PokemonSearchInputComponent } from "@shared/pokemon-search-input/pokemon-search-input.component"

const SCROLL_DIRECTION_THRESHOLD = 8
const SCROLL_TOP_ZONE = 50
const SCROLL_REACTION_SUPPRESSION_MS = 400

type SimpleCalcTab = "results" | "field"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  host: { "[class.header-hidden]": "headerVisibility.hidden()" },
  imports: [
    MobileCalcShellComponent,
    PokemonSearchInputComponent,
    PokemonBuildMobileComponent,
    MobileTableOverlayComponent,
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent,
    SaveSetButtonComponent,
    FieldComponent,
    PokemonCardComponent,
    NgClass,
    MatIcon,
    MatButtonToggleModule,
    RollConfigComponent,
    WidgetComponent,
    PokemonSpriteComponent
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileBuildEditingService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcMobileComponent implements OnDestroy {
  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  overlay = inject(MobileTableOverlayService)
  readonly buildEditing = inject(MobileBuildEditingService)
  private simpleCalcService = inject(SimpleCalcService)
  private automaticFieldService = inject(AutomaticFieldService)
  private backNavigation = inject(BackNavigationService)
  headerVisibility = inject(HeaderVisibilityService)

  showBottomNav = signal(true)
  movesStuck = signal(false)

  private lastScrollTop = 0
  private suppressScrollReactionUntil = 0
  private ignoreNextScrollReaction = false

  pokemonBuildMobile = viewChild.required(PokemonBuildMobileComponent)
  pokemonInput = viewChild<PokemonSearchInputComponent>("pokemonInput")
  itemInput = viewChild<PokemonSearchInputComponent>("itemInput")
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>("scrollContainer")

  activeBottomTab = signal<SimpleCalcTab>("results")

  readonly tabs: CalcTab<SimpleCalcTab>[] = [
    { id: "results", label: "Results", icon: "fact_check" },
    { id: "field", label: "Modifiers", icon: "exposure" }
  ]

  readonly homeTab = this.tabs[0].id

  onTabSelected(tab: string) {
    this.switchTab(tab as SimpleCalcTab)
  }

  inputDisplay = computed(() => this.currentPokemon().name)

  activeSide = signal<"left" | "right">("left")
  leftIsAttacker = signal(true)

  currentPokemon = computed(() => (this.activeSide() === "left" ? this.store.leftPokemon() : this.store.rightPokemon()))
  activeMoveIndex = computed(() => Math.max(0, this.currentPokemon().activeMoveIndex))

  isCurrentPokemonAttacker = computed(() => (this.activeSide() === "left" ? this.leftIsAttacker() : !this.leftIsAttacker()))

  otherPokemon = computed(() => (this.activeSide() === "left" ? this.store.rightPokemon() : this.store.leftPokemon()))

  optimizationStatus = signal<OptimizationStatus | "idle">("idle")
  optimizationImpossible = signal<boolean>(false)
  optimizationCoverage = signal<TargetCoverage | null>(null)
  optimizationKoChance = signal<number | null>(null)
  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")

  rollLevelConfig = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcLeftRollLevel()))

  damageResult = computed(() => {
    const current = this.currentPokemon()
    const other = this.otherPokemon()
    const field = this.fieldStore.field()

    if (this.isCurrentPokemonAttacker()) {
      return this.simpleCalcService.damage(current, other, field, this.store.useSpsMode(), this.activeSide() === "left")
    }

    return this.simpleCalcService.damage(other, current, field, this.store.useSpsMode(), this.activeSide() === "right")
  })

  target = computed(() => {
    if (this.isCurrentPokemonAttacker()) {
      return new Target(this.otherPokemon())
    }

    return new Target(this.currentPokemon())
  })

  constructor() {
    this.buildEditing.track({
      editingId: () => this.currentPokemon().id,
      moveIndex: () => Math.max(0, this.currentPokemon().activeMoveIndex),
      pokemonInput: () => this.pokemonInput(),
      itemInput: () => this.itemInput(),
      pokemonSelected: name => this.onPokemonSelected(name)
    })

    this.backNavigation.register({
      tab: () => this.activeBottomTab.set(this.homeTab),
      overlay: () => this.overlay.closeWithoutHistory(),
      exhausted: () => this.activeBottomTab.set(this.homeTab)
    })

    effect(() => {
      const level = this.leftIsAttacker() ? this.store.simpleCalcLeftRollLevel() : this.store.simpleCalcRightRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })

    effect(() => {
      this.automaticFieldService.handlePokemonChange(this.store.leftPokemon(), this.store.rightPokemon(), "attacker", "defender")
    })
  }

  activateLeftPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.activeSide.set("left")
    this.leftIsAttacker.set(true)
    this.suppressScrollReactionUntil = Date.now() + SCROLL_REACTION_SUPPRESSION_MS
  }

  activateRightPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.activeSide.set("right")
    this.leftIsAttacker.set(false)
    this.suppressScrollReactionUntil = Date.now() + SCROLL_REACTION_SUPPRESSION_MS
  }

  toggleCurrentPokemonRole() {
    this.leftIsAttacker.update(v => !v)
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon

    if (!singlePokemon) return

    if (this.activeSide() === "left") {
      this.store.changeLeftPokemon(singlePokemon)
    } else {
      this.store.changeRightPokemon(singlePokemon)
    }
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: number }) {
    const defender = this.currentPokemon()
    const attacker = this.otherPokemon()
    const field = this.fieldStore.field()

    this.originalEvs.set({ ...defender.sps })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.simpleCalcService.optimizeDefensiveSps(defender, attacker, field, event.updateNature, event.keepOffensiveSps, event.survivalThreshold as SurvivalThreshold, rollIndex, this.activeSide() === "right")

    this.optimizedNature.set(result.nature)
    this.optimizationCoverage.set(result.coverage)
    this.optimizationImpossible.set(result.status === "impossible")
    this.optimizationStatus.set(result.status === "impossible" ? "idle" : result.status)
    this.optimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)

    if (result.status === "success" || result.status === "best-effort") {
      this.store.evs(defender.id, spsToEvs(result.sps))
      this.optimizedEvs.set(result.sps)

      if (result.nature) {
        this.store.nature(defender.id, result.nature)
      }
    } else {
      this.optimizedEvs.set(null)
    }
  }

  handleOffensiveOptimizeRequest(event: { koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean }) {
    const attacker = this.currentPokemon()
    const defender = this.otherPokemon()

    this.originalEvs.set({ ...attacker.sps })
    this.originalNature.set(attacker.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.simpleCalcService.optimizeOffensiveSps(attacker, defender, this.fieldStore.field(), event.koThreshold, rollIndex, this.activeSide() === "left", event.keepOtherSps, event.updateNature)

    this.optimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)
    this.optimizationCoverage.set(result.coverage)
    this.optimizationImpossible.set(result.status === "impossible")
    this.optimizationStatus.set(result.status === "impossible" ? "idle" : result.status)

    const proposal = result.proposals.find(candidate => candidate.pokemonId === attacker.id)

    if ((result.status === "success" || result.status === "best-effort") && proposal) {
      const sps = proposal.sps
      this.store.evs(attacker.id, spsToEvs(sps))
      this.optimizedEvs.set(sps)
      this.optimizedNature.set(proposal.nature)

      if (proposal.nature) {
        this.store.nature(attacker.id, proposal.nature)
      }
    } else {
      this.optimizedEvs.set(null)
      this.optimizedNature.set(null)
    }
  }

  handleOptimizationApplied() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
    this.optimizationImpossible.set(false)
    this.optimizationCoverage.set(null)
  }

  handleOptimizationDiscarded() {
    if (this.optimizationStatus() !== "idle") {
      this.store.evs(this.currentPokemon().id, spsToEvs(this.originalEvs()))
      this.store.nature(this.currentPokemon().id, this.originalNature())
    }

    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
    this.optimizationImpossible.set(false)
    this.optimizationCoverage.set(null)
  }

  handleEvsCleared() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
    this.optimizationImpossible.set(false)
    this.optimizationCoverage.set(null)
  }

  ngOnDestroy() {
    this.backNavigation.unregister()
    this.headerVisibility.reset()
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement
    const currentScroll = target.scrollTop

    this.updateMovesStuck()

    const delta = currentScroll - this.lastScrollTop

    this.lastScrollTop = currentScroll

    if (Date.now() < this.suppressScrollReactionUntil) return

    if (this.ignoreNextScrollReaction) {
      this.ignoreNextScrollReaction = false

      if (delta < 0) return
    }

    if (currentScroll <= SCROLL_TOP_ZONE) {
      this.showBottomNav.set(true)
      this.headerVisibility.show()

      return
    }

    if (Math.abs(delta) < SCROLL_DIRECTION_THRESHOLD) return

    if (delta > 0) {
      this.ignoreNextScrollReaction = true
      this.showBottomNav.set(false)
      this.headerVisibility.hide()
    } else if (delta < 0) {
      this.showBottomNav.set(true)
      this.headerVisibility.show()
    }
  }

  private updateMovesStuck() {
    const container = this.scrollContainer()?.nativeElement
    const moves = container?.querySelector("app-pokemon-moves-mobile.sticky")

    if (!container || !moves) {
      this.movesStuck.set(false)

      return
    }

    const stickyTop = parseFloat(getComputedStyle(moves).top) || 0

    this.movesStuck.set(moves.getBoundingClientRect().top <= container.getBoundingClientRect().top + stickyTop + 1)
  }

  onPokemonSelected(name: string) {
    this.store.loadPokemonInfo(this.currentPokemon().id, name)
    this.overlay.close()
    this.pokemonInput()?.blur()
  }

  onClosePokemonTable() {
    this.overlay.close()
    this.pokemonInput()?.setValue(this.inputDisplay())
    this.pokemonInput()?.blur()
  }

  onCloseAbilitiesTable() {
    this.overlay.close()
  }

  onCustomSetEditRequested(set: CustomSet) {
    this.store.enterCustomSetEditMode(this.currentPokemon().id, set.id)
    this.overlay.close()
  }

  exitCustomSetEditMode() {
    this.store.exitCustomSetEditMode()
  }

  switchTab(newTab: "results" | "field") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    this.activeBottomTab.set(newTab)

    if (newTab === this.homeTab) {
      this.backNavigation.pop()
    } else {
      this.backNavigation.push({ kind: "tab", tab: newTab })
    }
  }

  handleRollLevelChange(rollLevel: RollLevelConfig) {
    this.rollLevelConfig.set(rollLevel)

    if (this.activeSide() === "left") {
      this.store.updateSimpleCalcLeftRollLevel(rollLevel.toConfigString())
    } else {
      this.store.updateSimpleCalcRightRollLevel(rollLevel.toConfigString())
    }
  }
}
