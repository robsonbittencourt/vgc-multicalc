import { Component, computed, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"
import { Stats } from "@lib/types"

@Component({
  selector: "app-terastal-button",
  imports: [MatTooltip],
  templateUrl: "./terastal-button.component.html",
  styleUrl: "./terastal-button.component.scss"
})
export class TerastalButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  teraTypeActive = computed(() => this.pokemon().teraTypeActive)

  boostChanged = false

  terastalyzePokemon(event: Event) {
    event.stopPropagation()

    if (this.pokemon().name === "Terapagos") {
      return
    }

    if (this.pokemon().name === "Terapagos-Stellar") {
      this.store.name(this.pokemonId(), "Terapagos-Terastal")
      this.store.ability(this.pokemonId(), "Tera Shell")
      this.store.teraTypeActive(this.pokemonId(), false)
      return
    }

    if (this.pokemon().name === "Terapagos-Terastal") {
      this.store.name(this.pokemonId(), "Terapagos-Stellar")
      this.store.ability(this.pokemonId(), "Teraform Zero")
      this.store.teraTypeActive(this.pokemonId(), true)
      return
    }

    if (this.pokemon().isOgerpon) {
      this.updateOgerponData()
      return
    }

    this.store.teraTypeActive(this.pokemonId(), !this.teraTypeActive())
  }

  private updateOgerponData() {
    const teraTypeActive = !this.teraTypeActive()
    this.store.teraTypeActive(this.pokemonId(), teraTypeActive)

    const ability = this.getOgerponAbility(this.pokemon().name, teraTypeActive)
    this.store.ability(this.pokemonId(), ability)

    this.updateOgerponBoost(teraTypeActive)
  }

  private getOgerponAbility(name: string, teraTypeActive: boolean): string {
    const abilitiesMap: Record<string, { active: string; inactive: string }> = {
      "Ogerpon-Wellspring": { active: "Embody Aspect (Wellspring)", inactive: "Water Absorb" },
      "Ogerpon-Hearthflame": { active: "Embody Aspect (Hearthflame)", inactive: "Mold Breaker" },
      "Ogerpon-Cornerstone": { active: "Embody Aspect (Cornerstone)", inactive: "Sturdy" },
      Ogerpon: { active: "Embody Aspect (Teal)", inactive: "Defiant" }
    }

    const { active, inactive } = abilitiesMap[name]
    return teraTypeActive ? active : inactive
  }

  private updateOgerponBoost(teraTypeActive: boolean) {
    const stat = this.getOgerponBoostedStat()

    if (teraTypeActive) {
      this.store.bonusBoost(this.pokemonId(), stat, 1)
    }

    if (!teraTypeActive) {
      this.store.bonusBoost(this.pokemonId(), stat, -1)
    }
  }

  private getOgerponBoostedStat(): keyof Stats {
    if (this.pokemon().name == "Ogerpon-Wellspring") {
      return "spd"
    }

    if (this.pokemon().name == "Ogerpon-Hearthflame") {
      return "atk"
    }

    if (this.pokemon().name == "Ogerpon-Cornerstone") {
      return "def"
    }

    return "spe"
  }
}
