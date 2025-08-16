export class Ability {
  constructor(
    readonly name: string,
    readonly on = false
  ) {
    this.name = name
    this.on = on
  }

  get simpleName(): string {
    if (this.name.includes("Embody Aspect")) {
      return "Embody Aspect"
    }

    return this.name
  }

  get paradoxAbility(): boolean {
    return this.protosynthesis || this.quarkDrive
  }

  get protosynthesis(): boolean {
    return this.name == "Protosynthesis"
  }

  get quarkDrive(): boolean {
    return this.name == "Quark Drive"
  }

  get actionableAbility(): boolean {
    const actionableAbilities = ["Slow Start", "Unburden", "Protosynthesis", "Quark Drive", "Intimidate"]
    return actionableAbilities.includes(this.name)
  }

  is(name: string): boolean {
    return this.name == name
  }

  isNot(name: string): boolean {
    return this.name != name
  }
}
