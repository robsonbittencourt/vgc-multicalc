import { mergeDeep } from "@lib/calc/engine/data-util"
import { getMove } from "@lib/calc/data/stores"
import { AbilityName, ItemName, MoveCategory, MoveData, MoveFlags, MoveName, MoveTarget, SpeciesName, StateMove, StatIDExceptHP, TypeName } from "@lib/calc/model/types"

type MoveOptions = Partial<StateMove> & {
  ability?: AbilityName
  item?: ItemName
  species?: SpeciesName
}

export class Move {
  name: MoveName
  originalName: string
  ability?: AbilityName
  item?: ItemName
  species?: SpeciesName
  overrides?: Partial<MoveData>
  hits: number
  timesUsed?: number
  timesUsedWithMetronome?: number
  bp: number
  type: TypeName
  category: MoveCategory
  flags: MoveFlags
  secondaries: unknown
  target: MoveTarget
  recoil?: [number, number]
  drain?: [number, number]
  hasCrashDamage: boolean
  mindBlownRecoil: boolean
  struggleRecoil: boolean
  isCrit: boolean
  isStellarFirstUse: boolean
  priority: number
  dropsStats?: number
  ignoreDefensive: boolean
  overrideDefensiveStat?: StatIDExceptHP
  breaksProtect: boolean

  constructor(name: string, options: MoveOptions = {}) {
    const resolvedName = options.name || name
    this.originalName = resolvedName

    const data = mergeDeep<MoveData>({ name: resolvedName }, getMove(resolvedName), options.overrides)

    this.hits = 1

    if (data.multihit) {
      if (data.multiaccuracy && typeof data.multihit === "number") {
        this.hits = options.hits || data.multihit
      } else if (typeof data.multihit === "number") {
        this.hits = data.multihit
      } else if (options.hits) {
        this.hits = options.hits
      } else {
        this.hits = options.ability === "Skill Link" ? data.multihit[1] : data.multihit[0] + 1
      }
    }

    this.timesUsedWithMetronome = options.timesUsedWithMetronome

    this.name = data.name
    this.ability = options.ability
    this.item = options.item
    this.overrides = options.overrides
    this.species = options.species
    this.bp = data.basePower

    this.type = data.name === "Struggle" ? "???" : data.type
    this.category = data.category || "Status"

    const stat = this.category === "Special" ? "spa" : "atk"
    const selfBoost = data.self?.boosts?.[stat]

    if (selfBoost && selfBoost < 0) {
      this.dropsStats = Math.abs(selfBoost)
    }

    this.timesUsed = options.timesUsed || 1
    this.secondaries = data.secondaries
    this.target = data.target || "any"
    this.recoil = data.recoil
    this.drain = data.drain
    this.hasCrashDamage = !!data.hasCrashDamage
    this.mindBlownRecoil = !!data.mindBlownRecoil
    this.struggleRecoil = !!data.struggleRecoil
    this.isCrit = !!options.isCrit || !!data.willCrit
    this.isStellarFirstUse = !!options.isStellarFirstUse
    this.flags = data.flags
    this.priority = data.priority || 0
    this.ignoreDefensive = !!data.ignoreDefensive
    this.overrideDefensiveStat = data.overrideDefensiveStat
    this.breaksProtect = !!data.breaksProtect
  }

  named(...names: string[]): boolean {
    return names.includes(this.name)
  }

  hasType(...types: (TypeName | undefined)[]): boolean {
    return types.includes(this.type)
  }

  clone(): Move {
    return new Move(this.originalName, {
      ability: this.ability,
      item: this.item,
      species: this.species,
      isCrit: this.isCrit,
      isStellarFirstUse: this.isStellarFirstUse,
      hits: this.hits,
      timesUsed: this.timesUsed,
      timesUsedWithMetronome: this.timesUsedWithMetronome,
      overrides: this.overrides
    })
  }
}
