import { StatusDescription } from "@lib/types"
import { StatusName } from "@robsonbittencourt/calc/src/data/interface"

export class Status {
  private static readonly values: Status[] = []

  private constructor(
    readonly code: StatusName,
    readonly description: StatusDescription
  ) {
    Status.values.push(this)
  }

  static readonly HEALTHY = new Status("" as StatusName, "Healthy")
  static readonly SLEEP = new Status("slp", "Sleep")
  static readonly POISON = new Status("psn", "Poison")
  static readonly BURN = new Status("brn", "Burn")
  static readonly FREEZE = new Status("frz", "Freeze")
  static readonly PARALYSIS = new Status("par", "Paralysis")

  static byCode(code: string): Status {
    return Status.values.find(condition => condition.code === code) ?? Status.HEALTHY
  }

  static byDescription(description: string): Status {
    return Status.values.find(condition => condition.description === description) ?? Status.HEALTHY
  }

  static allDescriptions(): string[] {
    return Status.values.map(s => s.description)
  }
}
