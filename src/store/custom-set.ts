import type { PokemonState } from "./calculator-store"

export type CustomSet = {
  id: string
  setName: string
  basePokemonName: string
  createdAt: number
  state: PokemonState
}
