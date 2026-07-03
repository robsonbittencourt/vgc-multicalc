import { mergeDeep } from "@lib/calc/engine/data-util"
import { getPokemonData } from "@data/pokemon-data"
import { getNatureData } from "@data/nature-data"
import { AbilityName, Gender, ItemName, MoveName, NatureName, PokemonData, PokemonName, StatePokemon, StatID, StatIDExceptHP, StatsTable, StatusName, TypeName } from "@vgc-types/calc-types"

const STATS: StatID[] = ["hp", "atk", "def", "spa", "spd", "spe"]

const DEFAULT_LEVEL = 50

const MAX_IVS: StatsTable = Object.freeze({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 })

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
  abilityOn?: boolean
  alliesFainted?: number
  boostedStat?: StatIDExceptHP | "auto"
  item?: ItemName
  disabledItem?: ItemName
  teraType?: TypeName
  nature: NatureName
  ivs = MAX_IVS
  evs: StatsTable
  boosts: StatsTable
  rawStats: StatsTable
  stats: StatsTable
  originalCurrrentHp: number
  status: StatusName | ""
  toxicCounter: number
  moves: MoveName[]

  constructor(name: string, options: PokemonOptions = {}) {
    this.pokemonData = mergeDeep<PokemonData>({}, getPokemonData(name), options.overrides)
    this.name = (options.name || name) as PokemonName
    this.types = this.pokemonData.types
    this.weightKg = this.pokemonData.weightKg
    this.level = DEFAULT_LEVEL
    this.gender = options.gender || this.pokemonData.gender || "M"
    this.ability = options.ability || this.pokemonData.abilities?.[0] || undefined
    this.abilityOn = !!options.abilityOn
    this.alliesFainted = options.alliesFainted
    this.boostedStat = options.boostedStat
    this.teraType = options.teraType
    this.item = options.item
    this.nature = options.nature || "Serious"
    this.evs = Pokemon.withDefault(options.evs, 0)
    this.boosts = Pokemon.withDefault(options.boosts, 0)

    this.rawStats = {} as StatsTable
    this.stats = {} as StatsTable

    this.recalculateStats()

    const curHP = options.curHP || options.originalCurrrentHp
    this.originalCurrrentHp = curHP && curHP <= this.rawStats.hp ? curHP : this.rawStats.hp
    this.status = options.status || ""
    this.toxicCounter = options.toxicCounter || 0
    this.moves = options.moves || []
  }

  recalculateStats(): void {
    for (const stat of STATS) {
      const value = this.calcStat(stat)
      this.rawStats[stat] = value
      this.stats[stat] = value
    }
  }

  maxHp(): number {
    return this.rawStats.hp
  }

  currrentHp(): number {
    return this.originalCurrrentHp
  }

  hasAbility(...abilities: string[]): boolean {
    return !!(this.ability && abilities.includes(this.ability))
  }

  hasItem(...items: string[]): boolean {
    return !!(this.item && items.includes(this.item))
  }

  hasStatus(...statuses: StatusName[]): boolean {
    return !!(this.status && statuses.includes(this.status))
  }

  hasType(...types: TypeName[]): boolean {
    for (const type of types) {
      const matches = this.teraType && this.teraType !== "Stellar" ? this.teraType === type : this.types.includes(type)

      if (matches) {
        return true
      }
    }

    return false
  }

  hasOriginalType(...types: TypeName[]): boolean {
    for (const type of types) {
      if (this.types.includes(type)) {
        return true
      }
    }

    return false
  }

  named(...names: string[]): boolean {
    return names.includes(this.name)
  }

  clone(): Pokemon {
    return new Pokemon(this.name, {
      ability: this.ability,
      abilityOn: this.abilityOn,
      alliesFainted: this.alliesFainted,
      boostedStat: this.boostedStat,
      item: this.item,
      gender: this.gender,
      nature: this.nature,
      evs: mergeDeep({}, this.evs),
      boosts: mergeDeep({}, this.boosts),
      originalCurrrentHp: this.originalCurrrentHp,
      status: this.status,
      teraType: this.teraType,
      toxicCounter: this.toxicCounter,
      moves: this.moves.slice(),
      overrides: this.pokemonData
    })
  }

  private calcStat(stat: StatID): number {
    const base = this.pokemonData.baseStats[stat]
    const iv = this.ivs[stat]
    const ev = this.evs[stat]

    if (stat === "hp") {
      return base === 1 ? base : Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * this.level) / 100) + this.level + 10
    }

    const nature = getNatureData(this.nature)
    const multiplier = nature?.plus === stat && nature?.minus === stat ? 1 : nature?.plus === stat ? 1.1 : nature?.minus === stat ? 0.9 : 1

    return Math.floor((Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * this.level) / 100) + 5) * multiplier)
  }

  private static withDefault(current: Partial<StatsTable> | undefined, value: number): StatsTable {
    return { hp: value, atk: value, def: value, spa: value, spd: value, spe: value, ...current }
  }
}
