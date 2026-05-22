import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-not-found-page",
  templateUrl: "./not-found-page.component.html",
  styleUrls: ["./not-found-page.component.scss"],
  imports: [RouterLink]
})
export class NotFoundPageComponent implements OnInit {
  private meta = inject(Meta)
  private title = inject(Title)

  ngOnInit() {
    this.title.setTitle("Page Not Found - VGC Multi Calc")
    this.meta.updateTag({ name: "robots", content: "noindex, follow" })
  }
}
