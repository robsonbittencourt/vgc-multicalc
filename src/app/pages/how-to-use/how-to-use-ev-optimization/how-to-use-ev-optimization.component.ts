import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-ev-optimization",
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-ev-optimization.component.html",
  styleUrl: "./how-to-use-ev-optimization.component.scss"
})
export class HowToUseEvOptimizationComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "EV Optimization - How to Use - VGC Multi Calc"
  protected readonly pageDescription = "Learn how the EV Optimizer calculates the minimum HP, Defense and Special Defense EVs needed to survive key attacks."
  protected readonly pageSlug = "ev-optimization"
}
