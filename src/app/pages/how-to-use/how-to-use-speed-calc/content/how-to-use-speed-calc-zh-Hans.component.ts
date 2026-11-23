import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SPEED_CALC_IMAGES } from "@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc-images"

@Component({
  selector: "app-how-to-use-speed-calc-zh-hans",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-speed-calc-zh-Hans.component.html"
})
export class HowToUseSpeedCalcZhHansComponent {
  protected readonly images = SPEED_CALC_IMAGES
}
