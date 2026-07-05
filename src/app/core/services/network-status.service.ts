import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class NetworkStatusService {
  readonly isOnline = signal(typeof navigator === "undefined" ? true : navigator.onLine)

  constructor() {
    if (typeof window === "undefined") return

    window.addEventListener("online", () => this.isOnline.set(true))
    window.addEventListener("offline", () => this.isOnline.set(false))
  }
}
