export function normalizePokemonNameForCalc(name: string): string {
  if (name === "Aegislash-Blade") return "Aegislash-Blade"
  if (name === "Aegislash-Shield" || name === "Aegislash") return "Aegislash-Shield"

  return name
}

export function normalizePokemonNameForExport(name: string): string {
  if (name === "Aegislash-Shield" || name === "Aegislash-Blade") return "Aegislash"

  return name
}
