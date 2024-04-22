import { MoveSet } from "./moveset";
import { Pokemon } from "./pokemon";

export function defaultPokemon(): Pokemon {
  return new Pokemon("Togepi", "Relaxed", "Leftovers", "Hustle", "Normal", false, {}, new MoveSet("Struggle", "Struggle", "Struggle", "Struggle"))
}

