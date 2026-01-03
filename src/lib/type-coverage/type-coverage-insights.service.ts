import { Injectable, inject } from "@angular/core"
import { TypeCoverageService, OffensiveCoverageData, DefensiveCoverageData, OffensiveCoverageAgainstTeamData, DefensiveCoverageByPokemonData } from "./type-coverage.service"
import { TypeEffectivenessService } from "./type-effectiveness.service"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { PokemonType, PokemonTypes } from "@lib/types"

export interface PokemonInsight {
  pokemon: Pokemon
  value: number
}

export interface TypeInsight {
  type: PokemonType
  count: number
}

@Injectable({
  providedIn: "root"
})
export class TypeCoverageInsightsService {
  private typeCoverageService = inject(TypeCoverageService)
  private typeEffectivenessService = inject(TypeEffectivenessService)

  getTopOffensiveSuperEffective(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateOffensiveSuperEffectiveStats(team, secondTeam)

    const sorted = pokemonStats.sort((a, b) => {
      if (b.count4x !== a.count4x) {
        return b.count4x - a.count4x
      }

      return b.count - a.count
    })

    return sorted.slice(0, 4).map(item => ({ pokemon: item.pokemon, value: item.count }))
  }

  getTopOffensiveNotVeryEffective(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateOffensiveNotVeryEffectiveStats(team, secondTeam)

    return Array.from(pokemonStats.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map(item => ({ pokemon: item.pokemon, value: item.count }))
  }

  getTopDefensiveResist(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateDefensiveEffectivenessStats(team, secondTeam, effectiveness => effectiveness === 0.25 || effectiveness === 0.5)

    return Array.from(pokemonStats.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map(item => ({ pokemon: item.pokemon, value: item.count }))
  }

  getTopDefensiveImmune(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateDefensiveEffectivenessStats(team, secondTeam, effectiveness => effectiveness === 0)

    return Array.from(pokemonStats.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map(item => ({ pokemon: item.pokemon, value: item.count }))
  }

  getTopDefensiveWeak(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateDefensiveWeakStats(team, secondTeam)

    const sorted = pokemonStats.sort((a, b) => {
      if (b.count4x !== a.count4x) {
        return b.count4x - a.count4x
      }

      return b.count - a.count
    })

    return sorted.map(item => ({ pokemon: item.pokemon, value: item.count }))
  }

  getTopDefensivePositive(team: Team, secondTeam: Team | null): PokemonInsight[] {
    const pokemonStats = this.calculateDefensivePositiveStats(team, secondTeam)

    const sorted = pokemonStats.sort((a, b) => b.total - a.total)

    return sorted.slice(0, 4).map(item => ({ pokemon: item.pokemon, value: item.total }))
  }

  getMostWeaknessType(team: Team): TypeInsight | null {
    const typeStats = this.calculateTypeStatsForWeakness(team)

    const sorted = Array.from(typeStats.entries()).sort((a, b) => b[1] - a[1])
    const topType = sorted[0]

    if (topType && topType[1] >= 3) {
      return { type: topType[0], count: topType[1] }
    }

    return null
  }

  getMostResistanceType(team: Team): TypeInsight | null {
    const typeStats = this.calculateTypeStatsForResistance(team)

    const sorted = Array.from(typeStats.entries()).sort((a, b) => b[1] - a[1])
    const topType = sorted[0]

    if (topType && topType[1] >= 3) {
      return { type: topType[0], count: topType[1] }
    }

    return null
  }

  getMostSuperEffectiveType(team: Team): TypeInsight | null {
    const typeStats = this.calculateOffensiveTypeStats(team, row => {
      return (row as OffensiveCoverageData).superEffective
    })

    return this.getTopTypeFromStats(typeStats)
  }

  getMostNotVeryEffectiveType(team: Team): TypeInsight | null {
    const typeStats = this.calculateOffensiveTypeStats(team, row => {
      return (row as OffensiveCoverageData).notVeryEffective
    })

    return this.getTopTypeFromStats(typeStats)
  }

  getPokemonResistCount(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    return this.countDefensiveEffectiveness(pokemon, team, secondTeam, effectiveness => effectiveness === 0.25 || effectiveness === 0.5)
  }

  getPokemonImmuneCount(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    return this.countDefensiveEffectiveness(pokemon, team, secondTeam, effectiveness => effectiveness === 0)
  }

  getPokemonWeakCount(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    const isAgainstTeam = secondTeam !== null

    if (isAgainstTeam) {
      return this.countDefensiveEffectiveness(pokemon, team, secondTeam, effectiveness => effectiveness === 2 || effectiveness === 4)
    }

    return this.countWeaknessByType(pokemon, effectiveness => effectiveness === 2 || effectiveness === 4)
  }

  getPokemonWeakCount2x(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    const isAgainstTeam = secondTeam !== null

    if (isAgainstTeam) {
      return this.countDefensiveEffectiveness(pokemon, team, secondTeam, effectiveness => effectiveness === 2)
    }

    return this.countWeaknessByType(pokemon, effectiveness => effectiveness === 2)
  }

  getPokemonWeakCount4x(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    const isAgainstTeam = secondTeam !== null

    if (isAgainstTeam) {
      return this.countDefensiveEffectiveness(pokemon, team, secondTeam, effectiveness => effectiveness === 4)
    }

    return this.countWeaknessByType(pokemon, effectiveness => effectiveness === 4)
  }

  getPokemonWeaknessesCoveredByTera(pokemon: Pokemon): number {
    if (!pokemon.teraType) return 0

    const type1 = pokemon.type1 as PokemonType
    const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined
    const teraType = pokemon.teraType as PokemonType
    let coveredCount = 0

    PokemonTypes.forEach(moveType => {
      const originalEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
      if (originalEffectiveness === 2 || originalEffectiveness === 4) {
        const teraEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, teraType, undefined)
        if (teraEffectiveness < 2) {
          coveredCount++
        }
      }
    })

    return coveredCount
  }

  getPokemonSuperEffectiveCount2x(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    return this.countOffensiveEffectiveness(pokemon, team, secondTeam, (effectiveness, coverageType, isAgainstTeam) => {
      if (isAgainstTeam) {
        return effectiveness === 2
      }
      return coverageType === "super-effective" && effectiveness === 2
    })
  }

  getPokemonSuperEffectiveCount4x(pokemon: Pokemon, team: Team, secondTeam: Team | null): number {
    return this.countOffensiveEffectiveness(pokemon, team, secondTeam, (effectiveness, coverageType, isAgainstTeam) => {
      if (isAgainstTeam) {
        return effectiveness === 4
      }
      return coverageType === "super-effective" && effectiveness === 4
    })
  }

  private countSuperEffective(pokemonData: { effectiveness: number; coverageType?: string }, isAgainstTeam: boolean): { count: number; count4x: number } {
    if (isAgainstTeam) {
      if (pokemonData.effectiveness === 4) {
        return { count: 1, count4x: 1 }
      }
      if (pokemonData.effectiveness === 2) {
        return { count: 1, count4x: 0 }
      }
    } else {
      if (pokemonData.coverageType === "super-effective") {
        if (pokemonData.effectiveness === 2) {
          return { count: 1, count4x: 0 }
        }
      }
    }

    return { count: 0, count4x: 0 }
  }

  private calculateOffensiveSuperEffectiveStats(team: Team, secondTeam: Team | null): { pokemon: Pokemon; count: number; count4x: number }[] {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)

    if (validTeamMembers.length === 0) return []

    const isAgainstTeam = secondTeam !== null
    const offensiveCoverageData = this.getOffensiveCoverageData(team, secondTeam)

    if (offensiveCoverageData.length === 0) return []

    const pokemonStats: { pokemon: Pokemon; count: number; count4x: number }[] = []

    if (isAgainstTeam) {
      const againstTeamData = offensiveCoverageData as OffensiveCoverageAgainstTeamData[]
      const pokemonDataMap = new Map<string, Map<string, { effectiveness: number; coverageType?: string }>>()

      againstTeamData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, new Map())
          }
          pokemonDataMap.get(pd.pokemon.id)!.set(row.targetPokemon.id, pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        let superEffectiveCount = 0
        let superEffectiveCount4x = 0

        const pokemonDataForPokemon = pokemonDataMap.get(pokemon.id)
        if (pokemonDataForPokemon) {
          pokemonDataForPokemon.forEach(pokemonData => {
            const result = this.countSuperEffective(pokemonData, true)
            superEffectiveCount += result.count
            superEffectiveCount4x += result.count4x
          })
        }

        if (superEffectiveCount > 0) {
          pokemonStats.push({ pokemon, count: superEffectiveCount, count4x: superEffectiveCount4x })
        }
      })
    } else {
      const typeData = offensiveCoverageData as OffensiveCoverageData[]
      const pokemonDataMap = new Map<string, Map<string, { effectiveness: number; coverageType?: string }>>()

      typeData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, new Map())
          }
          pokemonDataMap.get(pd.pokemon.id)!.set(row.pokemonType, pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        let superEffectiveCount = 0
        let superEffectiveCount4x = 0

        const pokemonDataForPokemon = pokemonDataMap.get(pokemon.id)
        if (pokemonDataForPokemon) {
          pokemonDataForPokemon.forEach(pokemonData => {
            const result = this.countSuperEffective(pokemonData, false)
            superEffectiveCount += result.count
            superEffectiveCount4x += result.count4x
          })
        }

        if (superEffectiveCount > 0) {
          pokemonStats.push({ pokemon, count: superEffectiveCount, count4x: superEffectiveCount4x })
        }
      })
    }

    return pokemonStats
  }

  private calculateOffensiveNotVeryEffectiveStats(team: Team, secondTeam: Team | null): Map<string, { pokemon: Pokemon; count: number }> {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)

    if (validTeamMembers.length === 0) return new Map()

    const isAgainstTeam = secondTeam !== null
    const offensiveCoverageData = this.getOffensiveCoverageData(team, secondTeam)

    if (offensiveCoverageData.length === 0) return new Map()

    const pokemonStats = new Map<string, { pokemon: Pokemon; count: number }>()

    if (isAgainstTeam) {
      const againstTeamData = offensiveCoverageData as OffensiveCoverageAgainstTeamData[]
      const pokemonDataMap = new Map<string, { effectiveness: number; coverageType?: string }[]>()

      againstTeamData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const pokemonDataList = pokemonDataMap.get(pokemon.id)!
        const notVeryEffectiveCount = pokemonDataList.filter(pd => pd.effectiveness === 0.25 || pd.effectiveness === 0.5 || pd.effectiveness === 0).length

        if (notVeryEffectiveCount > 0) {
          pokemonStats.set(pokemon.id, { pokemon, count: notVeryEffectiveCount })
        }
      })
    } else {
      const typeData = offensiveCoverageData as OffensiveCoverageData[]
      const pokemonDataMap = new Map<string, { effectiveness: number; coverageType?: string }[]>()

      typeData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const pokemonDataList = pokemonDataMap.get(pokemon.id)!
        const notVeryEffectiveCount = pokemonDataList.filter(pd => pd.coverageType === "not-very-effective").length

        if (notVeryEffectiveCount > 0) {
          pokemonStats.set(pokemon.id, { pokemon, count: notVeryEffectiveCount })
        }
      })
    }

    return pokemonStats
  }

  private calculateDefensiveEffectivenessStats(team: Team, secondTeam: Team | null, predicate: (effectiveness: number) => boolean): Map<string, { pokemon: Pokemon; count: number }> {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)

    if (validTeamMembers.length === 0) return new Map()

    const isAgainstTeam = secondTeam !== null
    const defensiveCoverageData = this.getDefensiveCoverageData(team, secondTeam)

    if (defensiveCoverageData.length === 0) return new Map()

    const pokemonStats = new Map<string, { pokemon: Pokemon; count: number }>()

    if (isAgainstTeam) {
      const againstTeamData = defensiveCoverageData as DefensiveCoverageByPokemonData[]
      const pokemonDataMap = new Map<string, { effectiveness: number }[]>()

      againstTeamData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const pokemonDataList = pokemonDataMap.get(pokemon.id)!
        const count = pokemonDataList.filter(pd => predicate(pd.effectiveness)).length

        if (count > 0) {
          pokemonStats.set(pokemon.id, { pokemon, count })
        }
      })
    } else {
      const typeData = defensiveCoverageData as DefensiveCoverageData[]
      const pokemonDataMap = new Map<string, { effectiveness: number }[]>()

      typeData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const pokemonDataList = pokemonDataMap.get(pokemon.id)!
        const count = pokemonDataList.filter(pd => predicate(pd.effectiveness)).length

        if (count > 0) {
          pokemonStats.set(pokemon.id, { pokemon, count })
        }
      })
    }

    return pokemonStats
  }

  private countWeakness(effectiveness: number): { count: number; count4x: number } {
    if (effectiveness === 4) {
      return { count: 1, count4x: 1 }
    }

    if (effectiveness === 2) {
      return { count: 1, count4x: 0 }
    }

    return { count: 0, count4x: 0 }
  }

  private calculateDefensiveWeakStats(team: Team, secondTeam: Team | null): { pokemon: Pokemon; count: number; count4x: number }[] {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    if (validTeamMembers.length === 0) return []

    const isAgainstTeam = secondTeam !== null
    const pokemonStats: { pokemon: Pokemon; count: number; count4x: number }[] = []

    if (isAgainstTeam) {
      const defensiveCoverageData = this.getDefensiveCoverageData(team, secondTeam) as DefensiveCoverageByPokemonData[]

      if (defensiveCoverageData.length === 0) return []

      const pokemonDataMap = new Map<string, { effectiveness: number }[]>()

      defensiveCoverageData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const pokemonDataList = pokemonDataMap.get(pokemon.id)!
        let weakCount = 0
        let weakCount4x = 0

        pokemonDataList.forEach(pd => {
          const result = this.countWeakness(pd.effectiveness)
          weakCount += result.count
          weakCount4x += result.count4x
        })

        if (weakCount > 0) {
          pokemonStats.push({ pokemon, count: weakCount, count4x: weakCount4x })
        }
      })
    } else {
      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

        let weakCount = 0
        let weakCount4x = 0

        PokemonTypes.forEach(moveType => {
          const originalEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
          const result = this.countWeakness(originalEffectiveness)
          weakCount += result.count
          weakCount4x += result.count4x
        })

        if (weakCount > 0) {
          pokemonStats.push({ pokemon, count: weakCount, count4x: weakCount4x })
        }
      })
    }

    return pokemonStats
  }

  private calculateDefensivePositiveStats(team: Team, secondTeam: Team | null): { pokemon: Pokemon; total: number }[] {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    if (validTeamMembers.length === 0) return []

    const isAgainstTeam = secondTeam !== null
    const pokemonStats: { pokemon: Pokemon; total: number }[] = []

    if (isAgainstTeam) {
      const defensiveCoverageData = this.getDefensiveCoverageData(team, secondTeam) as DefensiveCoverageByPokemonData[]
      if (defensiveCoverageData.length === 0) return []

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const resistCount = this.getPokemonResistCount(pokemon, team, secondTeam)
        const immuneCount = this.getPokemonImmuneCount(pokemon, team, secondTeam)
        const total = resistCount + immuneCount

        if (total > 0) {
          pokemonStats.push({ pokemon, total })
        }
      })
    } else {
      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

        let resistCount = 0
        let immuneCount = 0

        PokemonTypes.forEach(moveType => {
          const originalEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
          if (originalEffectiveness === 0) {
            immuneCount++
          } else if (originalEffectiveness === 0.25 || originalEffectiveness === 0.5) {
            resistCount++
          }
        })

        const total = resistCount + immuneCount
        if (total > 0) {
          pokemonStats.push({ pokemon, total })
        }
      })
    }

    return pokemonStats
  }

  private calculateTypeStatsForWeakness(team: Team): Map<PokemonType, number> {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    if (validTeamMembers.length === 0) return new Map()

    const typeStats = new Map<PokemonType, number>()

    PokemonTypes.forEach(moveType => {
      let weakCount = 0

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined
        const effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
        if (effectiveness === 2 || effectiveness === 4) {
          weakCount++
        }
      })

      if (weakCount > 0) {
        typeStats.set(moveType, weakCount)
      }
    })

    return typeStats
  }

  private calculateTypeStatsForResistance(team: Team): Map<PokemonType, number> {
    const validTeamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    if (validTeamMembers.length === 0) return new Map()

    const typeStats = new Map<PokemonType, number>()

    PokemonTypes.forEach(moveType => {
      let resistCount = 0

      validTeamMembers.forEach(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined
        const effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
        if (effectiveness === 0.25 || effectiveness === 0.5 || effectiveness === 0) {
          resistCount++
        }
      })

      if (resistCount > 0) {
        typeStats.set(moveType, resistCount)
      }
    })

    return typeStats
  }

  private calculateOffensiveTypeStats(team: Team, getValue: (row: OffensiveCoverageData | OffensiveCoverageAgainstTeamData) => number): Map<PokemonType, number> {
    const offensiveCoverageData = this.getOffensiveCoverageData(team, null)

    if (offensiveCoverageData.length === 0) return new Map()

    const typeStats = new Map<PokemonType, number>()

    const typeData = offensiveCoverageData as OffensiveCoverageData[]
    typeData.forEach(row => {
      const value = getValue(row)
      if (value > 0) {
        typeStats.set(row.pokemonType, value)
      }
    })

    return typeStats
  }

  private getTopTypeFromStats(typeStats: Map<PokemonType, number>): TypeInsight | null {
    if (typeStats.size === 0) return null

    const sorted = Array.from(typeStats.entries()).sort((a, b) => b[1] - a[1])
    const topType = sorted[0]

    if (topType[1] >= 3) {
      return { type: topType[0], count: topType[1] }
    }

    return null
  }

  private countDefensiveEffectiveness(pokemon: Pokemon, team: Team, secondTeam: Team | null, predicate: (effectiveness: number) => boolean): number {
    const defensiveCoverageData = this.getDefensiveCoverageData(team, secondTeam)

    if (defensiveCoverageData.length === 0) return 0

    const isAgainstTeam = secondTeam !== null
    const pokemonDataMap = new Map<string, { effectiveness: number }[]>()

    if (isAgainstTeam) {
      const againstTeamData = defensiveCoverageData as DefensiveCoverageByPokemonData[]
      againstTeamData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })
    } else {
      const typeData = defensiveCoverageData as DefensiveCoverageData[]
      typeData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })
    }

    const pokemonDataList = pokemonDataMap.get(pokemon.id)!
    return pokemonDataList.filter(pd => predicate(pd.effectiveness)).length
  }

  private countWeaknessByType(pokemon: Pokemon, predicate: (effectiveness: number) => boolean): number {
    const type1 = pokemon.type1 as PokemonType
    const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

    let count = 0
    PokemonTypes.forEach(moveType => {
      const effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
      if (predicate(effectiveness)) {
        count++
      }
    })

    return count
  }

  private countOffensiveEffectiveness(pokemon: Pokemon, team: Team, secondTeam: Team | null, predicate: (effectiveness: number, coverageType: string | undefined, isAgainstTeam: boolean) => boolean): number {
    const offensiveCoverageData = this.getOffensiveCoverageData(team, secondTeam)
    if (offensiveCoverageData.length === 0) return 0

    const isAgainstTeam = secondTeam !== null
    const pokemonDataMap = new Map<string, { effectiveness: number; coverageType?: string }[]>()

    if (isAgainstTeam) {
      const againstTeamData = offensiveCoverageData as OffensiveCoverageAgainstTeamData[]
      againstTeamData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })
    } else {
      const typeData = offensiveCoverageData as OffensiveCoverageData[]
      typeData.forEach(row => {
        row.pokemonData.forEach(pd => {
          if (!pokemonDataMap.has(pd.pokemon.id)) {
            pokemonDataMap.set(pd.pokemon.id, [])
          }
          pokemonDataMap.get(pd.pokemon.id)!.push(pd)
        })
      })
    }

    const pokemonDataList = pokemonDataMap.get(pokemon.id)!
    return pokemonDataList.filter(pd => predicate(pd.effectiveness, pd.coverageType, isAgainstTeam)).length
  }

  private getOffensiveCoverageData(team: Team, secondTeam: Team | null): OffensiveCoverageData[] | OffensiveCoverageAgainstTeamData[] {
    if (secondTeam) {
      return this.typeCoverageService.getOffensiveCoverageAgainstTeam(team, secondTeam, false, false)
    }

    return this.typeCoverageService.getOffensiveCoverage(team)
  }

  private getDefensiveCoverageData(team: Team, secondTeam: Team | null): DefensiveCoverageData[] | DefensiveCoverageByPokemonData[] {
    if (secondTeam) {
      return this.typeCoverageService.getDefensiveCoverageAgainstTeam(team, secondTeam, false, false)
    }

    return this.typeCoverageService.getDefensiveCoverage(team, false)
  }
}
