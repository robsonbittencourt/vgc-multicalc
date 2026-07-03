import { inject, Injectable } from "@angular/core"
import { MOVESETS } from "@data/moveset-data"
import { pokemonByRegulation } from "@lib/pokemon-by-regulation"
import { SpeedData } from "@data/speed-data"
import { SPEED_STATISTICS_REG_MB } from "@data/speed-statistics-reg-mb"
import { CalculatorStore } from "@store/calculator-store"
import { ACTUAL, BOOSTER, MAX, MAX_BASE_SPEED_FOR_TR, MIN, OPPONENT, SPEED_TIE, YOUR_TEAM } from "@lib/constants"
import { defaultPokemon } from "@lib/default-pokemon"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"
import { Regulation } from "@lib/types"
import { getPokemonData } from "@data/pokemon-data"

@Injectable({
  providedIn: "root"
})
export class SpeedCalculatorService {
  private store = inject(CalculatorStore)

  private readonly statisticsByRegulation: Record<string, Record<string, SpeedData>> = {
    MB: SPEED_STATISTICS_REG_MB
  }

  orderedPokemon(pokemon: Pokemon, field: Field, pokemonEachSide: number, options: SpeedCalculatorOptions = new SpeedCalculatorOptions(), opponentsNoPaddingThreshold = 0): SpeedDefinition[] {
    let speedDefinitions: SpeedDefinition[] = [this.buildActual(pokemon, field, options), ...this.loadMyTeam(options, field), ...this.loadSpeedMeta(options, field)]

    if (options.targetName.length > 0) {
      speedDefinitions = speedDefinitions.filter(s => s.pokemonName == options.targetName || this.isActual(s))
    }

    this.order(speedDefinitions, field.isTrickRoom)

    speedDefinitions = this.mergeByDescription(speedDefinitions, options)

    if (options.targetName.length == 0 && this.shouldLimitQuantity(options, speedDefinitions, opponentsNoPaddingThreshold)) {
      speedDefinitions = this.limitQuantity(speedDefinitions, pokemonEachSide)
    }

    return speedDefinitions
  }

  private shouldLimitQuantity(options: SpeedCalculatorOptions, speedDefinitions: SpeedDefinition[], opponentsNoPaddingThreshold: number): boolean {
    if (options.filterType === "team") return false

    if (options.filterType === "opponents" && speedDefinitions.length < opponentsNoPaddingThreshold) return false

    return true
  }

  orderPairBySpeed(pokemonOne: Pokemon, pokemonTwo: Pokemon, field: Field): [Pokemon, Pokemon] {
    const speedOne = getFinalSpeed(pokemonOne, field, true)
    const speedTwo = getFinalSpeed(pokemonTwo, field, true)

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
    const descriptions = options.filterType === "opponents" || options.filterType === "team" ? [ACTUAL, YOUR_TEAM] : [ACTUAL]

    if (options.mode == SpeedCalculatorMode.Base) {
      return new SpeedDefinition(pokemon, pokemon.baseSpe, ...descriptions)
    }

    const speed = getFinalSpeed(pokemon, field, true)

    return new SpeedDefinition(pokemon, speed, ...descriptions)
  }

  private loadSpeedMeta(options: SpeedCalculatorOptions, field: Field): SpeedDefinition[] {
    if (options.filterType === "opponents") {
      return this.loadActualSpeeds(this.opponentPokemon(), field, options, OPPONENT)
    }

    if (options.filterType === "team") {
      return this.loadActualSpeeds(this.teamPokemon(options.teamId), field, options, OPPONENT)
    }

    const speedDefinitions: SpeedDefinition[] = []

    const quantity = options.targetName.length > 0 ? undefined : options.topUsage
    const includeAllPokemon = options._topUsage === "All"
    const pokemon = pokemonByRegulation(options.regulation, quantity, MOVESETS, includeAllPokemon)

    pokemon.forEach(p => {
      const pokemon = this.adjustPokemonByOptions(p, options)

      this.loadStats(pokemon, field, speedDefinitions, options)
      this.loadMetaStatistics(pokemon, field, speedDefinitions, options)
      this.loadBaseSpeed(pokemon, speedDefinitions, options)
    })

    return speedDefinitions
  }

  private loadMyTeam(options: SpeedCalculatorOptions, field: Field): SpeedDefinition[] {
    if (!options.showMyTeam) return []

    return this.loadActualSpeeds(this.myTeamPokemon(), field, options, YOUR_TEAM, false, true)
  }

  private loadActualSpeeds(pokemon: Pokemon[], field: Field, options: SpeedCalculatorOptions, description: string, applyModifiers = true, isAttacker = false): SpeedDefinition[] {
    return pokemon.map(p => {
      const adjusted = applyModifiers ? this.adjustPokemonByOptions(p, options) : p
      const speed = options.mode == SpeedCalculatorMode.Base ? adjusted.baseSpe : getFinalSpeed(adjusted, field, isAttacker)
      return new SpeedDefinition(adjusted, speed, description)
    })
  }

  private opponentPokemon(): Pokemon[] {
    return this.store
      .targets()
      .flatMap(t => [t.pokemon, t.secondPokemon])
      .filter((p): p is Pokemon => p != null && !p.isDefault)
  }

  private teamPokemon(teamId: string): Pokemon[] {
    const team = this.store.teams().find(t => t.id === teamId)
    return team ? team.teamMembers.map(m => m.pokemon).filter(p => !p.isDefault) : []
  }

  private myTeamPokemon(): Pokemon[] {
    return this.store
      .team()
      .teamMembers.map(m => m.pokemon)
      .filter(p => !p.isDefault)
  }

  private loadStats(pokemon: Pokemon, field: Field, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.StatsAndMeta || options.mode == SpeedCalculatorMode.Stats) {
      speedDefinitions.push(this.minSpeed(pokemon, field))
      speedDefinitions.push(this.maxSpeed(pokemon, field))

      if (this.isBoosterSpeedPokemon(pokemon)) {
        speedDefinitions.push(this.maxBooster(pokemon, field))
      }
    }
  }

  private loadMetaStatistics(pokemon: Pokemon, field: Field, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.StatsAndMeta || options.mode == SpeedCalculatorMode.Meta) {
      speedDefinitions.push(...this.statistics(pokemon, field, options.regulation))
    }
  }

  private loadBaseSpeed(pokemon: Pokemon, speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions) {
    if (options.mode == SpeedCalculatorMode.Base) {
      speedDefinitions.push(new SpeedDefinition(pokemon, pokemon.baseSpe, "Base"))
    }
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

  private mergeByDescription(speedDefinitions: SpeedDefinition[], options: SpeedCalculatorOptions): SpeedDefinition[] {
    const merged: Record<string, SpeedDefinition> = {}
    const marksSpeedTie = (options.filterType === "opponents" || options.filterType === "team") && options.mode != SpeedCalculatorMode.Base

    const mergedPokemonId: Record<string, string> = {}

    speedDefinitions.forEach(sd => {
      const key = `${sd.pokemon.name}-${sd.value}`

      if (!merged[key]) {
        merged[key] = new SpeedDefinition(sd.pokemon, sd.value, ...sd.description)
        mergedPokemonId[key] = sd.pokemon.id
      } else {
        const descriptionsToAdd = sd.description.filter(d => !merged[key].description.includes(d))
        merged[key].description.push(...descriptionsToAdd)

        const isSpeedTie = sd.pokemon.id !== mergedPokemonId[key]

        if (marksSpeedTie && isSpeedTie && !merged[key].description.includes(SPEED_TIE)) merged[key].description.push(SPEED_TIE)
      }
    })

    return Object.values(merged)
  }

  private adjustPokemonByOptions(pokemon: Pokemon, options: SpeedCalculatorOptions): Pokemon {
    const boosts = { ...pokemon.boosts, spe: options.speedModifier }
    const status = options.paralyzedActive ? Status.PARALYSIS : pokemon.status
    const item = pokemon.item

    const speedAbilities = ["Swift Swim", "Sand Rush", "Surge Surfer", "Chlorophyll", "Slush Rush"]
    const matchedAbility = speedAbilities.find(ability => pokemon.availableAbilities.some(a => a.name === ability))
    const abilityName = matchedAbility ? matchedAbility : pokemon.ability.name

    return pokemon.clone({ id: pokemon.id, boosts, status, item, ability: new Ability(abilityName) })
  }

  minSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const isTrickRoomPoke = this.isTrickRoomPokemon(pokemon)

    if (isTrickRoomPoke) {
      const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: "Brave", evs: { spe: 0 }, ivs: { spe: 31 } })
      const speed = getFinalSpeed(clonedPokemon, field, false)
      return new SpeedDefinition(clonedPokemon, speed, MIN, "Nature -")
    }

    const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: "Bashful", evs: { spe: 0 }, ivs: { spe: 31 } })

    const speed = getFinalSpeed(clonedPokemon, field, false)

    return new SpeedDefinition(clonedPokemon, speed, MIN)
  }

  maxSpeed(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ nature: "Timid", item: "Leftovers", evs: { spe: 252 }, ivs: { spe: 31 } })

    const speed = getFinalSpeed(clonedPokemon, field, false)

    return new SpeedDefinition(clonedPokemon, speed, MAX)
  }

  maxBooster(pokemon: Pokemon, field: Field): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ ability: new Ability(pokemon.ability.name, true), nature: "Timid", evs: { spe: 252 }, higherStat: "spe" })

    const speed = getFinalSpeed(clonedPokemon, field, false)
    const description = BOOSTER

    return new SpeedDefinition(clonedPokemon, speed, description)
  }

  statistics(pokemon: Pokemon, field: Field, regulation: Regulation): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []
    const speedData = this.retrieveSpeedStatistics(pokemon.name, regulation)

    if (speedData) {
      speedData.statistics
        .filter(s => s.type === "usage")
        .forEach(speedStatistic => {
          const clonedPokemon = pokemon.clone({ item: "Leftovers", nature: speedStatistic.nature, evs: { spe: speedStatistic.speedEv } })
          const speed = getFinalSpeed(clonedPokemon, field, false)

          const speedDefinition = new SpeedDefinition(clonedPokemon, speed, `${speedStatistic.percentage}% Usage`)

          return speedDefinitions.push(speedDefinition)
        })
    }

    return speedDefinitions
  }

  retrieveSpeedStatistics(pokemonName: string, regulation: Regulation): SpeedData {
    return this.statisticsByRegulation[regulation][pokemonName]
  }

  hasStatisticsForRegulation(regulation: Regulation): boolean {
    return Object.values(this.statisticsByRegulation[regulation] ?? {}).some(data => data.statistics.length > 0)
  }

  private isTrickRoomPokemon(pokemon: Pokemon): boolean {
    return (getPokemonData(pokemon.name)?.baseStats.spe ?? 999) <= MAX_BASE_SPEED_FOR_TR
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
