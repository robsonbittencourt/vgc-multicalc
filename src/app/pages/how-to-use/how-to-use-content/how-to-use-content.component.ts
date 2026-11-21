import { NgComponentOutlet } from "@angular/common"
import { Component, computed, inject, input, resource, Type } from "@angular/core"
import { Language } from "@data/i18n/localized-names"
import { LanguageStore } from "@store/language-store"

export type HowToUseContent = {
  en: Type<unknown>
  translations: Partial<Record<Exclude<Language, "en">, () => Promise<Type<unknown>>>>
}

@Component({
  selector: "app-how-to-use-content",
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="component()" />`
})
export class HowToUseContentComponent {
  content = input.required<HowToUseContent>()

  private language = inject(LanguageStore).language

  private translated = resource({
    params: () => {
      const language = this.language()
      const loader = language === "en" ? undefined : this.content().translations[language]

      return loader ? { loader } : undefined
    },
    loader: ({ params }) => params.loader()
  })

  component = computed(() => (this.translated.hasValue() ? this.translated.value() : this.content().en))
}
