export const PRIMAL_ORB_BY_FORM: Record<string, string> = {
  "Kyogre-Primal": "Blue Orb",
  "Groudon-Primal": "Red Orb"
}

export function getPrimalOrb(pokemonName: string): string | undefined {
  return PRIMAL_ORB_BY_FORM[pokemonName]
}

export function holdsOwnPrimalOrb(pokemonName: string, item: string): boolean {
  return Object.entries(PRIMAL_ORB_BY_FORM).some(([form, orb]) => orb === item && (pokemonName === form || `${pokemonName}-Primal` === form))
}
