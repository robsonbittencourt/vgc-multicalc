import { Injectable, inject } from "@angular/core"
import { ACTUAL, BOOSTER, MAX, META, MIN, SCARF } from "@lib/constants"
import { FieldMapper } from "@lib/field-mapper"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SmogonFunctions } from "@lib/smogon/smogon-functions"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"
import { speedMeta } from "@lib/speed-calculator/speed-meta"
import { Generations, Pokemon as PokemonSmogon, Field as SmogonField } from "@robsonbittencourt/calc"

@Injectable({
  providedIn: "root"
})
export class SpeedCalculatorService {
  private smogonService = inject(SmogonFunctions)
  private fieldMapper = inject(FieldMapper)

  orderedPokemon(pokemon: Pokemon, field: Field, options: SpeedCalculatorOptions = new SpeedCalculatorOptions()): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []
    const smogonField = this.fieldMapper.toSmogon(field)

    speedDefinitions.push(this.buildActual(pokemon, smogonField))
    speedDefinitions.push(...this.loadSpeedMeta(options, smogonField))

    this.order(speedDefinitions, field.isTrickRoom)

    return this.mergeByDescription(speedDefinitions)
  }

  private buildActual(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const speed = this.smogonService.getFinalSpeed(pokemon, smogonField, smogonField.attackerSide)

    return new SpeedDefinition(pokemon.name, speed, ACTUAL)
  }

  private loadSpeedMeta(options: SpeedCalculatorOptions, smogonField: SmogonField): SpeedDefinition[] {
    const speedDefinitions: SpeedDefinition[] = []

    speedMeta(options.regulation).forEach(p => {
      const pokemon = this.adjustPokemonByOptions(p, options)

      speedDefinitions.push(this.minSpeed(pokemon, smogonField))
      speedDefinitions.push(this.maxSpeed(pokemon, smogonField))
      speedDefinitions.push(this.maxMeta(pokemon, smogonField))

      if (pokemon.item == "Choice Scarf") {
        speedDefinitions.push(this.maxScarf(pokemon, smogonField))
      }

      if (pokemon.isParadoxAbility) {
        speedDefinitions.push(this.maxBooster(pokemon, smogonField))
      }
    })

    return speedDefinitions
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
    const status = options.paralyzedActive ? "Paralysis" : pokemon.status
    const item = options.choiceScarfActive ? "Choice Scarf" : pokemon.item

    return pokemon.clone({ boosts, status, item })
  }

  minSpeed(pokemon: Pokemon, smogonField: SmogonField): SpeedDefinition {
    const MAX_BASE_SPEED_FOR_TR = 52
    const isTrickRoomPokemon = new PokemonSmogon(Generations.get(9), pokemon.name).species.baseStats.spe <= MAX_BASE_SPEED_FOR_TR

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
    const clonedPokemon = pokemon.clone({ nature: "Timid", evs: { spe: 252 } })

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
