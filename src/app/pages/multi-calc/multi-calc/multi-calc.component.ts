import { Component, computed, effect, inject, OnInit, signal, viewChild } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageResultOrderService } from "@app/services/damage-result-order.service"
import { MultiCalcMode, RollLevelConfig } from "@multicalc/damage-calc"
import { MultiCalc } from "@multicalc/multi-calc"
import { DefensiveEvOptimizer, DEFENSIVE_STATS, SurvivalThreshold } from "@multicalc/ev-optimizer"
import { Stats } from "@multicalc/types"
import { TargetPokemonComponent } from "@pages/multi-calc/target-pokemon/target-pokemon.component"

@Component({
  selector: "app-multi-calc",
  templateUrl: "./multi-calc.component.html",
  styleUrls: ["./multi-calc.component.scss"],
  providers: [DamageResultOrderService, FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "multi" }],
  imports: [TeamComponent, TeamsDesktopComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent implements OnInit {
  store = inject(CalcStore)
  menuStore = inject(MenuStore)
  private fieldStore = inject(FieldStore)
  private damageOrder = inject(DamageResultOrderService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = new DefensiveEvOptimizer()

  pokemonOnEditId = signal<string>(this.store.team().activePokemon()?.id ?? "")
  pokemonOnEdit = computed(() => this.store.findNullablePokemonById(this.pokemonOnEditId()))
  addingTarget = signal(false)

  optimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")

  activeAttacker = computed(() => this.store.findNullablePokemonById(this.store.attackerId()))
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
    const results = this.calculateResults()

    return this.menuStore.orderByDamage() ? this.damageOrder.order(results, this.targetsWithSpecificCalc(), this.multiCalcMode()) : results
  })

  private calculateResults() {
    const attacker = this.activeAttacker()

    if (attacker == undefined) return []

    if (this.menuStore.manyVsOneActivated()) {
      return this.multiCalc().damageDefending(attacker, this.store.useSpsMode())
    }

    return this.multiCalc().damageAttacking(attacker, { bestMove: this.menuStore.oneVsManyBestMoveActivated(), useSpsMode: this.store.useSpsMode() }, this.activeSecondAttacker())
  }

  private multiCalc = computed(() => MultiCalc.withOpponents(this.store.displayedTargets(), this.fieldStore.field()))

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
      const active = this.store.team().activePokemon()

      if (active == undefined) {
        if (this.store.findNullablePokemonById(this.pokemonOnEditId()) == undefined) {
          this.pokemonOnEditId.set("")
        }

        return
      }

      if (this.pokemonOnEditId() !== active.id && !this.store.findNullablePokemonById(this.pokemonOnEditId())) {
        this.pokemonOnEditId.set(active.id)
      }
    })

    effect(() => {
      const attacker = this.activeAttacker()

      if (attacker == undefined) return

      const firstPokemonChanged = this.lastHandledPokemonNameFirst != attacker.name || this.lastHandledAbilityNameFirst != attacker.ability.name
      const secondPokemonChanged = this.lastHandledPokemonNameSecond != this.activeSecondAttacker()?.name || this.lastHandledAbilityNameSecond != this.activeSecondAttacker()?.ability.name

      if (firstPokemonChanged || secondPokemonChanged) {
        this.lastHandledPokemonNameFirst = attacker.name
        this.lastHandledAbilityNameFirst = attacker.ability.name

        this.lastHandledPokemonNameSecond = this.activeSecondAttacker()?.name
        this.lastHandledAbilityNameSecond = this.activeSecondAttacker()?.ability.name

        this.automaticFieldService.checkAutomaticField(attacker, firstPokemonChanged, this.activeSecondAttacker(), secondPokemonChanged)

        if (this.menuStore.manyVsOneActivated()) {
          this.activateBestMoveForAllTargets()
        }
      }
    })

    effect(() => {
      const target = this.pokemonOnEdit()
      const attacker = this.activeAttacker()

      if (target == undefined) return

      if (this.menuStore.manyVsOneActivated() && attacker != undefined && this.lastHandledTargetOnEditName !== target.name) {
        const isTarget = this.store.targets().some(t => t.pokemon.id === target.id)

        if (isTarget) {
          this.store.activateMove(target.id, this.multiCalc().bestMoveIndex(target, attacker))
        }
      }

      this.lastHandledTargetOnEditName = target.name
    })

    effect(() => {
      const onEdit = this.pokemonOnEdit()

      if (onEdit == undefined) return

      const optimized = this.optimizedEvs()
      const current = onEdit.evs
      const optimizedNature = this.optimizedNature()
      const currentNature = onEdit.nature

      if (optimized !== null) {
        const evsChanged = DEFENSIVE_STATS.some(stat => optimized[stat] !== current[stat])
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
      this.activateBestMoveForAllTargets()
    }
  }

  targetsImported() {
    this.addingTarget.set(false)

    if (this.menuStore.manyVsOneActivated()) {
      this.activateBestMoveForAllTargets()
    }
  }

  private activateBestMoveForAllTargets() {
    const attacker = this.activeAttacker()

    if (attacker == undefined) return

    const assignments = MultiCalc.withOpponents(this.store.targets(), this.fieldStore.field()).bestMoveIndexForTargets(attacker)

    assignments.forEach(({ targetId, moveIndex }) => {
      this.store.activateMove(targetId, moveIndex)
    })
  }

  targetActivated(pokemonId: string) {
    this.updatePokemonOnEditId(pokemonId)

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
      document.body.scrollTo({ top: 0, behavior: "smooth" })
    }, 150)
  }

  startAddingTarget() {
    this.addingTarget.set(true)

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
      document.body.scrollTo({ top: 0, behavior: "smooth" })
      this.teamComponent()?.focusPokemonSelector()
    }, 150)
  }

  onTargetAddedByName(pokemonName: string) {
    const id = this.store.addPokemonToTargets(pokemonName)

    this.addingTarget.set(false)
    this.updatePokemonOnEditId(id)
  }

  updatePokemonOnEditId(pokemonId: string) {
    if (this.optimizationStatus() !== "idle") {
      this.handleOptimizationDiscarded()
    }

    this.addingTarget.set(false)
    this.pokemonOnEditId.set(pokemonId)
  }

  onTargetRemoved() {
    this.updatePokemonOnEditId(this.store.team().activePokemon()?.id ?? "")
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.pokemonOnEdit()
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (defender == undefined || targets.length === 0) {
      return
    }

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.defensiveEvOptimizer.optimize(defender, targets, field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, rollIndex, false)

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
      this.store.evs(this.pokemonOnEditId(), this.originalEvs())
      this.store.nature(this.pokemonOnEditId(), this.originalNature())
    }

    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }
}
