import { Injectable, signal } from "@angular/core"

@Injectable({ providedIn: "root" })
export class HeaderVisibilityService {
  readonly hidden = signal(false)

  hide() {
    this.hidden.set(true)
  }

  show() {
    this.hidden.set(false)
  }

  reset() {
    this.hidden.set(false)
  }
}
