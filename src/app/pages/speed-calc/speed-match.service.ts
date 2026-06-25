import { inject, Injectable } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { SpeedEvOptimizer } from "@lib/speed-calculator/speed-ev-optimizer"
import { evToSp, spToEv, totalSpsFromEvs } from "@lib/utils/ev-sp-converter"

const MAX_TOTAL_SPS = 66

export type SpeedMatchOutcome = {
  status: "applied" | "unreachable" | "insufficient" | "ignored"
  message: string
}

type BudgetPlan = {
  fits: boolean
  needed: number
  free: number
  unit: string
  speedEv: number
}

@Injectable({
  providedIn: "root"
})
export class SpeedMatchService {
  private store = inject(CalculatorStore)
  private optimizer = inject(SpeedEvOptimizer)

  matchSpeed(activePokemonId: string, target: Pokemon, field: Field): SpeedMatchOutcome {
    const active = this.store.findPokemonById(activePokemonId)

    if (target.id === active.id) {
      return { status: "ignored", message: "" }
    }

    const targetSpeed = getFinalSpeed(target, field, false)
    const result = this.optimizer.outspeed(active, targetSpeed, field, true)

    if (!result.outspeeds || result.speedEv == null) {
      return { status: "unreachable", message: `${active.name} can't outspeed ${target.name} with a legal spread` }
    }

    const plan = this.budgetPlan(active, result.speedEv)

    if (!plan.fits) {
      return { status: "insufficient", message: `Not enough ${plan.unit} to outspeed ${target.name}: needs ${plan.needed}, ${plan.free} free` }
    }

    this.store.evs(active.id, { ...active.evs, spe: plan.speedEv })

    if (result.natureChanged) {
      this.store.nature(active.id, result.nature)
    }

    return { status: "applied", message: `${active.name} set to outspeed ${target.name} (${plan.needed} ${plan.unit}${result.natureChanged ? `, ${result.nature}` : ""})` }
  }

  private budgetPlan(pokemon: Pokemon, neededEv: number): BudgetPlan {
    const neededSps = this.ceilSps(neededEv)
    const freeSps = MAX_TOTAL_SPS - (totalSpsFromEvs(pokemon.evs) - evToSp(pokemon.evs.spe))

    return { fits: neededSps <= freeSps, needed: neededSps, free: freeSps, unit: "SP", speedEv: spToEv(neededSps) }
  }

  private ceilSps(ev: number): number {
    const sps = evToSp(ev)

    return spToEv(sps) >= ev ? sps : sps + 1
  }
}
