export class SpeedDefinition {
  pokemonName: string
  value: number
  description: string

  constructor(pokemonName: string, speed: number, description: string) {
    this.pokemonName = pokemonName
    this.value = speed
    this.description = description
  }

  equals(speedDefinition: SpeedDefinition): boolean {
    if (speedDefinition.pokemonName != this.pokemonName) return false
    if (speedDefinition.value != this.value) return false
    if (speedDefinition.description != this.description) return false

    return true
  }

}