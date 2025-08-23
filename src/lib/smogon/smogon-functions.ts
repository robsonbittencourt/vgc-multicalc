import { Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Generations, Move, Field as SmogonField, Pokemon as SmogonPokemon, StatID } from "@robsonbittencourt/calc"
import { Generation, MoveCategory } from "@robsonbittencourt/calc/dist/data/interface"
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

  calculateAttackSMSSSV(attacker: SmogonPokemon, defender: SmogonPokemon, move: Move, field: SmogonField, isCritical = false) {
    const gen = Generations.get(9)
    let attack: number
    const attackStat = move.named("Shell Side Arm") && this.getShellSideArmCategory(attacker, defender) === "Physical" ? "atk" : move.named("Body Press") ? "def" : move.category === "Special" ? "spa" : "atk"

    // desc.attackEVs =
    //   move.named('Foul Play')
    //     ? getStatDescriptionText(gen, defender, attackStat, defender.nature)
    //     : getStatDescriptionText(gen, attacker, attackStat, attacker.nature);

    const attackSource = move.named("Foul Play") ? defender : attacker
    if (attackSource.boosts[attackStat] === 0 || (isCritical && attackSource.boosts[attackStat] < 0)) {
      attack = attackSource.rawStats[attackStat]
    } else if (defender.hasAbility("Unaware")) {
      attack = attackSource.rawStats[attackStat]
    } else {
      attack = this.getModifiedStat(attackSource.rawStats[attackStat]!, attackSource.boosts[attackStat]!)
    }

    if (attacker.hasAbility("Hustle") && move.category === "Physical") {
      attack = this.pokeRound((attack * 3) / 2)
    }

    const atMods = this.calculateAtModsSMSSSV(gen, attacker, defender, move, field)
    attack = this.OF16(Math.max(1, this.pokeRound((attack * this.chainMods(atMods, 410, 131072)) / 4096)))
    return attack
  }

  private calculateAtModsSMSSSV(gen: Generation, attacker: SmogonPokemon, defender: SmogonPokemon, move: Move, field: SmogonField) {
    const atMods = []

    // Slow Start also halves damage with special Z-moves
    if ((attacker.hasAbility("Slow Start") && attacker.abilityOn && (move.category === "Physical" || (move.category === "Special" && move.isZ))) || (attacker.hasAbility("Defeatist") && attacker.curHP() <= attacker.maxHP() / 2)) {
      atMods.push(2048)
    } else if (
      (attacker.hasAbility("Solar Power") && field.hasWeather("Sun", "Harsh Sunshine") && move.category === "Special") ||
      (attacker.named("Cherrim") && attacker.hasAbility("Flower Gift") && field.hasWeather("Sun", "Harsh Sunshine") && move.category === "Physical")
    ) {
      atMods.push(6144)
    } else if (
      // Gorilla Tactics has no effect during Dynamax (Anubis)
      attacker.hasAbility("Gorilla Tactics") &&
      move.category === "Physical" &&
      !attacker.isDynamaxed
    ) {
      atMods.push(6144)
    } else if (
      (attacker.hasAbility("Guts") && attacker.status && move.category === "Physical") ||
      (attacker.curHP() <= attacker.maxHP() / 3 &&
        ((attacker.hasAbility("Overgrow") && move.hasType("Grass")) || (attacker.hasAbility("Blaze") && move.hasType("Fire")) || (attacker.hasAbility("Torrent") && move.hasType("Water")) || (attacker.hasAbility("Swarm") && move.hasType("Bug")))) ||
      (move.category === "Special" && attacker.abilityOn && attacker.hasAbility("Plus", "Minus"))
    ) {
      atMods.push(6144)
    } else if (attacker.hasAbility("Flash Fire") && attacker.abilityOn && move.hasType("Fire")) {
      atMods.push(6144)
    } else if ((attacker.hasAbility("Steelworker") && move.hasType("Steel")) || (attacker.hasAbility("Dragon's Maw") && move.hasType("Dragon")) || (attacker.hasAbility("Rocky Payload") && move.hasType("Rock"))) {
      atMods.push(6144)
    } else if (attacker.hasAbility("Transistor") && move.hasType("Electric")) {
      atMods.push(gen.num >= 9 ? 5325 : 6144)
    } else if (attacker.hasAbility("Stakeout") && attacker.abilityOn) {
      atMods.push(8192)
    } else if ((attacker.hasAbility("Water Bubble") && move.hasType("Water")) || (attacker.hasAbility("Huge Power", "Pure Power") && move.category === "Physical")) {
      atMods.push(8192)
    }

    if (field.attackerSide.isFlowerGift && !attacker.hasAbility("Flower Gift") && field.hasWeather("Sun", "Harsh Sunshine") && move.category === "Physical") {
      atMods.push(6144)
    }

    if (field.attackerSide.isSteelySpirit && move.hasType("Steel")) {
      atMods.push(6144)
    }

    if ((defender.hasAbility("Thick Fat") && move.hasType("Fire", "Ice")) || (defender.hasAbility("Water Bubble") && move.hasType("Fire")) || (defender.hasAbility("Purifying Salt") && move.hasType("Ghost"))) {
      atMods.push(2048)
    }

    if (gen.num >= 9 && defender.hasAbility("Heatproof") && move.hasType("Fire")) {
      atMods.push(2048)
    }
    // Pokemon with "-of Ruin" Ability are immune to the opposing "-of Ruin" ability
    const isTabletsOfRuinActive = (defender.hasAbility("Tablets of Ruin") || field.isTabletsOfRuin) && !attacker.hasAbility("Tablets of Ruin")
    const isVesselOfRuinActive = (defender.hasAbility("Vessel of Ruin") || field.isVesselOfRuin) && !attacker.hasAbility("Vessel of Ruin")
    if ((isTabletsOfRuinActive && move.category === "Physical") || (isVesselOfRuinActive && move.category === "Special")) {
      atMods.push(3072)
    }

    // if (this.isQPActive(attacker, field)) {
    //   if ((move.category === "Physical" && getQPBoostedStat(attacker) === "atk") || (move.category === "Special" && getQPBoostedStat(attacker) === "spa")) {
    //     atMods.push(5325)
    //     desc.attackerAbility = attacker.ability
    //   }
    // }

    if (
      (attacker.hasAbility("Hadron Engine") && move.category === "Special" && field.hasTerrain("Electric")) ||
      (attacker.hasAbility("Orichalcum Pulse") && move.category === "Physical" && field.hasWeather("Sun", "Harsh Sunshine") && !attacker.hasItem("Utility Umbrella"))
    ) {
      atMods.push(5461)
    }

    if (
      (attacker.hasItem("Thick Club") && attacker.named("Cubone", "Marowak", "Marowak-Alola", "Marowak-Alola-Totem") && move.category === "Physical") ||
      (attacker.hasItem("Deep Sea Tooth") && attacker.named("Clamperl") && move.category === "Special") ||
      (attacker.hasItem("Light Ball") && attacker.name.includes("Pikachu") && !move.isZ)
    ) {
      atMods.push(8192)
      // Choice Band/Scarf/Specs move lock and stat boosts are ignored during Dynamax (Anubis)
    } else if (!move.isZ && !move.isMax && ((attacker.hasItem("Choice Band") && move.category === "Physical") || (attacker.hasItem("Choice Specs") && move.category === "Special"))) {
      atMods.push(6144)
    }
    return atMods
  }

  private getShellSideArmCategory(source: SmogonPokemon, target: SmogonPokemon): MoveCategory {
    const physicalDamage = source.stats.atk / target.stats.def
    const specialDamage = source.stats.spa / target.stats.spd
    return physicalDamage > specialDamage ? "Physical" : "Special"
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
