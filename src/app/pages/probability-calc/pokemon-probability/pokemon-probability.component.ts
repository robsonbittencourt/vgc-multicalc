import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from "@angular/core"
import { WidgetComponent } from "@shared/widget/widget.component"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { ConsistencyScore, MoveProbability } from "@multicalc/probability-calc"
import { PokemonMovesMobileComponent } from "@features/pokemon-build/pokemon-moves-mobile/pokemon-moves-mobile.component"
import { Pokemon } from "@multicalc/model"
import { ProbabilityPercentPipe } from "@pages/probability-calc/pipes/probability-percent.pipe"

@Component({
  selector: "app-pokemon-probability",
  imports: [WidgetComponent, PokemonMovesMobileComponent, PokemonSpriteComponent, ProbabilityPercentPipe],
  templateUrl: "./pokemon-probability.component.html",
  styleUrl: "./pokemon-probability.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    "[class.mobile]": "isMobile()"
  }
})
export class PokemonProbabilityComponent {
  isMobile = input<boolean>(false)
  pokemon = input<Pokemon | null>(null)
  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  moveProbabilityService = new MoveProbability()
  consistencyScoreService = new ConsistencyScore()

  private selectedPokemon = computed(() => this.pokemon() ?? undefined)
  effectivePokemon = computed(() => this.selectedPokemon()!)
  move = computed(() => this.effectivePokemon().moveSet.activeMove)
  field = computed(() => this.fieldStore.field())

  secondary = computed(() => JSON.stringify(this.effectivePokemon().moveSet.activeMove.secondary?.chance))

  accuracy = computed(() => Math.floor(this.moveProbabilityService.effectiveAccuracy(this.move(), this.effectivePokemon(), this.field()) * 100))
  target = computed(() => this.effectivePokemon().moveSet.activeMove.target)

  oneTimeSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 1, this.target(), this.effectivePokemon(), this.field()))
  twoTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 2, this.target(), this.effectivePokemon(), this.field()))
  threeTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 3, this.target(), this.effectivePokemon(), this.field()))
  fourTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 4, this.target(), this.effectivePokemon(), this.field()))
  fiveTimesSingleTarget = computed(() => this.moveProbabilityService.calculateSingleTargetProbabilities(this.move(), 5, this.target(), this.effectivePokemon(), this.field()))

  oneTime = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 1, this.target(), this.effectivePokemon(), this.field()))
  twoTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 2, this.target(), this.effectivePokemon(), this.field()))
  threeTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 3, this.target(), this.effectivePokemon(), this.field()))
  fourTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 4, this.target(), this.effectivePokemon(), this.field()))
  fiveTimes = computed(() => this.moveProbabilityService.calculateSpreadTargetProbabilities(this.move(), 5, this.target(), this.effectivePokemon(), this.field()))

  multiHitProbabilities = computed(() => this.moveProbabilityService.calculateMultiHitProbabilities(this.move(), this.effectivePokemon(), this.field()))

  hasSecondaryEffect = computed(() => this.secondary())

  hasValidPokemon = computed(() => {
    const pokemon = this.selectedPokemon()

    return pokemon != undefined
  })

  score = computed(() => {
    const result = this.consistencyScoreService.consistencyScore(this.effectivePokemon(), this.field())
    return result ? Math.round(result) : 0
  })
  teamScore = computed(() => Math.round(this.consistencyScoreService.teamConsistencyScore(this.store.team(), this.field())))
}
