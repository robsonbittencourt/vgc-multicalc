import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { TYPE_CALC_IMAGES } from "@pages/how-to-use/how-to-use-type-calc/how-to-use-type-calc-images"

@Component({
  selector: "app-how-to-use-type-calc-it",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-type-calc-it.component.html"
})
export class HowToUseTypeCalcItComponent {
  protected readonly images = TYPE_CALC_IMAGES
}
