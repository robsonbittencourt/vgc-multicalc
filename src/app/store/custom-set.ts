import type { PokemonState } from "./calc-store"

export type CustomSet = {
  id: string
  setName: string
  basePokemonName: string
  createdAt: number
  state: PokemonState
}
