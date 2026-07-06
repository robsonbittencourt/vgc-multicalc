export type Stats = { hp: number; atk: number; def: number; spa: number; spd: number; spe: number }

export type GameType = "Singles" | "Doubles"

export type Terrain = "Electric" | "Grassy" | "Psychic" | "Misty" | null

export type Weather = "Sand" | "Sun" | "Rain" | "Snow" | null

export type Regulation = "MB"

export type MoveTarget = "normal" | "allAdjacentFoes" | "self" | "any" | "adjacentAllyOrSelf" | "adjacentAlly" | "allySide" | "allAdjacent" | "all" | "allyTeam" | "adjacentFoe" | "scripted" | "allies" | "randomNormal" | "foeSide"

export const PokemonTypes = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel", "Dark", "Fairy"] as const

export type PokemonType = (typeof PokemonTypes)[number]
