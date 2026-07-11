import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedMatchService } from "@app/pages/speed-calc/speed-match.service"
import { CalcStore } from "@store/calc-store"
import { Field, Pokemon } from "@multicalc/model"

describe("SpeedMatchService", () => {
  let service: SpeedMatchService
  let store: CalcStore
  const field = new Field()

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [SpeedMatchService, CalcStore, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(SpeedMatchService)
    store = TestBed.inject(CalcStore)
  })

  it("should return ignored status when target is the same as the active Pokémon", () => {
    const active = store.team().activePokemon()!

    const result = service.matchSpeed(active.id, active, field)

    expect(result).toEqual({ status: "ignored", message: "" })
  })

  it("should return unreachable status when even max speed EV investment cannot outspeed the target", () => {
    const activeId = store.addPokemonToTeam("Ferrothorn")
    store.nature(activeId, "Relaxed")
    const active = store.findPokemonById(activeId)

    const target = new Pokemon("Regieleki", { nature: "Timid", evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 } })

    const result = service.matchSpeed(activeId, target, field)

    expect(result).toEqual({ status: "unreachable", message: `${active.name} can't outspeed ${target.name} with a legal spread` })
  })

  it("should return insufficient status when the needed speed EV does not fit the remaining SP budget", () => {
    const activeId = store.addPokemonToTeam("Garchomp")
    store.nature(activeId, "Jolly")
    store.evs(activeId, { hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0 })

    const target = new Pokemon("Garchomp", { nature: "Adamant", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 100 } })

    const result = service.matchSpeed(activeId, target, field)

    expect(result.status).toBe("insufficient")
    expect(result.message).toBe(`Not enough SP to outspeed ${target.name}: needs 2, 1 free`)
  })

  it("should apply the speed EV without changing nature when the current nature already suffices", () => {
    const activeId = store.addPokemonToTeam("Garchomp")
    store.nature(activeId, "Jolly")
    store.evs(activeId, { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 0 })
    const active = store.findPokemonById(activeId)

    const target = new Pokemon("Garchomp", { nature: "Adamant", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 100 } })

    const result = service.matchSpeed(activeId, target, field)

    expect(result.status).toBe("applied")
    expect(result.message).toBe(`${active.name} set to outspeed ${target.name} (2 SP)`)
    expect(store.findPokemonById(activeId).evs.spe).toBe(12)
    expect(store.findPokemonById(activeId).nature).toBe("Jolly")
  })

  it("should apply the speed EV and change nature when a neutral spread cannot outspeed but a positive nature can", () => {
    const activeId = store.addPokemonToTeam("Garchomp")
    store.nature(activeId, "Adamant")
    store.evs(activeId, { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 0 })
    const active = store.findPokemonById(activeId)

    const target = new Pokemon("Garchomp", { nature: "Jolly", evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 180 } })

    const result = service.matchSpeed(activeId, target, field)

    expect(result.status).toBe("applied")
    expect(result.message).toBe(`${active.name} set to outspeed ${target.name} (24 SP, Jolly)`)
    expect(store.findPokemonById(activeId).nature).toBe("Jolly")
    expect(store.findPokemonById(activeId).evs.spe).toBe(188)
  })
})
