import { Injectable, inject } from "@angular/core"
import { PercentageFormatService } from "./percentage-format.service"

export type ProbabilityCalculationType = "at-least-one" | "all" | "none"

@Injectable({
  providedIn: "root"
})
export class CombinedProbabilityService {
  private percentageFormatService = inject(PercentageFormatService)

  calculateAtLeastOne(probabilities: number[]): number {
    if (probabilities.length === 0) {
      return 0
    }

    const productOfComplements = probabilities.reduce((product, prob) => {
      const normalizedProb = Math.max(0, Math.min(100, prob)) / 100
      return product * (1 - normalizedProb)
    }, 1)

    return 1 - productOfComplements
  }

  calculateAll(probabilities: (number | null)[]): number {
    const validProbabilities = probabilities.filter((prob): prob is number => prob !== null && prob !== undefined && prob > 0)

    if (validProbabilities.length === 0) {
      return 0
    }

    return validProbabilities.reduce((product, prob) => {
      const normalizedProb = Math.max(0, Math.min(100, prob)) / 100
      return product * normalizedProb
    }, 1)
  }

  calculateNone(probabilities: (number | null)[]): number {
    const validProbabilities = probabilities.filter((prob): prob is number => prob !== null && prob !== undefined)

    if (validProbabilities.length === 0) {
      return 1
    }

    return validProbabilities.reduce((product, prob) => {
      const normalizedProb = Math.max(0, Math.min(100, prob)) / 100
      return product * (1 - normalizedProb)
    }, 1)
  }

  calculateCombinedProbability(probabilities: (number | null)[], type: ProbabilityCalculationType = "at-least-one"): number {
    switch (type) {
      case "all":
        return this.calculateAll(probabilities)
      case "none":
        return this.calculateNone(probabilities)
      case "at-least-one":
      default:
        return this.calculateAtLeastOne(probabilities.filter((p): p is number => p !== null && p !== undefined))
    }
  }

  calculateAndFormatCombinedProbability(probabilities: (number | null)[], type: ProbabilityCalculationType = "at-least-one"): string {
    const probability = this.calculateCombinedProbability(probabilities, type)
    return this.percentageFormatService.formatPercentage(probability)
  }
}
