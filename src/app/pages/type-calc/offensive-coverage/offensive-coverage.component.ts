import { NgClass } from "@angular/common"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from "@angular/core"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TypeCoverageService, OffensiveCoverageData, OffensiveCoverageAgainstTeamData, CoverageType } from "@lib/type-coverage/type-coverage.service"
import { TypeEffectiveness } from "@lib/type-coverage/type-effectiveness.service"
import { Team } from "@lib/model/team"
import { Pokemon } from "@lib/model/pokemon"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-offensive-coverage",
  imports: [WidgetComponent, TypeComboBoxComponent, NgClass, MatSlideToggle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./offensive-coverage.component.html",
  styleUrl: "./offensive-coverage.component.scss"
})
export class OffensiveCoverageComponent {
  store = inject(CalculatorStore)
  typeCoverageService = inject(TypeCoverageService)

  secondTeam = input<Team | null>(null)
  considerTeraType = signal<boolean>(false)
  considerTeraBlast = signal<boolean>(false)

  team = computed(() => this.store.team())

  teamHasTeraBlast = computed(() => {
    const team = this.team()

    return team.teamMembers.some(member => {
      if (member.pokemon.isDefault) return false

      return this.typeCoverageService.hasTeraBlast(member.pokemon)
    })
  })

  coverageData = computed(() => {
    const secondTeamValue = this.secondTeam()

    if (secondTeamValue) {
      return this.typeCoverageService.getOffensiveCoverageAgainstTeam(this.team(), secondTeamValue, this.considerTeraType(), this.considerTeraBlast())
    }

    return this.typeCoverageService.getOffensiveCoverage(this.team())
  })

  transposedCoverageData = computed(() => {
    if (!this.isAgainstTeam()) {
      return null
    }

    const data = this.coverageData() as OffensiveCoverageAgainstTeamData[]
    if (data.length === 0) {
      return []
    }

    const teamMembers = this.team().teamMembers.filter(member => !member.pokemon.isDefault)
    const pokemonDataMap = new Map<string, Map<string, { pokemon: Pokemon; coverageType: CoverageType; effectiveness: TypeEffectiveness; formatted: string }>>()

    data.forEach(targetRow => {
      targetRow.pokemonData.forEach(pd => {
        if (!pokemonDataMap.has(pd.pokemon.id)) {
          pokemonDataMap.set(pd.pokemon.id, new Map())
        }
        pokemonDataMap.get(pd.pokemon.id)!.set(targetRow.targetPokemon.id, pd)
      })
    })

    return teamMembers.map(attackerMember => {
      const attacker = attackerMember.pokemon
      const attackerDataMap = pokemonDataMap.get(attacker.id) || new Map()
      const typeData = data.map(targetRow => {
        const pokemonData = attackerDataMap.get(targetRow.targetPokemon.id) || null
        return {
          targetPokemon: targetRow.targetPokemon,
          pokemonData
        }
      })

      const superEffective = typeData.filter(td => td.pokemonData && (td.pokemonData.effectiveness === 2 || td.pokemonData.effectiveness === 4)).length
      const notVeryEffective = typeData.filter(td => td.pokemonData && (td.pokemonData.effectiveness === 0.25 || td.pokemonData.effectiveness === 0.5 || td.pokemonData.effectiveness === 0)).length

      return {
        attacker,
        typeData,
        superEffective,
        notVeryEffective
      }
    })
  })

  isAgainstTeam = computed(() => this.secondTeam() !== null)

  hasValidTeamMembers = computed(() => {
    const team = this.team()
    const secondTeamValue = this.secondTeam()

    if (secondTeamValue) {
      return team.teamMembers.some(member => !member.pokemon.isDefault) && secondTeamValue.teamMembers.some(member => !member.pokemon.isDefault)
    }

    return team.teamMembers.some(member => !member.pokemon.isDefault)
  })

  getTypeName(type: string): TypeName {
    return type as TypeName
  }

  getRowKey(row: OffensiveCoverageData | OffensiveCoverageAgainstTeamData): string {
    if (this.isAgainstTeam()) {
      const teamData = row as OffensiveCoverageAgainstTeamData
      if (teamData && teamData.targetPokemon) {
        return teamData.targetPokemon.id
      }
    } else {
      const typeData = row as OffensiveCoverageData
      if (typeData && typeData.pokemonType) {
        return typeData.pokemonType
      }
    }

    return ""
  }

  getRowDisplay(row: OffensiveCoverageData | OffensiveCoverageAgainstTeamData): string | null {
    if (this.isAgainstTeam()) {
      const teamData = row as OffensiveCoverageAgainstTeamData
      return teamData?.targetPokemon?.name || null
    }

    return null
  }

  getRowType(row: OffensiveCoverageData | OffensiveCoverageAgainstTeamData): string | null {
    if (!this.isAgainstTeam()) {
      const typeData = row as OffensiveCoverageData
      return typeData?.pokemonType || null
    }

    return null
  }

  getTargetPokemonTeraType(row: OffensiveCoverageData | OffensiveCoverageAgainstTeamData): string | null {
    if (this.isAgainstTeam()) {
      const teamData = row as OffensiveCoverageAgainstTeamData
      return teamData?.targetPokemon?.teraType || null
    }

    return null
  }

  hasTeraBlast(pokemon: Pokemon): boolean {
    return this.typeCoverageService.hasTeraBlast(pokemon)
  }

  getPokemonTeraType(pokemon: Pokemon): string | null {
    return this.typeCoverageService.getPokemonTeraType(pokemon)
  }

  getCellClass(effectiveness: TypeEffectiveness): string {
    return this.typeCoverageService.getCellClass(effectiveness)
  }

  getNotVeryEffectiveClass(count: number): string {
    if (count === 0) return "not-very-effective-0"
    if (count === 1) return "not-very-effective-1"
    if (count === 2) return "not-very-effective-2"
    if (count === 3) return "not-very-effective-3"

    return "not-very-effective-4plus"
  }

  getSuperEffectiveClass(count: number): string {
    if (count === 0) return "super-effective-0"
    if (count <= 2) return "super-effective-1-2"
    if (count <= 4) return "super-effective-3-4"

    return "super-effective-5plus"
  }
}
