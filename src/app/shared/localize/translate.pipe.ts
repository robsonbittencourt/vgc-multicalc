import { inject, Pipe, PipeTransform } from "@angular/core"
import { uiText, UiTextParams } from "@app/i18n/ui-text"
import { LanguageStore } from "@store/language-store"

@Pipe({
  name: "t",
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private languageStore = inject(LanguageStore)

  transform(text: string | null | undefined, params?: UiTextParams): string {
    if (!text) return ""

    return uiText(text, this.languageStore.language(), params)
  }
}
