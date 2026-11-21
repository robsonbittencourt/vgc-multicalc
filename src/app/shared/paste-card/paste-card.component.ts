import { Component, input, signal } from "@angular/core"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { PasteCard } from "@shared/paste-card/paste-card"
import { LocalizeNamePipe } from "@shared/localize/localize-name.pipe"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-paste-card",
  templateUrl: "./paste-card.component.html",
  styleUrl: "./paste-card.component.scss",
  imports: [PokemonSpriteComponent, LocalizeNamePipe, TranslatePipe]
})
export class PasteCardComponent {
  data = input.required<PasteCard>()
  showTera = input(false)

  megaShown = signal(false)

  toggleMega() {
    this.megaShown.set(!this.megaShown())
  }
}
