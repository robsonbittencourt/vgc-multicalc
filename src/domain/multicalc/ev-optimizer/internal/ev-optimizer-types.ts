import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"

export type SurvivalThreshold = 2 | 3 | 4

export type OptimizationContext = {
  defender: Pokemon
  field: Field
  threshold: SurvivalThreshold
  rollIndex: number
  rightIsDefender: boolean
}

export type AttackerContext = {
  physicalAttacker: Pokemon | null
  specialAttacker: Pokemon | null
  physicalAttackers: Pokemon[]
  specialAttackers: Pokemon[]
}

export type DoubleAttackerContext = {
  attacker1: Pokemon | null
  attacker2: Pokemon | null
}

export type SolutionSet = {
  physicalSolution: Stats | null
  specialSolution: Stats | null
  doubleSolution: Stats | null
}

export type OptimizationStatus = "success" | "best-effort" | "not-needed"

export type OptimizationResult = { sps: Stats; nature: string | null; status: "success" | "not-needed" } | { sps: Stats; nature: string | null; status: "best-effort"; koChance: number }
