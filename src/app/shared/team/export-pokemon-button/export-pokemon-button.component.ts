import { Component, inject, input } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { Pokemon } from "@lib/model/pokemon"
import { ExportPokeService } from "@lib/user-data/export-poke.service"

@Component({
  selector: "app-export-pokemon-button",
  templateUrl: "./export-pokemon-button.component.html",
  styleUrls: ["./export-pokemon-button.component.scss"],
  imports: [MatIcon]
})
export class ExportPokemonButtonComponent {
  pokemon = input.required<Pokemon>()
  show = input(true)
  hidden = input(false)

  private exportPokeService = inject(ExportPokeService)

  exportPokemon() {
    this.exportPokeService.export(this.pokemon().name, this.pokemon())
  }
}
