import { toID } from "@data/id"

export type Language = "en" | "es" | "es-419"

export type NameKind = "pokemon" | "moves" | "abilities" | "items" | "natures" | "types"

export type LocalizedNames = Record<NameKind, Record<string, string>>

export type DescriptionKind = "moves" | "abilities" | "items"

export type LocalizedDescriptions = Record<DescriptionKind, Record<string, string>>

const NAMES: Partial<Record<Language, LocalizedNames>> = {}

const DESCRIPTIONS: Partial<Record<Language, LocalizedDescriptions>> = {}

const NAMES_WITH_HYPHEN = ["Porygon-Z", "Ho-Oh", "Jangmo-o", "Hakamo-o", "Kommo-o", "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"]

export function registerNames(language: Language, names: LocalizedNames) {
  NAMES[language] = names
}

export function registerDescriptions(language: Language, descriptions: LocalizedDescriptions) {
  DESCRIPTIONS[language] = descriptions
}

export function registeredDescriptions(language: Language): LocalizedDescriptions | undefined {
  return DESCRIPTIONS[language]
}

export function localizedName(kind: NameKind, name: string, language: Language): string {
  const names = NAMES[language]

  if (!names) return name

  return names[kind][toID(name)] ?? name
}

export function pokemonDisplayName(name: string, language: Language): string {
  const localized = NAMES[language]?.pokemon[toID(name)] ?? name

  return NAMES_WITH_HYPHEN.includes(name) ? localized : localized.replaceAll("-", " ")
}

export function pokemonDisplayNameWithoutSuffix(name: string, language: Language): string {
  const species = NAMES_WITH_HYPHEN.includes(name) || !name.includes("-") ? name : name.substring(0, name.indexOf("-"))

  return pokemonDisplayName(species, language)
}
