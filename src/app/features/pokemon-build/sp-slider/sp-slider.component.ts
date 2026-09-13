import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, effect, inject, input, model, signal, viewChild } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatOption } from "@angular/material/core"
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field"
import { MatInput } from "@angular/material/input"
import { MatSelect } from "@angular/material/select"
import { MatSlider, MatSliderThumb } from "@angular/material/slider"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"
import { StatIDExceptHP } from "@data/types"
import { natureEffect } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { clampSpToRemaining, evToSp, maxSpForStat, remainingSps, spsExceedMax, spToEv, totalSps } from "@multicalc/utils"
import { ColumnTabDirective } from "@features/pokemon-build/sp-slider/column-tab.directive"

@Component({
  selector: "app-sp-slider",
  templateUrl: "./sp-slider.component.html",
  styleUrls: ["./sp-slider.component.scss"],
  imports: [NgClass, NgStyle, MatFormField, MatSuffix, ReactiveFormsModule, MatInput, FormsModule, MatSelect, MatOption, MatLabel, MatSlider, MatSliderThumb, MatTooltip, ColumnTabDirective]
})
export class SpSliderComponent {
  pokemonId = input.required<string>()
  sp = model.required<number>()
  stat = input.required<keyof Stats>()
  reduced = input(false)
  modifiedStat = input(0)
  hasModifiedStat = input<boolean>()
  isOptimized = input(false)

  store = inject(CalcStore)

  sliderElement = viewChild<MatSlider>("slider")

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  nature = computed(() => this.pokemon().nature)
  hpPercentage = computed(() => this.pokemon().hpPercentage)
  statModifier = computed(() => this.pokemon().boosts[this.stat()])
  jumps = computed(() => this.pokemon().jumps)

  calculateMin = computed(() => {
    return 0
  })

  calculateSpStep = computed(() => {
    return 1
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

  originalWithModifier = computed(() => {
    if (this.hasModifiedStat() && this.modifiedStat() != this.statValue()) {
      const operator = this.modifiedStat()! > this.statValue() ? "+" : "-"
      const percentage = Math.floor(Math.abs((this.modifiedStat()! - this.statValue()) / this.statValue()) * 100)
      return `${operator}${percentage}%`
    }

    return ""
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
    if (this.stat() == "hp") return ""

    return natureEffect(this.nature(), this.stat() as StatIDExceptHP)
  })

  isStatWithBeneficialNature = computed(() => {
    return this.natureModifier() === "+"
  })

  firstJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 0))
  secondJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 1))
  thirdJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 2))
  fourthJumpPosition = computed(() => this.positionBySliderIncrements(this.width(), 3))

  width = signal(0)
  resizeObserver: ResizeObserver

  showAsSps = computed(() => this.store.useSpsMode())
  spToEv = spToEv

  constructor() {
    effect(() => {
      if (typeof ResizeObserver === "undefined") return

      const slider = this.sliderElement()

      if (slider) {
        const el = slider._elementRef.nativeElement as HTMLElement

        this.resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            this.width.set(entry.contentRect.width)
          }
        })

        this.resizeObserver.observe(el)
      }
    })
  }

  MAX_SPS = 66
  MIN_HP_PERCENTAGE = 0
  MAX_HP_PERCENTAGE = 100
  CLAMP_FEEDBACK_MS = 1500

  maxAvailableSp = computed(() => maxSpForStat(this.pokemon().sps, this.stat()))
  maxAvailableDisplayValue = computed(() => (this.showAsSps() ? this.maxAvailableSp() : spToEv(this.maxAvailableSp())))

  wasClamped = signal(false)
  private clampFeedbackTimeout: ReturnType<typeof setTimeout>

  clampMessage = computed(() => {
    const remaining = remainingSps(this.pokemon().sps) + this.sp()

    return `Only ${remaining} of ${this.MAX_SPS} SPs available for ${this.statName()}`
  })

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

  hpPercentageChanged(event: Event) {
    const input = event.target as HTMLInputElement
    const percentage = Math.min(Math.max(Math.round(+input.value), this.MIN_HP_PERCENTAGE), this.MAX_HP_PERCENTAGE)

    this.store.hpPercentage(this.pokemonId(), percentage)

    input.value = String(percentage)
  }

  displayValueChanged(event: Event) {
    const input = event.target as HTMLInputElement
    const inputValue = Math.max(Math.round(+input.value), 0)
    const spValue = this.showAsSps() ? inputValue : evToSp(inputValue)
    const adjustedSp = this.adjustSp(spValue)
    const displayValue = this.showAsSps() ? adjustedSp : spToEv(adjustedSp)

    this.updateSp(adjustedSp)

    input.value = String(displayValue)

    this.flagClampWhen(displayValue !== inputValue)
  }

  private flagClampWhen(clamped: boolean): void {
    clearTimeout(this.clampFeedbackTimeout)

    if (!clamped) {
      this.wasClamped.set(false)

      return
    }

    this.wasClamped.set(true)
    this.clampFeedbackTimeout = setTimeout(() => this.wasClamped.set(false), this.CLAMP_FEEDBACK_MS)
  }

  spChanged() {
    const adjustedSp = this.adjustSp(this.sp())
    this.updateSp(adjustedSp)
  }

  beforeChangeSpValue() {
    const newTotalSps = totalSps({ ...this.pokemon().sps, [this.stat()]: this.sp() })

    if (newTotalSps <= this.MAX_SPS) {
      const adjustedSp = this.adjustSp(this.sp())
      this.updateSp(adjustedSp)
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
    }

    if ((event.key === "ArrowRight" || event.key === "ArrowUp") && this.spsExceed()) {
      event.preventDefault()
    }
  }

  onTouchStart(event: TouchEvent) {
    if (this.spsExceed()) {
      event.preventDefault()
    }
  }

  onTouchMove(event: TouchEvent): void {
    const currentTouchX = event.touches[0]?.clientX

    if (currentTouchX !== undefined && this.previousTouchX !== null) {
      const moveToRight = currentTouchX >= this.previousTouchX

      if (moveToRight && this.spsExceed()) {
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

      if (moveToRight && this.spsExceed()) {
        event.preventDefault()
      }
    }

    this.previousMouseX = currentMouseX
  }

  resetMousePosition() {
    this.previousMouseX = null
  }

  gridTemplateColumns(): any {
    const base = this.reduced() ? "34px 56px 56px minmax(0, 1fr) 44px" : "64px 64px 67px 64px 1fr 64px"
    const extra = this.hasModifiedStat() ? " 30px" : ""

    return { "grid-template-columns": base + extra }
  }

  statValueStyle(): any {
    if (this.modifiedStat() > this.statValue()) {
      return { color: "var(--positive-value)" }
    }

    if (this.modifiedStat() < this.statValue()) {
      if (this.stat() === "hp") {
        return { color: "var(--hp-reduced-value)" }
      }

      return { color: "var(--negative-value)" }
    }

    return ""
  }

  private spsExceed(): boolean {
    return spsExceedMax(this.pokemon().sps, this.stat(), this.sp())
  }

  private adjustSp(newSp: number): number {
    return clampSpToRemaining(this.pokemon().sps, this.stat(), newSp)
  }

  private updateSp(sp: number): void {
    this.sp.set(sp)

    const updatedSps = { ...this.pokemon().sps }
    updatedSps[this.stat()] = sp
    this.store.evs(this.pokemonId(), { hp: spToEv(updatedSps.hp), atk: spToEv(updatedSps.atk), def: spToEv(updatedSps.def), spa: spToEv(updatedSps.spa), spd: spToEv(updatedSps.spd), spe: spToEv(updatedSps.spe) })
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
    if (this.jumps()[jump] == null) {
      return 0
    }

    const increments = this.jumps()[jump]! - 1

    if (increments == 0) return 1

    return increments
  }
}
