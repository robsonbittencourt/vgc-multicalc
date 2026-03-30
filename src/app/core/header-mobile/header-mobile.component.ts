import { NgClass, TitleCasePipe } from "@angular/common"
import { Component, computed, effect, inject, OnDestroy, signal } from "@angular/core"
import { MatIconButton } from "@angular/material/button"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { Color, Theme, ThemeService } from "@lib/theme.service"

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
  pressedItemId = signal<string | null>(null)

  hasFooter = computed(() => this.menuStore.oneVsManyActivated() || this.menuStore.manyVsOneActivated() || this.menuStore.probabilityCalcActivated() || this.menuStore.typeCalcActivated())

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

  private updateMenuWithFeedback(itemId: string, action: () => void, shouldCloseMenu = true) {
    this.pressedItemId.set(itemId)

    setTimeout(() => {
      action()
      if (shouldCloseMenu) {
        this.closeMenu()
      }
      this.pressedItemId.set(null)
    }, 0)
  }

  enableOneVsOne() {
    this.updateMenuWithFeedback("1v1", () => {
      this.menuStore.enableOneVsOne()
      this.store.updateSecondAttacker("")
    })
  }

  enableOneVsMany() {
    this.updateMenuWithFeedback("1vMany", () => this.menuStore.enableOneVsMany())
  }

  enableManyVsOne() {
    this.updateMenuWithFeedback("Manyv1", () => {
      this.menuStore.enableManyVsOne()
      this.store.updateSecondAttacker("")
    })
  }

  enableSpeedCalculator() {
    this.updateMenuWithFeedback("speed", () => this.menuStore.enableSpeedCalculator())
  }

  enableProbabilityCalc() {
    this.updateMenuWithFeedback("probability", () => this.menuStore.enableProbabilityCalculator())
  }

  enableTypeCalculator() {
    this.updateMenuWithFeedback("type", () => this.menuStore.enableTypeCalculator())
  }

  enableHowToUse() {
    this.updateMenuWithFeedback("howToUse", () => this.menuStore.enableHowToUse())
  }

  setTheme(themeName: Theme) {
    this.updateMenuWithFeedback(`theme-${themeName}`, () => this.themeService.setTheme(themeName), false)
  }

  setColor(colorName: Color) {
    this.updateMenuWithFeedback(`color-${colorName}`, () => this.themeService.setColor(colorName), false)
  }
}
