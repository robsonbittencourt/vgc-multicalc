import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-probability",
  standalone: true,
  imports: [MatButtonModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-probability.component.html",
  styleUrl: "./how-to-use-probability.component.scss"
})
export class HowToUseProbabilityComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Probability Calc — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Use the Probability Calc and Consistency Score to analyze move accuracy and reliability in Pokémon Champions and VGC."
  protected readonly pageSlug = "probability-calc"
}
