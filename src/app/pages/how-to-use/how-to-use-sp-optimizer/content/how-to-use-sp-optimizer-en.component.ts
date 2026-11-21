import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SP_OPTIMIZER_IMAGES } from "@pages/how-to-use/how-to-use-sp-optimizer/how-to-use-sp-optimizer-images"

@Component({
  selector: "app-how-to-use-sp-optimizer-en",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-sp-optimizer-en.component.html"
})
export class HowToUseSpOptimizerEnComponent {
  protected readonly images = SP_OPTIMIZER_IMAGES
}
