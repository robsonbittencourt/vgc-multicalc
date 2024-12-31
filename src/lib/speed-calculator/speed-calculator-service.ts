import { Injectable, inject } from "@angular/core"
import { SETDEX_SV } from "@data/movesets"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { ACTUAL, BOOSTER, MAX, META, MIN, SCARF } from "@lib/constants"
import { FieldMapper } from "@lib/field-mapper"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"
import { Generations, Field as SmogonField, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class SpeedCalculatorService {
  private smogonService = inject(SmogonFunctions)
  private fieldMapper = inject(FieldMapper)

  private POKEMON_QUANTITY = 64

  orderedPokemon(pokemon: Pokemon, field: Field, pokemonEachSide: number, options: SpeedCalculatorOptions = new SpeedCalculatorOptions()): SpeedDefinition[] {
    const smogonField = this.fieldMapper.toSmogon(field)

    let speedDefinitions: SpeedDefinition[] = [this.buildActual(pokemon, smogonField), ...this.loadSpeedMeta(options, smogonField)]

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
    const smogonField = this.fieldMapper.toSmogon(field)

    const speedOne = this.smogonService.getFinalSpeed(pokemonOne, smogonField, smogonField.attackerSide)
    const speedTwo = this.smogonService.getFinalSpeed(pokemonTwo, smogonField, smogonField.attackerSide)

    return speedOne >= speedTwo ? [pokemonOne, pokemonTwo] : [pokemonTwo, pokemonOne]
  }

  private buildActual(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const speed = this.smogonService.getFinalSpeed(pokemon, smogonField, smogonField.attackerSide)

    return new SpeedDefinition(pokemon.name, speed, ACTUAL)
  }

  private loadSpeedMeta(options: SpeedCalculatorOptions, smogonField: SmogonField): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []

    const quantity = options.targetName.length > 0 ? undefined : this.POKEMON_QUANTITY
    const pokemon = pokemonByRegulation(options.regulation, quantity)

    pokemon.forEach(p => {
      const pokemon = this.adjustPokemonByOptions(p, options)

      speedDefinitions.push(this.minSpeed(pokemon, smogonField))
      speedDefinitions.push(this.maxSpeed(pokemon, smogonField))
      speedDefinitions.push(this.maxMeta(pokemon, smogonField))

      if (this.hasChoiceScarf(pokemon)) {
        speedDefinitions.push(this.maxScarf(pokemon, smogonField))
      }

      if (pokemon.isParadoxAbility) {
        speedDefinitions.push(this.maxBooster(pokemon, smogonField))
      }
    })

    return speedDefinitions
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
      const padding = Array.from({ length: diff }, () => new SpeedDefinition("", 0, ""))
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
    const merged = [speedDefinitions[0]]
    let actual = speedDefinitions[0]

    for (let index = 1; index < speedDefinitions.length; index++) {
      const next = speedDefinitions[index]

      if (actual.pokemonName == next.pokemonName && actual.value == next.value) {
        if (actual.description == ACTUAL || next.description == ACTUAL) {
          merged[merged.length - 1].description = ACTUAL
        } else {
          merged[merged.length - 1].description = META
        }
      } else {
        merged.push(next)
        actual = next
      }
    }

    return merged
  }

  private adjustPokemonByOptions(pokemon: Pokemon, options: SpeedCalculatorOptions): Pokemon {
    const boosts = { ...pokemon.boosts, spe: options.speedModifier }
    const status = options.paralyzedActive ? Status.PARALYSIS : pokemon.status
    const item = options.choiceScarfActive ? "Choice Scarf" : pokemon.item

    return pokemon.clone({ boosts, status, item })
  }

  minSpeed(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const MAX_BASE_SPEED_FOR_TR = 52
    const isTrickRoomPokemon = new SmogonPokemon(Generations.get(9), pokemon.name).species.baseStats.spe <= MAX_BASE_SPEED_FOR_TR

    const nature = isTrickRoomPokemon ? "Brave" : "Bashful"
    const ivs = isTrickRoomPokemon ? { spe: 0 } : { spe: 31 }
    const clonedPokemon = pokemon.clone({ nature, item: "Leftovers", evs: { spe: 0 }, ivs })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, smogonField, smogonField.defenderSide)

    return new SpeedDefinition(clonedPokemon.name, speed, MIN)
  }

  maxSpeed(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ nature: "Timid", item: "Leftovers", evs: { spe: 252 }, ivs: { spe: 31 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, smogonField, smogonField.defenderSide)

    return new SpeedDefinition(clonedPokemon.name, speed, MAX)
  }

  maxScarf(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ nature: "Timid", item: "Choice Scarf", evs: { spe: 252 } })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, smogonField, smogonField.defenderSide)
    const description = SCARF

    return new SpeedDefinition(pokemon.name, speed, description)
  }

  maxBooster(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ ability: new Ability(pokemon.ability.name, true) })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, smogonField, smogonField.defenderSide)
    const description = BOOSTER

    return new SpeedDefinition(clonedPokemon.name, speed, description)
  }

  maxMeta(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const clonedPokemon = pokemon.clone({ item: "Leftovers" })

    const speed = this.smogonService.getFinalSpeed(clonedPokemon, smogonField, smogonField.defenderSide)
    const description = META

    return new SpeedDefinition(pokemon.name, speed, description)
  }
}
