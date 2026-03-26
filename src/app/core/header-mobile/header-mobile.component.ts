import { NgClass, TitleCasePipe } from "@angular/common"
import { Component, computed, effect, inject, OnDestroy, signal } from "@angular/core"
import { MatIconButton } from "@angular/material/button"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { ThemeService } from "@lib/theme.service"

@Component({
  selector: "app-header-mobile",
  templateUrl: "./header-mobile.component.html",
  styleUrls: ["./header-mobile.component.scss"],
  imports: [NgClass, MatIconButton, MatIcon, MatDivider, TitleCasePipe]
})
export class HeaderMobileComponent implements OnDestroy {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  themeService = inject(ThemeService)

  menuOpen = signal(false)

  hasFooter = computed(() => this.menuStore.oneVsManyActivated() || this.menuStore.manyVsOneActivated())

  constructor() {
    effect(() => {
      if (this.menuOpen()) {
        document.body.classList.add("menu-open")
      } else {
        document.body.classList.remove("menu-open")
      }
    })
  }

  ngOnDestroy() {
    document.body.classList.remove("menu-open")
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen())
  }

  closeMenu() {
    this.menuOpen.set(false)
  }

  enableOneVsOne() {
    this.menuStore.enableOneVsOne()
    this.store.updateSecondAttacker("")
    this.closeMenu()
  }

  enableOneVsMany() {
    this.menuStore.enableOneVsMany()
    this.closeMenu()
  }

  enableManyVsOne() {
    this.menuStore.enableManyVsOne()
    this.store.updateSecondAttacker("")
    this.closeMenu()
  }

  enableSpeedCalculator() {
    this.menuStore.enableSpeedCalculator()
    this.closeMenu()
  }

  enableHowToUse() {
    this.menuStore.enableHowToUse()
    this.closeMenu()
  }
}
