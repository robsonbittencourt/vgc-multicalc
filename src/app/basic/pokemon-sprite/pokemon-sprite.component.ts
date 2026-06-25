import { afterNextRender, Component, computed, effect, inject, signal, input } from "@angular/core"
import { SpriteService } from "@data/sprite.service"
import { NetworkStatusService } from "@lib/network-status.service"

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

  private paths = computed(() => this.spriteService.paths(this.name()))
  private pathIndex = signal(0)

  src = computed(() => this.paths()[Math.min(this.pathIndex(), this.paths().length - 1)])
  intrinsicSize = 128
  showFallback = signal(false)

  private hydrated = signal(false)

  constructor() {
    afterNextRender(() => this.hydrated.set(true))

    effect(() => {
      this.name()
      this.pathIndex.set(0)
    })

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
    if (this.pathIndex() < this.paths().length - 1) {
      this.pathIndex.update(index => index + 1)
      return
    }

    this.showFallback.set(true)
  }
}
