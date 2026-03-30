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
import { Stats, SurvivalThreshold } from "@lib/types"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"
import { MatButtonToggleModule } from "@angular/material/button-toggle"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [PokemonBuildMobileComponent, FieldComponent, PokemonCardComponent, NgClass, MatIcon, MatButtonToggleModule, RollConfigComponent, WidgetComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcMobileComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  pokemonBuildMobile = viewChild.required(PokemonBuildMobileComponent)

  activeBottomTab = signal<"results" | "field">("results")
  private scrollPositions = new Map<string, number>()
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>("scrollContainer")

  activeSide = signal<"left" | "right">("left")
  leftIsAttacker = signal(true)

  currentPokemon = computed(() => (this.activeSide() === "left" ? this.store.leftPokemon() : this.store.rightPokemon()))

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
      return this.damageCalculator.calcDamage(current, other, field, this.leftIsAttacker())
    }

    return this.damageCalculator.calcDamage(other, current, field, this.leftIsAttacker())
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

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.currentPokemon()
    const attacker = this.otherPokemon()
    const field = this.fieldStore.field()

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, 15, !this.leftIsAttacker())

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
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  handleEvsCleared() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
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
