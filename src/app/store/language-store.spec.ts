import { formatDate } from "@angular/common"
import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { LanguageStore } from "@store/language-store"
import { localizedName } from "@data/i18n/localized-names"

describe("Language Store", () => {
  beforeEach(() => {
    localStorage.clear()

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })
  })

  afterEach(() => localStorage.clear())

  it("should start in English when nothing is stored", () => {
    const store = TestBed.inject(LanguageStore)

    expect(store.language()).toBe("en")
  })

  it("should switch to the stored language once its names are loaded", async () => {
    localStorage.setItem("userData", JSON.stringify({ language: "es" }))

    const store = TestBed.inject(LanguageStore)

    await vi.waitFor(() => expect(store.language()).toBe("es"), { timeout: 10000 })
    expect(localizedName("moves", "Trick Room", store.language())).toBe("Espacio Raro")
  })

  it("should go back to English without loading anything", async () => {
    const store = TestBed.inject(LanguageStore)
    await store.updateLanguage("es")

    await store.updateLanguage("en")

    expect(store.language()).toBe("en")
  })

  it("should start in English when the stored language is not supported", () => {
    localStorage.setItem("userData", JSON.stringify({ language: "pt" }))

    const store = TestBed.inject(LanguageStore)

    expect(store.language()).toBe("en")
  })

  it("should change the language and store it keeping the other user data", async () => {
    localStorage.setItem("userData", JSON.stringify({ themeData: { theme: "dark" } }))
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("es")

    expect(store.language()).toBe("es")
    expect(JSON.parse(localStorage.getItem("userData")!)).toEqual({ themeData: { theme: "dark" }, language: "es" })
  })

  it("should format dates in the loaded language", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("es")

    expect(formatDate(Date.UTC(2026, 9, 31), "d MMM y", "es", "UTC")).toBe("31 oct 2026")
  })
})
