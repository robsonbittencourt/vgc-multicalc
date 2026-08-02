import { MOVESETS } from "@data/moveset-data"

const MAX_SPS = 66

describe("MOVESETS evs", () => {
  it("has every Pokemon spending exactly the maximum allowed sps", () => {
    const overLimit: string[] = []
    const underLimit: string[] = []

    for (const [name, moveset] of Object.entries(MOVESETS)) {
      const total = moveset.evs.hp + moveset.evs.atk + moveset.evs.def + moveset.evs.spa + moveset.evs.spd + moveset.evs.spe

      if (total > MAX_SPS) overLimit.push(`${name}: ${total}`)
      if (total < MAX_SPS) underLimit.push(`${name}: ${total}`)
    }

    expect(overLimit).toEqual([])
    expect(underLimit).toEqual([])
  })
})
