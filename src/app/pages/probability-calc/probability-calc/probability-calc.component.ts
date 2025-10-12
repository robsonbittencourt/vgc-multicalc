import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@app/features/team/team/team.component"
import { TeamsComponent } from "@app/features/team/teams/teams.component"
import { GeneralProbabilityComponent } from "@app/pages/probability-calc/general-probability/general-probability.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-probability-calc",
  templateUrl: "./probability-calc.component.html",
  styleUrl: "./probability-calc.component.scss",
  imports: [TeamComponent, TeamsComponent, GeneralProbabilityComponent]
})
export class ProbabilityCalcComponent {
  store = inject(CalculatorStore)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
}
