import { NgStyle } from "@angular/common"
import { AfterViewInit, Component, computed, inject, input, model, signal, viewChild } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatOption } from "@angular/material/core"
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field"
import { MatInput } from "@angular/material/input"
import { MatSelect } from "@angular/material/select"
import { MatSlider, MatSliderThumb } from "@angular/material/slider"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"
import { Stats } from "@lib/types"

@Component({
  selector: "app-ev-slider",
  templateUrl: "./ev-slider.component.html",
  styleUrls: ["./ev-slider.component.scss"],
  imports: [NgStyle, MatFormField, MatSuffix, ReactiveFormsModule, MatInput, FormsModule, MatSelect, MatOption, MatLabel, MatSlider, MatSliderThumb, MatTooltip]
})
export class EvSliderComponent implements AfterViewInit {
  pokemonId = input.required<string>()
  ev = model.required<number>()
  stat = input.required<keyof Stats>()
  reduced = input(false)

  store = inject(CalculatorStore)

  sliderElement = viewChild<MatSlider>("slider")

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  nature = computed(() => this.pokemon().nature)
  iv = computed(() => this.pokemon().ivs[this.stat()])
  hpPercentage = computed(() => this.pokemon().hpPercentage)
  statModifier = computed(() => this.pokemon().boosts[this.stat()])

  actualEvsQuantity = computed(() => {
    const STATS_KEYS: (keyof Stats)[] = ["hp", "atk", "def", "spa", "spd", "spe"]

    return STATS_KEYS.filter(stat => stat !== this.stat()).reduce((total, stat) => total + (this.pokemon().evs[stat] ?? 0), 0)
  })

  maxAvailableEv = computed(() => this.MAX_EVS - this.actualEvsQuantity())

  calculateMin = computed(() => {
    if (this.ev() == this.EV_ZERO || this.ev() == this.FIRST_EV) return 0

    return 4
  })

  calculateEvStep = computed(() => {
    if (this.ev() == this.EV_ZERO) return this.FIRST_EV
    if (this.ev() == this.FIRST_EV) return 6

    return this.EV_STEP
  })

  baseStat = computed(() => {
    if (this.stat() == "hp") return this.pokemon().baseHp
    if (this.stat() == "atk") return this.pokemon().baseAtk
    if (this.stat() == "def") return this.pokemon().baseDef
    if (this.stat() == "spa") return this.pokemon().baseSpa
    if (this.stat() == "spd") return this.pokemon().baseSpd
    return this.pokemon().baseSpe
  })

  statValue = computed(() => {
    if (this.stat() == "hp") return this.pokemon().hp
    if (this.stat() == "atk") return this.pokemon().atk
    if (this.stat() == "def") return this.pokemon().def
    if (this.stat() == "spa") return this.pokemon().spa
    if (this.stat() == "spd") return this.pokemon().spd
    return this.pokemon().spe
  })

  modifiedStat = computed(() => {
    if (this.stat() == "hp") return this.pokemon().hp
    if (this.stat() == "atk") return this.pokemon().modifiedAtk
    if (this.stat() == "def") return this.pokemon().modifiedDef
    if (this.stat() == "spa") return this.pokemon().modifiedSpa
    if (this.stat() == "spd") return this.pokemon().modifiedSpd
    return this.pokemon().modifiedSpe
  })

  statName = computed(() => {
    if (this.stat() == "hp") return "HP"
    if (this.stat() == "atk") return "Attack"
    if (this.stat() == "def") return "Defense"
    if (this.stat() == "spa") return "Sp. Atk."
    if (this.stat() == "spd") return "Sp. Def."
    return "Speed"
  })

  statNameAcronym = computed(() => {
    if (this.stat() == "hp") return "HP"
    if (this.stat() == "atk") return "ATK"
    if (this.stat() == "def") return "DEF"
    if (this.stat() == "spa") return "SPA"
    if (this.stat() == "spd") return "SPD"
    return "SPE"
  })

  natureModifier = computed(() => {
    if (this.stat() == "atk" && ["Lonely", "Adamant", "Naughty", "Brave"].includes(this.nature())) return "+"
    if (this.stat() == "atk" && ["Bold", "Modest", "Calm", "Timid"].includes(this.nature())) return "-"

    if (this.stat() == "def" && ["Bold", "Impish", "Lax", "Relaxed"].includes(this.nature())) return "+"
    if (this.stat() == "def" && ["Lonely", "Mild", "Gentle", "Hasty"].includes(this.nature())) return "-"

    if (this.stat() == "spa" && ["Modest", "Mild", "Rash", "Quiet"].includes(this.nature())) return "+"
    if (this.stat() == "spa" && ["Adamant", "Impish", "Careful", "Jolly"].includes(this.nature())) return "-"

    if (this.stat() == "spd" && ["Calm", "Gentle", "Careful", "Sassy"].includes(this.nature())) return "+"
    if (this.stat() == "spd" && ["Naughty", "Lax", "Rash", "Naive"].includes(this.nature())) return "-"

    if (this.stat() == "spe" && ["Timid", "Hasty", "Jolly", "Naive"].includes(this.nature())) return "+"
    if (this.stat() == "spe" && ["Brave", "Relaxed", "Quiet", "Sassy"].includes(this.nature())) return "-"

    return ""
  })

  isStatWithBeneficialNature = computed(() => {
    return this.natureModifier() === "+"
  })

  firstJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 0))
  secondJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 1))
  thirdJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 2))
  fourthJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 3))

  width = signal(0)

  MAX_EVS = 508
  EV_ZERO = 0
  FIRST_EV = 4
  EV_STEP = 8

  statsModifiers = [
    { value: 6, viewValue: "+6" },
    { value: 5, viewValue: "+5" },
    { value: 4, viewValue: "+4" },
    { value: 3, viewValue: "+3" },
    { value: 2, viewValue: "+2" },
    { value: 1, viewValue: "+1" },
    { value: 0, viewValue: "--" },
    { value: -1, viewValue: "-1" },
    { value: -2, viewValue: "-2" },
    { value: -3, viewValue: "-3" },
    { value: -4, viewValue: "-4" },
    { value: -5, viewValue: "-5" },
    { value: -6, viewValue: "-6" }
  ]

  previousMouseX: number | null = null
  previousTouchX: number | null = null

  ngAfterViewInit(): void {
    this.width.set(this.sliderElement()?._cachedWidth ?? 0)
  }

  hpPercentageChanged(event: Event) {
    this.store.hpPercentage(this.pokemonId(), +(event.target as HTMLInputElement).value)
  }

  evChanged() {
    const adjustedEv = this.adjustEv(this.ev())
    this.updateEv(adjustedEv)
  }

  beforeChangeEvValue() {
    if (this.actualEvsQuantity() + this.ev() <= this.MAX_EVS) {
      const adjustedEv = this.adjustEv(this.ev())
      this.updateEv(adjustedEv)
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
    }

    if ((event.key === "ArrowRight" || event.key === "ArrowUp") && this.evsExceed()) {
      event.preventDefault()
    }
  }

  onTouchStart(event: TouchEvent) {
    if (this.evsExceed()) {
      event.preventDefault()
    }
  }

  onTouchMove(event: TouchEvent): void {
    const currentTouchX = event.touches[0]?.clientX

    if (currentTouchX !== undefined && this.previousTouchX !== null) {
      const moveToRight = currentTouchX >= this.previousTouchX

      if (moveToRight && this.evsExceed()) {
        event.preventDefault()
      }
    }

    this.previousTouchX = currentTouchX
  }

  resetTouchPosition(): void {
    this.previousTouchX = null
  }

  onMouseMove(event: MouseEvent) {
    const currentMouseX = event.clientX

    if (this.previousMouseX !== null) {
      const moveToRight = currentMouseX >= this.previousMouseX

      if (moveToRight && this.evsExceed()) {
        event.preventDefault()
      }
    }

    this.previousMouseX = currentMouseX
  }

  resetMousePosition() {
    this.previousMouseX = null
  }

  statValueStyle(): any {
    if (this.modifiedStat() > this.statValue()) {
      return { color: "#69e969" }
    }

    if (this.modifiedStat() < this.statValue()) {
      return { color: "#f73f3f" }
    }

    return ""
  }

  private evsExceed(): boolean {
    const moreThenFirstEv = this.maxAvailableEv() - this.ev() == this.FIRST_EV && this.ev() > this.FIRST_EV
    const moreThenMax = this.actualEvsQuantity() + this.ev() >= this.MAX_EVS

    return moreThenFirstEv || moreThenMax
  }

  private adjustEv(newEv: number): number {
    if (this.actualEvsQuantity() + newEv <= this.MAX_EVS) {
      return newEv
    }

    if (this.maxAvailableEv() == 0) {
      return 0
    }

    const leftoverEvs = (this.maxAvailableEv() - this.FIRST_EV) % this.EV_STEP

    return this.maxAvailableEv() - leftoverEvs
  }

  private updateEv(ev: number): void {
    this.ev.set(ev)

    const updatedEvs = { ...this.pokemon().evs }
    updatedEvs[this.stat()] = ev
    this.store.evs(this.pokemonId(), updatedEvs)
  }

  ivChanged(event: Event) {
    const newIvs = { ...this.pokemon().ivs }
    newIvs[this.stat()] = +(event.target as HTMLInputElement).value

    this.store.ivs(this.pokemonId(), newIvs)
  }

  statModifierChanged(statModifier: number) {
    const newBoosts = { ...this.pokemon().boosts }
    newBoosts[this.stat()] = statModifier

    this.store.boosts(this.pokemonId(), newBoosts)
  }

  private positionBySliderIncrements(width: number, jump: 0 | 1 | 2 | 3): string {
    const increments = this.incrementsUntilJump(jump)

    const steps = 32
    const pixelsByStep = width / steps
    const adjusterValue = this.sliderSpaceAdjust(increments, width, jump)

    const result = increments * pixelsByStep + adjusterValue

    return `${result}px`
  }

  private sliderSpaceAdjust(increments: number, width: number, jump: 0 | 1 | 2 | 3): number {
    const largeSlider = width > 200
    const problematicPosition = 9

    const byJump = largeSlider ? 2.5 * (jump + 1) : 2
    const bySpecificPoint = increments % 10 === problematicPosition && largeSlider ? 1 : 0

    return byJump + bySpecificPoint
  }

  private incrementsUntilJump(jump: number) {
    if (this.pokemon().jumps[jump] == null) {
      return 0
    }

    const increments = (this.pokemon().jumps[jump]! - 4) / 8

    if (increments == 0) return 1

    return increments
  }
}
