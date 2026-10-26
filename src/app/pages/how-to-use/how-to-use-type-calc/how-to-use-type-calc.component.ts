import { Component } from "@angular/core"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"
import { HowToUseSubpageSeo } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo"

@Component({
  selector: "app-how-to-use-type-calc",
  imports: [HowToUseSubpageComponent],
  templateUrl: "./how-to-use-type-calc.component.html",
  styleUrl: "./how-to-use-type-calc.component.scss"
})
export class HowToUseTypeCalcComponent extends HowToUseSubpageSeo {
  protected readonly pageTitle = "Type Calc — How to Use VGC Multi Calc"
  protected readonly pageDescription = "Analyze offensive coverage and defensive type matchups against specific teams to find weaknesses and strengths."
  protected readonly pageSlug = "type-calc"
}
