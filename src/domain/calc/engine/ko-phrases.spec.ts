import { KO_PHRASES_EN } from "@calc/engine/ko-phrases"
import { KO_PHRASES_ES, KO_PHRASES_ES_419 } from "@calc/engine/description-text-es"
import { descriptionLanguage, koAfterSeparator } from "@calc/engine/description-language"
import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_ES } from "@data/i18n/es"
import { NAMES as NAMES_ES_419 } from "@data/i18n/es-419"

describe("KO phrases", () => {
  beforeAll(() => {
    registerNames("es", NAMES_ES)
    registerNames("es-419", NAMES_ES_419)
  })

  it("should pick the phrases of the language", () => {
    const phrases = [descriptionLanguage("en").ko, descriptionLanguage("es").ko, descriptionLanguage("es-419").ko]

    expect(phrases).toEqual([KO_PHRASES_EN, KO_PHRASES_ES, KO_PHRASES_ES_419])
  })

  it("should give the word that starts the end of turn effects in each language", () => {
    const separators = [koAfterSeparator("en"), koAfterSeparator("es"), koAfterSeparator("es-419")]

    expect(separators).toEqual([" after ", " tras ", " luego de "])
  })

  it("should write the KO phrases in Spanish", () => {
    const es = KO_PHRASES_ES
    const texts = [
      es.koTurn(1, false),
      es.koTurn(3, false),
      es.koTurn(2, true),
      es.qualifier("approx. "),
      es.qualifier(""),
      es.after(["Stealth Rock"]),
      es.afterEndOfTurn(["Leftovers recovery", "burn damage"]),
      es.possible("2HKO"),
      es.guaranteed("OHKO"),
      es.chance(31.3, "OHKO"),
      es.notAKo,
      es.tenOrMore
    ]

    expect(texts).toEqual(["OHKO", "3HKO", "KO en 2 turnos", "aprox. ", "", " tras Trampa Rocas", " tras recuperación de Restos y daño por quemadura", "2HKO posible", "OHKO garantizado", "31.3% de probabilidad de OHKO", "no hace KO", "10HKO o más"])
  })

  it("should write the end of turn effects with the Latin American names and wording", () => {
    const texts = [KO_PHRASES_ES_419.after(["Stealth Rock"]), KO_PHRASES_ES_419.afterEndOfTurn(["Leftovers recovery", "burn damage"]), KO_PHRASES_ES_419.guaranteed("2HKO")]

    expect(texts).toEqual([" luego de Trampa de Rocas", " luego de recuperación de Restos y daño por quemadura", "2HKO garantizado"])
  })
})
