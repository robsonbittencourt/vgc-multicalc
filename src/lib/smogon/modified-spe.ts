import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import Commom from "./commom"

export default class SpeedStatCalculator {
  commom = new Commom()

  LOWER_SPEED_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight", "Iron Ball"]

  getFinalSpeed(pokemon: Pokemon, field: Field, isTailwind: boolean): number {
    let speed = this.commom.getModifiedStat(pokemon.rawStats["spe"]!, pokemon.boosts["spe"]!)
    const speedMods = []

    if (isTailwind) speedMods.push(8192)

    this.adjustSpeedByAbility(pokemon, field, speedMods)

    if (pokemon.item == "Choice Scarf") {
      speedMods.push(6144)
    } else if (this.LOWER_SPEED_ITEMS.includes(pokemon.item)) {
      speedMods.push(2048)
    } else if (pokemon.item == "Quick Powder" && pokemon.name === "Ditto") {
      speedMods.push(8192)
    }

    speed = this.commom.OF32(this.pokeRound((speed * this.chainMods(speedMods, 410, 131172)) / 4096))

    if (pokemon.status == Status.PARALYSIS && pokemon.ability.isNot("Quick Feet")) {
      speed = Math.floor(this.commom.OF32(speed * 50) / 100)
    }

    speed = Math.min(10000, speed)
    return Math.max(0, speed)
  }

  adjustSpeedByAbility(pokemon: Pokemon, field: Field, speedMods: number[]) {
    if (field.isNeutralizingGas && pokemon.item != "Ability Shield") {
      return
    }

    const weather = field.weather || ""
    const terrain = field.terrain

    if (
      (pokemon.ability.is("Unburden") && pokemon.ability.on) ||
      (pokemon.ability.is("Chlorophyll") && weather.includes("Sun")) ||
      (pokemon.ability.is("Sand Rush") && weather === "Sand") ||
      (pokemon.ability.is("Swift Swim") && weather.includes("Rain")) ||
      (pokemon.ability.is("Slush Rush") && ["Hail", "Snow"].includes(weather)) ||
      (pokemon.ability.is("Surge Surfer") && terrain === "Electric")
    ) {
      speedMods.push(8192)
    } else if (pokemon.ability.is("Quick Feet") && pokemon.status) {
      speedMods.push(6144)
    } else if (pokemon.ability.is("Slow Start") && pokemon.ability.on) {
      speedMods.push(2048)
    } else if (this.isQPActive(pokemon, field) && pokemon.higherStat === "spe") {
      speedMods.push(6144)
    }
  }

  private isQPActive(pokemon: Pokemon, field: Field) {
    const weather = field.weather || ""
    const terrain = field.terrain

    return (pokemon.ability.protosynthesis && (weather.includes("Sun") || pokemon.ability.on)) || (pokemon.ability.quarkDrive && (terrain === "Electric" || pokemon.ability.on))
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
}
