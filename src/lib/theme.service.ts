import { computed, inject, Injectable } from "@angular/core"
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

  constructor() {
    this.applyTheme()
    this.applyCollor()
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
    const colorScheme = this.store.theme() === "system" ? "light dark" : this.store.theme()
    document.body.style.colorScheme = colorScheme
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
    document.body.className = `${this.store.color()}-theme`
  }
}
