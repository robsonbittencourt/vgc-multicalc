import { Component, computed, effect, ElementRef, input, signal, viewChild } from "@angular/core"
import { Items } from "@data/items"
import { Status } from "@lib/model/status"
import { FaintedIconComponent } from "@pages/simple-calc/pokemon-hp-badge/champions-hp-badge/fainted-icon/fainted-icon.component"
import { StatusIconComponent } from "@pages/simple-calc/pokemon-hp-badge/champions-hp-badge/status-icon/status-icon.component"
import { uuid } from "@lib/utils/uuid"

@Component({
  selector: "app-champions-hp-badge",
  templateUrl: "./champions-hp-badge.component.html",
  styleUrls: ["./champions-hp-badge.component.scss"],
  imports: [StatusIconComponent, FaintedIconComponent]
})
export class ChampionsHpBadgeComponent {
  static imageCache = new Map<string, string>()

  readonly uid = uuid()
  readonly hudPath = "M 85,25 L 460,25 C 472,25 478,28 475,38 L 460,84 C 458,90 450,92 445,92 L 152,92 L 143,125 C 139,135 123,150 110,150 C 105,150 55,150 22,150 C 14,150 10,146 10,138 L 43.9,44.75 C 50,30 65,25 85,25 Z"
  _actualSpriteName: string | undefined

  name = input.required<string>()
  hpBase = input.required<number>()
  actualHp = input.required<number>()
  spriteName = input.required<string>()
  damageTaken = input.required<number>()
  item = input.required({ transform: (value: string) => value.toLowerCase().replaceAll(" ", "-") })

  isOpponent = input<boolean>(false)
  status = input<Status>(Status.HEALTHY)

  pokemonImage = viewChild<ElementRef>("pokemonImage")

  spriteDataUrl = signal("")

  remainingHp = computed(() => {
    const hp = this.actualHp() - this.damageTaken()
    return Math.max(hp, 0)
  })

  hpPercentage = computed(() => {
    const previouslyDamage = this.hpBase() - this.actualHp()
    const totalDamage = previouslyDamage + this.damageTaken()

    const percentage = 100 - (totalDamage / this.hpBase()) * 100
    return Math.max(percentage, 0)
  })

  hpBarColor = computed(() => {
    if (this.hpPercentage() < 20) {
      return `url(#${this.uid}-hpRed)`
    } else if (this.hpPercentage() <= 50) {
      return `url(#${this.uid}-hpYellow)`
    } else {
      return `url(#${this.uid}-hpGreen)`
    }
  })

  hpBarPath = computed(() => {
    const x = 154 + (273 * this.hpPercentage()) / 100
    return `M 166,105 L ${x + 12},105 L ${x},141 L 154,141 Z`
  })

  isFainted = computed(() => this.remainingHp() === 0)

  shouldAnimateFainted = signal(false)

  private _wasFainted = true

  constructor() {
    effect(() => {
      const fainted = this.isFainted()

      if (!fainted) {
        this._wasFainted = false
        this.shouldAnimateFainted.set(false)
      } else if (!this._wasFainted) {
        this._wasFainted = true
        this.shouldAnimateFainted.set(true)
      }
    })
  }

  protected readonly Status = Status

  onImageLoad() {
    if (this.spriteName() != this._actualSpriteName) {
      this._actualSpriteName = this.spriteName()

      const cached = ChampionsHpBadgeComponent.imageCache.get(this.spriteName())

      if (cached) {
        this.spriteDataUrl.set(cached)
      } else {
        const src = this.pokemonImage()!.nativeElement.src
        this.spriteDataUrl.set(src)
        ChampionsHpBadgeComponent.imageCache.set(this.spriteName(), src)
      }
    }
  }

  canShowItemImage(): boolean {
    return this.item() != Items.instance.withoutItem() && this.item() !== "nothing"
  }
}
