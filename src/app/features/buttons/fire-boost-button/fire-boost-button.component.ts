import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"

@Component({
  selector: "app-fire-boost-button",
  imports: [MatTooltip],
  templateUrl: "./fire-boost-button.component.html",
  styleUrl: "./fire-boost-button.component.scss"
})
export class FireBoostButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  hasFlashFire = computed(() => this.pokemon().ability.is("Flash Fire"))
  visible = computed(() => this.hasFlashFire() || this.pokemon().canHaveFireBoost)
  active = computed(() => (this.hasFlashFire() ? this.pokemon().ability.on : this.pokemon().fireBoost))

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.visible() ? "block" : "none"
    })
  }

  toggleFireBoost(event: Event) {
    event.stopPropagation()
    if (this.hasFlashFire()) {
      this.store.abilityOn(this.pokemonId(), !this.active())

      return
    }

    this.store.fireBoost(this.pokemonId(), !this.active())
  }
}
