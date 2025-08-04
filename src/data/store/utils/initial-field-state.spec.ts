import { FieldSide } from "@lib/model/field"
import { initialFieldState } from "./initial-field-state"

describe("initialFieldState", () => {
  const mockDefault = {
    updateLocalStorage: true,
    weather: null,
    terrain: null,
    isBeadsOfRuin: false,
    isSwordOfRuin: false,
    isTabletsOfRuin: false,
    isVesselOfRuin: false,
    isMagicRoom: false,
    isWonderRoom: false,
    isGravity: false,
    isTrickRoom: false,
    isNeutralizingGas: false,
    attackerSide: new FieldSide(),
    defenderSide: new FieldSide()
  }

  afterEach(() => {
    localStorage.clear()
  })

  it("returns defaultFieldState when localStorage is empty", () => {
    spyOn(localStorage, "getItem").and.callFake(() => null)

    const result = initialFieldState()

    expect(result).toEqual(mockDefault)
  })

  it('sets gameType to "Doubles" if missing in attackerSide and defenderSide', () => {
    const stored = {
      field: {
        attackerSide: {},
        defenderSide: {}
      }
    }
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify(stored))

    const result = initialFieldState()

    expect(result.attackerSide.gameType).toBe("Doubles")
    expect(result.defenderSide.gameType).toBe("Doubles")
  })

  it("keeps existing gameType values if already defined", () => {
    const stored = {
      field: {
        attackerSide: { gameType: "Singles" },
        defenderSide: { gameType: "Doubles" }
      }
    }
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify(stored))

    const result = initialFieldState()

    expect(result.attackerSide.gameType).toBe("Singles")
    expect(result.defenderSide.gameType).toBe("Doubles")
  })
})
