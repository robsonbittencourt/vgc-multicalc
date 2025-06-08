import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ThemeStore } from "@data/store/theme-store"
import { Color, Theme, ThemeService } from "./theme.service"

describe("ThemeService", () => {
  let service: ThemeService

  let storeSpy: any

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj("ThemeStore", ["theme", "color", "updateTheme", "updateColor"])

    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: ThemeStore, useValue: storeSpy }, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(ThemeService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return all themes", () => {
    const themes = service.getThemes()
    expect(themes.length).toBeGreaterThan(0)
  })

  it("should return all colors", () => {
    const colors = service.getColors()
    expect(colors.length).toBeGreaterThan(0)
  })

  it("should set and apply theme", () => {
    const theme: Theme = "dark"
    storeSpy.theme.and.returnValue(theme)

    service.setTheme(theme)

    expect(storeSpy.updateTheme).toHaveBeenCalledWith(theme)
    expect(document.body.style.colorScheme).toBe(theme)
  })

  it("should set and apply color", () => {
    const color: Color = "blue"
    storeSpy.color.and.returnValue(color)

    service.setColor(color)

    expect(storeSpy.updateColor).toHaveBeenCalledWith(color)
    expect(document.body.className).toBe(`${color}-theme`)
  })

  it("should apply system theme correctly", () => {
    storeSpy.theme.and.returnValue("system")

    service.setTheme("system")

    expect(document.body.style.colorScheme).toBe("light dark")
  })

  it("should return the selected theme", () => {
    storeSpy.theme.and.returnValue("dark")

    const selectedTheme = service.selectedTheme()

    expect(selectedTheme.name).toBe("dark")
    expect(selectedTheme.icon).toBe("dark_mode")
    expect(selectedTheme.pokemon).toBe("umbreon")
  })

  it("should return the selected color", () => {
    storeSpy.color.and.returnValue("blue")

    const selectedColor = service.selectedColor()

    expect(selectedColor.name).toBe("blue")
    expect(selectedColor.pokemon).toBe("suicune")
  })
})
