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
import { TypeCoverageInsightsMobileComponent } from "@pages/type-calc/type-coverage-insights-mobile/type-coverage-insights-mobile.component"
import { OffensiveCoverageMobileComponent } from "@pages/type-calc/offensive-coverage-mobile/offensive-coverage-mobile.component"
import { DefensiveCoverageMobileComponent } from "@pages/type-calc/defensive-coverage-mobile/defensive-coverage-mobile.component"
import { Team } from "@lib/model/team"

@Component({
  selector: "app-type-calc-mobile",
  templateUrl: "./type-calc-mobile.component.html",
  styleUrl: "./type-calc-mobile.component.scss",
  imports: [NgClass, MatIcon, TeamTabsMobileComponent, TeamsMobileComponent, PokemonBuildMobileComponent, TypeCoverageInsightsMobileComponent, OffensiveCoverageMobileComponent, DefensiveCoverageMobileComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "type" }]
})
export class TypeCalcMobileComponent {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  store = inject(CalculatorStore)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
  }

  activeBottomTab = signal<"insights" | "coverage" | "teams" | "build">("coverage")
  showBottomNav = signal(true)
  private scrollPositions = new Map<string, number>()
  private lastScrollTop = 0
  pokemonOnEditId = signal<string | null>(null)

  secondTeam = signal<Team | null>(null)

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  isPokemonDefault = computed(() => {
    const id = this.effectiveEditingId()
    if (!id) return true
    const p = this.store.findPokemonById(id)
    return p ? p.isDefault : true
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  switchTab(newTab: "insights" | "coverage" | "teams" | "build") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)
    this.showBottomNav.set(true)

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("insights")
  }

  onSecondTeamSelected(team: Team | null) {
    this.secondTeam.set(team)
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement
    const currentScroll = target.scrollTop

    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.showBottomNav.set(false)
    } else if (currentScroll < this.lastScrollTop) {
      this.showBottomNav.set(true)
    }

    this.lastScrollTop = currentScroll
  }
}
