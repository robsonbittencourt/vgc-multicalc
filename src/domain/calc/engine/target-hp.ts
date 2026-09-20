export const FIRST_HIT_ONLY_ABILITIES = ["Multiscale", "Shadow Shield", "Tera Shell"]

const TARGET_HP_MOVES = new Set(["Brine", "Hard Press", "Crush Grip", "Wring Out", "Super Fang", "Ruination", "Endeavor", "Pain Split"])

export function readsTargetHp(moveName: string): boolean {
  return TARGET_HP_MOVES.has(moveName)
}

const TARGET_ATK_MOVES = new Set(["Foul Play"])

export function readsTargetAtk(moveName: string): boolean {
  return TARGET_ATK_MOVES.has(moveName)
}

export function weakensOnlyFirstHit(abilityName: string): boolean {
  return FIRST_HIT_ONLY_ABILITIES.includes(abilityName)
}
