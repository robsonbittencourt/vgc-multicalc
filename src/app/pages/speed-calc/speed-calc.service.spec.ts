import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpeedCalcService } from "@app/pages/speed-calc/speed-calc.service"
import { Field, Pokemon } from "@multicalc/model"
import { SpeedCalc, SpeedCalcOptions, SpeedTeamPokemon } from "@multicalc/speed-calc"
import { getFinalSpeed } from "@multicalc/stat-calc"

describe("SpeedCalcService", () => {
  let service: SpeedCalcService
  const speedCalc = new SpeedCalc()

  const emptyTeamPokemon: SpeedTeamPokemon = { opponents: [], team: [], myTeam: [] }

  beforeEach(() => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), SpeedCalcService]
    })

    service = TestBed.inject(SpeedCalcService)
  })

  it("should return the same speed statistics as the domain calc", () => {
    const result = service.speedStatistics("Flutter Mane", "MB")

    expect(result).toEqual(speedCalc.retrieveSpeedStatistics("Flutter Mane", "MB"))
  })

  it("should return the same ordered speeds as the domain calc", () => {
    const pokemon = new Pokemon("Raging Bolt", { evs: { spe: 100 } })
    const field = new Field()
    const options = new SpeedCalcOptions({ regulation: "MB" })

    const result = service.orderedSpeeds(pokemon, field, 30, emptyTeamPokemon, options, 0)

    expect(result.map(s => [s.pokemonName, s.value])).toEqual(speedCalc.orderedPokemon(pokemon, field, 30, emptyTeamPokemon, options, 0).map(s => [s.pokemonName, s.value]))
  })

  it("should return the final speed of a Pokémon", () => {
    const pokemon = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })
    const field = new Field()

    const result = service.modifiedSpeed(pokemon, field)

    expect(result).toBe(getFinalSpeed(pokemon, field, false))
  })

  it("should return the final speed of a Pokémon as attacker", () => {
    const pokemon = new Pokemon("Flutter Mane", { evs: { spe: 252 }, nature: "Timid" })
    const field = new Field()

    const result = service.modifiedSpeed(pokemon, field, true)

    expect(result).toBe(getFinalSpeed(pokemon, field, true))
  })
})
