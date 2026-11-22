import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseTeamsEnComponent } from "@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-teams",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-teams.component.html",
  styleUrl: "./how-to-use-teams.component.scss"
})
export class HowToUseTeamsComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Teams — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Find Pokémon Champions tournament teams with full sets, Stat Points and replica codes, and load them into the calc."
  protected readonly pageSlug = "teams"

  protected readonly content: HowToUseContent = {
    en: HowToUseTeamsEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-es.component").then(m => m.HowToUseTeamsEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-es-419.component").then(m => m.HowToUseTeamsEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-ja.component").then(m => m.HowToUseTeamsJaComponent),
      it: () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-it.component").then(m => m.HowToUseTeamsItComponent),
      de: () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-de.component").then(m => m.HowToUseTeamsDeComponent),
      fr: () => import("@pages/how-to-use/how-to-use-teams/content/how-to-use-teams-fr.component").then(m => m.HowToUseTeamsFrComponent)
    }
  }
}
