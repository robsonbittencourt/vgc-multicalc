import { Injectable, inject } from "@angular/core"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { PercentageFormatService } from "./percentage-format.service"

export interface SingleTargetProbabilities {
  hitAllTurns: string
  hitAtLeastOne: string
  missAllTurns: string
  missAtLeastOne: string
  secondaryAllTurns: string
  secondaryAtLeastOne: string
}

export interface MultiHitProbability {
  hits: number
  chance: string
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

  calculateSingleTargetProbabilities(move: Move, attempts: number, target: string, attacker: Pokemon, field: Field): SingleTargetProbabilities {
    if (target === "allAdjacentFoes") {
      return this.createEmptySingleTargetProbabilities()
    }

    const accuracyProbability = this.effectiveAccuracy(move, attacker, field)
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

  calculateSpreadTargetProbabilities(move: Move, attempts: number, target: string, attacker: Pokemon, field: Field): SpreadTargetProbabilities {
    if (target !== "allAdjacentFoes") {
      return this.createEmptySpreadTargetProbabilities()
    }

    const accuracyProbability = this.effectiveAccuracy(move, attacker, field)
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

  calculateMultiHitProbabilities(move: Move, attacker: Pokemon, field: Field): MultiHitProbability[] {
    if (!move.multiaccuracy) {
      return []
    }

    const hitCounts = move.possibleHits.map(hits => Number(hits))

    if (hitCounts.length <= 1 || hitCounts.some(hits => hits <= 0)) {
      return []
    }

    const accuracyProbability = this.effectiveAccuracy(move, attacker, field)
    const singleAccuracyCheck = attacker.hasItem("Loaded Dice") || attacker.ability.name === "Skill Link"

    if (accuracyProbability >= 1) {
      return []
    }

    const minHits = hitCounts[0]
    const maxHits = hitCounts[hitCounts.length - 1]
    const middleHits = hitCounts[Math.floor((hitCounts.length - 1) / 2)]

    const distinctHits = [...new Set([minHits, middleHits, maxHits])]

    return distinctHits.map(hits => ({
      hits,
      chance: this.percentageFormatService.formatPercentage(singleAccuracyCheck ? 1 : Math.pow(accuracyProbability, hits))
    }))
  }

  effectiveAccuracy(move: Move, attacker: Pokemon, field: Field): number {
    const weather = field.weather
    const moveName = move.name
    const ability = attacker.ability.name

    if (ability === "No Guard") {
      return 1
    }

    const rainAlwaysHit = ["Hurricane", "Thunder", "Bleakwind Storm", "Sandsear Storm", "Wildbolt Storm"]
    const snowAlwaysHit = ["Blizzard"]
    const sunAccuracy50 = ["Hurricane", "Thunder"]

    if (weather === "Rain" && rainAlwaysHit.includes(moveName)) {
      return 1
    }

    if (weather === "Snow" && snowAlwaysHit.includes(moveName)) {
      return 1
    }

    if (moveName === "Toxic" && (attacker.type1 === "Poison" || attacker.type2 === "Poison")) {
      return 1
    }

    let accuracy = weather === "Sun" && sunAccuracy50.includes(moveName) ? 50 : move.accuracy

    if (ability === "Compound Eyes") {
      accuracy = this.modify(accuracy, 5325, 4096)
    }

    if (ability === "Victory Star") {
      accuracy = this.modify(accuracy, 4506, 4096)
    }

    if (ability === "Hustle" && move.category === "Physical") {
      accuracy = this.modify(accuracy, 3277, 4096)
    }

    if (field.isGravity) {
      accuracy = this.modify(accuracy, 6840, 4096)
    }

    if (attacker.hasItem("Wide Lens")) {
      accuracy = this.modify(accuracy, 4505, 4096)
    }

    return Math.min(accuracy, 100) / 100
  }

  private modify(value: number, numerator: number, denominator: number): number {
    const modifier = Math.trunc((numerator * 4096) / denominator)

    return Math.trunc((Math.trunc(value * modifier) + 2048 - 1) / 4096)
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
