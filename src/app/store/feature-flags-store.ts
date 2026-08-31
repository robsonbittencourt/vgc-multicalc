import { computed, effect, Injectable } from "@angular/core"
import { FEATURES } from "@configuration/feature-flags"
import { patchState, signalStore, withComputed, withHooks, withState } from "@ngrx/signals"

export type FeatureFlagsState = typeof FEATURES

const ALL_FLAGS = ["teraType", "battery", "powerSpot", "tabletsOfRuin", "swordOfRuin", "vesselOfRuin", "beadsOfRuin", "neutralizingGas", "allowAllPokes", "allItems"] as const

@Injectable({ providedIn: "root" })
export class FeatureFlagsStore extends signalStore(
  { protectedState: false },
  withState<FeatureFlagsState>(FEATURES),
  withComputed(store => ({
    nationalDex: computed(() => ALL_FLAGS.every(flag => store[flag]()))
  })),
  withHooks(store => ({
    onInit() {
      effect(() => {
        if (typeof localStorage === "undefined") return

        const flags = {
          teraType: store.teraType(),
          battery: store.battery(),
          powerSpot: store.powerSpot(),
          tabletsOfRuin: store.tabletsOfRuin(),
          swordOfRuin: store.swordOfRuin(),
          vesselOfRuin: store.vesselOfRuin(),
          beadsOfRuin: store.beadsOfRuin(),
          neutralizingGas: store.neutralizingGas(),
          allowAllPokes: store.allowAllPokes(),
          allItems: store.allItems()
        }

        localStorage.setItem("featureFlags", JSON.stringify(flags))
      })
    }
  }))
) {
  enableChampions() {
    patchState(this, () => Object.fromEntries(ALL_FLAGS.map(flag => [flag, false])))
  }

  enableNationalDex() {
    patchState(this, () => Object.fromEntries(ALL_FLAGS.map(flag => [flag, true])))
  }
}
