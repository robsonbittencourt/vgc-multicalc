import { DOCUMENT } from "@angular/common"
import { Component, inject, input, OnInit, ViewEncapsulation } from "@angular/core"
import { Router } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-how-to-use-subpage",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="subpage-container">
      <div class="back-nav">
        <div class="back-button" (click)="onBack()">
          <mat-icon>arrow_back_ios_new</mat-icon>
          <span>Back</span>
        </div>
      </div>

      <div class="header">
        <h2>{{ title() }}</h2>
      </div>

      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: "./how-to-use-subpage.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class HowToUseSubpageComponent implements OnInit {
  private router = inject(Router)
  private document = inject(DOCUMENT)

  title = input.required<string>()

  ngOnInit() {
    this.document.body.scrollTo({ top: 0, behavior: "instant" })
    this.document.documentElement.scrollTo({ top: 0, behavior: "instant" })
  }

  onBack() {
    this.router.navigate(["/how-to-use"])
  }
}
