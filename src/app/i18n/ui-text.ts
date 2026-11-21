import { Language } from "@data/i18n/localized-names"

export type UiTextParams = Record<string, string | number>

const TEXTS: Partial<Record<Language, Record<string, string>>> = {}

export function registerUiTexts(language: Language, texts: Record<string, string>) {
  TEXTS[language] = texts
}

const TEXTS_WITH_VALUE: { pattern: RegExp; text: string; param: string }[] = [
  { pattern: /^Team (\d+)$/, text: "Team {number}", param: "number" },
  { pattern: /^([\d.]+)% Usage$/, text: "{percentage}% Usage", param: "percentage" },
  { pattern: /^Regulation ([A-Z][\w-]*)$/, text: "Regulation {id}", param: "id" }
]

export function uiText(text: string, language: Language, params?: UiTextParams): string {
  if (!params) {
    for (const { pattern, text: template, param } of TEXTS_WITH_VALUE) {
      const value = text.match(pattern)

      if (value) return uiText(template, language, { [param]: value[1] })
    }
  }

  const translated = TEXTS[language]?.[text] ?? text

  if (!params) return translated

  return translated.replace(/\{(\w+)\}/g, (placeholder, key: string) => (key in params ? String(params[key]) : placeholder))
}

export type Translate = (text: string, params?: UiTextParams) => string

export const translateTo =
  (language: Language): Translate =>
  (text, params) =>
    uiText(text, language, params)

export const ENGLISH: Translate = translateTo("en")
