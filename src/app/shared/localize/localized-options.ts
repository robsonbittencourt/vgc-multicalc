import { Language, localizedName, NameKind } from "@data/i18n/localized-names"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"

export function localizedOptions(kind: NameKind, names: string[], language: Language, sortByLabel = true): KeyValuePair[] {
  const options = names.map(name => ({ key: localizedName(kind, name, language), value: name }))

  if (!sortByLabel) return options

  return options.sort((a, b) => a.key.localeCompare(b.key))
}
