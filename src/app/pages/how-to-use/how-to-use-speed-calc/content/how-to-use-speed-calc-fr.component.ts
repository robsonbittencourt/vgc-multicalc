import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SPEED_CALC_IMAGES } from "@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc-images"

@Component({
  selector: "app-how-to-use-speed-calc-fr",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-speed-calc-fr.component.html"
})
export class HowToUseSpeedCalcFrComponent {
  protected readonly images = SPEED_CALC_IMAGES
}
