import { Pokemon } from "@multicalc/model/pokemon"

export class PokemonIds {
  private ids = new WeakMap<Pokemon, number>()
  private nextId = 1

  idOf(pokemon: Pokemon): number {
    let id = this.ids.get(pokemon)

    if (id === undefined) {
      id = this.nextId++
      this.ids.set(pokemon, id)
    }

    return id
  }

  clear(): void {
    this.ids = new WeakMap<Pokemon, number>()
    this.nextId = 1
  }
}
