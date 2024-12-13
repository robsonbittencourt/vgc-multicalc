import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Items } from 'src/data/items';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-pokemon-hp-badge',
    templateUrl: './pokemon-hp-badge.component.html',
    styleUrls: ['./pokemon-hp-badge.component.scss'],
    imports: [NgStyle]
})
export class PokemonHpBadgeComponent implements AfterViewInit {

  remainingHp: number
  hpPercentage: number
  hpBarColor: string
  imageScale: number = 1.2

  _hpBase: number
  _actualHp: number
  _spriteName: string
  _actualSpriteName: string
  _damageTaken: number
  _item: string  

  @Input()
  name: string

  @Input()
  get hpBase(): number {
    return this._hpBase
  }

  public set hpBase(hpBase: number) {
    this._hpBase = hpBase
    this.updateHpValues()
  }

  @Input()
  get actualHp(): number {
    return this._actualHp
  }

  public set actualHp(actualHp: number) {
    this._actualHp = actualHp
    this.updateHpValues()
  }

  @Input()
  get spriteName(): string {
    return this._spriteName
  }

  set spriteName(spriteName: string) {
    this._spriteName = spriteName
  }

  @Input()
  reverse: boolean

  @Input()
  get item(): string {
    return this._item
  }

  public set item(item: string) {
    this._item = item.toLowerCase().replaceAll(" ", "-")
  }

  @Input()
  get damageTaken(): number {
    return this._damageTaken
  }

  public set damageTaken(damageTaken: number) {
    this._damageTaken = damageTaken
    this.updateHpValues()
  }

  @ViewChild('pokemonImage', { static: false })
  pokemonImage: ElementRef<HTMLImageElement>

  ngAfterViewInit() {
    this._actualSpriteName = this.spriteName
    this.removeTransparentSpace()
  }

  onImageLoad() {
    if(this.spriteName != this._actualSpriteName) {
      this._actualSpriteName = this.spriteName
      this.removeTransparentSpace()      
    }    
  }

  canShowItemImage(): boolean {
    return this.item != Items.instance.withoutItem()
  }

  private updateHpValues() {
    this.setRemainingHp()
    this.setHpPercentage()
    this.setHpBarColor()
  }

  private setRemainingHp() {
    const hp = this.actualHp - this._damageTaken
    this.remainingHp = Math.max(hp, 0)
  }

  private setHpPercentage() {
    const previouslyDamage = this.hpBase - this.actualHp
    const totalDamage = previouslyDamage + this._damageTaken

    const percentage = 100 - ((totalDamage / this.hpBase) * 100)
    this.hpPercentage = Math.max(percentage, 0)
  }

  private setHpBarColor() {
    if (this.hpPercentage < 20) {
      this.hpBarColor = "#f33d42" //red
    } else if (this.hpPercentage <= 50) {
      this.hpBarColor = "#fe9901" //yellow
    } else {
      this.hpBarColor = "#30ca2e" //green
    }    
  }

  removeTransparentSpace() {
    if (this.pokemonImage) {
      const image = new Image()
      image.src = this.pokemonImage?.nativeElement.src
      
      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        
        if (ctx) {
          canvas.width = image.width
          canvas.height = image.height
          
          ctx.drawImage(image, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          let top = canvas.height, bottom = 0, left = canvas.width, right = 0
          
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
          const visibleWidth = right - left -  + 1
          
          const croppedData = ctx.getImageData(left, top, visibleWidth, visibleHeight)
          
          canvas.height = visibleHeight
          canvas.width = visibleWidth

          this.imageScale = this.calculateImageScale(visibleHeight)
          
          ctx.putImageData(croppedData, 0, 0)
          
          this.pokemonImage.nativeElement.src = canvas.toDataURL()
        }
      }
    }
  }

  calculateImageScale(imageHeight: number): number {
    const minScale = 1.2
    const maxScale = 1.3
    const highImageHeight = 256

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
