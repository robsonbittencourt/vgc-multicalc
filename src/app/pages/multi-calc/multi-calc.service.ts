import { Injectable } from "@angular/core"
import { DefensiveEvOptimizer, SurvivalThreshold } from "@multicalc/ev-optimizer"
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
  private defensiveEvOptimizer = new DefensiveEvOptimizer()

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

  optimizeDefensiveEvs(defender: Pokemon, targets: Target[], field: Field, updateNature: boolean, keepOffensiveEvs: boolean, survivalThreshold: SurvivalThreshold, rollIndex: number) {
    return this.defensiveEvOptimizer.optimize(defender, targets, field, updateNature, keepOffensiveEvs, survivalThreshold, rollIndex, false)
  }
}
