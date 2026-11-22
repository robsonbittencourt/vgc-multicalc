import { localizedOptions } from "@shared/localize/localized-options"
import { NAMES as NAMES_ES } from "@data/i18n/es"
import { NAMES as NAMES_JA } from "@data/i18n/ja"
import { registerNames } from "@data/i18n/localized-names"

describe("localizedOptions", () => {
  beforeAll(() => {
    registerNames("es", NAMES_ES)
    registerNames("ja", NAMES_JA)
  })

  it("should label each name in the selected language and keep the English name as value", () => {
    const options = localizedOptions("pokemon", ["Rotom-Wash", "Incineroar"], "es")

    expect(options).toEqual([
      { key: "Incineroar", value: "Incineroar" },
      { key: "Rotom-Lavado", value: "Rotom-Wash" }
    ])
  })

  it("should order the options by their label", () => {
    const options = localizedOptions("moves", ["Trick Room", "Tailwind", "Fake Out"], "es")

    expect(options.map(option => option.key)).toEqual(["Espacio Raro", "Sorpresa", "Viento Afín"])
  })

  it("should order Japanese labels by their sound, mixing hiragana and katakana", () => {
    const options = localizedOptions("moves", ["Trick Room", "Tailwind", "Fake Out"], "ja")

    expect(options.map(option => option.key)).toEqual(["おいかぜ", "トリックルーム", "ねこだまし"])
  })

  it("should keep the given order when asked not to sort", () => {
    const options = localizedOptions("moves", ["Trick Room", "Tailwind", "Fake Out"], "es", false)

    expect(options.map(option => option.key)).toEqual(["Espacio Raro", "Viento Afín", "Sorpresa"])
  })
})
