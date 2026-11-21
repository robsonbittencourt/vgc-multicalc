import { toID } from "@data/id"
import { DESCRIPTIONS as ENGLISH_DESCRIPTIONS } from "@data/i18n/en"
import { DescriptionKind, Language, registeredDescriptions } from "@data/i18n/localized-names"

export function localizedDescription(kind: DescriptionKind, name: string, language: Language): string {
  const id = toID(name)

  return registeredDescriptions(language)?.[kind][id] ?? ENGLISH_DESCRIPTIONS[kind][id] ?? ""
}
