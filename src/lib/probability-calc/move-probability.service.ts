import { Injectable, inject } from "@angular/core"
import { Move } from "@lib/model/move"
import { PercentageFormatService } from "./percentage-format.service"

export interface SingleTargetProbabilities {
  hitAllTurns: string
  hitAtLeastOne: string
  missAllTurns: string
  missAtLeastOne: string
  secondaryAllTurns: string
  secondaryAtLeastOne: string
}

export interface SpreadTargetProbabilities {
  hitBoth: string
  hitAtLeastOne: string
  missBoth: string
  secondaryHitBoth: string
  secondaryHitAtLeastOne: string
}

@Injectable({
  providedIn: "root"
})
export class MoveProbabilityService {
  private percentageFormatService = inject(PercentageFormatService)

  calculateSingleTargetProbabilities(move: Move, attempts: number, target: string): SingleTargetProbabilities {
    if (target === "allAdjacentFoes") {
      return this.createEmptySingleTargetProbabilities()
    }

    const accuracyProbability = move.accuracy / 100
    const missProbability = 1 - accuracyProbability

    const hitAllTurnsProbability = Math.pow(accuracyProbability, attempts)
    const missAllTurnsProbability = Math.pow(missProbability, attempts)
    const hitAtLeastOnceProbability = 1 - missAllTurnsProbability
    const missAtLeastOnceProbability = 1 - hitAllTurnsProbability

    const secondaryAccuracyProbability = (move.secondary?.chance ?? 0) / 100
    const secondaryMissProbability = 1 - secondaryAccuracyProbability

    const secondaryHitAllTurnsProbability = Math.pow(secondaryAccuracyProbability, attempts)
    const secondaryMissAllTurnsProbability = Math.pow(secondaryMissProbability, attempts)
    const secondaryHitAtLeastOnceProbability = 1 - secondaryMissAllTurnsProbability

    return {
      hitAllTurns: this.percentageFormatService.formatPercentage(hitAllTurnsProbability),
      hitAtLeastOne: this.percentageFormatService.formatPercentage(hitAtLeastOnceProbability),
      missAllTurns: this.percentageFormatService.formatPercentage(missAllTurnsProbability),
      missAtLeastOne: this.percentageFormatService.formatPercentage(missAtLeastOnceProbability),
      secondaryAllTurns: this.percentageFormatService.formatPercentage(secondaryHitAllTurnsProbability),
      secondaryAtLeastOne: this.percentageFormatService.formatPercentage(secondaryHitAtLeastOnceProbability)
    }
  }

  calculateSpreadTargetProbabilities(move: Move, attempts: number, target: string): SpreadTargetProbabilities {
    if (target !== "allAdjacentFoes") {
      return this.createEmptySpreadTargetProbabilities()
    }

    const accuracyProbability = move.accuracy / 100
    const missProbability = 1 - accuracyProbability

    const hitBothSingleTurn = accuracyProbability * accuracyProbability
    const missBothSingleTurn = missProbability * missProbability
    const hitAtLeastOneSingleTurn = 1 - missBothSingleTurn

    const secondaryAccuracyProbability = (move.secondary?.chance ?? 0) / 100
    const secondaryMissProbability = 1 - secondaryAccuracyProbability

    const secondaryHitBothSingleTurn = secondaryAccuracyProbability * secondaryAccuracyProbability
    const secondaryMissBothSingleTurn = secondaryMissProbability * secondaryMissProbability
    const secondaryHitAtLeastOneSingleTurn = 1 - secondaryMissBothSingleTurn

    const hitBothAllTurns = Math.pow(hitBothSingleTurn, attempts)
    const hitAtLeastOneAllTurns = Math.pow(hitAtLeastOneSingleTurn, attempts)
    const missBothAtLeastOnce = 1 - Math.pow(1 - missBothSingleTurn, attempts)

    const secondaryHitBothAtLeastOnce = 1 - Math.pow(1 - secondaryHitBothSingleTurn, attempts)
    const secondaryHitAtLeastOneAtLeastOnce = 1 - Math.pow(1 - secondaryHitAtLeastOneSingleTurn, attempts)

    return {
      hitBoth: this.percentageFormatService.formatPercentage(hitBothAllTurns),
      hitAtLeastOne: this.percentageFormatService.formatPercentage(hitAtLeastOneAllTurns),
      missBoth: this.percentageFormatService.formatPercentage(missBothAtLeastOnce),
      secondaryHitBoth: this.percentageFormatService.formatPercentage(secondaryHitBothAtLeastOnce),
      secondaryHitAtLeastOne: this.percentageFormatService.formatPercentage(secondaryHitAtLeastOneAtLeastOnce)
    }
  }

  private createEmptySingleTargetProbabilities(): SingleTargetProbabilities {
    return {
      hitAllTurns: "0",
      hitAtLeastOne: "0",
      missAllTurns: "0",
      missAtLeastOne: "0",
      secondaryAllTurns: "0",
      secondaryAtLeastOne: "0"
    }
  }

  private createEmptySpreadTargetProbabilities(): SpreadTargetProbabilities {
    return {
      hitBoth: "0",
      hitAtLeastOne: "0",
      missBoth: "0",
      secondaryHitBoth: "0",
      secondaryHitAtLeastOne: "0"
    }
  }
}
