import { Ability } from "@multicalc/model/ability"
import { MoveSet } from "@multicalc/model/moveset"
import { Status } from "@multicalc/model/status"
import { Stats } from "@multicalc/types"
import { StatIDExceptHP } from "@data/types"

export type Jumps = [number, number, number, number | null]

export type PokemonParameters = {
  id?: string
  name?: string
  ability?: Ability
  nature?: string
  item?: string
  teraType?: string
  teraTypeActive?: boolean
  evs?: Partial<Stats>
  moveSet?: MoveSet
  boosts?: Partial<Stats>
  bonusBoosts?: Partial<Stats>
  status?: Status
  ivs?: Partial<Stats>
  hpPercentage?: number
  commanderActive?: boolean
  isAttacker?: boolean
  higherStat?: StatIDExceptHP
}
