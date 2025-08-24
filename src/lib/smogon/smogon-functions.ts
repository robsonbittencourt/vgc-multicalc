import { Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Generations, Move, Field as SmogonField, Pokemon as SmogonPokemon, StatID } from "@robsonbittencourt/calc"
import { StatIDExceptHP } from "@robsonbittencourt/calc/src/data/interface"

@Injectable({ providedIn: "root" })
export class SmogonFunctions {
  LOWER_SPEED_ITEMS = ["Macho Brace", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight", "Iron Ball"]

  getFinalSpeed(pokemon: Pokemon, field: Field, isTailwind: boolean): number {
    let speed = pokemon.modifiedSpe
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

    speed = this.OF32(this.pokeRound((speed * this.chainMods(speedMods, 410, 131172)) / 4096))
    if (pokemon.status == Status.PARALYSIS && pokemon.ability.isNot("Quick Feet")) {
      speed = Math.floor(this.OF32(speed * 50) / 100)
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

  higherStat(smogonPokemon: SmogonPokemon): StatIDExceptHP {
    let bestStat: StatID = "atk"

    for (const stat of ["def", "spa", "spd", "spe"] as StatIDExceptHP[]) {
      const actual = this.getModifiedStat(smogonPokemon.rawStats[stat], smogonPokemon.boosts[stat])
      const best = this.getModifiedStat(smogonPokemon.rawStats[bestStat], smogonPokemon.boosts[bestStat])

      if (actual > best) {
        bestStat = stat
      }
    }

    return bestStat
  }

  getFinalAttack(attacker: SmogonPokemon, move: Move, field: SmogonField, isCritical = false): number {
    return this.calculateAttackSMSSSV(true, attacker, move, field, isCritical)
  }

  getFinalSpecialAttack(attacker: SmogonPokemon, move: Move, field: SmogonField, isCritical = false): number {
    return this.calculateAttackSMSSSV(false, attacker, move, field, isCritical)
  }

  private calculateAttackSMSSSV(isAttack: boolean, attacker: SmogonPokemon, move: Move, field: SmogonField, isCritical = false): number {
    let attack: number
    const attackStat = isAttack ? "atk" : "spa"

    if (attacker.boosts[attackStat] === 0 || (isCritical && attacker.boosts[attackStat] < 0)) {
      attack = attacker.rawStats[attackStat]
    } else {
      attack = this.getModifiedStat(attacker.rawStats[attackStat]!, attacker.boosts[attackStat]!)
    }

    if (attacker.hasAbility("Hustle") && move.category === "Physical") {
      attack = this.pokeRound((attack * 3) / 2)
    }

    const atMods = this.calculateAtModsSMSSSV(isAttack, attacker, move, field)
    attack = this.OF16(Math.max(1, this.pokeRound((attack * this.chainMods(atMods, 410, 131072)) / 4096)))
    return attack
  }

  private calculateAtModsSMSSSV(isAttack: boolean, attacker: SmogonPokemon, move: Move, field: SmogonField) {
    const gen = Generations.get(9)
    const atMods = []

    if (attacker.hasAbility("Slow Start") && attacker.abilityOn && move.category === "Physical") {
      atMods.push(2048)
    } else if (attacker.hasAbility("Solar Power") && field.hasWeather("Sun") && move.category === "Special") {
      atMods.push(6144)
    } else if (
      (attacker.hasAbility("Guts") && attacker.status && move.category === "Physical" && isAttack) ||
      (attacker.curHP() <= attacker.maxHP() / 3 &&
        ((attacker.hasAbility("Overgrow") && move.hasType("Grass")) || (attacker.hasAbility("Blaze") && move.hasType("Fire")) || (attacker.hasAbility("Torrent") && move.hasType("Water")) || (attacker.hasAbility("Swarm") && move.hasType("Bug")))) ||
      (move.category === "Special" && attacker.abilityOn && attacker.hasAbility("Plus", "Minus"))
    ) {
      atMods.push(6144)
    } else if (attacker.hasAbility("Flash Fire") && attacker.abilityOn && move.hasType("Fire")) {
      atMods.push(6144)
    } else if ((attacker.hasAbility("Dragon's Maw") && move.hasType("Dragon") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))) || (attacker.hasAbility("Rocky Payload") && move.hasType("Rock"))) {
      atMods.push(6144)
    } else if (attacker.hasAbility("Transistor") && move.hasType("Electric") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))) {
      atMods.push(gen.num >= 9 ? 5325 : 6144)
    } else if (attacker.hasAbility("Stakeout") && attacker.abilityOn) {
      atMods.push(8192)
    } else if ((attacker.hasAbility("Water Bubble") && move.hasType("Water")) || (attacker.hasAbility("Huge Power", "Pure Power") && move.category === "Physical")) {
      atMods.push(8192)
    }

    const isTabletsOfRuinActive = field.isTabletsOfRuin && !attacker.hasAbility("Tablets of Ruin")
    const isVesselOfRuinActive = field.isVesselOfRuin && !attacker.hasAbility("Vessel of Ruin")
    if ((isTabletsOfRuinActive && move.category === "Physical") || (isVesselOfRuinActive && move.category === "Special")) {
      atMods.push(3072)
    }

    // if (this.isQPActive(attacker, field)) {
    //   if ((move.category === "Physical" && getQPBoostedStat(attacker) === "atk") || (move.category === "Special" && getQPBoostedStat(attacker) === "spa")) {
    //     atMods.push(5325)
    //   }
    // }

    if ((attacker.hasAbility("Hadron Engine") && move.category === "Special" && field.hasTerrain("Electric")) || (attacker.hasAbility("Orichalcum Pulse") && move.category === "Physical" && true && !attacker.hasItem("Utility Umbrella"))) {
      atMods.push(5461)
    }

    if (attacker.hasItem("Light Ball") && attacker.name.includes("Pikachu")) {
      atMods.push(8192)
    } else if ((attacker.hasItem("Choice Band") && move.category === "Physical" && isAttack) || (attacker.hasItem("Choice Specs") && move.category === "Special" && !isAttack)) {
      atMods.push(6144)
    }
    return atMods
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

  private OF16(n: number): number {
    return n > 65535 ? n % 65536 : n
  }

  private OF32(n: number) {
    return n > 4294967295 ? n % 4294967296 : n
  }
}
