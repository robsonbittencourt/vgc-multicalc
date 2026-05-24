import { isPlatformBrowser } from "@angular/common"
import { Component, computed, effect, inject, input, PLATFORM_ID, signal } from "@angular/core"
import { SpriteService } from "@data/sprite.service"

@Component({
  standalone: true,
  selector: "app-pokemon-sprite",
  templateUrl: "./pokemon-sprite.component.html",
  styleUrl: "./pokemon-sprite.component.scss"
})
export class PokemonSpriteComponent {
  private spriteService = inject(SpriteService)
  private platformId = inject(PLATFORM_ID)

  name = input.required<string>()
  size = input<string>("4em")

  src = computed(() => this.spriteService.path(this.name()))
  showFallback = signal(false)

  constructor() {
    effect(async () => {
      if (!isPlatformBrowser(this.platformId)) return

      if (!navigator.onLine) {
        const cached = await caches.match(this.src())

        this.showFallback.set(!cached)
        return
      }

      this.showFallback.set(false)
    })
  }
}
