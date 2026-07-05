import { getType } from "@calc/engine/types"
import { Move } from "@calc/model/move"
import { TypeName } from "@data/types"

export function getMoveEffectiveness(move: Move, type: TypeName, isGhostRevealed?: boolean, isGravity?: boolean, isRingTarget?: boolean): number {
  if (isGhostRevealed && type === "Ghost" && move.hasType("Normal", "Fighting")) {
    return 1
  }

  if (isGravity && type === "Flying" && move.hasType("Ground")) {
    return 1
  }

  if (move.named("Freeze-Dry") && type === "Water") {
    return 2
  }

  if (move.named("Nihil Light") && type === "Fairy") {
    return 1
  }

  let effectiveness = getType(move.type)!.effectiveness[type]!

  if (effectiveness === 0 && isRingTarget) {
    effectiveness = 1
  }

  if (move.named("Flying Press")) {
    effectiveness *= getType("Flying")!.effectiveness[type]!
  }

  return effectiveness
}
