import { Component, computed, effect, inject, OnInit, signal, viewChild } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsComponent } from "@features/team/teams/teams.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Stats } from "@lib/types"
import { TargetPokemonComponent } from "@pages/multi-calc/target-pokemon/target-pokemon.component"

@Component({
  selector: "app-multi-calc",
  templateUrl: "./multi-calc.component.html",
  styleUrls: ["./multi-calc.component.scss"],
  providers: [DamageMultiCalcService, DamageResultOrderService],
  imports: [TeamComponent, TeamsComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent implements OnInit {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageMultiCalcService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  order = signal(true)
  pokemonOnEditId = signal<string>(this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonOnEditId()))

  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  damageResults = computed(() => this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.order(), this.activeSecondAttacker()))

  teamComponent = viewChild<TeamComponent>("teamComponent")

  lastHandledPokemonNameFirst = ""
  lastHandledAbilityNameFirst = ""
  lastHandledPokemonNameSecond: string | undefined = undefined
  lastHandledAbilityNameSecond: string | undefined = undefined

  constructor() {
    effect(() => {
      const firstPokemonChanged = this.lastHandledPokemonNameFirst != this.activeAttacker().name || this.lastHandledAbilityNameFirst != this.activeAttacker().ability.name
      const secondPokemonChanged = this.lastHandledPokemonNameSecond != this.activeSecondAttacker()?.name || this.lastHandledAbilityNameSecond != this.activeSecondAttacker()?.ability.name

      if (firstPokemonChanged || secondPokemonChanged) {
        this.lastHandledPokemonNameFirst = this.activeAttacker().name
        this.lastHandledAbilityNameFirst = this.activeAttacker().ability.name

        this.lastHandledPokemonNameSecond = this.activeSecondAttacker()?.name
        this.lastHandledAbilityNameSecond = this.activeSecondAttacker()?.ability.name

        this.automaticFieldService.checkAutomaticField(this.activeAttacker(), firstPokemonChanged, this.activeSecondAttacker(), secondPokemonChanged)
      }
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
        }
      }
    })
  }

  ngOnInit() {
    this.store.updateSecondAttacker("")
    this.store.activateTeamMember(this.store.team().activePokemonIndex())
  }

  targetsImported() {
    if (this.store.findPokemonById(this.pokemonOnEditId()).isDefault) {
      this.pokemonOnEditId.set(this.store.team().activePokemon().id)
    }
  }

  orderChanged(order: boolean) {
    this.order.set(order)
  }

  targetActivated(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.teamComponent()?.scrollToPokemonSelector()
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean }) {
    const defender = this.pokemonOnEdit()
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (targets.length === 0) {
      return
    }

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, targets, field, event.updateNature, event.keepOffensiveEvs)

    this.optimizedEvs.set(result.evs)
    this.optimizedNature.set(result.nature)

    this.store.evs(defender.id, result.evs)

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleOptimizationApplied() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
  }

  handleOptimizationDiscarded() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
  }
}
