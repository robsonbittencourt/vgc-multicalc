import { Component, computed, inject, input } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { SpeedStatistic } from "@data/speed-data"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { MAX_BASE_SPEED_FOR_TR, NEGATIVE_SPEED_NATURES } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"

@Component({
  selector: "app-speed-insights",
  imports: [WidgetComponent],
  templateUrl: "./speed-insights.component.html",
  styleUrl: "./speed-insights.component.scss"
})
export class SpeedInsightsComponent {
  optionsStore = inject(SpeedCalcOptionsStore)
  speedCalculatorService = inject(SpeedCalculatorService)

  pokemon = input.required<Pokemon>()

  pokemonName = computed(() => this.pokemon().name)
  regulation = computed(() => this.optionsStore.regulation())
  speedInsights = computed(() => this.speedCalculatorService.retrieveSpeedStatistics(this.pokemonName(), this.regulation()))

  base = computed(() => this.speedInsights().baseSpeed)
  min = computed(() => this.speedInsights().minSpeed)
  max = computed(() => this.speedInsights().maxSpeed)
  minWithIvZero = computed(() => this.speedInsights().minSpeedWithIvZero)
  maxWithNature = computed(() => this.speedInsights().maxSpeedWithNature)

  isTrSpeed = computed(() => this.speedInsights().baseSpeed <= MAX_BASE_SPEED_FOR_TR)

  usageInsights = computed(() => this.speedInsights().statistics.filter(insight => insight.type === "usage"))
  firstInsight = computed(() => this.usageInsights()[0])
  secondInsight = computed(() => this.usageInsights()[1])
  thirdInsight = computed(() => this.usageInsights()[2])

  firstInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 0))
  secondInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 1))
  thirdInsightIsMoreUsed = computed(() => this.isMoreUsed(this.usageInsights(), 2))

  firstInsightHasNegativeNature = computed(() => NEGATIVE_SPEED_NATURES.includes(this.firstInsight().nature))
  secondInsightHasNegativeNature = computed(() => NEGATIVE_SPEED_NATURES.includes(this.secondInsight().nature))
  thirdInsightHasNegativeNature = computed(() => NEGATIVE_SPEED_NATURES.includes(this.thirdInsight().nature))

  boosterInsight = computed(() => this.speedInsights().statistics.find(insight => insight.type === "booster"))
  scarfInsight = computed(() => this.speedInsights().statistics.find(insight => insight.type === "scarf"))

  boosterIsMoreUsed = computed(() => this.speedInsights().boosterEnergyIsMoreUsed)
  choiceScarfIsMoreUsed = computed(() => this.speedInsights().choiceScarfIsMoreUsed)

  isMoreUsed(insights: SpeedStatistic[], position: 0 | 1 | 2): boolean {
    if (insights.length <= position) return false

    const maxPercentage = Math.max(...insights.map(item => item.percentage))
    return insights[position].percentage === maxPercentage
  }
}
