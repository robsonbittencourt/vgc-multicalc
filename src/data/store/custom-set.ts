import type { PokemonState } from "@data/store/calculator-store"

export type CustomSet = {
  id: string
  setName: string
  basePokemonName: string
  createdAt: number
  state: PokemonState
}
