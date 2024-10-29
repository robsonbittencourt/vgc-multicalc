import { Injectable } from "@angular/core"
import { Field, Side } from "@smogon/calc"
import { StatID } from "@smogon/calc/dist/data/interface"
import { Pokemon } from "../pokemon"

@Injectable()
export class SmogonFunctions {

  EV_ITEMS = [
    'Macho Brace',
    'Power Anklet',
    'Power Band',
    'Power Belt',
    'Power Bracer',
    'Power Lens',
    'Power Weight',
  ]
  
  getFinalSpeed(pokemon: Pokemon, field: Field = new Field(), side: Side = new Side()) {
    const pokemonSmogon = pokemon.pokemonSmogon

    const weather = field.weather || ''
    const terrain = field.terrain
    let speed = this.getModifiedStat(pokemonSmogon.rawStats.spe, pokemonSmogon.boosts.spe)
    const speedMods = []
  
    if (side.isTailwind) speedMods.push(8192)
    
    if ((pokemonSmogon.hasAbility('Unburden') && pokemonSmogon.abilityOn) ||
        (pokemonSmogon.hasAbility('Chlorophyll') && weather.includes('Sun')) ||
        (pokemonSmogon.hasAbility('Sand Rush') && weather === 'Sand') ||
        (pokemonSmogon.hasAbility('Swift Swim') && weather.includes('Rain')) ||
        (pokemonSmogon.hasAbility('Slush Rush') && ['Hail', 'Snow'].includes(weather)) ||
        (pokemonSmogon.hasAbility('Surge Surfer') && terrain === 'Electric')
    ) {
      speedMods.push(8192)
    } else if (pokemonSmogon.hasAbility('Quick Feet') && pokemonSmogon.status) {
      speedMods.push(6144)
    } else if (pokemonSmogon.hasAbility('Slow Start') && pokemonSmogon.abilityOn) {
      speedMods.push(2048)
    } else if (this.isQPActive(pokemon, field) && this.getQPBoostedStat(pokemon) === 'spe') {
      speedMods.push(6144)
    }
  
    if (pokemonSmogon.hasItem('Choice Scarf')) {
      speedMods.push(6144)
    } else if (pokemonSmogon.hasItem('Iron Ball', ...this.EV_ITEMS)) {
      speedMods.push(2048)
    } else if (pokemonSmogon.hasItem('Quick Powder') && pokemonSmogon.named('Ditto')) {
      speedMods.push(8192)
    }
  
    speed = this.OF32(this.pokeRound((speed * this.chainMods(speedMods, 410, 131172)) / 4096))
    if (pokemonSmogon.hasStatus('par') && !pokemonSmogon.hasAbility('Quick Feet')) {
      speed = Math.floor(this.OF32(speed * 50) / 100)
    }
  
    speed = Math.min(10000, speed)
    return Math.max(0, speed)
  }

  getModifiedStat(stat: number, mod: number): number {
    const numerator = 0
    const denominator = 1
    const modernGenBoostTable = [
      [2, 8],
      [2, 7],
      [2, 6],
      [2, 5],
      [2, 4],
      [2, 3],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [8, 2],
    ]
    stat = this.OF16(stat * modernGenBoostTable[6 + mod][numerator])
    stat = Math.floor(stat / modernGenBoostTable[6 + mod][denominator])

    return stat
  }

  private isQPActive(pokemon: Pokemon, field: Field) {
    const pokemonSmogon = pokemon.pokemonSmogon

    const weather = field.weather || ''
    const terrain = field.terrain
  
    return (
      (pokemonSmogon.hasAbility('Protosynthesis') && (weather.includes('Sun') || pokemonSmogon.abilityOn)) ||
      (pokemonSmogon.hasAbility('Quark Drive') && (terrain === 'Electric' || pokemonSmogon.abilityOn))
    )
  }

  getQPBoostedStat(pokemon: Pokemon): StatID {
    const pokemonSmogon = pokemon.pokemonSmogon

    let bestStat: StatID = 'atk'
    
    for (const stat of ['def', 'spa', 'spd', 'spe'] as StatID[]) {
      if (
        pokemonSmogon.rawStats[stat] > pokemonSmogon.rawStats[bestStat]
      ) {
        bestStat = stat
      }
    }

    return bestStat
  }

  private pokeRound(num: number) {
    return num % 1 > 0.5 ? Math.ceil(num) : Math.floor(num)
  }

  private chainMods(mods: number[], lowerBound: number, upperBound: number) {
    let M = 4096
    
    for (const mod of mods) {
      if (mod !== 4096) {
        M = (M * mod + 2048) >> 12
      }
    }

    return Math.max(Math.min(M, upperBound), lowerBound)
  }

  private OF16(n: number): number {
    return n > 65535 ? n % 65536 : n
  }

  private OF32(n: number) {
    return n > 4294967295 ? n % 4294967296 : n
  }
}