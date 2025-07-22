import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ThemeStore } from "@data/store/theme-store"

describe("Theme Store", () => {
  let store: ThemeStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    store = TestBed.inject(ThemeStore)
  })

  describe("Methods", () => {
    it("should change theme to Dark", () => {
      store.updateTheme("light")

      store.updateTheme("dark")

      expect(store.theme()).toBe("dark")
    })

    it("should change color to purple", () => {
      store.updateColor("green")

      store.updateColor("purple")

      expect(store.color()).toBe("purple")
    })
  })

  describe("User Data", () => {
    beforeEach(() => {
      const store: Record<string, string | null> = {}

      spyOn(localStorage, "getItem").and.callFake((key: string): string | null => {
        return store[key] || null
      })

      spyOn(localStorage, "setItem").and.callFake((key: string, value: string): void => {
        store[key] = value
      })
    })

    it("should update local storage when state changes", () => {
      store.updateTheme("dark")

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.themeData.theme).toBe("dark")
    })

    it("should update local storage when state changes mantaining existent data", () => {
      store.updateColor("red")

      TestBed.tick()

      const actualStorage = JSON.parse(localStorage.getItem("userData")!)
      expect(actualStorage.themeData.color).toBe("red")
    })
  })
})
