import { Injectable } from "@angular/core"
import { DefensiveEvOptimizer, SurvivalThreshold } from "@multicalc/ev-optimizer"
import { Field, Pokemon, Target } from "@multicalc/model"
import { pokemonByRegulation } from "@pokemon-repository"
import { MOVESETS } from "@data/moveset-data"
import { Regulation } from "@multicalc/types"

@Injectable({
  providedIn: "root"
})
export class MultiCalcService {
  private defensiveEvOptimizer = new DefensiveEvOptimizer()

  metaPokemon(regulation: Regulation, quantity: number | undefined, includeAllPokemon: boolean): Pokemon[] {
    return pokemonByRegulation(regulation, quantity, MOVESETS, includeAllPokemon)
  }

  optimizeDefensiveEvs(defender: Pokemon, targets: Target[], field: Field, updateNature: boolean, keepOffensiveEvs: boolean, survivalThreshold: SurvivalThreshold, rollIndex: number) {
    return this.defensiveEvOptimizer.optimize(defender, targets, field, updateNature, keepOffensiveEvs, survivalThreshold, rollIndex, false)
  }
}
