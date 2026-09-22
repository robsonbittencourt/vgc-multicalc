import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"

export type FormToggleOption = {
  name: string
  tooltip: string
}

@Component({
  selector: "app-form-toggle-button",
  imports: [MatTooltip],
  templateUrl: "./form-toggle-button.component.html",
  styleUrl: "./form-toggle-button.component.scss"
})
export class FormToggleButtonComponent {
  pokemonId = input.required<string>()
  forms = input.required<[FormToggleOption, FormToggleOption]>()
  dataCy = input.required<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  matches = computed(() => this.forms().some(form => form.name === this.pokemon().name))
  targetForm = computed(() => (this.pokemon().name === this.forms()[0].name ? this.forms()[1] : this.forms()[0]))

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.matches() ? "block" : "none"
    })
  }

  toggleForm(event: Event) {
    event.stopPropagation()
    this.store.name(this.pokemonId(), this.targetForm().name)
  }
}
