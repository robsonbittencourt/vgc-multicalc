import { Pokemon } from "../pokemon"
import { SpeedDefinition } from "./speed-definition"

export class PokemonSpeedService {

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
      speedDefinitions.push(p.minSpeed())
      speedDefinitions.push(p.maxSpeed())
      speedDefinitions.push(p.maxMeta())
    })

    speedDefinitions.push(new SpeedDefinition(pokemon.name, pokemon.modifiedSpe(), "Actual Speed"))

    const ordered = speedDefinitions.sort((a, b) => a.value - b.value)

    return ordered
  }

  garantedSlowestPokemon(pokemon: Pokemon): SpeedDefinition[] {
    return this.metaPokes
      .filter(p => p.maxSpeed().value < pokemon.minSpeed().value)
      .map(p => p.maxSpeed())
  }  

  garantedFasterPokemon(pokemon: Pokemon): SpeedDefinition[] {
    return this.metaPokes
      .filter(p => p.minSpeed().value > pokemon.maxSpeed().value)
      .map(p => p.minSpeed())
  }

  private withoutSlowersAndFasters(pokemon: Pokemon): Pokemon[] {
    const slowerPokemon = this.garantedSlowestPokemon(pokemon)
    const fasterPokemon = this.garantedFasterPokemon(pokemon)

    return this.metaPokes
      .filter(p => slowerPokemon.every(poke => poke.pokemonName != p.name))
      .filter(p => fasterPokemon.every(poke => poke.pokemonName != p.name))
  }

}
