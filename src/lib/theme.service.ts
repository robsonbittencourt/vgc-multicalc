import { computed, inject, Injectable, signal } from "@angular/core"
import { ThemeStore } from "@data/store/theme-store"

export type Theme = "light" | "dark" | "system"
export type Color = "purple" | "green" | "gray" | "yellow" | "red" | "blue"

export interface AppTheme {
  name: Theme
  icon: string
  pokemon: string
}

export interface AppColor {
  name: Color
  pokemon: string
}

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  store = inject(ThemeStore)

  selectedTheme = computed(() => this.themes.find(theme => theme.name === this.store.theme())!)
  selectedColor = computed(() => this.colors.find(color => color.name === this.store.color())!)

  applied = signal(false)

  constructor() {
    this.applyTheme()
    this.applyCollor()
    this.applied.set(true)
  }

  themes: AppTheme[] = [
    { name: "light", icon: "light_mode", pokemon: "espeon" },
    { name: "dark", icon: "dark_mode", pokemon: "umbreon" },
    { name: "system", icon: "desktop_windows", pokemon: "porygon2" }
  ]

  getThemes(): AppTheme[] {
    return this.themes
  }

  setTheme(name: Theme) {
    this.store.updateTheme(name)
    this.applyTheme()
  }

  private applyTheme() {
    if (typeof document === "undefined") return

    const theme = this.store.theme()
    const colorScheme = theme === "system" ? "light dark" : theme
    document.body.style.colorScheme = colorScheme

    const allMetas = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'))
    const [light, dark] = allMetas

    if (!light || !dark) return

    if (theme === "dark") {
      light.setAttribute("media", "not all")
      dark.removeAttribute("media")
    } else if (theme === "light") {
      light.removeAttribute("media")
      dark.setAttribute("media", "not all")
    } else {
      light.setAttribute("media", "(prefers-color-scheme: light)")
      dark.setAttribute("media", "(prefers-color-scheme: dark)")
    }
  }

  colors: AppColor[] = [
    { name: "purple", pokemon: "misdreavus" },
    { name: "gray", pokemon: "donphan" },
    { name: "green", pokemon: "tyranitar" },
    { name: "yellow", pokemon: "raikou" },
    { name: "red", pokemon: "entei" },
    { name: "blue", pokemon: "suicune" }
  ]

  getColors(): AppColor[] {
    return this.colors
  }

  setColor(color: Color) {
    this.store.updateColor(color)
    this.applyCollor()
  }

  private applyCollor() {
    if (typeof document === "undefined") return

    document.body.className = `${this.store.color()}-theme`
  }
}
