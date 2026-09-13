import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { getFinalSpeed } from "@multicalc/stat-calc"
import { MAX_SPS_PER_STAT } from "@multicalc/utils"

export type SpeedTuneResult = {
  speedSp: number | null
  nature: string
  natureChanged: boolean
  finalSpeed: number | null
  outspeeds: boolean
}

export class SpeedSpOptimizer {
  outspeed(pokemon: Pokemon, opponentSpeed: number, field: Field, isAttacker = true): SpeedTuneResult {
    const targetSpeed = opponentSpeed + 1

    const spWithCurrentNature = this.minSpeedSp(pokemon, targetSpeed, field, pokemon.nature, isAttacker)

    if (spWithCurrentNature != null) {
      return this.buildResult(pokemon, targetSpeed, field, pokemon.nature, spWithCurrentNature, false, isAttacker)
    }

    const positiveNature = this.positiveSpeedNature(pokemon)

    if (positiveNature != pokemon.nature) {
      const spWithPositiveNature = this.minSpeedSp(pokemon, targetSpeed, field, positiveNature, isAttacker)

      if (spWithPositiveNature != null) {
        return this.buildResult(pokemon, targetSpeed, field, positiveNature, spWithPositiveNature, true, isAttacker)
      }
    }

    return { speedSp: null, nature: pokemon.nature, natureChanged: false, finalSpeed: null, outspeeds: false }
  }

  minSpeedSp(pokemon: Pokemon, targetSpeed: number, field: Field, nature: string, isAttacker = true): number | null {
    for (let sp = 0; sp <= MAX_SPS_PER_STAT; sp++) {
      const speed = this.speedWith(pokemon, field, nature, sp, isAttacker)

      if (speed >= targetSpeed) {
        return sp
      }
    }

    return null
  }

  private buildResult(pokemon: Pokemon, targetSpeed: number, field: Field, nature: string, speedSp: number, natureChanged: boolean, isAttacker: boolean): SpeedTuneResult {
    const finalSpeed = this.speedWith(pokemon, field, nature, speedSp, isAttacker)

    return { speedSp, nature, natureChanged, finalSpeed, outspeeds: finalSpeed >= targetSpeed }
  }

  private speedWith(pokemon: Pokemon, field: Field, nature: string, sp: number, isAttacker: boolean): number {
    const clonedPokemon = pokemon.clone({ nature, sps: { spe: sp } })

    return getFinalSpeed(clonedPokemon, field, isAttacker)
  }

  private positiveSpeedNature(pokemon: Pokemon): string {
    return pokemon.higherStat === "spa" ? "Timid" : "Jolly"
  }
}
