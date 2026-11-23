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

    expect([store.language(), document.documentElement.lang]).toEqual(["en", "en"])
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

  it("should load the Latin American Spanish names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("es-419")

    expect([store.language(), localizedName("items", "Sitrus Berry", "es-419"), formatDate(Date.UTC(2026, 9, 31), "d MMM y", "es-419", "UTC")]).toEqual(["es-419", "Baya Citrón", "31 oct 2026"])
  })

  it("should load the Japanese names and mark the page as Japanese", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("ja")

    expect([store.language(), localizedName("items", "Sitrus Berry", "ja"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "y/MM/dd", "ja", "UTC")]).toEqual(["ja", "オボンのみ", "ja", "2026/10/31"])
  })

  it("should load the French names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("fr")

    expect([store.language(), localizedName("items", "Sitrus Berry", "fr"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "d MMM y", "fr", "UTC")]).toEqual(["fr", "Baie Sitrus", "fr", "31 oct. 2026"])
  })

  it("should load the German names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("de")

    expect([store.language(), localizedName("items", "Sitrus Berry", "de"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "d. MMM y", "de", "UTC")]).toEqual(["de", "Tsitrubeere", "de", "31. Okt. 2026"])
  })

  it("should load the Italian names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("it")

    expect([store.language(), localizedName("items", "Sitrus Berry", "it"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "d MMM y", "it", "UTC")]).toEqual(["it", "Baccacedro", "it", "31 ott 2026"])
  })

  it("should load the Korean names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("ko")

    expect([store.language(), localizedName("items", "Sitrus Berry", "ko"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "y. M. d.", "ko", "UTC")]).toEqual(["ko", "자뭉열매", "ko", "2026. 10. 31."])
  })

  it("should load the Simplified Chinese names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("zh-Hans")

    expect([store.language(), localizedName("items", "Sitrus Berry", "zh-Hans"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "y/M/d", "zh-Hans", "UTC")]).toEqual(["zh-Hans", "文柚果", "zh-Hans", "2026/10/31"])
  })

  it("should load the Traditional Chinese names and texts", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("zh-Hant")

    expect([store.language(), localizedName("items", "Sitrus Berry", "zh-Hant"), document.documentElement.lang, formatDate(Date.UTC(2026, 9, 31), "y/M/d", "zh-Hant", "UTC")]).toEqual(["zh-Hant", "文柚果", "zh-Hant", "2026/10/31"])
  })

  it("should format dates in the loaded language", async () => {
    const store = TestBed.inject(LanguageStore)

    await store.updateLanguage("es")

    expect(formatDate(Date.UTC(2026, 9, 31), "d MMM y", "es", "UTC")).toBe("31 oct 2026")
  })
})
