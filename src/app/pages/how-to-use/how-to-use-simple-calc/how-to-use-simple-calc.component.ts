import { Component } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-simple-calc",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-simple-calc.component.html",
  styleUrl: "./how-to-use-simple-calc.component.scss"
})
export class HowToUseSimpleCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "One vs One Damage Calculator - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Learn how to use the One vs One damage calculator to analyze Pokémon matchups side by side, with full builds, moves, items and field state."
  protected readonly pageSlug = "one-vs-one"
}
