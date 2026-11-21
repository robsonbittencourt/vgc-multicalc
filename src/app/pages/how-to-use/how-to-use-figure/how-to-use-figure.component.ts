import { Component, input } from "@angular/core"

export type HowToUseImageFile = {
  src: string
  width: number
  height: number
}

export type HowToUseImage = {
  light: HowToUseImageFile
  dark: HowToUseImageFile
  lightMobile?: HowToUseImageFile
  darkMobile?: HowToUseImageFile
}

@Component({
  selector: "app-how-to-use-figure",
  templateUrl: "./how-to-use-figure.component.html",
  styleUrl: "./how-to-use-figure.component.scss"
})
export class HowToUseFigureComponent {
  image = input.required<HowToUseImage>()
  alt = input.required<string>()
}
