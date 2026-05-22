import { Pokemon } from "@lib/model/pokemon"
import { uuid } from "@lib/utils/uuid"

export class SpeedDefinition {
  id: string
  pokemon: Pokemon
  value: number
  description: string[]

  constructor(pokemon: Pokemon, speed: number, ...description: string[]) {
    this.id = uuid()
    this.pokemon = pokemon
    this.value = speed
    this.description = description
  }

  get pokemonName(): string {
    return this.pokemon.name
  }

  equals(speedDefinition: SpeedDefinition): boolean {
    if (speedDefinition.pokemonName != this.pokemonName) return false
    if (speedDefinition.value != this.value) return false
    if (this.differentDescription(speedDefinition.description, this.description)) return false

    return true
  }

  private differentDescription(description1: string[], description2: string[]): boolean {
    if (description1.length !== description2.length) return true
    return description1.some((value, index) => value !== description2[index])
  }
}
