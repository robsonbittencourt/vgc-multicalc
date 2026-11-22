import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SIMPLE_CALC_IMAGES } from "@pages/how-to-use/how-to-use-simple-calc/how-to-use-simple-calc-images"

@Component({
  selector: "app-how-to-use-simple-calc-de",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-simple-calc-de.component.html"
})
export class HowToUseSimpleCalcDeComponent {
  protected readonly images = SIMPLE_CALC_IMAGES
}
