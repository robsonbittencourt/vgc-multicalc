export const SPECIAL_POKEMON = {
  Aegislash: { calcName: "Aegislash-Shield", outputName: "Aegislash-Shield" },
  Meowstic: { calcName: "Meowstic-F", outputName: "Meowstic", alsoOutputAs: "Meowstic-F" },
  "Sirfetch'd": { calcName: "Sirfetch’d", outputName: "Sirfetch’d" },
  "Farfetch'd": { calcName: "Farfetch’d", outputName: "Farfetch’d" }
}

export function getCalcName(pokemonName) {
  return SPECIAL_POKEMON[pokemonName]?.calcName ?? pokemonName
}

export function getOutputName(pokemonName) {
  return SPECIAL_POKEMON[pokemonName]?.outputName ?? pokemonName
}
