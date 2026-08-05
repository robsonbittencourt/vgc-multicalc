import { mergeDeep } from "@calc/engine/data-util"
import { getMoveData } from "@data/move-data"
import { AbilityName, ItemName, MoveCategory, MoveData, MoveFlags, MoveTarget, PokemonName, StateMove, StatIDExceptHP, TypeName } from "@data/types"

type MoveOptions = Partial<StateMove> & {
  ability?: AbilityName
  item?: ItemName
  pokemonName?: PokemonName
  isParentalBondChild?: boolean
}

export class Move {
  name: string
  originalName: string
  readonly moveData: MoveData
  ability?: AbilityName
  item?: ItemName
  pokemonName?: PokemonName
  overrides?: Partial<MoveData>
  hits: number
  hitsTaken: number
  lastMoveFailed: boolean
  timesUsed: number
  timesUsedWithMetronome?: number
  bp: number
  type: TypeName
  category: MoveCategory
  flags: MoveFlags
  secondaries?: boolean
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
  isParentalBondChild: boolean

  constructor(name: string, options: MoveOptions = {}, resolvedMoveData?: MoveData) {
    const resolvedName = options.name || name
    this.originalName = resolvedName

    const data = resolvedMoveData || mergeDeep<MoveData>({ name: resolvedName }, getMoveData(resolvedName), options.overrides)

    this.moveData = data

    this.hits = resolveHits(data, options)
    this.hitsTaken = options.hitsTaken ?? 0
    this.lastMoveFailed = !!options.lastMoveFailed

    this.timesUsedWithMetronome = options.timesUsedWithMetronome

    this.name = data.name
    this.ability = options.ability
    this.item = options.item
    this.overrides = options.overrides
    this.pokemonName = options.pokemonName
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
    this.flags = { ...data.flags }
    this.priority = data.priority || 0
    this.ignoreDefensive = !!data.ignoreDefensive
    this.overrideDefensiveStat = data.overrideDefensiveStat
    this.breaksProtect = !!data.breaksProtect
    this.isParentalBondChild = !!options.isParentalBondChild
  }

  named(...names: string[]): boolean {
    const name = this.name

    for (const candidate of names) {
      if (candidate === name) return true
    }

    return false
  }

  hasType(...types: (TypeName | undefined)[]): boolean {
    const type = this.type

    for (const candidate of types) {
      if (candidate === type) return true
    }

    return false
  }

  clone(): Move {
    return new Move(
      this.originalName,
      {
        ability: this.ability,
        item: this.item,
        pokemonName: this.pokemonName,
        isCrit: this.isCrit,
        isStellarFirstUse: this.isStellarFirstUse,
        hits: this.hits,
        hitsTaken: this.hitsTaken,
        lastMoveFailed: this.lastMoveFailed,
        timesUsed: this.timesUsed,
        timesUsedWithMetronome: this.timesUsedWithMetronome,
        isParentalBondChild: this.isParentalBondChild,
        overrides: this.overrides
      },
      { ...this.moveData, basePower: this.bp }
    )
  }
}

function resolveHits(data: MoveData, options: MoveOptions): number {
  if (!data.multihit) return 1

  if (data.multiaccuracy && typeof data.multihit === "number") return options.hits || data.multihit

  if (typeof data.multihit === "number") return data.multihit

  if (options.hits) return options.hits

  return options.ability === "Skill Link" ? data.multihit[1] : data.multihit[0] + 1
}
