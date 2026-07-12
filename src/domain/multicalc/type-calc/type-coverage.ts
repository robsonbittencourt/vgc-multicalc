import { getMoveData } from "@data/move-data"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { PokemonType, PokemonTypes } from "@multicalc/types"
import { AbilityName, DefenderInput, TypeEffectiveness, TypeChart } from "./type-chart"

const ATE_ABILITY_TYPES: Record<string, PokemonType> = {
  Pixilate: "Fairy",
  Refrigerate: "Ice",
  Aerilate: "Flying",
  Galvanize: "Electric"
}

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

export class TypeCoverage {
  typeChart = new TypeChart()

  getDefensiveCoverage(team: Team, considerTeraType = false): DefensiveCoverageData[] {
    const teamMembers = team.teamMembers

    if (teamMembers.length === 0) {
      return []
    }

    return PokemonTypes.map(moveType => {
      const pokemonData = teamMembers.map(member => {
        const pokemon = member.pokemon
        const type1 = pokemon.type1 as PokemonType
        const type2 = pokemon.type2 ? (pokemon.type2 as PokemonType) : undefined

        let finalEffectiveness: TypeEffectiveness

        if (considerTeraType && pokemon.teraType && pokemon.teraType !== "Stellar") {
          const teraType = pokemon.teraType as PokemonType
          finalEffectiveness = this.typeChart.getEffectiveness(moveType, teraType, undefined, this.getAbilityName(pokemon), this.getDefenderInput(pokemon))
        } else {
          finalEffectiveness = this.typeChart.getEffectiveness(moveType, type1, type2, this.getAbilityName(pokemon), this.getDefenderInput(pokemon))
        }

        const formatted = this.typeChart.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const totalWeak = pokemonData.filter(p => this.typeChart.isWeakness(p.effectiveness)).length
      const totalResist = pokemonData.filter(p => this.typeChart.isResistance(p.effectiveness) || this.typeChart.isImmune(p.effectiveness)).length

      return {
        moveType,
        pokemonData,
        totalWeak,
        totalResist
      }
    })
  }

  getOffensiveCoverage(team: Team): OffensiveCoverageData[] {
    const teamMembers = team.teamMembers

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

          const effectiveness = this.typeChart.getEffectiveness(moveType, type1, type2)
          effectivenessValues.push(effectiveness)
        }

        let finalEffectiveness: TypeEffectiveness = 1
        let coverageType: CoverageType = "none"

        if (effectivenessValues.length > 0) {
          finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)

          if (this.typeChart.isWeakness(finalEffectiveness)) {
            coverageType = "super-effective"
          } else if (this.typeChart.isResistance(finalEffectiveness) || this.typeChart.isImmune(finalEffectiveness)) {
            if (this.typeChart.isImmune(finalEffectiveness)) {
              coverageType = "immune"
            } else {
              coverageType = "not-very-effective"
            }
          } else {
            coverageType = "none"
          }
        }

        const formatted = this.typeChart.formatEffectiveness(finalEffectiveness)

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
    const teamMembers = team.teamMembers
    const targetMembers = targetTeam.teamMembers

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

          if (considerTeraType && targetPokemon.teraType && targetPokemon.teraType !== "Stellar") {
            const teraType = targetPokemon.teraType as PokemonType
            effectiveness = this.typeChart.getEffectiveness(moveType, teraType, undefined, this.getAbilityName(targetPokemon), this.getDefenderInput(targetPokemon))
          } else {
            effectiveness = this.typeChart.getEffectiveness(moveType, type1, type2, this.getAbilityName(targetPokemon), this.getDefenderInput(targetPokemon))
          }

          effectivenessValues.push(effectiveness)
        }

        let finalEffectiveness: TypeEffectiveness = 1
        let coverageType: CoverageType = "none"

        if (effectivenessValues.length > 0) {
          finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)

          if (considerTeraType && pokemon.teraTypeActive && pokemon.teraType === "Stellar" && this.hasTeraBlastOrStarstorm(pokemon)) {
            finalEffectiveness = 2
            coverageType = "super-effective"
          } else if (this.typeChart.isWeakness(finalEffectiveness)) {
            coverageType = "super-effective"
          } else if (this.typeChart.isResistance(finalEffectiveness) || this.typeChart.isImmune(finalEffectiveness)) {
            if (this.typeChart.isImmune(finalEffectiveness)) {
              coverageType = "immune"
            } else {
              coverageType = "not-very-effective"
            }
          } else {
            coverageType = "none"
          }
        }

        const formatted = this.typeChart.formatEffectiveness(finalEffectiveness)

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
    const teamMembers = team.teamMembers
    const targetMembers = targetTeam.teamMembers

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
          if (considerTeraType && pokemon.teraType && pokemon.teraType !== "Stellar") {
            const teraType = pokemon.teraType as PokemonType
            return this.typeChart.getEffectiveness(moveType, teraType, undefined, this.getAbilityName(pokemon), this.getDefenderInput(pokemon))
          }

          return this.typeChart.getEffectiveness(moveType, type1, type2, this.getAbilityName(pokemon), this.getDefenderInput(pokemon))
        })

        if (effectivenessValues.length === 0) {
          return {
            pokemon,
            effectiveness: 1 as TypeEffectiveness,
            formatted: ""
          }
        }

        let finalEffectiveness = this.getEffectivenessByHierarchy(effectivenessValues)

        if (considerTeraType && targetPokemon.teraTypeActive && targetPokemon.teraType === "Stellar" && this.hasTeraBlastOrStarstorm(targetPokemon)) {
          finalEffectiveness = 2
        }

        const formatted = this.typeChart.formatEffectiveness(finalEffectiveness)

        return {
          pokemon,
          effectiveness: finalEffectiveness,
          formatted
        }
      })

      const totalWeak = pokemonData.filter(p => this.typeChart.isWeakness(p.effectiveness)).length
      const totalResist = pokemonData.filter(p => this.typeChart.isResistance(p.effectiveness) || this.typeChart.isImmune(p.effectiveness)).length

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

    return 0
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
    const ateType = this.getAteAbilityType(pokemon)

    for (const move of moves) {
      if (!move || !move.name) {
        continue
      }

      if (move.name === "Struggle") {
        continue
      }

      if (move.category === "Status") {
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

      const moveDetails = getMoveData(move.name)

      if (moveDetails && moveDetails.type) {
        moveTypes.push(ateType && moveDetails.type === "Normal" ? ateType : (moveDetails.type as PokemonType))
      }
    }

    return moveTypes
  }

  private getAteAbilityType(pokemon: Pokemon): PokemonType | null {
    return ATE_ABILITY_TYPES[pokemon.ability.name] ?? null
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

  private hasTeraBlastOrStarstorm(pokemon: Pokemon): boolean {
    const moves = this.getMovesArray(pokemon)
    return moves.some(move => move && (move.name === "Tera Blast" || move.name === "Tera Starstorm"))
  }

  private getIvyCudgelType(pokemonName: string): PokemonType | null {
    if (pokemonName === "Ogerpon-Cornerstone") {
      return "Rock"
    }

    if (pokemonName === "Ogerpon-Hearthflame") {
      return "Fire"
    }

    if (pokemonName === "Ogerpon-Wellspring") {
      return "Water"
    }

    return "Grass"
  }

  private getAbilityName(pokemon: Pokemon): AbilityName | undefined {
    return pokemon.ability.name as AbilityName | undefined
  }

  private getDefenderInput(pokemon: Pokemon): DefenderInput {
    return {
      ability: this.getAbilityName(pokemon),
      item: pokemon.item
    }
  }
}
