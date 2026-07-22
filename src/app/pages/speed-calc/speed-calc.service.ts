import { Injectable } from "@angular/core"
import { Field, Pokemon } from "@multicalc/model"
import { SpeedCalc, SpeedCalcOptions, SpeedDefinition, SpeedTeamPokemon } from "@multicalc/speed-calc"
import { getFinalSpeed } from "@multicalc/stat-calc"
import { Regulation } from "@multicalc/types"

@Injectable({
  providedIn: "root"
})
export class SpeedCalcService {
  private speedCalc = new SpeedCalc()

  speedStatistics(pokemonName: string, regulation: Regulation) {
    return this.speedCalc.retrieveSpeedStatistics(pokemonName, regulation)
  }

  orderedSpeeds(pokemon: Pokemon, field: Field, pokemonEachSide: number, teamPokemon: SpeedTeamPokemon, options: SpeedCalcOptions, opponentsNoPaddingThreshold: number): SpeedDefinition[] {
    return this.speedCalc.orderedPokemon(pokemon, field, pokemonEachSide, teamPokemon, options, opponentsNoPaddingThreshold)
  }

  modifiedSpeed(pokemon: Pokemon, field: Field, isAttacker = false): number {
    return getFinalSpeed(pokemon, field, isAttacker)
  }
}
