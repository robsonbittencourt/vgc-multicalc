import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SPEED_CALC_IMAGES } from "@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc-images"

@Component({
  selector: "app-how-to-use-speed-calc-es-419",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-speed-calc-es-419.component.html"
})
export class HowToUseSpeedCalcEs419Component {
  protected readonly images = SPEED_CALC_IMAGES
}
