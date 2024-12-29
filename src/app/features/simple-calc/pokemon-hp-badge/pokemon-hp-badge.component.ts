import { NgStyle } from "@angular/common"
import { Component, computed, ElementRef, input, viewChild } from "@angular/core"
import { Items } from "@data/items"

@Component({
  selector: "app-pokemon-hp-badge",
  templateUrl: "./pokemon-hp-badge.component.html",
  styleUrls: ["./pokemon-hp-badge.component.scss"],
  imports: [NgStyle]
})
export class PokemonHpBadgeComponent {
  _actualSpriteName: string

  name = input.required<string>()
  hpBase = input.required<number>()
  actualHp = input.required<number>()
  spriteName = input.required<string>()
  damageTaken = input.required<number>()
  item = input.required({ transform: (value: string) => value.toLowerCase().replaceAll(" ", "-") })

  pokemonImage = viewChild<ElementRef>("pokemonImage")

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
      return this.RED
    } else if (this.hpPercentage() <= 50) {
      return this.YELLOW
    } else {
      return this.GREEN
    }
  })

  RED = "#f33d42"
  YELLOW = "#fe9901"
  GREEN = "#30ca2e"

  imageScale = 1.2

  onImageLoad() {
    if (this.spriteName() != this._actualSpriteName) {
      this._actualSpriteName = this.spriteName()
      this.removeTransparentSpace()
    }
  }

  canShowItemImage(): boolean {
    return this.item() != Items.instance.withoutItem()
  }

  removeTransparentSpace() {
    const image = new Image()
    image.src = this.pokemonImage()!.nativeElement.src

    image.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d", { willReadFrequently: true })

      if (ctx) {
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let top = canvas.height,
          bottom = 0,
          left = canvas.width,
          right = 0

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4
            const alpha = data[index + 3]

            if (alpha > 0) {
              if (y < top) top = y
              if (y > bottom) bottom = y
              if (x < left) left = x
              if (x > right) right = x
            }
          }
        }

        const visibleHeight = bottom - top + 1
        const visibleWidth = right - left - +1

        const croppedData = ctx.getImageData(left, top, visibleWidth, visibleHeight)

        canvas.height = visibleHeight
        canvas.width = visibleWidth

        this.imageScale = this.calculateImageScale(visibleHeight)

        ctx.putImageData(croppedData, 0, 0)

        this.pokemonImage()!.nativeElement.src = canvas.toDataURL()
      }
    }
  }

  calculateImageScale(imageHeight: number): number {
    if (imageHeight > 200) {
      return 1.2
    }

    if (imageHeight > 150) {
      return 1.1
    }

    if (imageHeight > 130) {
      return 1
    }

    return 0.8
  }
}
