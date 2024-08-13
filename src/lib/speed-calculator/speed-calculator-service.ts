import { Injectable } from "@angular/core"
import { Pokemon } from "../pokemon"
import { SpeedDefinition } from "./speed-definition"
import { Field, Generations, Pokemon as PokemonSmogon } from "@smogon/calc";
import { SmogonFunctions } from "../smogon-functions/smogon-functions";

@Injectable({
  providedIn: 'root'
})
export class SpeedCalculatorService {

  constructor(private smogonService: SmogonFunctions) { }

  metaPokes = [
    new Pokemon("Urshifu-Rapid-Strike", { item: "Choice Scarf", evs: { spe: 252 } }),
    new Pokemon("Incineroar", { nature: "Jolly", evs: { spe: 252 } }),
    new Pokemon("Rillaboom", { evs: { spe: 28 } }),
    new Pokemon("Amoonguss"),
    new Pokemon("Flutter Mane", { nature: "Timid", evs: { spe: 252 } }),
    new Pokemon("Calyrex-Shadow", { nature: "Timid", evs: { spe: 252 } }),
    new Pokemon("Ursaluna-Bloodmoon", { nature: "Quiet", ivs: { spe: 0 } }),
  ]

  orderedPokemon(pokemon: Pokemon): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []
    
    this.withoutSlowersAndFasters(pokemon).forEach(p => {
      speedDefinitions.push(this.minSpeed(p))
      speedDefinitions.push(this.maxSpeed(p))
      speedDefinitions.push(this.maxMeta(p))
    })

    speedDefinitions.push(new SpeedDefinition(pokemon.name, pokemon.modifiedSpe(), "Actual Speed"))

    const ordered = speedDefinitions.sort((a, b) => a.value - b.value)

    return ordered
  }

  garantedSlowestPokemon(pokemon: Pokemon): SpeedDefinition[] {
    return this.metaPokes
      .filter(p => this.maxSpeed(p).value < this.minSpeed(pokemon).value)
      .map(p => this.maxSpeed(p))
  }  

  garantedFasterPokemon(pokemon: Pokemon): SpeedDefinition[] {
    return this.metaPokes
      .filter(p => this.minSpeed(p).value > this.maxSpeed(pokemon).value)
      .map(p => this.minSpeed(p))
  }

  minSpeed(pokemon: Pokemon, field: Field = new Field()): SpeedDefinition {
    const MAX_BASE_SPEED_FOR_TR = 52
    const isTrickRoomPokemon = new PokemonSmogon(Generations.get(9), pokemon.name).species.baseStats.spe <= MAX_BASE_SPEED_FOR_TR

    const clonedPokemon = pokemon.clone()
    clonedPokemon.nature = isTrickRoomPokemon ? "Brave" : "Bashful"
    clonedPokemon.item = "Leftovers"
    clonedPokemon.evs = { spe: 0 }
    clonedPokemon.ivs = isTrickRoomPokemon ? { spe: 0 } : { spe: 31 }

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field)

    return new SpeedDefinition(clonedPokemon.name, speed, "Min. Speed")
  }

  maxSpeed(pokemon: Pokemon, field: Field = new Field()): SpeedDefinition {
    const clonedPokemon = pokemon.clone()
    clonedPokemon.nature = "Timid"
    clonedPokemon.item = "Leftovers"
    clonedPokemon.evs = { spe: 252 }
    clonedPokemon.ivs = { spe: 31 }

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field)

    return new SpeedDefinition(clonedPokemon.name, speed, "Max. Speed")
  }

  maxMeta(pokemon: Pokemon, field: Field = new Field()): SpeedDefinition {
    const speed = this.smogonService.getFinalSpeed(pokemon, field)    

    return new SpeedDefinition(pokemon.name, speed, "Meta Speed")
  }

  private withoutSlowersAndFasters(pokemon: Pokemon): Pokemon[] {
    const slowerPokemon = this.garantedSlowestPokemon(pokemon)
    const fasterPokemon = this.garantedFasterPokemon(pokemon)

    return this.metaPokes
      .filter(p => slowerPokemon.every(poke => poke.pokemonName != p.name))
      .filter(p => fasterPokemon.every(poke => poke.pokemonName != p.name))
  }

}
