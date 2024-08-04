export class SpeedDefinition {
  pokemonName: string
  value: number
  description: string

  constructor(pokemonName: string, speed: number, description: string) {
    this.pokemonName = pokemonName
    this.value = speed
    this.description = description
  }
}