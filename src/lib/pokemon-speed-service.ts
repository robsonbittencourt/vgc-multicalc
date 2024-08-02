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

  orderedPokemon(pokemon: Pokemon): PokemonSpeedDTO[] {
    const pokemonSpeed = new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item)

    const slowerPokemon = this.findGarantedSlowestPokemon(pokemon)
    const fasterPokemon = this.findFasterPokemon(pokemon)

    const withoutSlowersAndFasters = this.metaPokes
      .filter(p => slowerPokemon.every(poke => poke.getName() != p.getName()))
      .filter(p => fasterPokemon.every(poke => poke.getName() != p.getName()))
    
    const pokeSpeedsMap: PokemonSpeedDTO[] = []
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push(new PokemonSpeedDTO(p, p.minSpeed())))
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push(new PokemonSpeedDTO(p, p.maxSpeed())))
    withoutSlowersAndFasters.forEach(p => pokeSpeedsMap.push(new PokemonSpeedDTO(p, p.maxMeta())))

    pokeSpeedsMap.push(new PokemonSpeedDTO(pokemonSpeed, pokemon.modifiedSpe()))

    const ordered = pokeSpeedsMap.sort((a, b) => a.speed - b.speed)

    ordered.forEach(p => p.pokemonSpeed.print())

    return ordered
  }

  findFasterPokemon(pokemon: Pokemon): PokemonSpeed[] {
    const pokemonSpeed = new PokemonSpeed(pokemon.name, pokemon.evs.spe!, pokemon.ivs.spe, pokemon.nature, pokemon.item)

    return this.metaPokes.filter(poke => poke.minSpeed() > pokemonSpeed.maxSpeed())
  }

}

export class PokemonSpeedDTO {
  pokemonSpeed: PokemonSpeed
  speed: number

  constructor(pokemonSpeed: PokemonSpeed, speed: number) {
    this.pokemonSpeed = pokemonSpeed
    this.speed = speed
  }
}