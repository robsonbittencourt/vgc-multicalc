import { Component, computed, inject, input, model } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatOption } from "@angular/material/core"
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field"
import { MatInput } from "@angular/material/input"
import { MatSelect } from "@angular/material/select"
import { MatSlider, MatSliderThumb } from "@angular/material/slider"
import { CalculatorStore } from "@data/store/calculator-store"
import { Stats } from "@lib/types"

@Component({
  selector: "app-ev-slider",
  templateUrl: "./ev-slider.component.html",
  styleUrls: ["./ev-slider.component.scss"],
  imports: [MatFormField, MatSuffix, ReactiveFormsModule, MatInput, FormsModule, MatSelect, MatOption, MatLabel, MatSlider, MatSliderThumb]
})
export class EvSliderComponent {
  pokemonId = input.required<string>()
  ev = model.required<number>()
  stat = input.required<keyof Stats>()
  reduced = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  nature = computed(() => this.pokemon().nature)
  iv = computed(() => this.pokemon().ivs[this.stat()])
  hpPercentage = computed(() => this.pokemon().hpPercentage)
  statModifier = computed(() => this.pokemon().boosts[this.stat()])

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
    if (this.stat() == "atk") return this.pokemon().modifiedAtk()
    if (this.stat() == "def") return this.pokemon().modifiedDef()
    if (this.stat() == "spa") return this.pokemon().modifiedSpa()
    if (this.stat() == "spd") return this.pokemon().modifiedSpd()
    return this.pokemon().modifiedSpe()
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

  private adjustEv(newEv: number): number {
    if (this.actualEvsQuantity() + newEv <= this.MAX_EVS) {
      return newEv
    }

    const maxAvailableEv = this.MAX_EVS - this.actualEvsQuantity()

    if (maxAvailableEv == 0) {
      return 0
    }

    const leftoverEvs = (maxAvailableEv - this.FIRST_EV) % this.EV_STEP

    return maxAvailableEv - leftoverEvs
  }

  private updateEv(ev: number): void {
    this.ev.set(ev)

    const updatedEvs = { ...this.pokemon().evs }
    updatedEvs[this.stat()] = ev
    this.store.evs(this.pokemonId(), updatedEvs)
  }

  actualEvsQuantity() {
    const STATS_KEYS: (keyof Stats)[] = ["hp", "atk", "def", "spa", "spd", "spe"]

    return STATS_KEYS.filter(stat => stat !== this.stat()).reduce((total, stat) => total + (this.pokemon().evs[stat] ?? 0), 0)
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

  calculateMin() {
    if (this.ev() == this.EV_ZERO || this.ev() == this.FIRST_EV) return 0

    return 4
  }

  calculateEvStep() {
    if (this.ev() == this.EV_ZERO) return this.FIRST_EV
    if (this.ev() == this.FIRST_EV) return 6

    return this.EV_STEP
  }
}
