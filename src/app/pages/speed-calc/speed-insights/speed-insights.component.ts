import { Component, computed, inject, input } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { SpeedStatistic } from "@data/speed-data"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { MAX_BASE_SPEED_FOR_TR } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"

@Component({
  selector: "app-speed-insights",
  imports: [WidgetComponent, PokemonSpriteComponent],
  templateUrl: "./speed-insights.component.html",
  styleUrl: "./speed-insights.component.scss"
})
export class SpeedInsightsComponent {
  optionsStore = inject(SpeedCalcOptionsStore)
  calculatorStore = inject(CalculatorStore)
  speedCalculatorService = inject(SpeedCalculatorService)

  pokemon = input.required<Pokemon>()
  isMobile = input<boolean>(false)

  pokemonName = computed(() => this.pokemon().name)
  regulation = computed(() => this.optionsStore.regulation())
  speedInsights = computed(() => this.speedCalculatorService.retrieveSpeedStatistics(this.pokemonName(), this.regulation()))

  referenceDate = computed(() => this.speedInsights()?.referenceDate)
  base = computed(() => this.speedInsights()?.baseSpeed)
  min = computed(() => this.speedInsights()?.minSpeed)
  max = computed(() => this.speedInsights()?.maxSpeed)
  minWithNegativeNature = computed(() => this.speedInsights()?.minSpeedWithNegativeNature)
  maxWithNature = computed(() => this.speedInsights()?.maxSpeedWithNature)

  isTrSpeed = computed(() => (this.speedInsights()?.baseSpeed ?? 999) <= MAX_BASE_SPEED_FOR_TR)

  useSpsMode = computed(() => this.calculatorStore.useSpsMode())
  minSpLabel = computed(() => {
    if (this.useSpsMode()) return "SP 0"
    return "EV 0"
  })
  maxSpLabel = computed(() => {
    if (this.useSpsMode()) return "SP 32"
    return "EV 252"
  })

  usageInsights = computed(() => this.speedInsights()?.statistics.filter(insight => insight.type === "usage") ?? [])
  firstInsight = computed(() => this.usageInsights()[0])
  secondInsight = computed(() => this.usageInsights()[1])
  thirdInsight = computed(() => this.usageInsights()[2])

  firstInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 0))
  secondInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 1))
  thirdInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 2))

  boosterInsight = computed(() => this.speedInsights()?.statistics.find(insight => insight.type === "booster"))
  scarfInsight = computed(() => this.speedInsights()?.statistics.find(insight => insight.type === "scarf"))

  boosterIsMoreUsed = computed(() => this.speedInsights()?.boosterEnergyIsMoreUsed)
  choiceScarfIsMoreUsed = computed(() => this.speedInsights()?.choiceScarfIsMoreUsed)

  isMoreUsed(insights: SpeedStatistic[], position: 0 | 1 | 2): boolean {
    if (insights.length <= position) return false

    const maxPercentage = Math.max(...insights.map(item => item.percentage))
    return insights[position].percentage === maxPercentage
  }
}
