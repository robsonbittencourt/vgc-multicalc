import { registerLocaleData } from "@angular/common"
import { Injectable } from "@angular/core"
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals"
import { Language, LocalizedDescriptions, LocalizedNames, registerDescriptions, registerNames } from "@data/i18n/localized-names"
import { registerUiTexts } from "@app/i18n/ui-text"
import { readUserData, writeTopLevel } from "@store/utils/user-data-storage"

export type LanguageState = {
  language: Language
}

export const LANGUAGE_OPTIONS: { value: Language; label: string; unown: string[] }[] = [
  { value: "en", label: "English", unown: ["e", "n"] },
  { value: "es", label: "Español", unown: ["e", "s"] }
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
  withMethods(store => ({
    async updateLanguage(language: Language) {
      if (!loadedLanguages.has(language)) await loadLanguage(language as Exclude<Language, "en">)

      patchState(store, () => ({ language }))
      writeTopLevel({ language })
    }
  })),
  withHooks(store => ({
    onInit() {
      const language = storedLanguage()

      if (language !== "en") store.updateLanguage(language)
    }
  }))
) {}
