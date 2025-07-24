import { Component, computed, inject, linkedSignal, OnInit, signal, viewChild } from "@angular/core"
import { TargetPokemonComponent } from "@app/features/multi-calc/target-pokemon/target-pokemon.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { TeamComponent } from "@app/shared/team/team/team.component"
import { TeamsComponent } from "@app/shared/team/teams/teams.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Team } from "@lib/model/team"

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

  order = signal(false)
  pokemonOnEditId = linkedSignal<string>(() => this.activeSecondAttackerId(this.store.team()) ?? this.store.team().activePokemon().id)

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  damageResults = computed(() => this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.order(), this.activeSecondAttacker()))

  teamComponent = viewChild<TeamComponent>("teamComponent")

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

  private activeSecondAttackerId(team: Team): string | undefined {
    return team.teamMembers.find(t => t.active && t.pokemon.id == this.store.secondAttackerId())?.pokemon.id
  }
}
