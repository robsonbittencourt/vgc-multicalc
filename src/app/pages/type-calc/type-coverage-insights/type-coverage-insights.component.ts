import { NgClass, NgTemplateOutlet } from "@angular/common"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { Component, computed, inject, input } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { CalcStore } from "@store/calc-store"
import { FEATURES } from "@configuration/feature-flags"
import { TypeCoverageInsights } from "@multicalc/type-calc"
import { Pokemon, Team } from "@multicalc/model"
import { PokemonType } from "@multicalc/types"
import { TypeName } from "@data/types"

@Component({
  selector: "app-type-coverage-insights",
  imports: [WidgetComponent, NgClass, TypeComboBoxComponent, NgTemplateOutlet, PokemonSpriteComponent],
  templateUrl: "./type-coverage-insights.component.html",
  styleUrl: "./type-coverage-insights.component.scss"
})
export class TypeCoverageInsightsComponent {
  store = inject(CalcStore)
  features = FEATURES
  insightsService = new TypeCoverageInsights()

  secondTeam = input<Team | null>(null)
  isMobile = input<boolean>(false)

  team = computed(() => this.store.team())

  isAgainstTeam = computed(() => this.secondTeam() !== null)

  hasValidTeamMembers = computed(() => {
    const team = this.team()
    const secondTeamValue = this.secondTeam()

    if (secondTeamValue) {
      return !team.isEmpty() && !secondTeamValue.isEmpty()
    }

    return !team.isEmpty()
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

  offensivePokemon = computed(() => this.insightsService.selectOffensivePokemon(this.team(), this.secondTeam()))

  defensivePokemon = computed(() => this.insightsService.selectDefensivePokemon(this.team(), this.secondTeam()))

  defensivePositivePokemon = computed(() => this.insightsService.selectDefensivePositive(this.team(), this.secondTeam()))

  defensiveWeakPokemon = computed(() => this.insightsService.selectDefensiveWeak(this.team(), this.secondTeam()))

  offensiveSuperEffectivePokemon = computed(() => this.insightsService.selectOffensiveSuperEffective(this.team(), this.secondTeam()))

  offensiveNotVeryEffectivePokemon = computed(() => this.insightsService.selectOffensiveNotVeryEffective(this.team(), this.secondTeam()))

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
