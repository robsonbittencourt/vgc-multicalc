import { Component, computed, inject, input } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { ExportPokeService } from "@lib/user-data/export-poke.service"

@Component({
  selector: "app-export-pokemon-button",
  templateUrl: "./export-pokemon-button.component.html",
  styleUrls: ["./export-pokemon-button.component.scss"],
  imports: [MatIcon]
})
export class ExportPokemonButtonComponent {
  pokemonId = input.required<string>()
  show = input(true)
  hidden = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  private exportPokeService = inject(ExportPokeService)

  exportPokemon() {
    this.exportPokeService.export(this.pokemon().name, this.pokemon())
  }
}
