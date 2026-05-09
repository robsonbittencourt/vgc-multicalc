import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { Status } from "@lib/model/status"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "svg:g[app-champions-status-icon]",
  templateUrl: "./status-icon.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusIconComponent {
  status = input.required<Status>()

  protected readonly Status = Status
}
