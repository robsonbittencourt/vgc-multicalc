import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { OptimizationResult, SurvivalThreshold } from "./internal/ev-optimizer-types"
import { SpreadOptimizer } from "./internal/spread-optimizer"

export class DefensiveEvOptimizer {
  private spreadOptimizer = new SpreadOptimizer()

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature = false, keepOffensiveEvs = false, threshold: SurvivalThreshold = 2, rollIndex = RollLevelConfig.HIGH_ROLL_INDEX, rightIsDefender = true): OptimizationResult {
    return this.spreadOptimizer.optimize(defender, targets, field, updateNature, keepOffensiveEvs, threshold, rollIndex, rightIsDefender)
  }
}
