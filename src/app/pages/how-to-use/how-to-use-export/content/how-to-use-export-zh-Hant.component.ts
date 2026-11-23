import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { EXPORT_IMAGES } from "@pages/how-to-use/how-to-use-export/how-to-use-export-images"

@Component({
  selector: "app-how-to-use-export-zh-hant",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-export-zh-Hant.component.html"
})
export class HowToUseExportZhHantComponent {
  protected readonly images = EXPORT_IMAGES
}
