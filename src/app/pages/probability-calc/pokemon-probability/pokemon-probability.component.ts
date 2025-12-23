import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { ConsistencyScoreService } from "@lib/probability-calc/consistency-score.service"
import { MoveProbabilityService } from "@lib/probability-calc/move-probability.service"

@Component({
  selector: "app-pokemon-probability",
  imports: [WidgetComponent],
  templateUrl: "./pokemon-probability.component.html",
  styleUrl: "./pokemon-probability.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonProbabilityComponent {
  store = inject(CalculatorStore)
  moveProbabilityService = inject(MoveProbabilityService)
  consistencyScoreService = inject(ConsistencyScoreService)

  pokemon = computed(() => this.store.team().activePokemon())
  move = computed(() => this.pokemon().moveSet.activeMove)

  secondary = computed(() => JSON.stringify(this.pokemon().moveSet.activeMove.secondary?.chance))

  accuracy = computed(() => this.pokemon().moveSet.activeMove.accuracy)
  target = computed(() => this.pokemon().moveSet.activeMove.target)

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

  hasValidPokemon = computed(() => !this.pokemon().isDefault)

  score = computed(() => {
    const result = this.consistencyScoreService.consistencyScore(this.pokemon().moveSet)
    return result ? Math.round(result) : 0
  })
  teamScore = computed(() => Math.round(this.consistencyScoreService.teamConsistencyScore(this.store.team())))
}
