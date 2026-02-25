import { Component, input, output, ViewEncapsulation } from "@angular/core"
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
export class HowToUseSubpageComponent {
  title = input.required<string>()
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
