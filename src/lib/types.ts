import { Ability } from "@lib/model/ability"
import { MoveSet } from "@lib/model/moveset"
import { Status } from "@lib/model/status"

export type Stats = { hp: number; atk: number; def: number; spa: number; spd: number; spe: number }

export type MovePosition = 1 | 2 | 3 | 4

export type GameType = "Singles" | "Doubles"

export type Terrain = "Electric" | "Grassy" | "Psychic" | "Misty" | null

export type Weather = "Sand" | "Sun" | "Rain" | "Snow" | null

export type StatusDescription = "Healthy" | "Sleep" | "Poison" | "Burn" | "Freeze" | "Paralysis"

export type Regulation = "G" | "H"

export type Jumps = [number, number, number, number | null]

export type PokemonParameters = {
  id?: string
  ability?: Ability
  nature?: string
  item?: string
  teraType?: string
  teraTypeActive?: boolean
  evs?: Partial<Stats>
  moveSet?: MoveSet
  boosts?: Partial<Stats>
  status?: Status
  ivs?: Partial<Stats>
  hpPercentage?: number
  commanderActive?: boolean
}
