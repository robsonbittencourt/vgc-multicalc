import { Injectable, inject } from "@angular/core"
import { MOVE_DETAILS } from "@data/move-details"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { PokemonType, PokemonTypes } from "@lib/types"
import { TypeEffectiveness, TypeEffectivenessService } from "./type-effectiveness.service"

export interface DefensiveCoverageData {
  moveType: PokemonType
  pokemonData: {
    pokemon: Pokemon
    effectiveness: TypeEffectiveness
    formatted: string
  }[]
  totalWeak: number
  totalResist: number
}

export type CoverageType = "super-effective" | "not-very-effective" | "immune" | "none"

export interface OffensiveCoverageData {
  pokemonType: PokemonType
  pokemonData: {
    pokemon: Pokemon
    coverageType: CoverageType
    effectiveness: TypeEffectiveness
    formatted: string
  }[]
  superEffective: number
  notVeryEffective: number
}

export interface OffensiveCoverageAgainstTeamData {
  targetPokemon: Pokemon
  pokemonData: {
    pokemon: Pokemon
    coverageType: CoverageType
    effectiveness: TypeEffectiveness
    formatted: string
  }[]
  superEffective: number
  notVeryEffective: number
}

export interface DefensiveCoverageAgainstTeamData {
  moveType: PokemonType
  pokemonData: {
    pokemon: Pokemon
    effectiveness: TypeEffectiveness
    formatted: string
  }[]
  totalWeak: number
  totalResist: number
}

export interface DefensiveCoverageByPokemonData {
  targetPokemon: Pokemon
  pokemonData: {
    pokemon: Pokemon
    effectiveness: TypeEffectiveness
    formatted: string
  }[]
  totalWeak: number
  totalResist: number
}

@Injectable({
  providedIn: "root"
})
export class TypeCoverageService {
  private typeEffectivenessService = inject(TypeEffectivenessService)

  getDefensiveCoverage(team: Team, considerTeraType = false): DefensiveCoverageData[] {
    const teamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)

    if (teamMembers.length === 0) {
      return []
    }

    return PokemonTypes.map(moveType => {
      const pokemonData = teamMembers.map(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

        let finalEffectiveness: TypeEffectiveness

        if (considerTeraType && pokemon.teraType) {
          const teraType = pokemon.teraType as PokemonType
          finalEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, teraType, undefined)
        } else {
          finalEffectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
        }

        const formatted = this.typeEffectivenessService.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const totalWeak = pokemonData.filter(p => this.typeEffectivenessService.isWeakness(p.effectiveness)).length
      const totalResist = pokemonData.filter(p => this.typeEffectivenessService.isResistance(p.effectiveness) || this.typeEffectivenessService.isImmune(p.effectiveness)).length

      return {
        moveType,
        pokemonData,
        totalWeak,
        totalResist
      }
    })
  }

  getOffensiveCoverage(team: Team): OffensiveCoverageData[] {
    const teamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)

    if (teamMembers.length === 0) {
      return []
    }

    return PokemonTypes.map(targetType => {
      const pokemonData = teamMembers.map(member => {
        const pokemon = member.pokemon
        const moveTypes = this.getMoveTypes(pokemon)

        const effectivenessValues: TypeEffectiveness[] = []

        for (const moveType of moveTypes) {
          const type1 = targetType
          const type2 = undefined

          const effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
          effectivenessValues.push(effectiveness)
        }

        let finalEffectiveness: TypeEffectiveness = 1
        let coverageType: CoverageType = "none"

        if (effectivenessValues.length > 0) {
          finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)

          if (this.typeEffectivenessService.isWeakness(finalEffectiveness)) {
            coverageType = "super-effective"
          } else if (this.typeEffectivenessService.isResistance(finalEffectiveness) || this.typeEffectivenessService.isImmune(finalEffectiveness)) {
            if (this.typeEffectivenessService.isImmune(finalEffectiveness)) {
              coverageType = "immune"
            } else {
              coverageType = "not-very-effective"
            }
          } else {
            coverageType = "none"
          }
        }

        const formatted = this.typeEffectivenessService.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          coverageType,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const superEffective = pokemonData.filter(p => p.coverageType === "super-effective").length
      const notVeryEffective = pokemonData.filter(p => p.coverageType === "not-very-effective").length

      return {
        pokemonType: targetType,
        pokemonData,
        superEffective,
        notVeryEffective
      }
    })
  }

  getOffensiveCoverageAgainstTeam(team: Team, targetTeam: Team, considerTeraType = false, considerTeraBlast = false): OffensiveCoverageAgainstTeamData[] {
    const teamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    const targetMembers = targetTeam.teamMembers.filter(member => !member.pokemon.isDefault)

    if (teamMembers.length === 0 || targetMembers.length === 0) {
      return []
    }

    return targetMembers.map(targetMember => {
      const targetPokemon = targetMember.pokemon
      const type1 = targetPokemon.type1 as PokemonType
      const type2 = targetPokemon.type2 ? (targetPokemon.type2 as PokemonType) : undefined

      const pokemonData = teamMembers.map(member => {
        const pokemon = member.pokemon
        const moveTypes = this.getMoveTypes(pokemon, considerTeraBlast)

        const effectivenessValues: TypeEffectiveness[] = []

        for (const moveType of moveTypes) {
          let effectiveness: TypeEffectiveness

          if (considerTeraType && targetPokemon.teraType) {
            const teraType = targetPokemon.teraType as PokemonType
            effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, teraType, undefined)
          } else {
            effectiveness = this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
          }

          effectivenessValues.push(effectiveness)
        }

        let finalEffectiveness: TypeEffectiveness = 1
        let coverageType: CoverageType = "none"

        if (effectivenessValues.length > 0) {
          finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)

          if (this.typeEffectivenessService.isWeakness(finalEffectiveness)) {
            coverageType = "super-effective"
          } else if (this.typeEffectivenessService.isResistance(finalEffectiveness) || this.typeEffectivenessService.isImmune(finalEffectiveness)) {
            if (this.typeEffectivenessService.isImmune(finalEffectiveness)) {
              coverageType = "immune"
            } else {
              coverageType = "not-very-effective"
            }
          } else {
            coverageType = "none"
          }
        }

        const formatted = this.typeEffectivenessService.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          coverageType,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const superEffective = pokemonData.filter(p => p.coverageType === "super-effective").length
      const notVeryEffective = pokemonData.filter(p => p.coverageType === "not-very-effective").length

      return {
        targetPokemon,
        pokemonData,
        superEffective,
        notVeryEffective
      }
    })
  }

  getDefensiveCoverageAgainstTeam(team: Team, targetTeam: Team, considerTeraType = false, considerTeraBlast = false): DefensiveCoverageByPokemonData[] {
    const teamMembers = team.teamMembers.filter(member => !member.pokemon.isDefault)
    const targetMembers = targetTeam.teamMembers.filter(member => !member.pokemon.isDefault)

    if (teamMembers.length === 0 || targetMembers.length === 0) {
      return []
    }

    return targetMembers.map(targetMember => {
      const targetPokemon = targetMember.pokemon
      const movesWithBP = considerTeraBlast ? this.getMoveTypes(targetPokemon, considerTeraBlast) : this.getMovesWithBP(targetPokemon)

      const pokemonData = teamMembers.map(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

        const effectivenessValues: TypeEffectiveness[] = movesWithBP.map(moveType => {
          if (considerTeraType && pokemon.teraType) {
            const teraType = pokemon.teraType as PokemonType
            return this.typeEffectivenessService.getEffectiveness(moveType, teraType, undefined)
          }

          return this.typeEffectivenessService.getEffectiveness(moveType, type1, type2)
        })

        if (effectivenessValues.length === 0) {
          return {
            pokemon,
            effectiveness: 1 as TypeEffectiveness,
            formatted: ""
          }
        }

        const finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)
        const formatted = this.typeEffectivenessService.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const totalWeak = pokemonData.filter(p => this.typeEffectivenessService.isWeakness(p.effectiveness)).length
      const totalResist = pokemonData.filter(p => this.typeEffectivenessService.isResistance(p.effectiveness) || this.typeEffectivenessService.isImmune(p.effectiveness)).length

      return {
        targetPokemon,
        pokemonData,
        totalWeak,
        totalResist
      }
    })
  }

  private getEffectivenessByHierarchy(effectivenessValues: TypeEffectiveness[]): TypeEffectiveness {
    const hasSuperEffective = effectivenessValues.some(e => e >= 2)
    const hasNormal = effectivenessValues.some(e => e === 1)
    const hasNotVeryEffective = effectivenessValues.some(e => e > 0 && e < 1)
    const hasImmune = effectivenessValues.some(e => e === 0)

    if (hasSuperEffective) {
      const superEffectiveValues = effectivenessValues.filter(e => e >= 2)
      return Math.max(...superEffectiveValues) as TypeEffectiveness
    }

    if (hasNormal) {
      return 1
    }

    if (hasNotVeryEffective) {
      const notVeryEffectiveValues = effectivenessValues.filter(e => e > 0 && e < 1)
      return Math.min(...notVeryEffectiveValues) as TypeEffectiveness
    }

    if (hasImmune) {
      return 0
    }

    return 1
  }

  private getMovesWithBP(pokemon: Pokemon): PokemonType[] {
    return this.processMoveTypes(pokemon, false)
  }

  private getMoveTypes(pokemon: Pokemon, considerTeraBlast = false): PokemonType[] {
    const moveTypes = this.processMoveTypes(pokemon, considerTeraBlast)
    return Array.from(new Set(moveTypes))
  }

  private processMoveTypes(pokemon: Pokemon, considerTeraBlast: boolean): PokemonType[] {
    const moveTypes: PokemonType[] = []
    const moves = [pokemon.moveSet.move1, pokemon.moveSet.move2, pokemon.moveSet.move3, pokemon.moveSet.move4]

    for (const move of moves) {
      if (!move || !move.name) {
        continue
      }

      if (move.name === "Struggle") {
        continue
      }

      if (move.bp <= 0) {
        continue
      }

      if (move.name === "Tera Blast") {
        if (considerTeraBlast && pokemon.teraType) {
          moveTypes.push(pokemon.teraType as PokemonType)
          continue
        }
      }

      if (move.name === "Ivy Cudgel" && pokemon.name.startsWith("Ogerpon")) {
        const ivyCudgelType = this.getIvyCudgelType(pokemon.name)
        if (ivyCudgelType) {
          moveTypes.push(ivyCudgelType)
          continue
        }
      }

      const moveName = move.name.toLowerCase().replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "")
      const moveDetails = MOVE_DETAILS[moveName]

      if (moveDetails && moveDetails.type) {
        moveTypes.push(moveDetails.type)
      }
    }

    return moveTypes
  }

  hasTeraBlast(pokemon: Pokemon): boolean {
    const moves = this.getMovesArray(pokemon)
    return moves.some(move => move && move.name === "Tera Blast")
  }

  getPokemonTeraType(pokemon: Pokemon): string | null {
    return pokemon.teraType || null
  }

  getCellClass(effectiveness: TypeEffectiveness): string {
    if (effectiveness === 0) return "immune"
    if (effectiveness === 0.25 || effectiveness === 0.5) return "resistance"
    if (effectiveness === 2) return "weakness"
    if (effectiveness === 4) return "weakness-4x"

    return ""
  }

  getMovesArray(pokemon: Pokemon) {
    return [pokemon.moveSet.move1, pokemon.moveSet.move2, pokemon.moveSet.move3, pokemon.moveSet.move4]
  }

  private getIvyCudgelType(pokemonName: string): PokemonType | null {
    if (pokemonName === "Ogerpon") {
      return "Grass"
    }
    if (pokemonName === "Ogerpon-Cornerstone") {
      return "Rock"
    }
    if (pokemonName === "Ogerpon-Hearthflame") {
      return "Fire"
    }
    if (pokemonName === "Ogerpon-Wellspring") {
      return "Water"
    }

    return null
  }
}
