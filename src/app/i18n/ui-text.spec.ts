import { ENGLISH, registerUiTexts, translateTo, uiText } from "@app/i18n/ui-text"
import { UI_TEXTS as UI_ES } from "@app/i18n/es/ui"

describe("uiText", () => {
  beforeAll(() => registerUiTexts("es", UI_ES))

  it("should keep the English text when the language is English", () => {
    const text = uiText("Remaining", "en")

    expect(text).toBe("Remaining")
  })

  it("should translate the text to the registered language", () => {
    const text = uiText("Remaining", "es")

    expect(text).toBe("Restantes")
  })

  it("should keep the English text when there is no translation", () => {
    const text = uiText("Not a known text", "es")

    expect(text).toBe("Not a known text")
  })

  it("should fill the placeholders with the given values", () => {
    const texts = [uiText("Outspeed {name}", "en", { name: "Dragonite" }), uiText("Outspeed {name}", "es", { name: "Dragonite" }), uiText("{count} immunities", "es", { count: 2 })]

    expect(texts).toEqual(["Outspeed Dragonite", "Superar a Dragonite", "2 inmunidades"])
  })

  it("should translate the default team names", () => {
    const names = [uiText("Team 3", "es"), uiText("Team 3", "en"), uiText("Team Rocket", "es")]

    expect(names).toEqual(["Equipo 3", "Team 3", "Team Rocket"])
  })

  it("should translate the usage of a Speed", () => {
    const texts = [uiText("33% Usage", "es"), uiText("12.5% Usage", "es"), uiText("33% Usage", "en")]

    expect(texts).toEqual(["33% Uso", "12.5% Uso", "33% Usage"])
  })

  it("should translate the name of a Regulation", () => {
    const texts = [uiText("Regulation M-C", "es"), uiText("Regulation F", "es"), uiText("Regulation M-C", "en")]

    expect(texts).toEqual(["Regulación M-C", "Regulación F", "Regulation M-C"])
  })

  it("should not treat a text with values as a default team name", () => {
    const text = uiText("Team 3", "es", { number: 4 })

    expect(text).toBe("Team 3")
  })

  it("should keep a placeholder that has no value", () => {
    const text = uiText("Outspeed {name}", "en", { other: "Dragonite" })

    expect(text).toBe("Outspeed {name}")
  })
})

describe("translateTo", () => {
  beforeAll(() => registerUiTexts("es", UI_ES))

  it("should translate to the chosen language", () => {
    const translate = translateTo("es")

    expect(translate("Costs {cost}", { cost: "4 SPs" })).toBe("Cuesta 4 SPs")
  })

  it("should keep English with the default translator", () => {
    const text = ENGLISH("Costs {cost}", { cost: "4 SPs" })

    expect(text).toBe("Costs 4 SPs")
  })
})
