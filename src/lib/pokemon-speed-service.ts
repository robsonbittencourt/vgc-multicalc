import { Pokemon } from "./pokemon"
import { PokemonSpeed } from "./pokemon-speed"

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
    this.findGarantedSlowestPokemon(pokemon).forEach(p => p.print())

    console.log("===========================================================")

    console.log("Ordered")
    this.orderedPokemon(pokemon)

    console.log("===========================================================")

    console.log("Guaranteed faster")
    this.findFasterPokemon(pokemon).forEach(p => p.print())
  }

  findGarantedSlowestPokemon(pokemon: Pokemon): PokemonSpeed[] {
    const pokemonSpeed = new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item)
    
    return this.metaPokes.filter(poke => poke.maxSpeed() < pokemonSpeed.minSpeed())
  }

  orderedPokemon(pokemon: Pokemon) {
    const slowerPokemon = this.findGarantedSlowestPokemon(pokemon)
    const fasterPokemon = this.findFasterPokemon(pokemon)

    const withoutSlowersAndFasters = this.metaPokes
      .filter(p => slowerPokemon.every(poke => poke.getName() != p.getName()))
      .filter(p => fasterPokemon.every(poke => poke.getName() != p.getName()))
    
    const pokeSpeedsMap: any[] = []
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push( { "name": p.getName(), "speed": p.minSpeed(), "description": "min" }))
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push( { "name": p.getName(), "speed": p.maxSpeed(), "description": "max" }))
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push( { "name": p.getName(), "speed": p.maxMeta(), "description": "meta" }))

    pokeSpeedsMap.push( { "name": pokemon.name, "speed": pokemon.modifiedSpe(), "description": "actual" })

    const ordered = pokeSpeedsMap.sort((a, b) => a["speed"] - b["speed"])
    
    ordered.forEach((p) => {
      if (p["description"] == "actual") {
        console.log(`===> Your Pokémon: ${p["name"]} speed: ${p["speed"]} <===`)  
      } else {
        console.log(`${p["name"]} ${p["description"]} speed: ${p["speed"]}`)
      }      
    }) 
  }

  findFasterPokemon(pokemon: Pokemon): PokemonSpeed[] {
    const pokemonSpeed = new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item)

    return this.metaPokes.filter(poke => poke.minSpeed() > pokemonSpeed.maxSpeed())
  }

}