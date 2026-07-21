import { Type, TypeName } from "@data/types"
import { TYPE_CHART } from "@data/type-chart-data"
import { toID } from "@calc/engine/data-util"

export function getType(name: string): Type | undefined {
  return TYPES[toID(name)]
}

export const TYPES: Record<string, Type> = buildTypes()

function buildTypes(): Record<string, Type> {
  const types: Record<string, Type> = {
    "": {
      effectiveness: neutralRow()
    },
    stellar: {
      effectiveness: { "???": 1 }
    }
  }

  for (const attackType of Object.keys(TYPE_CHART) as TypeName[]) {
    types[toID(attackType)] = {
      effectiveness: {
        "???": 1,
        ...TYPE_CHART[attackType],
        Stellar: 1
      }
    }
  }

  return types
}

function neutralRow(): Type["effectiveness"] {
  const row: Partial<Record<TypeName, 1>> = { Stellar: 1 }

  for (const defenseType of Object.keys(TYPE_CHART) as TypeName[]) {
    row[defenseType] = 1
  }

  return row
}
