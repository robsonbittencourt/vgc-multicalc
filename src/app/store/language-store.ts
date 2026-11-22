import { DOCUMENT, registerLocaleData } from "@angular/common"
import { inject, Injectable } from "@angular/core"
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals"
import { Language, LocalizedDescriptions, LocalizedNames, registerDescriptions, registerNames } from "@data/i18n/localized-names"
import { registerUiTexts } from "@app/i18n/ui-text"
import { readUserData, writeTopLevel } from "@store/utils/user-data-storage"

export type LanguageState = {
  language: Language
}

export const LANGUAGE_OPTIONS: { value: Language; label: string; unown: string[] }[] = [
  { value: "en", label: "English", unown: ["e", "n"] },
  { value: "es", label: "Español (España)", unown: ["e", "s"] },
  { value: "es-419", label: "Español (LATAM)", unown: ["e", "s"] },
  { value: "ja", label: "日本語", unown: ["j", "a"] },
  { value: "fr", label: "Français", unown: ["f", "r"] }
]

const LANGUAGES = LANGUAGE_OPTIONS.map(option => option.value)

type LanguageBundle = {
  names: LocalizedNames
  descriptions: LocalizedDescriptions
  ui: Record<string, string>
  locale: unknown[]
}

const LANGUAGE_LOADERS: Record<Exclude<Language, "en">, () => Promise<LanguageBundle>> = {
  es: async () => {
    const [data, ui, locale] = await Promise.all([import("@data/i18n/es"), import("@app/i18n/es/ui"), import("@angular/common/locales/es")])

    return { names: data.NAMES, descriptions: data.DESCRIPTIONS, ui: ui.UI_TEXTS, locale: locale.default }
  },
  "es-419": async () => {
    const [data, ui, locale] = await Promise.all([import("@data/i18n/es-419"), import("@app/i18n/es-419/ui"), import("@angular/common/locales/es-419")])

    return { names: data.NAMES, descriptions: data.DESCRIPTIONS, ui: ui.UI_TEXTS, locale: locale.default }
  },
  ja: async () => {
    const [data, ui, locale] = await Promise.all([import("@data/i18n/ja"), import("@app/i18n/ja/ui"), import("@angular/common/locales/ja")])

    return { names: data.NAMES, descriptions: data.DESCRIPTIONS, ui: ui.UI_TEXTS, locale: locale.default }
  },
  fr: async () => {
    const [data, ui, locale] = await Promise.all([import("@data/i18n/fr"), import("@app/i18n/fr/ui"), import("@angular/common/locales/fr")])

    return { names: data.NAMES, descriptions: data.DESCRIPTIONS, ui: ui.UI_TEXTS, locale: locale.default }
  }
}

const loadedLanguages = new Set<Language>(["en"])

async function loadLanguage(language: Exclude<Language, "en">) {
  const bundle = await LANGUAGE_LOADERS[language]()

  registerLocaleData(bundle.locale, language)
  registerUiTexts(language, bundle.ui)
  registerDescriptions(language, bundle.descriptions)
  registerNames(language, bundle.names)
  loadedLanguages.add(language)
}

function storedLanguage(): Language {
  const stored = readUserData()?.language

  return LANGUAGES.includes(stored) ? stored : "en"
}

@Injectable({ providedIn: "root" })
export class LanguageStore extends signalStore(
  { protectedState: false },
  withState<LanguageState>({ language: "en" }),
  withMethods(store => {
    const document = inject(DOCUMENT)

    return {
      async updateLanguage(language: Language) {
        if (!loadedLanguages.has(language)) await loadLanguage(language as Exclude<Language, "en">)

        patchState(store, () => ({ language }))
        writeTopLevel({ language })
        document.documentElement.lang = language
      }
    }
  }),
  withHooks(store => ({
    onInit() {
      const language = storedLanguage()

      if (language !== "en") store.updateLanguage(language)
    }
  }))
) {}
