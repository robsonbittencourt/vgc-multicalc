import { Component, input, linkedSignal, output } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { SwipeTabsDirective } from "@shared/swipe-tabs/swipe-tabs.directive"

@Component({
  selector: "app-mobile-calc-shell",
  templateUrl: "./mobile-calc-shell.component.html",
  styleUrl: "./mobile-calc-shell.component.scss",
  imports: [NgClass, MatIcon, SwipeTabsDirective]
})
export class MobileCalcShellComponent {
  tabs = input.required<CalcTab[]>()
  activeTab = input.required<string>()
  bottomNavHidden = input<boolean>(false)
  swipeDisabled = input<boolean>(false)

  tabSelected = output<string>()

  activeTabIndex = linkedSignal(() => this.tabs().findIndex(tab => tab.id === this.activeTab()))

  onSwipeIndexChange(index: number) {
    this.tabSelected.emit(this.tabs()[index].id)
  }
}
