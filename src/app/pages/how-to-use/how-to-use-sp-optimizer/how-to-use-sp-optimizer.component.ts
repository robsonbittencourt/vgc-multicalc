import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-sp-optimizer",
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-sp-optimizer.component.html",
  styleUrl: "./how-to-use-sp-optimizer.component.scss"
})
export class HowToUseSpOptimizerComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "SP Optimizer — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Learn how the SP Optimizer finds the fewest Stat Points needed to survive key attacks or to reach the KO you want."
  protected readonly pageSlug = "sp-optimizer"
}
