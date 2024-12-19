import { Component, output } from "@angular/core"
import { MatCard } from "@angular/material/card"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-add-pokemon-card",
  templateUrl: "./add-pokemon-card.component.html",
  styleUrls: ["./add-pokemon-card.component.scss"],
  imports: [MatCard, MatIcon]
})
export class AddPokemonCardComponent {

  pokemonAddedToTeam = output()

  addPokemon() {
    this.pokemonAddedToTeam.emit()
  }

}
