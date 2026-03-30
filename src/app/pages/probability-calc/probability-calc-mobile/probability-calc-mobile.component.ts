import { Component, computed, ElementRef, inject, signal, ViewChild } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { GeneralProbabilityComponent } from "@app/pages/probability-calc/general-probability/general-probability.component"
import { CombinedProbabilityComponent } from "@app/pages/probability-calc/combined-probability/combined-probability.component"
import { PokemonProbabilityComponent } from "@app/pages/probability-calc/pokemon-probability/pokemon-probability.component"
import { TeamProbabilityComponent } from "@app/pages/probability-calc/team-probability/team-probability.component"

@Component({
  selector: "app-probability-calc-mobile",
  templateUrl: "./probability-calc-mobile.component.html",
  styleUrl: "./probability-calc-mobile.component.scss",
  imports: [NgClass, MatIcon, TeamTabsMobileComponent, TeamsMobileComponent, PokemonBuildMobileComponent, GeneralProbabilityComponent, CombinedProbabilityComponent, PokemonProbabilityComponent, TeamProbabilityComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "probability" }]
})
export class ProbabilityCalcMobileComponent {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  store = inject(CalculatorStore)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
  }

  activeBottomTab = signal<"general" | "detailed" | "teams" | "build">("detailed")
  private scrollPositions = new Map<string, number>()
  pokemonOnEditId = signal<string | null>(null)

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  switchTab(newTab: "general" | "detailed" | "teams" | "build") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("detailed")
  }
}
