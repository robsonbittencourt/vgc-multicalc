import { Language } from "@data/i18n/localized-names"
import { RawDesc } from "@data/types"
import { KoPhrases } from "@calc/engine/ko-phrases"
import { DESCRIPTION_EN } from "@calc/engine/description-text"
import { DESCRIPTION_ES, DESCRIPTION_ES_419 } from "@calc/engine/description-text-es"

export type DescriptionLanguage = {
  ko: KoPhrases
  description: (rawDesc: RawDesc, omitDefenderItem?: boolean) => string
  attacker: (rawDesc: RawDesc) => string
  defenderTail: (rawDesc: RawDesc, omitDefenderItem?: boolean) => string
  name: (name: string) => string
  stats: (text: string) => string
  residual: (text: string) => string
  reducedBy: (item: string) => string
  staminaConsidered: () => string
  statChangesConsidered: string
  overTurns: (turns: number) => string
  and: string
  worstMoveEver: string
}

let languages: Record<Language, DescriptionLanguage> | undefined

export function descriptionLanguage(language: Language): DescriptionLanguage {
  languages ??= { en: DESCRIPTION_EN, es: DESCRIPTION_ES, "es-419": DESCRIPTION_ES_419 }

  return languages[language]
}

export function koAfterSeparator(language: Language): string {
  return descriptionLanguage(language).ko.afterSeparator
}
