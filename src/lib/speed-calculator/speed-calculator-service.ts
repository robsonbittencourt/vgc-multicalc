import { Injectable, inject } from "@angular/core"
import { SETDEX_SV } from "@data/movesets"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { SPEED_STATISTICS } from "@data/speed-statistics"
import { ACTUAL, BOOSTER, MAX, MAX_BASE_SPEED_FOR_TR, MIN, MIN_IV_0, SCARF } from "@lib/constants"
import { defaultPokemon } from "@lib/default-pokemon"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"
import { Generations, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class SpeedCalculatorService {
  private smogonService = inject(SmogonFunctions)

  orderedPokemon(pokemon: Pokemon, field: Field, pokemonEachSide: number, options: SpeedCalculatorOptions = new SpeedCalculatorOptions()): SpeedDefinition[] {
    let speedDefinitions: SpeedDefinition[] = [this.buildActual(pokemon, field, options), ...this.loadSpeedMeta(options, field)]

    if (options.targetName.length > 0) {
      speedDefinitions = speedDefinitions.filter(s => s.pokemonName == options.targetName || this.isActual(s))
    }

    this.order(speedDefinitions, field.isTrickRoom)

    speedDefinitions = this.mergeByDescription(speedDefinitions)

    if (options.targetName.length == 0) {
      speedDefinitions = this.limitQuantity(speedDefinitions, pokemonEachSide)
    }

    return speedDefinitions
  }

  orderPairBySpeed(pokemonOne: Pokemon, pokemonTwo: Pokemon, field: Field): [Pokemon, Pokemon] {
    const speedOne = this.smogonService.getFinalSpeed(pokemonOne, field, field.attackerSide.isTailwind)
    const speedTwo = this.smogonService.getFinalSpeed(pokemonTwo, field, field.attackerSide.isTailwind)

    const pokemonOnePriority = this.priorityLevel(pokemonOne.move, field)
    const pokemonTwoPriority = this.priorityLevel(pokemonTwo.move, field)

    const someoneHasPriority = pokemonOnePriority != 0 || pokemonTwoPriority != 0
    const equalsPriority = pokemonOnePriority == pokemonTwoPriority

    if (someoneHasPriority && !equalsPriority) {
      return pokemonOnePriority > pokemonTwoPriority ? [pokemonOne, pokemonTwo] : [pokemonTwo, pokemonOne]
    }

    return speedOne >= speedTwo ? [pokemonOne, pokemonTwo] : [pokemonTwo, pokemonOne]
  }

  private buildActual(pokemon: Pokemon, field: Field, options: SpeedCalculatorOptions): SpeedDefinition {
    if (options.mode == SpeedCalculatorMode.Base) {
      return new SpeedDefinition(pokemon, pokemon.baseSpe, ACTUAL)
    }

    const speed = this.smogonService.getFinalSpeed(pokemon, field, field.attackerSide.isTailwind)

    return new SpeedDefinition(pokemon, speed, ACTUAL)
  }

  private loadSpeedMeta(options: SpeedCalculatorOptions, field: Field): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []

    const quantity = options.targetName.length > 0 ? undefined : options.topUsage
    const pokemon = pokemonByRegulation(options.regulation, quantity)

    pokemon.forEach(p => {
      const pokemon = this.adjustPokemonByOptions(p, options)

      this.loadStats(pokemon, field, speedDefinitions, options)
      this.loadMetaStatistics(pokemon, field, speedDefinitions, options)
      this.loadBaseSpeed(pokemon, speedDefinitions, options)
    })

    return speedDefinitions
  }

  private loadStats(pokemon: Pokemon, field: Field, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.StatsAndMeta || options.mode == SpeedCalculatorMode.Stats) {
      speedDefinitions.push(this.minSpeed(pokemon, field))
      speedDefinitions.push(this.maxSpeed(pokemon, field))

      if (this.isTrickRoomPokemon(pokemon)) {
        speedDefinitions.push(this.minSpeedIvZero(pokemon, field))
      }

      if (this.hasChoiceScarf(pokemon)) {
        speedDefinitions.push(this.maxScarf(pokemon, field))
      }

      if (this.isBoosterSpeedPokemon(pokemon)) {
        speedDefinitions.push(this.maxBooster(pokemon, field))
      }
    }
  }

  private loadMetaStatistics(pokemon: Pokemon, field: Field, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.StatsAndMeta || options.mode == SpeedCalculatorMode.Meta) {
      speedDefinitions.push(...this.statistics(pokemon, field))
    }
  }

  private loadBaseSpeed(pokemon: Pokemon, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.Base) {
      speedDefinitions.push(new SpeedDefinition(pokemon, pokemon.baseSpe, "Base"))
    }
  }

  private hasChoiceScarf(pokemon: Pokemon): boolean {
    return pokemon.item == "Choice Scarf" || SETDEX_SV[pokemon.name].items.includes("Choice Scarf")
  }

  private limitQuantity(speedDefinitions: SpeedDefinition[], pokemonEachSide: number): SpeedDefinition[] {
    const actualIndex = speedDefinitions.findIndex(this.isActual)

    const initIndex = Math.max(0, actualIndex - pokemonEachSide)
    const lastIndex = actualIndex + pokemonEachSide + 1
    const range = speedDefinitions.slice(initIndex, lastIndex)

    const updatedActualIndex = range.findIndex(this.isActual)

    if (updatedActualIndex < pokemonEachSide) {
      const diff = pokemonEachSide - updatedActualIndex
      const padding = Array.from({ length: diff }, () => new SpeedDefinition(defaultPokemon(), 0, ""))
      return [...padding, ...range]
    }

    return range
  }

  private isActual(speedDefinition: SpeedDefinition): boolean {
    return speedDefinition.description.includes(ACTUAL)
  }

  private order(speedDefinitions: SpeedDefinition[], isTrickRoom: boolean) {
    speedDefinitions.sort((a, b) => (isTrickRoom ? b.value - a.value : a.value - b.value))
  }

  private mergeByDescription(speedDefinitions: SpeedDefinition[]): SpeedDefinition[] {
    const merged: Record<string, SpeedDefinition> = {}

    speedDefinitions.forEach(sd => {
      const key = `${sd.pokemon.name}-${sd.value}`

      if (!merged[key]) {
        merged[key] = new SpeedDefinition(sd.pokemon, sd.value, ...sd.description)
      } else {
        merged[key].description.push(...sd.description)
      }
    })

    return Object.values(merged)
  }

  private adjustPokemonByOptions(pokemon: Pokemon, options: SpeedCalculatorOptions): Pokemon {
    const boosts = { ...pokemon.boosts, spe: options.speedModifier }
    const status = options.paralyzedActive ? Status.PARALYSIS : pokemon.status
    const item = options.choiceScarfActive ? "Choice Scarf" : pokemon.item

    return pokemon.clone({ boosts, status, item })
  }

  minSpeedIvZero(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: "Brave", evs: { spe: 0 }, ivs: { spe: 0 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)

    return new SpeedDefinition(clonedPokemon, speed, MIN_IV_0)
  }

  minSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: "Bashful", evs: { spe: 0 }, ivs: { spe: 31 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)

    return new SpeedDefinition(clonedPokemon, speed, MIN)
  }

  maxSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ nature: "Timid", item: "Leftovers", evs: { spe: 252 }, ivs: { spe: 31 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)

    return new SpeedDefinition(clonedPokemon, speed, MAX)
  }

  maxScarf(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ nature: "Timid", item: "Choice Scarf", evs: { spe: 252 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)
    const description = SCARF

    return new SpeedDefinition(pokemon, speed, description)
  }

  maxBooster(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ ability: new Ability(pokemon.ability.name, true), nature: "Timid", evs: { spe: 252 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)
    const description = BOOSTER

    return new SpeedDefinition(clonedPokemon, speed, description)
  }

  statistics(pokemon: Pokemon, field: Field): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []

    if (SPEED_STATISTICS[pokemon.name]) {
      SPEED_STATISTICS[pokemon.name].statistics
        .filter(s => s.type === "usage")
        .forEach(speedStatistic => {
          const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: speedStatistic.nature, evs: { spe: speedStatistic.speedEv } })
          const speed = this.smogonService.getFinalSpeed(clonedPokemon, field, field.defenderSide.isTailwind)

          const speedDefinition = new SpeedDefinition(clonedPokemon, speed, `${speedStatistic.percentage}% Usage`)

          return speedDefinitions.push(speedDefinition)
        })
    }

    return speedDefinitions
  }

  private isTrickRoomPokemon(pokemon: Pokemon): boolean {
    return new SmogonPokemon(Generations.get(9), pokemon.name).species.baseStats.spe <= MAX_BASE_SPEED_FOR_TR
  }

  private isBoosterSpeedPokemon(pokemon: Pokemon): boolean {
    return pokemon.isParadoxAbility && !this.isTrickRoomPokemon(pokemon)
  }

  private priorityLevel(move: Move, field: Field): number {
    if (move.name == "Grassy Glide" && field.terrain == "Grassy") {
      return 1
    }

    const priority5 = ["Helping Hand"]
    const priority4 = ["Baneful Bunker", "Burning Bulwark", "Detect", "Endure", "Protect", "Spiky Shield", "Silk Trap"]
    const priority3 = ["Fake Out", "Quick Guard", "Upper Hand", "Wide Guard"]
    const priority2 = ["Ally Switch", "Extreme Speed", "Feint", "First Impression", "Follow Me", "Rage Powder"]
    const priority1 = ["Accelerock", "Aqua Jet", "Baby-Doll Eyes", "Bullet Punch", "Ice Shard", "Jet Punch", "Mach Punch", "Quick Attack", "Shadow Sneak", "Sucker Punch", "Thunderclap", "Vacuum Wave", "Water Shuriken"]

    const priorityMinus3 = ["Beak Blast", "Focus Punch"]
    const priorityMinus4 = ["Avalanche"]
    const priorityMinus5 = ["Counter", "Mirror Coat"]
    const priorityMinus6 = ["Circle Throw", "Dragon Tail", "Roar", "Whirlwind", "Teleport"]
    const priorityMinus7 = ["Trick Room"]

    switch (move.name) {
      case priority5.find(a => a === move.name):
        return 5

      case priority4.find(a => a === move.name):
        return 4

      case priority3.find(a => a === move.name):
        return 3

      case priority2.find(a => a === move.name):
        return 2

      case priority1.find(a => a === move.name):
        return 1

      case priorityMinus3.find(a => a === move.name):
        return -3

      case priorityMinus4.find(a => a === move.name):
        return -4

      case priorityMinus5.find(a => a === move.name):
        return -5

      case priorityMinus6.find(a => a === move.name):
        return -6

      case priorityMinus7.find(a => a === move.name):
        return -7

      default:
        return 0
    }
  }
}
