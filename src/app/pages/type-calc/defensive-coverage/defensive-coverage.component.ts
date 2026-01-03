import { NgClass } from "@angular/common"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from "@angular/core"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TypeCoverageService, DefensiveCoverageData, DefensiveCoverageByPokemonData } from "@lib/type-coverage/type-coverage.service"
import { TypeEffectiveness } from "@lib/type-coverage/type-effectiveness.service"
import { Team } from "@lib/model/team"
import { Pokemon } from "@lib/model/pokemon"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-defensive-coverage",
  imports: [WidgetComponent, TypeComboBoxComponent, NgClass, MatSlideToggle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./defensive-coverage.component.html",
  styleUrl: "./defensive-coverage.component.scss"
})
export class DefensiveCoverageComponent {
  store = inject(CalculatorStore)
  typeCoverageService = inject(TypeCoverageService)

  secondTeam = input<Team | null>(null)
  considerTeraType = signal<boolean>(false)
  considerTeraBlast = signal<boolean>(false)

  team = computed(() => this.store.team())

  secondTeamHasTeraBlast = computed(() => {
    const secondTeamValue = this.secondTeam()

    if (!secondTeamValue) return false

    return secondTeamValue.teamMembers.some(member => {
      if (member.pokemon.isDefault) return false

      return this.typeCoverageService.hasTeraBlast(member.pokemon)
    })
  })

  coverageData = computed(() => {
    const secondTeamValue = this.secondTeam()

    if (secondTeamValue) {
      return this.typeCoverageService.getDefensiveCoverageAgainstTeam(this.team(), secondTeamValue, this.considerTeraType(), this.considerTeraBlast())
    }

    return this.typeCoverageService.getDefensiveCoverage(this.team(), this.considerTeraType())
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

  getRowKey(row: DefensiveCoverageData | DefensiveCoverageByPokemonData): string {
    if (this.isAgainstTeam()) {
      const pokemonData = row as DefensiveCoverageByPokemonData
      return pokemonData?.targetPokemon?.id || ""
    }

    const typeData = row as DefensiveCoverageData

    return typeData?.moveType || ""
  }

  getTargetPokemon(row: DefensiveCoverageData | DefensiveCoverageByPokemonData): Pokemon | null {
    if (this.isAgainstTeam()) {
      const pokemonData = row as DefensiveCoverageByPokemonData
      return pokemonData?.targetPokemon || null
    }

    return null
  }

  getMoveType(row: DefensiveCoverageData | DefensiveCoverageByPokemonData): string | null {
    if (!this.isAgainstTeam()) {
      const typeData = row as DefensiveCoverageData
      return typeData?.moveType || null
    }

    return null
  }

  getCellClass(effectiveness: TypeEffectiveness): string {
    return this.typeCoverageService.getCellClass(effectiveness)
  }

  getTotalWeakClass(totalWeak: number): string {
    if (totalWeak === 0) return "total-weak-0"
    if (totalWeak === 1) return "total-weak-1"
    if (totalWeak === 2) return "total-weak-2"
    if (totalWeak === 3) return "total-weak-3"

    return "total-weak-4plus"
  }

  getTotalResistClass(totalResist: number): string {
    if (totalResist === 0) return "total-resist-0"
    if (totalResist >= 1 && totalResist <= 2) return "total-resist-1-2"
    if (totalResist >= 3 && totalResist <= 4) return "total-resist-3-4"

    return "total-resist-5plus"
  }

  hasTeraBlast(pokemon: Pokemon): boolean {
    return this.typeCoverageService.hasTeraBlast(pokemon)
  }

  getPokemonTeraType(pokemon: Pokemon): string | null {
    return this.typeCoverageService.getPokemonTeraType(pokemon)
  }
}
