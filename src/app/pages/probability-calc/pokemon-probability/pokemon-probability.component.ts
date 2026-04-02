import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from "@angular/core"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { ConsistencyScoreService } from "@lib/probability-calc/consistency-score.service"
import { MoveProbabilityService } from "@lib/probability-calc/move-probability.service"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-pokemon-probability",
  imports: [WidgetComponent, PokemonMovesMobileComponent],
  templateUrl: "./pokemon-probability.component.html",
  styleUrl: "./pokemon-probability.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonProbabilityComponent {
  isMobile = input<boolean>(false)
  pokemon = input<Pokemon | null>(null)
  store = inject(CalculatorStore)
  moveProbabilityService = inject(MoveProbabilityService)
  consistencyScoreService = inject(ConsistencyScoreService)

  effectivePokemon = computed(() => this.pokemon() || this.store.team().activePokemon())
  move = computed(() => this.effectivePokemon().moveSet.activeMove)

  secondary = computed(() => JSON.stringify(this.effectivePokemon().moveSet.activeMove.secondary?.chance))

  accuracy = computed(() => this.effectivePokemon().moveSet.activeMove.accuracy)
  target = computed(() => this.effectivePokemon().moveSet.activeMove.target)

  oneTimeSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 1, this.target()))
  twoTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 2, this.target()))
  threeTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 3, this.target()))
  fourTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 4, this.target()))
  fiveTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 5, this.target()))

  oneTime = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 1, this.target()))
  twoTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 2, this.target()))
  threeTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 3, this.target()))
  fourTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 4, this.target()))
  fiveTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 5, this.target()))

  hasSecondaryEffect = computed(() => this.secondary())

  hasValidPokemon = computed(() => !this.effectivePokemon().isDefault)

  score = computed(() => {
    const result = this.consistencyScoreService.consistencyScore(this.effectivePokemon().moveSet)
    return result ? Math.round(result) : 0
  })
  teamScore = computed(() => Math.round(this.consistencyScoreService.teamConsistencyScore(this.store.team())))
}
