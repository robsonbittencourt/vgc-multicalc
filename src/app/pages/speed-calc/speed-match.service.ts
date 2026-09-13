import { inject, Injectable } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { Field, Pokemon } from "@multicalc/model"
import { getFinalSpeed } from "@multicalc/stat-calc"
import { SpeedSpOptimizer } from "@multicalc/speed-calc"
import { spsToEvs } from "@multicalc/utils"
import { Stats } from "@multicalc/types"

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
  speedSp: number
}

@Injectable({
  providedIn: "root"
})
export class SpeedMatchService {
  private store = inject(CalcStore)
  private optimizer = new SpeedSpOptimizer()

  matchSpeed(activePokemonId: string, target: Pokemon, field: Field): SpeedMatchOutcome {
    const active = this.store.findPokemonById(activePokemonId)

    if (target.id === active.id) {
      return { status: "ignored", message: "" }
    }

    const targetSpeed = getFinalSpeed(target, field, false)
    const result = this.optimizer.outspeed(active, targetSpeed, field, true)

    if (!result.outspeeds || result.speedSp == null) {
      return { status: "unreachable", message: `${active.name} can't outspeed ${target.name} with a legal spread` }
    }

    const plan = this.budgetPlan(active, result.speedSp)

    if (!plan.fits) {
      return { status: "insufficient", message: `Not enough ${plan.unit} to outspeed ${target.name}: needs ${plan.needed}, ${plan.free} free` }
    }

    this.store.evs(active.id, spsToEvs({ ...active.sps, spe: plan.speedSp }))

    if (result.natureChanged) {
      this.store.nature(active.id, result.nature)
    }

    return { status: "applied", message: `${active.name} set to outspeed ${target.name} (${plan.needed} ${plan.unit}${result.natureChanged ? `, ${result.nature}` : ""})` }
  }

  private budgetPlan(pokemon: Pokemon, neededSps: number): BudgetPlan {
    const freeSps = MAX_TOTAL_SPS - (totalSps(pokemon.sps) - pokemon.sps.spe)

    return { fits: neededSps <= freeSps, needed: neededSps, free: freeSps, unit: "SP", speedSp: neededSps }
  }
}

function totalSps(sps: Stats): number {
  return sps.hp + sps.atk + sps.def + sps.spa + sps.spd + sps.spe
}
