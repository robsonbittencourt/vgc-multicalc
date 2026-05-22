import { NgClass, TitleCasePipe } from "@angular/common"
import { Component, computed, effect, inject, OnDestroy, signal } from "@angular/core"
import { Router } from "@angular/router"
import { MatIconButton } from "@angular/material/button"
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatDivider } from "@angular/material/divider"
import { MatIcon } from "@angular/material/icon"
import { ActiveFieldService } from "@data/store/active-field.service"
import { CalculatorStore, Game } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { SnackbarService } from "@lib/snackbar.service"
import { Color, Theme, ThemeService } from "@lib/theme.service"

@Component({
  selector: "app-header-mobile",
  templateUrl: "./header-mobile.component.html",
  styleUrls: ["./header-mobile.component.scss"],
  imports: [NgClass, MatIconButton, MatIcon, MatButtonToggleGroup, MatButtonToggle, MatDivider, TitleCasePipe]
})
export class HeaderMobileComponent implements OnDestroy {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  themeService = inject(ThemeService)
  activeFieldService = inject(ActiveFieldService)
  private snackBar = inject(SnackbarService)
  private router = inject(Router)

  menuOpen = signal(false)
  pressedItemId = signal<string | null>(null)

  hasFooter = computed(() => this.menuStore.oneVsManyActivated() || this.menuStore.manyVsOneActivated() || this.menuStore.probabilityCalcActivated() || this.menuStore.typeCalcActivated())

  constructor() {
    effect(() => {
      if (typeof document === "undefined") return

      if (this.menuOpen()) {
        document.body.classList.add("menu-open")
      } else {
        document.body.classList.remove("menu-open")
      }
    })
  }

  ngOnDestroy() {
    if (typeof document === "undefined") return

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
      this.router.navigate(["one-vs-one"])
      this.store.updateSecondAttacker("")
    })
  }

  enableOneVsMany() {
    this.updateMenuWithFeedback("1vMany", () => this.router.navigate(["team-vs-many"]))
  }

  enableManyVsOne() {
    this.updateMenuWithFeedback("Manyv1", () => {
      this.router.navigate(["many-vs-team"])
      this.store.updateSecondAttacker("")
    })
  }

  enableSpeedCalculator() {
    this.updateMenuWithFeedback("speed", () => this.router.navigate(["speed-calc"]))
  }

  enableProbabilityCalc() {
    this.updateMenuWithFeedback("probability", () => this.router.navigate(["probability-calc"]))
  }

  enableTypeCalculator() {
    this.updateMenuWithFeedback("type", () => this.router.navigate(["type-calc"]))
  }

  enableHowToUse() {
    this.updateMenuWithFeedback("howToUse", () => this.router.navigate(["how-to-use"]))
  }

  setTheme(themeName: Theme) {
    this.updateMenuWithFeedback(`theme-${themeName}`, () => this.themeService.setTheme(themeName), false)
  }

  setColor(colorName: Color) {
    this.updateMenuWithFeedback(`color-${colorName}`, () => this.themeService.setColor(colorName), false)
  }

  async shareCalcs() {
    const id = crypto.randomUUID()
    const activeStore = this.activeFieldService.activeStore()
    const activeField = typeof activeStore?.field === "function" ? activeStore.field() : null
    const userData = { ...this.store.buildUserData(), field: activeField ? { ...activeField } : null }
    fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData)
    })
    const link = `https://vgcmulticalc.com/data/${id}`

    if (navigator.share) {
      try {
        await navigator.share({ title: "VGC Multi Calc", url: link })
        return
      } catch (_) {
        // share cancelled or failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(link)
      this.snackBar.open("Link copied to clipboard!")
    } catch {
      this.snackBar.open(link)
    }
  }

  onGameChange(event: MatButtonToggleChange) {
    this.store.updateGame(event.value as Game)
  }
}
