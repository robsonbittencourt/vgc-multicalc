import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"

export type OptimizationContext = {
  defender: Pokemon
  field: Field
  threshold: SurvivalThreshold
  rollIndex: number
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

export type OptimizationResult = {
  evs: Stats | null
  nature: string | null
}
