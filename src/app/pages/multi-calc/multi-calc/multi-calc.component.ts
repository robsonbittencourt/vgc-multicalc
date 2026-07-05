import { Component, computed, effect, inject, OnInit, signal, viewChild } from "@angular/core"
import { CalculatorStore } from "@store/calculator-store"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageResultOrderService } from "@core/services/damage-result-order.service"
import { DamageMultiCalcService, RollLevelConfig } from "@multicalc/damage-calculator"
import { DefensiveEvOptimizerService } from "@multicalc/ev-optimizer"
import { Target } from "@multicalc/model"
import { MultiCalcMode, Stats, SurvivalThreshold } from "@multicalc/types"
import { TargetPokemonComponent } from "@pages/multi-calc/target-pokemon/target-pokemon.component"

@Component({
  selector: "app-multi-calc",
  templateUrl: "./multi-calc.component.html",
  styleUrls: ["./multi-calc.component.scss"],
  providers: [DamageResultOrderService, FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "multi" }],
  imports: [TeamComponent, TeamsDesktopComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent implements OnInit {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private fieldStore = inject(FieldStore)
  private damageCalculator = new DamageMultiCalcService()
  private damageOrder = inject(DamageResultOrderService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = new DefensiveEvOptimizerService()

  pokemonOnEditId = signal<string>(this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonOnEditId()))

  optimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  multiCalcMode = computed<MultiCalcMode>(() => ({
    oneVsManyActivated: this.menuStore.oneVsManyActivated(),
    manyVsOneActivated: this.menuStore.manyVsOneActivated(),
    oneVsManyBestMoveActivated: this.menuStore.oneVsManyBestMoveActivated()
  }))
  targetsWithSpecificCalc = computed(() => this.countTargetsWithSpecificCalc())

  private countTargetsWithSpecificCalc(): number {
    const targets = this.store.targets()
    const withTera = targets.filter(t => t.pokemon.teraTypeActive).length
    const withCommander = targets.filter(t => t.pokemon.commanderActive).length
    return withTera + withCommander
  }
  damageResults = computed(() => {
    const results = this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.displayedTargets(), this.fieldStore.field(), this.multiCalcMode(), this.activeSecondAttacker(), this.store.useSpsMode())

    return this.menuStore.orderByDamage() ? this.damageOrder.order(results, this.targetsWithSpecificCalc(), this.multiCalcMode()) : results
  })

  teamComponent = viewChild<TeamComponent>("teamComponent")

  rollLevelConfig = computed(() => {
    const level = this.menuStore.manyVsOneActivated() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
    return RollLevelConfig.fromConfigString(level)
  })

  lastHandledPokemonNameFirst = "\0"
  lastHandledAbilityNameFirst = "\0"
  lastHandledPokemonNameSecond: string | undefined = undefined
  lastHandledAbilityNameSecond: string | undefined = undefined
  lastHandledTargetOnEditName = ""

  constructor() {
    this.damageOrder.initialize(this.countTargetsWithSpecificCalc())

    effect(() => {
      const activeId = this.store.team().activePokemon().id
      if (this.pokemonOnEditId() !== activeId && !this.store.findPokemonById(this.pokemonOnEditId())) {
        this.pokemonOnEditId.set(activeId)
      }
    })

    effect(() => {
      const firstPokemonChanged = this.lastHandledPokemonNameFirst != this.activeAttacker().name || this.lastHandledAbilityNameFirst != this.activeAttacker().ability.name
      const secondPokemonChanged = this.lastHandledPokemonNameSecond != this.activeSecondAttacker()?.name || this.lastHandledAbilityNameSecond != this.activeSecondAttacker()?.ability.name

      if (firstPokemonChanged || secondPokemonChanged) {
        this.lastHandledPokemonNameFirst = this.activeAttacker().name
        this.lastHandledAbilityNameFirst = this.activeAttacker().ability.name

        this.lastHandledPokemonNameSecond = this.activeSecondAttacker()?.name
        this.lastHandledAbilityNameSecond = this.activeSecondAttacker()?.ability.name

        this.automaticFieldService.checkAutomaticField(this.activeAttacker(), firstPokemonChanged, this.activeSecondAttacker(), secondPokemonChanged)

        if (this.menuStore.manyVsOneActivated()) {
          this.store.targets().forEach((target: Target) => {
            if (!target.pokemon.isDefault && !target.secondPokemon) {
              this.store.activateMove(target.pokemon.id, this.damageCalculator.bestMoveIndex(target.pokemon, this.activeAttacker(), this.fieldStore.field()))
            }
          })
        }
      }
    })

    effect(() => {
      const target = this.pokemonOnEdit()

      if (this.menuStore.manyVsOneActivated() && !target.isDefault && this.lastHandledTargetOnEditName !== target.name) {
        const isTarget = this.store.targets().some(t => t.pokemon.id === target.id)

        if (isTarget) {
          this.store.activateMove(target.id, this.damageCalculator.bestMoveIndex(target, this.activeAttacker(), this.fieldStore.field()))
        }
      }

      this.lastHandledTargetOnEditName = target.name
    })

    effect(() => {
      const optimized = this.optimizedEvs()
      const current = this.pokemonOnEdit().evs
      const optimizedNature = this.optimizedNature()
      const currentNature = this.pokemonOnEdit().nature

      if (optimized !== null) {
        const evsChanged = optimized.hp !== current.hp || optimized.def !== current.def || optimized.spd !== current.spd
        const natureChanged = optimizedNature !== null && optimizedNature !== currentNature

        if (evsChanged || natureChanged) {
          this.optimizedEvs.set(null)
          this.optimizedNature.set(null)
          this.optimizationStatus.set("idle")
        }
      }
    })
  }

  ngOnInit() {
    this.store.updateSecondAttacker("")
    this.store.activateTeamMember(this.store.team().activePokemonIndex())

    if (this.menuStore.manyVsOneActivated()) {
      this.store.targets().forEach((target: Target) => {
        if (!target.pokemon.isDefault && !target.secondPokemon) {
          this.store.activateMove(target.pokemon.id, this.damageCalculator.bestMoveIndex(target.pokemon, this.activeAttacker(), this.fieldStore.field()))
        }
      })
    }
  }

  targetsImported() {
    if (this.store.findPokemonById(this.pokemonOnEditId()).isDefault) {
      this.updatePokemonOnEditId(this.store.team().activePokemon().id)
    }

    if (this.menuStore.manyVsOneActivated()) {
      this.store.targets().forEach((target: Target) => {
        if (!target.pokemon.isDefault && !target.secondPokemon) {
          this.store.activateMove(target.pokemon.id, this.damageCalculator.bestMoveIndex(target.pokemon, this.activeAttacker(), this.fieldStore.field()))
        }
      })
    }
  }

  targetActivated(pokemonId: string) {
    this.updatePokemonOnEditId(pokemonId)

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
      document.body.scrollTo({ top: 0, behavior: "smooth" })
    }, 150)
  }

  onPokemonAddedToTargets(pokemonId: string) {
    this.updatePokemonOnEditId(pokemonId)

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
      document.body.scrollTo({ top: 0, behavior: "smooth" })
      this.teamComponent()?.focusPokemonSelector()
    }, 150)
  }

  updatePokemonOnEditId(pokemonId: string) {
    if (this.optimizationStatus() !== "idle") {
      this.handleOptimizationDiscarded()
    }

    this.pokemonOnEditId.set(pokemonId)
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.pokemonOnEdit()
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (targets.length === 0) {
      return
    }

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.defensiveEvOptimizer.optimize(defender, targets, field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, rollIndex, false)

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
      this.store.evs(this.pokemonOnEditId(), this.originalEvs())
      this.store.nature(this.pokemonOnEditId(), this.originalNature())
    }

    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }
}
