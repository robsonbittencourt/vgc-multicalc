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
  target = computed(() => this.pokemon().moveSet.activeMove.target)

  percentualAccuracy = computed(() => this.accuracy() / 100)

  oneTimeSingleTarget = computed(() => this.calculateSingleMoveProbabilities(this.percentualAccuracy(), 1))
  twoTimesSingleTarget = computed(() => this.calculateSingleMoveProbabilities(this.percentualAccuracy(), 2))
  threeTimesSingleTarget = computed(() => this.calculateSingleMoveProbabilities(this.percentualAccuracy(), 3))

  oneTime = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 1))
  twoTimes = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 2))
  threeTimes = computed(() => this.calculateSpreadMoveProbabilities(this.percentualAccuracy(), 3))

  //transformar isso em um que volte 3 coisas
  // acertar todos os turnos
  // acertar pelo menos 1
  // errar todos
  // isso ja resolve a questão do fissure e deixa padrão
  calculateSingleMoveProbabilities(accuracy: number, attempts: number): MoveSingleTargetProbabilities {
    // Se não é single-target, não faz sentido calcular aqui
    if (this.target() === "allAdjacentFoes") {
      return {
        hitAllTurns: "0",
        hitAtLeastOne: "0",
        missAllTurns: "0"
      }
    }

    const pHit = accuracy
    const pMiss = 1 - accuracy

    // acertar todos
    const hitAll = Math.pow(pHit, attempts)

    // errar todos
    const missAll = Math.pow(pMiss, attempts)

    // acertar pelo menos 1
    const hitAtLeastOne = 1 - missAll

    return {
      hitAllTurns: this.formatPercentageDynamic(hitAll),
      hitAtLeastOne: this.formatPercentageDynamic(hitAtLeastOne),
      missAllTurns: this.formatPercentageDynamic(missAll)
    }
  }

  calculateSpreadMoveProbabilities(accuracy: number, attempts: number): SpreadMoveProbabilities {
    if (this.target() != "allAdjacentFoes") {
      return {
        hitBoth: "0",
        hitAtLeastOne: "0",
        missBoth: "0"
      }
    }

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

type MoveSingleTargetProbabilities = {
  hitAllTurns: string
  hitAtLeastOne: string
  missAllTurns: string
}

type SpreadMoveProbabilities = {
  hitBoth: string
  hitAtLeastOne: string
  missBoth: string
}
