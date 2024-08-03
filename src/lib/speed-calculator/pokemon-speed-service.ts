import { Pokemon } from "../pokemon"
import { PokemonSpeed, SpeedDefinition } from "./pokemon-speed"

export class PokemonSpeedService {

  metaPokes = [
    new PokemonSpeed("Urshifu-Rapid-Strike", 252, 31, "Adamant", "Choice Scarf"),    
    new PokemonSpeed("Incineroar", 252, 31, "Jolly"),
    new PokemonSpeed("Rillaboom", 28, 31, "Adamant"),
    new PokemonSpeed("Amoonguss", 0, 31, "Bold"),
    new PokemonSpeed("Flutter Mane", 252, 31, "Timid", "Booster Energy", 1, "Protosynthesis", true),
    new PokemonSpeed("Calyrex-Shadow", 252, 31, "Timid"),
    new PokemonSpeed("Ursaluna-Bloodmoon", 0, 0, "Quiet")
  ]

  printAllSpeed() {
    this.metaPokes.forEach(poke => {
      poke.print()
    })
  }

  print(pokemon: Pokemon) {
    const pokemonSpeed = new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item)
    console.log(`Target: ${pokemon.name} - Min Speed ${pokemonSpeed.minSpeed()} - Actual Speed: ${pokemon.modifiedSpe()} - EVs Speed: ${pokemon.evs.spe}`)
    console.log("===========================================================")

    console.log("Guaranteed slower")
    this.garantedSlowestPokemon(pokemon).forEach(p => console.log(p.pokemonName + " - " + p.value + " - " + p.description))

    console.log("===========================================================")

    console.log("Ordered")
    this.orderedPokemon(pokemon).forEach(p => console.log(p.pokemonName + " - " + p.value + " - " + p.description))

    console.log("===========================================================")

    console.log("Guaranteed faster")
    this.garantedFasterPokemon(pokemon).forEach(p => console.log(p.pokemonName + " - " + p.value + " - " + p.description))
  }

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
      .filter(p => p.maxSpeed().value < this.minSpeed(pokemon))
      .map(p => p.maxSpeed())
  }  

  garantedFasterPokemon(pokemon: Pokemon): SpeedDefinition[] {
    return this.metaPokes
      .filter(p => p.minSpeed().value > this.maxSpeed(pokemon))
      .map(p => p.minSpeed())
  }

  private withoutSlowersAndFasters(pokemon: Pokemon): PokemonSpeed[] {
    const slowerPokemon = this.garantedSlowestPokemon(pokemon)
    const fasterPokemon = this.garantedFasterPokemon(pokemon)

    return this.metaPokes
      .filter(p => slowerPokemon.every(poke => poke.pokemonName != p.getName()))
      .filter(p => fasterPokemon.every(poke => poke.pokemonName != p.getName()))
  }

  private minSpeed(pokemon: Pokemon): number {
    return new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item).minSpeed().value
  }

  private maxSpeed(pokemon: Pokemon): number {
    return new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item).maxSpeed().value
  }
}
