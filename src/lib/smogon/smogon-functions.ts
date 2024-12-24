import { Injectable } from "@angular/core"
import { Pokemon } from "@lib/model/pokemon"
import { Field, Pokemon as PokemonSmogon, Side, StatID } from "@robsonbittencourt/calc"
import { StatIDExceptHP } from "@robsonbittencourt/calc/src/data/interface"

@Injectable({ providedIn: "root" })
export class SmogonFunctions {
  LOWER_SPEED_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight", "Iron Ball"]

  getFinalSpeed(pokemon: Pokemon, field: Field = new Field(), side: Side = new Side()) {
    const weather = field.weather || ""
    const terrain = field.terrain
    let speed = pokemon.modifiedSpe
    const speedMods = []

    if (side.isTailwind) speedMods.push(8192)

    if (
      (pokemon.ability == "Unburden" && pokemon.abilityOn) ||
      (pokemon.ability == "Chlorophyll" && weather.includes("Sun")) ||
      (pokemon.ability == "Sand Rush" && weather === "Sand") ||
      (pokemon.ability == "Swift Swim" && weather.includes("Rain")) ||
      (pokemon.ability == "Slush Rush" && ["Hail", "Snow"].includes(weather)) ||
      (pokemon.ability == "Surge Surfer" && terrain === "Electric")
    ) {
      speedMods.push(8192)
    } else if (pokemon.ability == "Quick Feet" && pokemon.status) {
      speedMods.push(6144)
    } else if (pokemon.ability == "Slow Start" && pokemon.abilityOn) {
      speedMods.push(2048)
    } else if (this.isQPActive(pokemon, field) && pokemon.higherStat === "spe") {
      speedMods.push(6144)
    }

    if (pokemon.item == "Choice Scarf") {
      speedMods.push(6144)
    } else if (this.LOWER_SPEED_ITEMS.includes(pokemon.item)) {
      speedMods.push(2048)
    } else if (pokemon.item == "Quick Powder" && pokemon.name === "Ditto") {
      speedMods.push(8192)
    }

    speed = this.OF32(this.pokeRound((speed * this.chainMods(speedMods, 410, 131172)) / 4096))
    if (pokemon.status === "Paralysis" && pokemon.ability !== "Quick Feet") {
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
      [8, 2]
    ]
    stat = this.OF16(stat * modernGenBoostTable[6 + mod][numerator])
    stat = Math.floor(stat / modernGenBoostTable[6 + mod][denominator])

    return stat
  }

  higherStat(pokemonSmogon: PokemonSmogon): StatIDExceptHP {
    let bestStat: StatID = "atk"

    for (const stat of ["def", "spa", "spd", "spe"] as StatIDExceptHP[]) {
      if (pokemonSmogon.rawStats[stat] > pokemonSmogon.rawStats[bestStat]) {
        bestStat = stat
      }
    }

    return bestStat
  }

  private isQPActive(pokemon: Pokemon, field: Field) {
    const weather = field.weather || ""
    const terrain = field.terrain

    return (pokemon.ability == "Protosynthesis" && (weather.includes("Sun") || pokemon.abilityOn)) || (pokemon.ability == "Quark Drive" && (terrain === "Electric" || pokemon.abilityOn))
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
