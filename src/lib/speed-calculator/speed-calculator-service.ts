import { Injectable } from "@angular/core"
import { Pokemon } from "../pokemon"
import { SpeedDefinition } from "./speed-definition"
import { Field, Generations, Pokemon as PokemonSmogon } from "@smogon/calc";
import { SmogonFunctions } from "../smogon-functions/smogon-functions";
import { speedMeta } from "./speed-meta";
import { SpeedCalculatorOptions } from "./speed-calculator-options";

@Injectable({
  providedIn: 'root'
})
export class SpeedCalculatorService {

  constructor(private smogonService: SmogonFunctions) { }

  orderedPokemon(pokemon: Pokemon, field: Field, isTrickRoom: boolean = false, options: SpeedCalculatorOptions = new SpeedCalculatorOptions()): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []
    const speed = this.smogonService.getFinalSpeed(pokemon, field, field.attackerSide)
    speedDefinitions.push(new SpeedDefinition(pokemon.spriteNameScarletViolet, speed, "Actual"))
    
    speedMeta().forEach(p => {
      this.adjustPokemonByOptions(p, options)
      speedDefinitions.push(this.minSpeed(p, field))
      speedDefinitions.push(this.maxSpeed(p, field))
      speedDefinitions.push(this.maxMeta(p, field))
    })

    const ordered = speedDefinitions.sort((a, b) => isTrickRoom ? b.value - a.value : a.value - b.value)

    const speedDefinitionsMerged = []

    let actualSpeedDefinition
    for (let index = 0; index < ordered.length; index++) {
      const actual = ordered[index]

      if (index == 0) {
        actualSpeedDefinition = actual
        speedDefinitionsMerged.push(actual)
        continue
      }   

      if (actualSpeedDefinition?.pokemonName == actual.pokemonName && actualSpeedDefinition?.value == actual.value) {
        speedDefinitionsMerged[speedDefinitionsMerged.length - 1].description += "/" + actual.description
      } else {
        speedDefinitionsMerged.push(actual)
        actualSpeedDefinition = actual
      }      
    }

    return speedDefinitionsMerged
  }

  adjustPokemonByOptions(pokemon: Pokemon, options: SpeedCalculatorOptions) {
    if (options.paralyzedActive) {
      pokemon.status = "Paralysis"
    }

    if (options.speedDropMoveActive) {
      pokemon.boosts.spe = -1
    }

    if (options.choiceScarfActive) {
      pokemon.item = "Choice Scarf"
    }
  }

  minSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const MAX_BASE_SPEED_FOR_TR = 52
    const isTrickRoomPokemon = new PokemonSmogon(Generations.get(9), pokemon.name).species.baseStats.spe <= MAX_BASE_SPEED_FOR_TR

    const clonedPokemon = pokemon.clone()
    clonedPokemon.nature = isTrickRoomPokemon ? "Brave" : "Bashful"
    clonedPokemon.item = "Leftovers"
    clonedPokemon.evs = { spe: 0 }
    clonedPokemon.ivs = isTrickRoomPokemon ? { spe: 0 } : { spe: 31 }

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide)

    return new SpeedDefinition(clonedPokemon.spriteNameScarletViolet, speed, "Min")
  }

  maxSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone()
    clonedPokemon.nature = "Timid"
    clonedPokemon.item = "Leftovers"
    clonedPokemon.evs = { spe: 252 }
    clonedPokemon.ivs = { spe: 31 }

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide)

    return new SpeedDefinition(clonedPokemon.spriteNameScarletViolet, speed, "Max")
  }

  maxMeta(pokemon: Pokemon, field: Field): SpeedDefinition {
    const speed = this.smogonService.getFinalSpeed(pokemon, field, field.defenderSide)
    const description = pokemon.item == "Choice Scarf" ? "Meta/Scarf" : "Meta"

    return new SpeedDefinition(pokemon.spriteNameScarletViolet, speed, description)
  }

}
