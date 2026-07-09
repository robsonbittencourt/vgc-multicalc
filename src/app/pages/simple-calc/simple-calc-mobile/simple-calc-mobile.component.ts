import { Component, computed, effect, ElementRef, inject, OnDestroy, signal, viewChild } from "@angular/core"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageCalc, RollLevelConfig } from "@multicalc/damage-calc"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { DefensiveEvOptimizer } from "@multicalc/ev-optimizer"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { Pokemon, Target } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [
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
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcMobileComponent implements OnDestroy {
  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  overlay = inject(MobileTableOverlayService)
  private damageCalc = new DamageCalc()
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = new DefensiveEvOptimizer()
  private backNavigation = inject(BackNavigationService)

  pokemonBuildMobile = viewChild.required(PokemonBuildMobileComponent)
  pokemonInput = viewChild<ElementRef<HTMLInputElement>>("pokemonInput")
  itemInput = viewChild<ElementRef<HTMLInputElement>>("itemInput")
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>("scrollContainer")

  activeBottomTab = signal<"results" | "field">("results")
  private scrollPositions = new Map<string, number>()

  inputDisplay = computed(() => this.currentPokemon().name)

  activeSide = signal<"left" | "right">("left")
  leftIsAttacker = signal(true)

  currentPokemon = computed(() => (this.activeSide() === "left" ? this.store.leftPokemon() : this.store.rightPokemon()))
  activeMoveIndex = computed(() => Math.max(0, this.currentPokemon().activeMoveIndex))

  isCurrentPokemonAttacker = computed(() => (this.activeSide() === "left" ? this.leftIsAttacker() : !this.leftIsAttacker()))

  otherPokemon = computed(() => (this.activeSide() === "left" ? this.store.rightPokemon() : this.store.leftPokemon()))

  optimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")
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
      return this.damageCalc.calcDamage(current, other, field, true, this.store.useSpsMode())
    }

    return this.damageCalc.calcDamage(other, current, field, true, this.store.useSpsMode())
  })

  target = computed(() => {
    if (this.isCurrentPokemonAttacker()) {
      return new Target(this.otherPokemon())
    }

    return new Target(this.currentPokemon())
  })

  lastHandledLeftPokemonName = "\0"
  lastHandledLeftAbilityName = "\0"
  lastHandledRightPokemonName = "\0"
  lastHandledRightAbilityName = "\0"

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("results"))

    effect(() => {
      const level = this.leftIsAttacker() ? this.store.simpleCalcLeftRollLevel() : this.store.simpleCalcRightRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })

    effect(() => {
      const leftPokemonChanged = this.lastHandledLeftPokemonName != this.store.leftPokemon().name || this.lastHandledLeftAbilityName != this.store.leftPokemon().ability.name
      const rightPokemonChanged = this.lastHandledRightPokemonName != this.store.rightPokemon().name || this.lastHandledRightAbilityName != this.store.rightPokemon().ability.name

      if (leftPokemonChanged || rightPokemonChanged) {
        this.lastHandledLeftPokemonName = this.store.leftPokemon().name
        this.lastHandledLeftAbilityName = this.store.leftPokemon().ability.name

        this.lastHandledRightPokemonName = this.store.rightPokemon().name
        this.lastHandledRightAbilityName = this.store.rightPokemon().ability.name

        this.automaticFieldService.checkAutomaticField(this.store.leftPokemon(), leftPokemonChanged, this.store.rightPokemon(), rightPokemonChanged)
      }
    })
  }

  activateLeftPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.activeSide.set("left")
    this.leftIsAttacker.set(true)
  }

  activateRightPokemon() {
    if (this.optimizedEvs() !== null) {
      this.pokemonBuildMobile().discardOptimization()
      return
    }

    this.activeSide.set("right")
    this.leftIsAttacker.set(false)
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

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: number }) {
    const defender = this.currentPokemon()
    const attacker = this.otherPokemon()
    const field = this.fieldStore.field()

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold as any, rollIndex)

    this.optimizedNature.set(result.nature)
    this.optimizationStatus.set(result.status)

    if (result.status === "success") {
      this.store.evs(defender.id, result.evs!)
      this.optimizedEvs.set(result.evs)
    } else {
      this.optimizedEvs.set(null)
    }

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleOptimizationApplied() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  handleOptimizationDiscarded() {
    if (this.optimizationStatus() !== "idle") {
      this.store.evs(this.currentPokemon().id, this.originalEvs())
      this.store.nature(this.currentPokemon().id, this.originalNature())
    }

    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  handleEvsCleared() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  ngOnDestroy() {
    this.backNavigation.unregister()
  }

  private justOpenedTable = false

  onPokemonMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("pokemon")
    }
  }

  onPokemonClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    const input = this.pokemonInput()?.nativeElement
    if (input) {
      input.value = ""
      this.overlay.setFilter("")
    }
  }

  onPokemonInput(value: string) {
    this.overlay.setFilter(value)
  }

  onPokemonSelected(name: string) {
    this.store.loadPokemonInfo(this.currentPokemon().id, name)
    this.overlay.close()
    this.pokemonInput()?.nativeElement.blur()
  }

  onClosePokemonTable() {
    this.overlay.close()
    const input = this.pokemonInput()?.nativeElement

    if (input) {
      input.value = this.inputDisplay()
    }

    this.pokemonInput()?.nativeElement.blur()
  }

  openMovesTable() {
    this.overlay.open("moves")
  }

  onMoveSelected(move: string) {
    const index = Math.max(0, this.currentPokemon().activeMoveIndex)
    this.store.updateMove(this.currentPokemon().id, move, index)
  }

  onCloseMovesTable() {
    this.overlay.close()
  }

  openAbilitiesTable() {
    this.overlay.open("abilities")
  }

  onAbilitySelected(ability: string) {
    this.store.ability(this.currentPokemon().id, ability)
    this.overlay.close()
  }

  onCloseAbilitiesTable() {
    this.overlay.close()
  }

  openItemsTable() {
    this.overlay.open("items")
  }

  onItemMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("items")
    }
  }

  onItemClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    const input = this.itemInput()?.nativeElement
    if (input) {
      input.value = ""
      this.overlay.setFilter("")
    }
  }

  onItemInput(value: string) {
    this.overlay.setFilter(value)
  }

  onItemSelected(name: string) {
    this.store.item(this.currentPokemon().id, name)
    this.overlay.close()
    this.itemInput()?.nativeElement.blur()
  }

  onCloseItemsTable() {
    this.overlay.close()
    this.itemInput()?.nativeElement.blur()
  }

  onCustomSetEditRequested(set: CustomSet) {
    this.store.enterCustomSetEditMode(this.currentPokemon().id, set.id)
    this.overlay.close()
  }

  exitCustomSetEditMode() {
    this.store.exitCustomSetEditMode()
  }

  onTableSelect(event: TableSelectEvent) {
    switch (event.kind) {
      case "pokemon":
        this.onPokemonSelected(event.value)
        break
      case "moves":
        this.onMoveSelected(event.value)
        break
      case "abilities":
        this.onAbilitySelected(event.value)
        break
      case "items":
        this.onItemSelected(event.value)
        break
    }
  }

  switchTab(newTab: "results" | "field") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer()?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    if (newTab === "results") {
      this.backNavigation.pop()
    } else {
      this.backNavigation.push()
    }

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      const container = this.scrollContainer()
      if (container) {
        container.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
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
