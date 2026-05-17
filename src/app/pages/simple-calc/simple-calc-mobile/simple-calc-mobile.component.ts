import { SpriteService } from "@data/sprite.service"
import { Component, computed, effect, ElementRef, inject, signal, viewChild } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats } from "@lib/types"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { PokemonTableComponent } from "@features/pokemon-build/tables/pokemon-table/pokemon-table.component"
import { MovesTableComponent } from "@features/pokemon-build/tables/moves-table/moves-table.component"
import { AbilitiesTableComponent } from "@features/pokemon-build/tables/abilities-table/abilities-table.component"
import { ItemsTableComponent } from "@features/pokemon-build/tables/items-table/items-table.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [
    PokemonBuildMobileComponent,
    PokemonTableComponent,
    MovesTableComponent,
    AbilitiesTableComponent,
    ItemsTableComponent,
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent,
    FieldComponent,
    PokemonCardComponent,
    NgClass,
    MatIcon,
    MatButtonToggleModule,
    RollConfigComponent,
    WidgetComponent
  ],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcMobileComponent {
  spriteService = inject(SpriteService)
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  pokemonBuildMobile = viewChild.required(PokemonBuildMobileComponent)
  pokemonInput = viewChild<ElementRef<HTMLInputElement>>("pokemonInput")
  itemInput = viewChild<ElementRef<HTMLInputElement>>("itemInput")
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>("scrollContainer")

  activeBottomTab = signal<"results" | "field">("results")
  showPokemonTable = signal(false)
  pokemonDataFilter = signal<string>("")
  firstPokemonFromList = signal<string>("")
  showMovesTable = signal(false)
  moveDataFilter = signal<string>("")
  firstMoveFromList = signal<string>("")
  showAbilitiesTable = signal(false)
  abilityDataFilter = signal<string>("")
  firstAbilityFromList = signal<string>("")
  showItemsTable = signal(false)
  itemDataFilter = signal<string>("")
  firstItemFromList = signal<string>("")
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
      return this.damageCalculator.calcDamage(current, other, field)
    }

    return this.damageCalculator.calcDamage(other, current, field)
  })

  target = computed(() => {
    if (this.isCurrentPokemonAttacker()) {
      return new Target(this.otherPokemon())
    }

    return new Target(this.currentPokemon())
  })

  lastHandledLeftPokemonName = ""
  lastHandledLeftAbilityName = ""
  lastHandledRightPokemonName = ""
  lastHandledRightAbilityName = ""

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))

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

    if (result.evs) {
      if (result.evs.hp === 0 && result.evs.def === 0 && result.evs.spd === 0) {
        this.optimizationStatus.set("not-needed")
        this.optimizedEvs.set(null)
      } else {
        this.store.evs(defender.id, result.evs)
        this.optimizationStatus.set("success")
        this.optimizedEvs.set(result.evs)
      }
    } else {
      this.optimizationStatus.set("no-solution")
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

  private justOpenedTable = false

  onPokemonMouseDown(event: MouseEvent) {
    if (!this.showPokemonTable()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.showPokemonTable.set(true)
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
      this.pokemonDataFilter.set("")
    }
  }

  onPokemonInput(value: string) {
    this.pokemonDataFilter.set(value)
  }

  onPokemonSelected(name: string) {
    this.store.loadPokemonInfo(this.currentPokemon().id, name)
    this.pokemonDataFilter.set("")
    this.showPokemonTable.set(false)
    this.pokemonInput()?.nativeElement.blur()
  }

  onClosePokemonTable() {
    this.pokemonDataFilter.set("")
    this.showPokemonTable.set(false)
    this.pokemonInput()?.nativeElement.blur()
  }

  openMovesTable() {
    this.showMovesTable.set(true)
  }

  onMoveSelected(move: string) {
    const index = Math.max(0, this.currentPokemon().activeMoveIndex)
    this.store.updateMove(this.currentPokemon().id, move, index)
    this.moveDataFilter.set("")
  }

  onCloseMovesTable() {
    this.moveDataFilter.set("")
    this.showMovesTable.set(false)
  }

  openAbilitiesTable() {
    this.showAbilitiesTable.set(true)
  }

  onAbilitySelected(ability: string) {
    this.store.ability(this.currentPokemon().id, ability)
    this.abilityDataFilter.set("")
    this.showAbilitiesTable.set(false)
  }

  onCloseAbilitiesTable() {
    this.abilityDataFilter.set("")
    this.showAbilitiesTable.set(false)
  }

  openItemsTable() {
    this.showItemsTable.set(true)
  }

  onItemMouseDown(event: MouseEvent) {
    if (!this.showItemsTable()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.showItemsTable.set(true)
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
      this.itemDataFilter.set("")
    }
  }

  onItemInput(value: string) {
    this.itemDataFilter.set(value)
  }

  onItemSelected(name: string) {
    this.store.item(this.currentPokemon().id, name)
    this.itemDataFilter.set("")
    this.showItemsTable.set(false)
    this.itemInput()?.nativeElement.blur()
  }

  onCloseItemsTable() {
    this.itemDataFilter.set("")
    this.showItemsTable.set(false)
    this.itemInput()?.nativeElement.blur()
  }

  switchTab(newTab: "results" | "field") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer()?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

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
