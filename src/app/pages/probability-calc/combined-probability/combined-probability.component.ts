import { Component, computed, signal } from "@angular/core"
import { InputComponent } from "@shared/input/input.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CombinedProbability, ProbabilityCalculationType } from "@multicalc/probability-calc"
import { ProbabilityPercentPipe } from "@pages/probability-calc/pipes/probability-percent.pipe"

@Component({
  selector: "app-combined-probability",
  imports: [WidgetComponent, InputComponent, InputSelectComponent, ProbabilityPercentPipe],
  templateUrl: "./combined-probability.component.html",
  styleUrl: "./combined-probability.component.scss"
})
export class CombinedProbabilityComponent {
  combinedProbabilityService = new CombinedProbability()

  calculationType = signal<ProbabilityCalculationType>("at-least-one")

  probability1 = signal<number | null>(30)
  probability2 = signal<number | null>(25)
  probability3 = signal<number | null>(null)
  probability4 = signal<number | null>(null)
  probability5 = signal<number | null>(null)

  probability1String = computed(() => this.probability1()?.toString() || "")
  probability2String = computed(() => this.probability2()?.toString() || "")
  probability3String = computed(() => this.probability3()?.toString() || "")
  probability4String = computed(() => this.probability4()?.toString() || "")
  probability5String = computed(() => this.probability5()?.toString() || "")

  probabilities = computed(() => [this.probability1(), this.probability2(), this.probability3(), this.probability4(), this.probability5()])

  result = computed(() => {
    return this.combinedProbabilityService.calculateCombinedProbability(this.probabilities(), this.calculationType())
  })

  calculationTypeOptions: KeyValuePair[] = [
    { key: "At least one", value: "at-least-one" },
    { key: "All", value: "all" },
    { key: "None", value: "none" }
  ]

  calculationTypeValue = computed(() => this.calculationType())

  onCalculationTypeChange(type: string) {
    this.calculationType.set(type as ProbabilityCalculationType)
  }

  onInputChange(index: number, value: string) {
    if (value === "" || value === null || value === undefined) {
      const nullValue = null
      switch (index) {
        case 0:
          this.probability1.set(nullValue)
          break
        case 1:
          this.probability2.set(nullValue)
          break
        case 2:
          this.probability3.set(nullValue)
          break
        case 3:
          this.probability4.set(nullValue)
          break
        case 4:
          this.probability5.set(nullValue)
          break
      }
      return
    }

    const numValue = Number(value)
    const clampedValue = isNaN(numValue) ? null : Math.max(0, Math.min(100, numValue))

    switch (index) {
      case 0:
        this.probability1.set(clampedValue)
        break
      case 1:
        this.probability2.set(clampedValue)
        break
      case 2:
        this.probability3.set(clampedValue)
        break
      case 3:
        this.probability4.set(clampedValue)
        break
      case 4:
        this.probability5.set(clampedValue)
        break
    }
  }
}
