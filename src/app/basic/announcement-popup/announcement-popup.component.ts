import { Component, input, OnInit, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"

const STORAGE_KEY = "announcementDismissed"

@Component({
  selector: "app-announcement-popup",
  templateUrl: "./announcement-popup.component.html",
  styleUrl: "./announcement-popup.component.scss",
  imports: [MatButton]
})
export class AnnouncementPopupComponent implements OnInit {
  title = input.required<string>()
  messages = input.required<string[]>()
  version = input.required<string>()
  image = input<string>()

  visible = signal(false)

  ngOnInit() {
    if (typeof localStorage === "undefined") return

    this.visible.set(localStorage.getItem(STORAGE_KEY) !== this.version())
  }

  close() {
    this.visible.set(false)
  }

  dismissForever() {
    localStorage.setItem(STORAGE_KEY, this.version())
    this.visible.set(false)
  }
}
