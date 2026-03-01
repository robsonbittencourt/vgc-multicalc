import { FieldSide } from "@lib/model/field"
import { Weather } from "@lib/types"
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
    defenderSide: new FieldSide(),
    automaticWeather: null,
    automaticTerrain: null,
    automaticBeadsOfRuinActivated: false,
    automaticSwordOfRuinActivated: false,
    automaticTabletsOfRuinActivated: false,
    automaticVesselOfRuinActivated: false,
    automaticNeutralizingGasActivated: false
  }

  afterEach(() => {
    localStorage.clear()
  })

  it("returns defaultFieldState when localStorage is empty", () => {
    spyOn(localStorage, "getItem").and.callFake(() => null)

    const result = initialFieldState("simple")

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

    const result = initialFieldState("simple")

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

    const result = initialFieldState("simple")

    expect(result.attackerSide.gameType).toBe("Singles")
    expect(result.defenderSide.gameType).toBe("Doubles")
  })

  it("migrates old field data to 'simple' context if new structure is missing", () => {
    const oldField = { weather: "Sun" as Weather }
    const stored = { field: oldField }
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify(stored))

    const result = initialFieldState("simple")
    expect(result.weather).toBe("Sun")
  })

  it("does not migrate old field data for non-simple context", () => {
    const oldField = { weather: "Sun" as Weather }
    const stored = { field: oldField }
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify(stored))

    const result = initialFieldState("multi")
    expect(result.weather).toBeNull()
  })

  it("loads data from context-specific 'fields' object in localStorage", () => {
    const stored = {
      fields: {
        multi: { weather: "Rain" as Weather }
      }
    }
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify(stored))

    const result = initialFieldState("multi")
    expect(result.weather).toBe("Rain")
  })
})
