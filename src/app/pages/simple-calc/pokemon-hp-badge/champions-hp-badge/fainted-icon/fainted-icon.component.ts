import { ChangeDetectionStrategy, Component, input } from "@angular/core"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "svg:g[app-champions-fainted-icon]",
  templateUrl: "./fainted-icon.component.html",
  host: {
    "[class.fainted-icon]": "animate()"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaintedIconComponent {
  animate = input<boolean>(false)
}
