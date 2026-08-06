import { afterNextRender, Component, computed, effect, inject, signal, input } from "@angular/core"
import { SpriteService } from "@app/services/sprite.service"
import { NetworkStatusService } from "@app/services/network-status.service"

@Component({
  standalone: true,
  selector: "app-pokemon-sprite",
  templateUrl: "./pokemon-sprite.component.html",
  styleUrl: "./pokemon-sprite.component.scss"
})
export class PokemonSpriteComponent {
  private spriteService = inject(SpriteService)
  private networkStatus = inject(NetworkStatusService)

  name = input.required<string>()
  hideFallback = input<boolean>(false)

  src = computed(() => this.spriteService.path(this.name()))
  intrinsicSize = 128
  showFallback = signal(false)

  private hydrated = signal(false)

  constructor() {
    afterNextRender(() => this.hydrated.set(true))

    effect(() => {
      if (!this.hydrated()) return

      if (this.networkStatus.isOnline()) {
        this.showFallback.set(false)
        return
      }

      const currentSrc = this.src()
      caches.match(currentSrc).then(cached => {
        if (currentSrc !== this.src()) return
        this.showFallback.set(!cached)
      })
    })
  }

  onError() {
    this.showFallback.set(true)
  }
}
