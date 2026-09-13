import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonIds } from "./pokemon-ids"
import { SurvivalContext } from "./threat"

export class SurvivalMemo {
  private caches = new Map<number, Map<number, boolean>>()
  private ids = new PokemonIds()

  clear(): void {
    this.caches.clear()
    this.ids.clear()
  }

  resolve(attacker: Pokemon, partner: Pokemon | null, defender: Pokemon, ctx: SurvivalContext, compute: () => boolean): boolean {
    const threatKey = this.idOf(attacker) * 1000000 + (partner ? this.idOf(partner) : 0) * 1000 + ctx.threshold * 100 + ctx.rollIndex * 2 + (ctx.rightIsDefender ? 1 : 0)

    let cache = this.caches.get(threatKey)

    if (!cache) {
      cache = new Map<number, boolean>()
      this.caches.set(threatKey, cache)
    }

    const spreadKey = (defender.hp << 20) | (defender.def << 10) | defender.spd
    const cached = cache.get(spreadKey)

    if (cached !== undefined) {
      return cached
    }

    const computed = compute()
    cache.set(spreadKey, computed)

    return computed
  }

  private idOf(pokemon: Pokemon): number {
    return this.ids.idOf(pokemon)
  }
}
