import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SP_OPTIMIZER_IMAGES } from "@pages/how-to-use/how-to-use-sp-optimizer/how-to-use-sp-optimizer-images"

@Component({
  selector: "app-how-to-use-sp-optimizer-it",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-sp-optimizer-it.component.html"
})
export class HowToUseSpOptimizerItComponent {
  protected readonly images = SP_OPTIMIZER_IMAGES
}
