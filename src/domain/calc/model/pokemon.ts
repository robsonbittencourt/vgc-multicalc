import { mergeDeep } from "@calc/engine/data-util"
import { getPokemonData } from "@data/pokemon-data"
import { getNatureData, NatureData } from "@data/nature-data"
import { AbilityName, Gender, ItemName, MoveName, NatureName, PokemonData, PokemonName, StatePokemon, StatID, StatIDExceptHP, StatsTable, StatusName, TypeName } from "@data/types"

const DEFAULT_LEVEL = 50

const MAX_IVS: StatsTable = Object.freeze({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })

const EMPTY_STATS: StatsTable = Object.freeze({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })

type PokemonOptions = Partial<StatePokemon> & {
  curHP?: number
  evs?: Partial<StatsTable>
  boosts?: Partial<StatsTable>
}

export class Pokemon {
  name: PokemonName
  pokemonData: PokemonData
  types: [TypeName] | [TypeName, TypeName]
  weightKg: number
  level: number
  gender?: Gender
  ability?: AbilityName
  abilityOn: boolean
  alliesFainted?: number
  boostedStat?: StatIDExceptHP | "auto"
  item?: ItemName
  disabledItem?: ItemName
  teraType?: TypeName
  nature: NatureName
  readonly ivs = MAX_IVS
  evs: StatsTable
  boosts: StatsTable
  rawStats: StatsTable
  stats: StatsTable
  originalCurrentHp: number
  status: StatusName | ""
  toxicCounter: number
  moves: MoveName[]

  constructor(name: string, options: PokemonOptions = {}, resolvedPokemonData?: PokemonData) {
    this.pokemonData = resolvedPokemonData || mergeDeep<PokemonData>({}, getPokemonData(name), options.overrides)
    this.name = (options.name || name) as PokemonName
    this.types = this.pokemonData.types
    this.weightKg = this.pokemonData.weightKg
    this.level = DEFAULT_LEVEL
    this.gender = options.gender || this.pokemonData.gender || "M"
    this.ability = options.ability || this.pokemonData.abilities?.[0]
    this.abilityOn = !!options.abilityOn
    this.alliesFainted = options.alliesFainted
    this.boostedStat = options.boostedStat
    this.teraType = options.teraType
    this.item = options.item
    this.nature = options.nature || "Serious"
    this.evs = Pokemon.withDefault(options.evs, 0)
    this.boosts = Pokemon.withDefault(options.boosts, 0)

    this.rawStats = EMPTY_STATS
    this.stats = EMPTY_STATS

    this.recalculateStats()

    const curHP = options.curHP || options.originalCurrentHp
    this.originalCurrentHp = curHP && curHP <= this.rawStats.hp ? curHP : this.rawStats.hp
    this.status = options.status || ""
    this.toxicCounter = options.toxicCounter || 0
    this.moves = options.moves || []
  }

  recalculateStats(): void {
    const nature = getNatureData(this.nature)

    const stats: StatsTable = {
      hp: this.calcStat("hp", nature),
      atk: this.calcStat("atk", nature),
      def: this.calcStat("def", nature),
      spa: this.calcStat("spa", nature),
      spd: this.calcStat("spd", nature),
      spe: this.calcStat("spe", nature)
    }

    this.rawStats = stats
    this.stats = { hp: stats.hp, atk: stats.atk, def: stats.def, spa: stats.spa, spd: stats.spd, spe: stats.spe }
  }

  maxHp(): number {
    return this.rawStats.hp
  }

  currentHp(): number {
    return this.originalCurrentHp
  }

  hasAbility(...abilities: string[]): boolean {
    const ability = this.ability

    if (!ability) return false

    for (const candidate of abilities) {
      if (candidate === ability) return true
    }

    return false
  }

  hasItem(...items: string[]): boolean {
    const item = this.item

    if (!item) return false

    for (const candidate of items) {
      if (candidate === item) return true
    }

    return false
  }

  hasStatus(...statuses: StatusName[]): boolean {
    const status = this.status

    if (!status) return false

    for (const candidate of statuses) {
      if (candidate === status) return true
    }

    return false
  }

  hasType(...types: TypeName[]): boolean {
    const teraType = this.teraType
    const effectiveTera = teraType && teraType !== "Stellar" ? teraType : undefined

    for (const type of types) {
      const matches = effectiveTera ? effectiveTera === type : this.hasRawType(type)

      if (matches) {
        return true
      }
    }

    return false
  }

  hasOriginalType(...types: TypeName[]): boolean {
    for (const type of types) {
      if (this.hasRawType(type)) {
        return true
      }
    }

    return false
  }

  private hasRawType(type: TypeName): boolean {
    const types = this.types

    return types[0] === type || types[1] === type
  }

  named(...names: string[]): boolean {
    const name = this.name

    for (const candidate of names) {
      if (candidate === name) return true
    }

    return false
  }

  clone(): Pokemon {
    return new Pokemon(
      this.name,
      {
        ability: this.ability,
        abilityOn: this.abilityOn,
        alliesFainted: this.alliesFainted,
        boostedStat: this.boostedStat,
        item: this.item,
        gender: this.gender,
        nature: this.nature,
        evs: this.evs,
        boosts: this.boosts,
        originalCurrentHp: this.originalCurrentHp,
        status: this.status,
        teraType: this.teraType,
        toxicCounter: this.toxicCounter,
        moves: this.moves
      },
      this.pokemonData
    )
  }

  private calcStat(stat: StatID, nature: NatureData | undefined): number {
    const base = this.pokemonData.baseStats[stat]
    const iv = this.ivs[stat]
    const ev = this.evs[stat]

    if (stat === "hp") {
      return base === 1 ? base : Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * this.level) / 100) + this.level + 10
    }

    const multiplier = nature?.plus === stat && nature?.minus === stat ? 1 : nature?.plus === stat ? 1.1 : nature?.minus === stat ? 0.9 : 1

    return Math.floor((Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * this.level) / 100) + 5) * multiplier)
  }

  private static withDefault(current: Partial<StatsTable> | undefined, value: number): StatsTable {
    if (!current) {
      return { hp: value, atk: value, def: value, spa: value, spd: value, spe: value }
    }

    return {
      hp: current.hp ?? value,
      atk: current.atk ?? value,
      def: current.def ?? value,
      spa: current.spa ?? value,
      spd: current.spd ?? value,
      spe: current.spe ?? value
    }
  }
}
