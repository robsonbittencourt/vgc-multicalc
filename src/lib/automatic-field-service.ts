import { inject, Injectable } from "@angular/core"
import { FieldState, FieldStore } from "@data/store/field-store"
import { Pokemon } from "./model/pokemon"

@Injectable()
export class AutomaticFieldService {
  fieldStore = inject(FieldStore)

  checkAutomaticField(pokemon: Pokemon, firstChanged = true, secondPokemon: Pokemon | null = null, secondChanged = false) {
    let first: Pokemon | null = null
    let second: Pokemon | null = null
    let firstFlag = false
    let secondFlag = false

    if (firstChanged && secondPokemon) {
      first = secondPokemon
      second = pokemon
      firstFlag = secondChanged
      secondFlag = firstChanged
    } else if (!firstChanged && secondChanged) {
      first = pokemon
      second = secondPokemon
      firstFlag = firstChanged
      secondFlag = secondChanged
    } else {
      first = pokemon
      second = secondPokemon
      firstFlag = firstChanged
      secondFlag = secondChanged
    }

    const actionsToExecute: ((store: FieldStore) => void)[] = []
    const preserveKeys: (keyof FieldState)[] = []

    const firstAction = first ? abilityActions[first.ability.name] : undefined
    const firstPreserve = first && abilityPreserveMap[first.ability.name] ? abilityPreserveMap[first.ability.name] : []

    if (first) {
      preserveKeys.push(...firstPreserve)
    }

    const secondAction = second ? abilityActions[second.ability.name] : undefined
    const secondPreserve = second && abilityPreserveMap[second.ability.name] ? abilityPreserveMap[second.ability.name] : []

    if (second) {
      preserveKeys.push(...secondPreserve)
    }

    this.fieldStore.cleanAutomaticOptions(preserveKeys)

    if (first && firstFlag && firstAction) {
      const blockedByExistingGas = this.fieldStore.neutralizingGasActivated() && first.isAffectedByNeutralizingGas
      if (!blockedByExistingGas) {
        actionsToExecute.push(firstAction)
      }
    }

    if (second && secondFlag && secondAction) {
      const blockedByExistingGas = this.fieldStore.neutralizingGasActivated() && second.isAffectedByNeutralizingGas
      if (!blockedByExistingGas) {
        actionsToExecute.push(secondAction)
      }
    }

    actionsToExecute.forEach(action => action(this.fieldStore))
  }
}

const abilityPreserveMap: Record<string, (keyof FieldState)[]> = {
  Drought: ["automaticWeather"],
  "Orichalcum Pulse": ["automaticWeather"],
  Drizzle: ["automaticWeather"],
  "Snow Warning": ["automaticWeather"],
  "Sand Stream": ["automaticWeather"],
  "Hadron Engine": ["automaticTerrain"],
  "Electric Surge": ["automaticTerrain"],
  "Grassy Surge": ["automaticTerrain"],
  "Psychic Surge": ["automaticTerrain"],
  "Misty Surge": ["automaticTerrain"],
  "Beads of Ruin": ["automaticBeadsOfRuinActivated"],
  "Sword of Ruin": ["automaticSwordOfRuinActivated"],
  "Tablets of Ruin": ["automaticTabletsOfRuinActivated"],
  "Vessel of Ruin": ["automaticVesselOfRuinActivated"],
  "Neutralizing Gas": ["automaticNeutralizingGasActivated"]
}

const abilityActions: Record<string, (store: FieldStore) => void> = {
  Drought: store => store.toggleAutomaticSunWeather(),
  "Orichalcum Pulse": store => store.toggleAutomaticSunWeather(),
  Drizzle: store => store.toggleAutomaticRainWeather(),
  "Snow Warning": store => store.toggleAutomaticSnowWeather(),
  "Sand Stream": store => store.toggleAutomaticSandWeather(),
  "Hadron Engine": store => store.toggleAutomaticElectricTerrain(),
  "Electric Surge": store => store.toggleAutomaticElectricTerrain(),
  "Grassy Surge": store => store.toggleAutomaticGrassyTerrain(),
  "Psychic Surge": store => store.toggleAutomaticPsychicTerrain(),
  "Misty Surge": store => store.toggleAutomaticMistyTerrain(),
  "Beads of Ruin": store => store.toggleAutomaticBeadsOfRuin(),
  "Sword of Ruin": store => store.toggleAutomaticSwordOfRuin(),
  "Tablets of Ruin": store => store.toggleAutomaticTabletsOfRuin(),
  "Vessel of Ruin": store => store.toggleAutomaticVesselOfRuin(),
  "Neutralizing Gas": store => store.toggleAutomaticNeutralizingGas()
}
