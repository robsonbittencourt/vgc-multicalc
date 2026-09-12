import { inject, Injectable } from "@angular/core"
import { FieldState, FieldStore } from "@store/field-store"
import { Pokemon } from "@multicalc/model"

export type FieldSideName = "attacker" | "defender"

@Injectable()
export class AutomaticFieldService {
  fieldStore = inject(FieldStore)

  private lastHandledFirstName = "\0"
  private lastHandledFirstAbility = "\0"
  private lastHandledSecondName: string | undefined = undefined
  private lastHandledSecondAbility: string | undefined = undefined

  handlePokemonChange(first: Pokemon, second: Pokemon | null = null, firstSide: FieldSideName = "attacker", secondSide: FieldSideName = "attacker"): { firstChanged: boolean; secondChanged: boolean } {
    const firstChanged = this.lastHandledFirstName != first.name || this.lastHandledFirstAbility != first.ability.name
    const secondChanged = this.lastHandledSecondName != second?.name || this.lastHandledSecondAbility != second?.ability.name

    if (!firstChanged && !secondChanged) return { firstChanged, secondChanged }

    this.lastHandledFirstName = first.name
    this.lastHandledFirstAbility = first.ability.name
    this.lastHandledSecondName = second?.name
    this.lastHandledSecondAbility = second?.ability.name

    this.checkAutomaticField(first, firstChanged, second, secondChanged, firstSide, secondSide)

    return { firstChanged, secondChanged }
  }

  checkAutomaticField(pokemon: Pokemon, firstChanged = true, secondPokemon: Pokemon | null = null, secondChanged = false, pokemonSide: FieldSideName = "attacker", secondPokemonSide: FieldSideName = "attacker") {
    let first: Pokemon | null
    let second: Pokemon | null
    let firstFlag: boolean
    let secondFlag: boolean
    let firstSide: FieldSideName
    let secondSide: FieldSideName

    if (firstChanged && secondPokemon) {
      first = secondPokemon
      second = pokemon
      firstFlag = secondChanged
      secondFlag = firstChanged
      firstSide = secondPokemonSide
      secondSide = pokemonSide
    } else if (!firstChanged && secondChanged) {
      first = pokemon
      second = secondPokemon
      firstFlag = firstChanged
      secondFlag = secondChanged
      firstSide = pokemonSide
      secondSide = secondPokemonSide
    } else {
      first = pokemon
      second = secondPokemon
      firstFlag = firstChanged
      secondFlag = secondChanged
      firstSide = pokemonSide
      secondSide = secondPokemonSide
    }

    const actionsToExecute: ((store: FieldStore) => void)[] = []
    const preserveKeys: (keyof FieldState)[] = []

    const firstAction = first ? this.actionFor(first, firstSide) : undefined
    const firstPreserve = first ? this.preserveKeysFor(first, firstSide) : []

    if (first) {
      preserveKeys.push(...firstPreserve)
    }

    const secondAction = second ? this.actionFor(second, secondSide) : undefined
    const secondPreserve = second ? this.preserveKeysFor(second, secondSide) : []

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

  private actionFor(pokemon: Pokemon, side: FieldSideName): ((store: FieldStore) => void) | undefined {
    const sidedAction = sidedAbilityActions[pokemon.ability.name]

    if (sidedAction) return sidedAction[side]

    return abilityActions[pokemon.ability.name]
  }

  private preserveKeysFor(pokemon: Pokemon, side: FieldSideName): (keyof FieldState)[] {
    const sidedPreserve = sidedAbilityPreserveMap[pokemon.ability.name]

    if (sidedPreserve) return sidedPreserve[side]

    return abilityPreserveMap[pokemon.ability.name] ?? []
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
  "Neutralizing Gas": ["automaticNeutralizingGasActivated"],
  "Fairy Aura": ["automaticFairyAuraActivated"]
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
  "Neutralizing Gas": store => store.toggleAutomaticNeutralizingGas(),
  "Fairy Aura": store => store.toggleAutomaticFairyAura()
}

const sidedAbilityPreserveMap: Record<string, Record<FieldSideName, (keyof FieldState)[]>> = {
  "Steely Spirit": {
    attacker: ["automaticAttackerSteelySpirit"],
    defender: ["automaticDefenderSteelySpirit"]
  }
}

const sidedAbilityActions: Record<string, Record<FieldSideName, (store: FieldStore) => void>> = {
  "Steely Spirit": {
    attacker: store => store.toggleAutomaticAttackerSteelySpirit(),
    defender: store => store.toggleAutomaticDefenderSteelySpirit()
  }
}
