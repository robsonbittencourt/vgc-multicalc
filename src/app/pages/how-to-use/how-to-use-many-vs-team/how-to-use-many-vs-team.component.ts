import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseContent, HowToUseContentComponent } from "@pages/how-to-use/how-to-use-content/how-to-use-content.component"
import { HowToUseManyVsTeamEnComponent } from "@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-en.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-many-vs-team",
  imports: [HowToUseSubpageComponent, HowToUseContentComponent],
  templateUrl: "./how-to-use-many-vs-team.component.html",
  styleUrl: "./how-to-use-many-vs-team.component.scss"
})
export class HowToUseManyVsTeamComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Many vs Team — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Learn how to test your Pokémon's defensive durability against multiple threats in the Pokémon Champions and VGC metagame."
  protected readonly pageSlug = "many-vs-team"

  protected readonly content: HowToUseContent = {
    en: HowToUseManyVsTeamEnComponent,
    translations: {
      es: () => import("@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-es.component").then(m => m.HowToUseManyVsTeamEsComponent),
      "es-419": () => import("@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-es-419.component").then(m => m.HowToUseManyVsTeamEs419Component),
      ja: () => import("@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-ja.component").then(m => m.HowToUseManyVsTeamJaComponent),
      de: () => import("@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-de.component").then(m => m.HowToUseManyVsTeamDeComponent),
      fr: () => import("@pages/how-to-use/how-to-use-many-vs-team/content/how-to-use-many-vs-team-fr.component").then(m => m.HowToUseManyVsTeamFrComponent)
    }
  }
}
