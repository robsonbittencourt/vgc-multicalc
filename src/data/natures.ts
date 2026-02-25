import { KeyValuePair } from "@basic/input-autocomplete/input-autocomplete.component"

export class Natures {
  private static _instance: Natures

  natures: KeyValuePair[]
  shortNatures: KeyValuePair[]

  private constructor() {
    this.natures = this.allNatures()
    this.shortNatures = this.natures.map(n => ({ key: n.value, value: n.value }))
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
      { key: "Modest (+SpA, -Atk)", value: "Modest" },
      { key: "Jolly (+Spe, -SpA)", value: "Jolly" },
      { key: "Timid (+Spe, -Atk)", value: "Timid" },
      { key: "Bold (+Def, -Atk)", value: "Bold" },
      { key: "Impish (+Def, -SpA)", value: "Impish" },
      { key: "Calm (+SpD, -Atk)", value: "Calm" },
      { key: "Careful (+SpD, -SpA)", value: "Careful" },
      { key: "Brave (+Atk, -Spe)", value: "Brave" },
      { key: "Quiet (+SpA, -Spe)", value: "Quiet" },
      { key: "Gentle (+SpD, -Def)", value: "Gentle" },
      { key: "Hasty (+Spe, -Def)", value: "Hasty" },
      { key: "Lax (+Def, -SpD)", value: "Lax" },
      { key: "Lonely (+Atk, -Def)", value: "Lonely" },
      { key: "Mild (+SpA, -Def)", value: "Mild" },
      { key: "Naive (+Spe, -SpD)", value: "Naive" },
      { key: "Naughty (+Atk, -SpD)", value: "Naughty" },
      { key: "Rash (+SpA, -SpD)", value: "Rash" },
      { key: "Relaxed (+Def, -Spe)", value: "Relaxed" },
      { key: "Sassy (+SpD, -Spe)", value: "Sassy" },
      { key: "Bashful", value: "Bashful" },
      { key: "Docile", value: "Docile" },
      { key: "Hardy", value: "Hardy" },
      { key: "Quirky", value: "Quirky" },
      { key: "Serious", value: "Serious" }
    ]
  }
}
