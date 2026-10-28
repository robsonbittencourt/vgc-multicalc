import { CalcAdjuster } from "./calc-adjuster"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"
import { getStrongWeather } from "@data/strong-weather-data"
import { Weather } from "@data/types"

export class StrongWeatherAdjuster implements CalcAdjuster {
  adjust(attacker: CalcPokemon, target: CalcPokemon, _move: Move, _moveCalc: MoveCalc, calcField: FieldCalc, secondAttacker?: Pokemon, field?: Field) {
    const inField = field?.strongWeathersInField ?? []
    const abilities = [attacker.ability, secondAttacker?.ability.name, target.ability]
    const weathers = abilities.map(ability => getStrongWeather(ability)).filter((weather): weather is Weather => weather !== undefined && !inField.includes(weather))

    if (weathers.length === 0 || weathers.includes(calcField.weather!)) return

    calcField.weather = weathers[0]
  }
}
