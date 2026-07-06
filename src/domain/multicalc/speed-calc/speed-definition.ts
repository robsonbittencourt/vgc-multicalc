import { Pokemon } from "@multicalc/model/pokemon"
import { uuid } from "@multicalc/utils/uuid"

export class SpeedDefinition {
  id: string
  pokemon?: Pokemon
  value: number
  description: string[]

  constructor(pokemon: Pokemon | undefined, speed: number, ...description: string[]) {
    this.id = uuid()
    this.pokemon = pokemon
    this.value = speed
    this.description = description
  }

  static padding(): SpeedDefinition {
    return new SpeedDefinition(undefined, 0, "")
  }

  get isPadding(): boolean {
    return this.pokemon == undefined
  }

  get pokemonName(): string {
    return this.pokemon?.name ?? ""
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
