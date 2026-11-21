import { inject, Pipe, PipeTransform } from "@angular/core"
import { localizedName, NameKind, pokemonDisplayName, pokemonDisplayNameWithoutSuffix } from "@data/i18n/localized-names"
import { LanguageStore } from "@store/language-store"

export type LocalizedNameKind = NameKind | "pokemonDisplay" | "pokemonWithoutSuffix"

@Pipe({
  name: "localizeName",
  pure: false
})
export class LocalizeNamePipe implements PipeTransform {
  private languageStore = inject(LanguageStore)

  transform(name: string | null | undefined, kind: LocalizedNameKind): string {
    if (!name) return ""

    const language = this.languageStore.language()

    if (kind === "pokemonDisplay") return pokemonDisplayName(name, language)

    if (kind === "pokemonWithoutSuffix") return pokemonDisplayNameWithoutSuffix(name, language)

    return localizedName(kind, name, language)
  }
}
