import { Injectable } from "@angular/core"
import { DefensiveSpOptimizer, KoThreshold, OffensiveSpOptimizer, SecondAttacker, SurvivalThreshold } from "@multicalc/sp-optimizer"
import { Field, Pokemon, Target } from "@multicalc/model"
import { MultiCalc } from "@multicalc/multi-calc"
import { addMember, combineAttackers, excludeMetaData, separateAttackers } from "@multicalc/target-list"
import { pokemonByRegulation } from "@pokemon-repository"
import { MOVESETS } from "@data/moveset-data"
import { Regulation } from "@multicalc/types"

@Injectable({
  providedIn: "root"
})
export class MultiCalcService {
  private defensiveSpOptimizer = new DefensiveSpOptimizer()
  private offensiveSpOptimizer = new OffensiveSpOptimizer()

  withOpponents(opponents: Target[], field: Field): MultiCalc {
    return MultiCalc.withOpponents(opponents, field)
  }

  metaPokemon(regulation: Regulation, quantity: number | undefined, includeAllPokemon: boolean): Pokemon[] {
    return pokemonByRegulation(regulation, quantity, MOVESETS, includeAllPokemon)
  }

  addMember(targets: Target[], pokemon: Pokemon): Target[] {
    return addMember(targets, pokemon)
  }

  combineAttackers(targets: Target[], targetPokemonId: string, attackerPokemonId: string): Target[] | null {
    return combineAttackers(targets, targetPokemonId, attackerPokemonId)
  }

  separateAttackers(targets: Target[], pokemonId: string): Target[] {
    return separateAttackers(targets, pokemonId)
  }

  excludeMetaData(targets: Target[], metaPokemon: Pokemon[]): Target[] {
    return excludeMetaData(targets, metaPokemon)
  }

  optimizeDefensiveSps(defender: Pokemon, targets: Target[], field: Field, updateNature: boolean, keepOffensiveSps: boolean, survivalThreshold: SurvivalThreshold, rollIndex: number) {
    return this.defensiveSpOptimizer.optimize(defender, targets, field, updateNature, keepOffensiveSps, survivalThreshold, rollIndex, false)
  }

  optimizeOffensiveSps(attacker: Pokemon, targets: Target[], field: Field, koThreshold: KoThreshold, rollIndex: number, keepOtherSps = false, updateNature = false, secondAttacker?: SecondAttacker) {
    return this.offensiveSpOptimizer.optimize(attacker, targets, field, koThreshold, { rollIndex, rightIsDefender: true, keepOtherSps, updateNature, secondAttacker })
  }
}
