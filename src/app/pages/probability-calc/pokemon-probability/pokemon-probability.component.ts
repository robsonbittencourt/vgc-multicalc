import { Component, computed, inject } from "@angular/core"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-probability",
  imports: [WidgetComponent],
  templateUrl: "./pokemon-probability.component.html",
  styleUrl: "./pokemon-probability.component.scss"
})
export class PokemonProbabilityComponent {
  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.team().activePokemon())

  secondary = computed(() => JSON.stringify(this.pokemon().moveSet.activeMove.secondary))

  accuracy = computed(() => this.pokemon().moveSet.activeMove.accuracy)
  percentualAccuracy = computed(() => this.accuracy() / 100)

  oneTime = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 1))
  twoTimes = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 2))
  threeTimes = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 3))

  calculateSpreadMoveProbabilities(accuracy: number, attempts: number): SpreadMoveProbabilities {
    const hitOne = accuracy
    const missOne = 1 - accuracy

    const hitBothSingle = hitOne * hitOne
    const missBothSingle = missOne * missOne
    const hitAtLeastOneSingle = 1 - missBothSingle

    return {
      hitBoth: this.formatPercentageDynamic(Math.pow(hitBothSingle, attempts)),
      hitAtLeastOne: this.formatPercentageDynamic(Math.pow(hitAtLeastOneSingle, attempts)),
      missBoth: this.formatPercentageDynamic(Math.pow(missBothSingle, attempts))
    }
  }

  // deveria ir para uma service
  // cuidar para não fazer isso dentro da computed, pois volta string.
  // quando eu quiser mudar o formato de percentual para chances em x isso vai ser problema
  private formatPercentageDynamic(value: number): string {
    const percent = value * 100

    // --- Regra 1: números grandes → 1 casa decimal ---
    if (Math.abs(percent) >= 1) {
      let s = percent.toFixed(1)
      s = s.replace(/\.0$/, "") // remove .0 se for inteiro
      return s
    }

    // --- Regra 2: números pequenos → até 5 casas ---
    let s = percent.toFixed(5) // agora usa 5 casas

    // remove ".00000"
    if (/\.00000$/.test(s)) {
      return s.replace(/\.00000$/, "")
    }

    // remove zeros à direita, preservando zeros intermediários
    s = s.replace(/(\.\d*?[1-9])0+$/, "$1")

    // remove ".0" se for só isso
    s = s.replace(/\.0$/, "")

    // garante 1 decimal se não houver
    if (!s.includes(".")) {
      s += ".0"
    }

    return s
  }
}

type SpreadMoveProbabilities = {
  hitBoth: string
  hitAtLeastOne: string
  missBoth: string
}
