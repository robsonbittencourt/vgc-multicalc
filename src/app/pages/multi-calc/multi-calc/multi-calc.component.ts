import { Component, computed, effect, inject, OnInit, signal, viewChild } from "@angular/core"
import { spsToEvs } from "@multicalc/utils"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageResultOrderService } from "@app/services/damage-result-order.service"
import { MultiCalcMode, RollLevelConfig } from "@multicalc/damage-calc"
import { KoThreshold, OffensiveSpProposal, OPTIMIZABLE_STATS, OptimizationStatus, SurvivalThreshold, TargetCoverage } from "@multicalc/sp-optimizer"
import { Stats } from "@multicalc/types"
import { OptimizationCost } from "@features/pokemon-build/sp-optimizer/sp-optimizer"
import { TargetPokemonComponent } from "@pages/multi-calc/target-pokemon/target-pokemon.component"
import { MultiCalcService } from "@pages/multi-calc/multi-calc.service"

type OptimizedSpread = { sps: Stats; nature: string | null }

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
  private multiCalcService = inject(MultiCalcService)

  pokemonOnEditId = signal<string>(this.store.team().activePokemon()?.id ?? "")
  pokemonOnEdit = computed(() => this.store.findNullablePokemonById(this.pokemonOnEditId()))
  addingTarget = signal(false)

  optimizationStatus = signal<OptimizationStatus | "idle">("idle")
  optimizationImpossible = signal<boolean>(false)
  optimizationCoverage = signal<TargetCoverage | null>(null)
  optimizationKoChance = signal<number | null>(null)
  optimizedSpreads = signal<Map<string, OptimizedSpread>>(new Map())
  originalSpreads = signal<Map<string, OptimizedSpread>>(new Map())

  optimizedEvs = computed(() => this.optimizedSpreads().get(this.pokemonOnEditId())?.sps ?? null)
  optimizedNature = computed(() => this.optimizedSpreads().get(this.pokemonOnEditId())?.nature ?? null)

  optimizationCosts = computed<OptimizationCost[]>(() => {
    const originals = this.originalSpreads()

    return [...this.optimizedSpreads().entries()].flatMap(([pokemonId, optimized]) => {
      const pokemon = this.store.findNullablePokemonById(pokemonId)
      const original = originals.get(pokemonId)

      if (pokemon == undefined || original == undefined) return []

      return [{ pokemonId, name: pokemon.name, sps: optimized.sps, originalSps: original.sps }]
    })
  })

  activeAttacker = computed(() => this.store.findNullablePokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))

  combinedAttackers = this.store.combinedAttackers

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

  private multiCalc = computed(() => this.multiCalcService.withOpponents(this.store.displayedTargets(), this.fieldStore.field()))

  private bestMoveForTargetsEnabled = computed(() => this.menuStore.manyVsOneActivated() && this.menuStore.manyVsOneBestMoveActivated())

  teamComponent = viewChild<TeamComponent>("teamComponent")

  rollLevelConfig = computed(() => {
    const level = this.menuStore.manyVsOneActivated() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
    return RollLevelConfig.fromConfigString(level)
  })

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

      const { firstChanged, secondChanged } = this.automaticFieldService.handlePokemonChange(attacker, this.activeSecondAttacker())

      if (firstChanged || secondChanged) {
        if (this.bestMoveForTargetsEnabled()) {
          this.activateBestMoveForAllTargets()
        }
      }
    })

    effect(() => {
      const target = this.pokemonOnEdit()
      const attacker = this.activeAttacker()

      if (target == undefined) return

      if (this.bestMoveForTargetsEnabled() && attacker != undefined && this.lastHandledTargetOnEditName !== target.name) {
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

      const optimized = this.optimizedSpreads().get(onEdit.id)

      if (optimized == undefined) return

      const current = onEdit.sps
      const evsChanged = OPTIMIZABLE_STATS.some(stat => optimized.sps[stat] !== current[stat])
      const natureChanged = optimized.nature !== null && optimized.nature !== onEdit.nature

      if (evsChanged || natureChanged) {
        this.clearSpreads()
        this.optimizationStatus.set("idle")
        this.optimizationImpossible.set(false)
        this.optimizationCoverage.set(null)
      }
    })
  }

  ngOnInit() {
    this.store.updateSecondAttacker("")
    this.store.activateTeamMember(this.store.team().activePokemonIndex())

    if (this.bestMoveForTargetsEnabled()) {
      this.activateBestMoveForAllTargets()
    }
  }

  bestMoveForTargetsToggled() {
    if (this.bestMoveForTargetsEnabled()) {
      this.activateBestMoveForAllTargets()
    }
  }

  targetsImported() {
    this.addingTarget.set(false)

    if (this.bestMoveForTargetsEnabled()) {
      this.activateBestMoveForAllTargets()
    }
  }

  private activateBestMoveForAllTargets() {
    const attacker = this.activeAttacker()

    if (attacker == undefined) return

    const assignments = this.multiCalcService.withOpponents(this.store.targets(), this.fieldStore.field()).bestMoveIndexForTargets(attacker)

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

  onTargetAddedByCustomSet(set: CustomSet) {
    const id = this.store.addPokemonToTargets(set.basePokemonName)

    this.store.selectCustomSet(id, set.id)
    this.addingTarget.set(false)
    this.updatePokemonOnEditId(id)
  }

  updatePokemonOnEditId(pokemonId: string) {
    const keepsOptimization = this.optimizedSpreads().has(pokemonId)

    if (this.optimizationStatus() !== "idle" && !keepsOptimization) {
      this.handleOptimizationDiscarded()
    }

    this.addingTarget.set(false)
    this.pokemonOnEditId.set(pokemonId)
  }

  onTargetRemoved() {
    this.updatePokemonOnEditId(this.store.team().activePokemon()?.id ?? "")
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.pokemonOnEdit()
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (defender == undefined || targets.length === 0) {
      return
    }

    this.rememberOriginal(defender.id)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.multiCalcService.optimizeDefensiveSps(defender, targets, field, event.updateNature, event.keepOffensiveSps, event.survivalThreshold, rollIndex)

    this.optimizationCoverage.set(result.coverage)
    this.optimizationImpossible.set(result.status === "impossible")
    this.optimizationStatus.set(result.status === "impossible" ? "idle" : result.status)
    this.optimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)

    if (result.status === "success" || result.status === "best-effort") {
      this.store.evs(defender.id, spsToEvs(result.sps))
      this.rememberOptimized(defender.id, result.sps, result.nature)

      if (result.nature) {
        this.store.nature(defender.id, result.nature)
      }
    } else {
      this.clearSpreads()
    }
  }

  private rememberOriginal(pokemonId: string) {
    const pokemon = this.store.findNullablePokemonById(pokemonId)

    if (pokemon == undefined) return

    this.originalSpreads.update(spreads => new Map(spreads).set(pokemonId, { sps: { ...pokemon.sps }, nature: pokemon.nature }))
  }

  private rememberOptimized(pokemonId: string, sps: Stats, nature: string | null) {
    this.optimizedSpreads.update(spreads => new Map(spreads).set(pokemonId, { sps, nature }))
  }

  private clearSpreads() {
    this.optimizedSpreads.set(new Map())
    this.originalSpreads.set(new Map())
  }

  handleOffensiveOptimizeRequest(event: { koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean; partnerKeepOtherSps: boolean; partnerUpdateNature: boolean }) {
    const onEdit = this.pokemonOnEdit()
    const targets = this.store.targets()

    if (onEdit == undefined || targets.length === 0) {
      return
    }

    const secondAttacker = this.activeSecondAttacker()
    const attacker = secondAttacker ? this.activeAttacker() : onEdit

    if (attacker == undefined) {
      return
    }

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.multiCalcService.optimizeOffensiveSps(
      attacker,
      targets,
      this.fieldStore.field(),
      event.koThreshold,
      rollIndex,
      event.keepOtherSps,
      event.updateNature,
      secondAttacker ? { pokemon: secondAttacker, keepOtherSps: event.partnerKeepOtherSps, updateNature: event.partnerUpdateNature } : undefined
    )

    this.optimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)
    this.optimizationCoverage.set(result.coverage)
    this.optimizationImpossible.set(result.status === "impossible")
    this.optimizationStatus.set(result.status === "impossible" ? "idle" : result.status)

    const applicable = result.status === "success" || result.status === "best-effort"

    if (!applicable) {
      this.clearSpreads()

      return
    }

    this.clearSpreads()
    result.proposals.forEach(proposal => this.applyProposal(proposal))
  }

  private applyProposal(proposal: OffensiveSpProposal) {
    const pokemon = this.store.findNullablePokemonById(proposal.pokemonId)

    if (pokemon == undefined) return

    this.rememberOriginal(pokemon.id)

    this.store.evs(pokemon.id, spsToEvs(proposal.sps))
    this.rememberOptimized(pokemon.id, proposal.sps, proposal.nature)

    if (proposal.nature) {
      this.store.nature(pokemon.id, proposal.nature)
    }
  }

  handleOptimizationApplied() {
    this.clearSpreads()
    this.optimizationStatus.set("idle")
    this.optimizationImpossible.set(false)
    this.optimizationCoverage.set(null)
  }

  handleOptimizationDiscarded() {
    if (this.optimizationStatus() !== "idle") {
      this.originalSpreads().forEach((original, pokemonId) => {
        this.store.evs(pokemonId, spsToEvs(original.sps))

        if (original.nature) {
          this.store.nature(pokemonId, original.nature)
        }
      })
    }

    this.clearSpreads()
    this.optimizationStatus.set("idle")
    this.optimizationImpossible.set(false)
    this.optimizationCoverage.set(null)
  }
}
