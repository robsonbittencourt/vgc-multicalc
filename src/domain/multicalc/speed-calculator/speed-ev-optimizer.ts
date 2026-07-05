import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { getFinalSpeed } from "@multicalc/stats"

export type SpeedTuneResult = {
  speedEv: number | null
  nature: string
  natureChanged: boolean
  finalSpeed: number | null
  outspeeds: boolean
}

const MAX_SPEED_EVS = 252
const EV_STEP = 4

export class SpeedEvOptimizer {
  outspeed(pokemon: Pokemon, opponentSpeed: number, field: Field, isAttacker = true): SpeedTuneResult {
    const targetSpeed = opponentSpeed + 1

    const evWithCurrentNature = this.minSpeedEv(pokemon, targetSpeed, field, pokemon.nature, isAttacker)

    if (evWithCurrentNature != null) {
      return this.buildResult(pokemon, targetSpeed, field, pokemon.nature, evWithCurrentNature, false, isAttacker)
    }

    const positiveNature = this.positiveSpeedNature(pokemon)

    if (positiveNature != pokemon.nature) {
      const evWithPositiveNature = this.minSpeedEv(pokemon, targetSpeed, field, positiveNature, isAttacker)

      if (evWithPositiveNature != null) {
        return this.buildResult(pokemon, targetSpeed, field, positiveNature, evWithPositiveNature, true, isAttacker)
      }
    }

    return { speedEv: null, nature: pokemon.nature, natureChanged: false, finalSpeed: null, outspeeds: false }
  }

  minSpeedEv(pokemon: Pokemon, targetSpeed: number, field: Field, nature: string, isAttacker = true): number | null {
    for (let ev = 0; ev <= MAX_SPEED_EVS; ev += EV_STEP) {
      const speed = this.speedWith(pokemon, field, nature, ev, isAttacker)

      if (speed >= targetSpeed) {
        return ev
      }
    }

    return null
  }

  private buildResult(pokemon: Pokemon, targetSpeed: number, field: Field, nature: string, speedEv: number, natureChanged: boolean, isAttacker: boolean): SpeedTuneResult {
    const finalSpeed = this.speedWith(pokemon, field, nature, speedEv, isAttacker)

    return { speedEv, nature, natureChanged, finalSpeed, outspeeds: finalSpeed >= targetSpeed }
  }

  private speedWith(pokemon: Pokemon, field: Field, nature: string, ev: number, isAttacker: boolean): number {
    const clonedPokemon = pokemon.clone({ nature, evs: { spe: ev } })

    return getFinalSpeed(clonedPokemon, field, isAttacker)
  }

  private positiveSpeedNature(pokemon: Pokemon): string {
    return pokemon.higherStat === "spa" ? "Timid" : "Jolly"
  }
}
