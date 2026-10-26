import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-teams",
  imports: [HowToUseSubpageComponent],
  templateUrl: "./how-to-use-teams.component.html",
  styleUrl: "./how-to-use-teams.component.scss"
})
export class HowToUseTeamsComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Teams — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Find Pokémon Champions tournament teams with full sets, Stat Points and replica codes, and load them into the calc."
  protected readonly pageSlug = "teams"
}
