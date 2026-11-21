import { Component, computed, inject, input } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { CalcStore } from "@store/calc-store"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-export-pokemon-button",
  templateUrl: "./export-pokemon-button.component.html",
  styleUrls: ["./export-pokemon-button.component.scss"],
  imports: [MatIcon, TranslatePipe]
})
export class ExportPokemonButtonComponent {
  pokemonId = input.required<string>()
  show = input(true)
  hidden = input(false)

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  private exportPokeService = inject(ExportPokeService)

  exportPokemon() {
    this.exportPokeService.export(this.pokemon().name, this.pokemon(), this.store.useSpsMode())
  }
}
