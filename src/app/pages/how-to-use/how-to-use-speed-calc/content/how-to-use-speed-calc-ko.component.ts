import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { SPEED_CALC_IMAGES } from "@pages/how-to-use/how-to-use-speed-calc/how-to-use-speed-calc-images"

@Component({
  selector: "app-how-to-use-speed-calc-ko",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-speed-calc-ko.component.html"
})
export class HowToUseSpeedCalcKoComponent {
  protected readonly images = SPEED_CALC_IMAGES
}
