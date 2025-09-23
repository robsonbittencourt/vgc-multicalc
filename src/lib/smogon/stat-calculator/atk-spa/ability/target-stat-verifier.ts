import { Move } from "@robsonbittencourt/calc"

export function isTargetStat(pokemon: boolean, move: Move): boolean {
  return (pokemon && move.category == "Physical") || (!pokemon && move.category == "Special")
}
