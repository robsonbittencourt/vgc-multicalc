import { NgClass } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TypeCoverageInsightsService, PokemonInsight } from "@lib/type-coverage/type-coverage-insights.service"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { PokemonType } from "@lib/types"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-type-coverage-insights",
  imports: [WidgetComponent, NgClass, TypeComboBoxComponent],
  templateUrl: "./type-coverage-insights.component.html",
  styleUrl: "./type-coverage-insights.component.scss"
})
export class TypeCoverageInsightsComponent {
  store = inject(CalculatorStore)
  insightsService = inject(TypeCoverageInsightsService)

  secondTeam = input<Team | null>(null)

  team = computed(() => this.store.team())

  isAgainstTeam = computed(() => this.secondTeam() !== null)

  hasValidTeamMembers = computed(() => {
    const team = this.team()
    const secondTeamValue = this.secondTeam()

    if (secondTeamValue) {
      return team.teamMembers.some(member => !member.pokemon.isDefault) && secondTeamValue.teamMembers.some(member => !member.pokemon.isDefault)
    }

    return team.teamMembers.some(member => !member.pokemon.isDefault)
  })

  topOffensiveSuperEffective = computed(() => {
    return this.insightsService.getTopOffensiveSuperEffective(this.team(), this.secondTeam())
  })

  topOffensiveNotVeryEffective = computed(() => {
    return this.insightsService.getTopOffensiveNotVeryEffective(this.team(), this.secondTeam())
  })

  topDefensiveResist = computed(() => {
    return this.insightsService.getTopDefensiveResist(this.team(), this.secondTeam())
  })

  topDefensiveImmune = computed(() => {
    return this.insightsService.getTopDefensiveImmune(this.team(), this.secondTeam())
  })

  topDefensiveWeak = computed(() => {
    return this.insightsService.getTopDefensiveWeak(this.team(), this.secondTeam())
  })

  topDefensivePositive = computed(() => {
    return this.insightsService.getTopDefensivePositive(this.team(), this.secondTeam())
  })

  offensivePokemon = computed(() => {
    const superEffective = this.topOffensiveSuperEffective()
    const notVeryEffective = this.topOffensiveNotVeryEffective()

    const allPokemon = new Map<string, PokemonInsight>()

    superEffective.forEach(item => {
      if (item.value > 0) {
        allPokemon.set(item.pokemon.id, item)
      }
    })

    notVeryEffective.forEach(item => {
      if (item.value > 0 && !allPokemon.has(item.pokemon.id)) {
        allPokemon.set(item.pokemon.id, item)
      }
    })

    return Array.from(allPokemon.values()).slice(0, 4)
  })

  defensivePokemon = computed(() => {
    const positive = this.topDefensivePositive().slice(0, 2)
    const weak = this.topDefensiveWeak()

    const positiveIds = new Set(positive.map(p => p.pokemon.id))
    const weakFiltered = weak.filter(item => !positiveIds.has(item.pokemon.id))

    const allPokemon: PokemonInsight[] = []

    positive.forEach(item => {
      allPokemon.push(item)
    })

    const weakToAdd = weakFiltered.slice(0, 2)
    weakToAdd.forEach(item => {
      allPokemon.push(item)
    })

    return allPokemon
  })

  defensivePositivePokemon = computed(() => {
    return this.topDefensivePositive().slice(0, 2)
  })

  defensiveWeakPokemon = computed(() => {
    const weak = this.topDefensiveWeak()
    return weak.slice(0, 2)
  })

  offensiveSuperEffectivePokemon = computed(() => {
    return this.topOffensiveSuperEffective().slice(0, 2)
  })

  offensiveNotVeryEffectivePokemon = computed(() => {
    const superEffective = this.offensiveSuperEffectivePokemon()
    const notVeryEffective = this.topOffensiveNotVeryEffective()
    const superEffectiveIds = new Set(superEffective.map(p => p.pokemon.id))
    const notVeryEffectiveFiltered = notVeryEffective.filter(item => !superEffectiveIds.has(item.pokemon.id))
    return notVeryEffectiveFiltered.slice(0, 2)
  })

  getPokemonCategory(pokemon: Pokemon, isOffensive: boolean, isNegative?: boolean): "super-effective" | "not-very-effective" | "not-very-effective-3plus" | "resist" | "immune" | "weak" | "weak-all-covered" | "positive" | null {
    if (isOffensive) {
      const inNotVeryEffectiveList = this.offensiveNotVeryEffectivePokemon().find(item => item.pokemon.id === pokemon.id)

      if (inNotVeryEffectiveList) {
        if (inNotVeryEffectiveList.value >= 3) {
          return "not-very-effective-3plus"
        }

        return "not-very-effective"
      }

      const inSuperEffectiveList = this.offensiveSuperEffectivePokemon().find(item => item.pokemon.id === pokemon.id)
      if (inSuperEffectiveList) return "super-effective"
    } else {
      if (isNegative) {
        const inWeak = this.topDefensiveWeak().find(item => item.pokemon.id === pokemon.id)
        if (inWeak) {
          const weakCount = this.getPokemonWeakCount(pokemon)
          const coveredCount = this.getPokemonWeaknessesCoveredByTera(pokemon)
          if (weakCount > 0 && coveredCount === weakCount) {
            return "weak-all-covered"
          }

          return "weak"
        }
      } else {
        const inPositive = this.topDefensivePositive().find(item => item.pokemon.id === pokemon.id)
        if (inPositive) {
          const immuneCount = this.getPokemonImmuneCount(pokemon)
          if (immuneCount > 0) return "immune"
          return "resist"
        }
      }
    }

    return null
  }

  getPokemonResistCount(pokemon: Pokemon): number {
    return this.insightsService.getPokemonResistCount(pokemon, this.team(), this.secondTeam())
  }

  getPokemonImmuneCount(pokemon: Pokemon): number {
    return this.insightsService.getPokemonImmuneCount(pokemon, this.team(), this.secondTeam())
  }

  getPokemonWeakCount(pokemon: Pokemon): number {
    return this.insightsService.getPokemonWeakCount(pokemon, this.team(), this.secondTeam())
  }

  getPokemonWeakCount2x(pokemon: Pokemon): number {
    return this.insightsService.getPokemonWeakCount2x(pokemon, this.team(), this.secondTeam())
  }

  getPokemonWeakCount4x(pokemon: Pokemon): number {
    return this.insightsService.getPokemonWeakCount4x(pokemon, this.team(), this.secondTeam())
  }

  getPokemonWeaknessesCoveredByTera(pokemon: Pokemon): number {
    return this.insightsService.getPokemonWeaknessesCoveredByTera(pokemon)
  }

  mostWeaknessType = computed(() => {
    return this.insightsService.getMostWeaknessType(this.team())
  })

  mostResistanceType = computed(() => {
    return this.insightsService.getMostResistanceType(this.team())
  })

  mostSuperEffectiveType = computed(() => {
    return this.insightsService.getMostSuperEffectiveType(this.team())
  })

  mostNotVeryEffectiveType = computed(() => {
    return this.insightsService.getMostNotVeryEffectiveType(this.team())
  })

  getPokemonSuperEffectiveCount2x(pokemon: Pokemon): number {
    return this.insightsService.getPokemonSuperEffectiveCount2x(pokemon, this.team(), this.secondTeam())
  }

  getPokemonSuperEffectiveCount4x(pokemon: Pokemon): number {
    return this.insightsService.getPokemonSuperEffectiveCount4x(pokemon, this.team(), this.secondTeam())
  }

  getPokemonExplanation(pokemon: Pokemon, isOffensive: boolean): string {
    if (isOffensive) {
      const inSuperEffectiveList = this.offensiveSuperEffectivePokemon().find(item => item.pokemon.id === pokemon.id)
      if (inSuperEffectiveList) {
        return `${inSuperEffectiveList.value} super effective`
      }

      const inNotVeryEffectiveList = this.offensiveNotVeryEffectivePokemon().find(item => item.pokemon.id === pokemon.id)
      if (inNotVeryEffectiveList) {
        return `${inNotVeryEffectiveList.value} not very effective`
      }
    } else {
      const inResist = this.topDefensiveResist().find(item => item.pokemon.id === pokemon.id)
      const inImmune = this.topDefensiveImmune().find(item => item.pokemon.id === pokemon.id)
      const inWeak = this.topDefensiveWeak().find(item => item.pokemon.id === pokemon.id)

      if (inResist || inImmune) {
        const parts: string[] = []
        if (inResist) {
          const resistanceText = inResist.value === 1 ? "resistance" : "resistances"
          parts.push(`${inResist.value} ${resistanceText}`)
        }

        if (inImmune) {
          const immunityText = inImmune.value === 1 ? "immunity" : "immunities"
          parts.push(`${inImmune.value} ${immunityText}`)
        }

        return parts.join(", ")
      }

      if (inWeak) {
        const weaknessText = inWeak.value === 1 ? "weakness" : "weaknesses"
        return `${inWeak.value} ${weaknessText}`
      }
    }

    return ""
  }

  getTypeName(type: PokemonType): TypeName {
    return type as TypeName
  }
}
