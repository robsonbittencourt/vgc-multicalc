import { KeyValuePair } from "@app/shared/input-autocomplete/input-autocomplete.component"

export class Natures {
  private static _instance: Natures

  natures: KeyValuePair[]

  private constructor() {
    this.natures = this.allNatures()
  }

  static get instance(): Natures {
    if (!Natures._instance) {
      Natures._instance = new Natures()
    }

    return Natures._instance
  }

  allNatures(): KeyValuePair[] {
    return [
      { key: "Adamant (+Atk, -SpA)", value: "Adamant" },
      { key: "Bashful", value: "Bashful" },
      { key: "Bold (+Def, -Atk)", value: "Bold" },
      { key: "Brave (+Atk, -Spe)", value: "Brave" },
      { key: "Calm (+SpD, -Atk)", value: "Calm" },
      { key: "Careful (+SpD, -SpA)", value: "Careful" },
      { key: "Docile", value: "Docile" },
      { key: "Gentle (+SpD, -Def)", value: "Gentle" },
      { key: "Hardy", value: "Hardy" },
      { key: "Hasty (+Spe, -Def)", value: "Hasty" },
      { key: "Impish (+Def, -SpA)", value: "Impish" },
      { key: "Jolly (+Spe, -SpA)", value: "Jolly" },
      { key: "Lax (+Def, -SpD)", value: "Lax" },
      { key: "Lonely (+Atk, -Def)", value: "Lonely" },
      { key: "Mild (+SpA, -Def)", value: "Mild" },
      { key: "Modest (+SpA, -Atk)", value: "Modest" },
      { key: "Naive (+Spe, -SpD)", value: "Naive" },
      { key: "Naughty (+Atk, -SpD)", value: "Naughty" },
      { key: "Quiet (+SpA, -Spe)", value: "Quiet" },
      { key: "Quirky", value: "Quirky" },
      { key: "Rash (+SpA, -SpD)", value: "Rash" },
      { key: "Relaxed (+Def, -Spe)", value: "Relaxed" },
      { key: "Sassy (+SpD, -Spe)", value: "Sassy" },
      { key: "Serious", value: "Serious" },
      { key: "Timid (+Spe, -Atk)", value: "Timid" }
    ]
  }
}
