import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SPEED_CALC_IMAGES } from "@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc-images"

@Component({
  selector: "app-how-to-use-speed-calc-zh-hant",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-speed-calc-zh-Hant.component.html"
})
export class HowToUseSpeedCalcZhHantComponent {
  protected readonly images = SPEED_CALC_IMAGES
}
