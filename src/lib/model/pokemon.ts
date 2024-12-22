import { AllPokemon } from "@data/all-pokemon"
import { Items } from "@data/items"
import { DEFAULT_TERA_TYPE } from "@lib/constants"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { SmogonFunctions } from "@lib/smogon-functions/smogon-functions"
import { PokemonParameters, Stats } from "@lib/types"
import { Generations, Pokemon as PokemonSmogon } from "@robsonbittencourt/calc"
import { StatsTable, StatusName, TypeName } from "@robsonbittencourt/calc/dist/data/interface"
import { StatID } from "@robsonbittencourt/calc/src/data/interface"
import dedent from "dedent"
import { v4 as uuidv4 } from "uuid"

export class Pokemon {
  readonly id: string
  readonly moveSet: MoveSet
  readonly teraType: string
  readonly hpPercentage: number
  readonly commanderActivated: boolean

  pokemonSmogon: PokemonSmogon
  private smogonFunctions = new SmogonFunctions()

  private SELECT_POKEMON_LABEL = "Select a Pokémon"

  private STATUS_CONDITIONS = [
    { code: "", description: "Healthy" },
    { code: "slp", description: "Sleep" },
    { code: "psn", description: "Poison" },
    { code: "brn", description: "Burn" },
    { code: "frz", description: "Freeze" },
    { code: "par", description: "Paralysis" }
  ]

  constructor(name: string, options: PokemonParameters = {}) {
    const adjustedName = name == this.SELECT_POKEMON_LABEL ? "Togepi" : name

    this.id = options.id ?? uuidv4()
    this.hpPercentage = options.hpPercentage ?? 100
    this.commanderActivated = options.commanderActive ?? false
    this.teraType = options.teraType ?? DEFAULT_TERA_TYPE
    this.moveSet = options.moveSet ?? new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))

    this.pokemonSmogon = this.buildPokemonSmogon(adjustedName, options)
  }

  get name(): string {
    if (this.isDefault) return this.SELECT_POKEMON_LABEL

    return this.pokemonSmogon.name
  }

  get displayName(): string {
    if (this.isDefault) {
      return this.SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.pokemonSmogon.name
    }

    return this.pokemonSmogon.name.replaceAll("-", " ")
  }

  get displayNameWithoutSuffix(): string {
    if (this.isDefault) {
      return this.SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.pokemonSmogon.name
    }

    if (this.pokemonSmogon.name.includes("-")) {
      return this.pokemonSmogon.name.substring(0, this.pokemonSmogon.name.indexOf("-"))
    }

    return this.pokemonSmogon.name
  }

  private isNameWithHiphen(): boolean {
    const namesWithHiphen = ["Porygon-Z", "Ho-Oh", "Jangmo-o", "Hakamo-o", "Kommo-o", "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"]

    return namesWithHiphen.includes(this.pokemonSmogon.name)
  }

  get type1(): TypeName {
    return this.pokemonSmogon.types[0]
  }

  get type2(): TypeName | undefined {
    return this.pokemonSmogon.types[1]
  }

  get nature(): string {
    return this.pokemonSmogon.nature as string
  }

  get item(): string {
    if (!this.pokemonSmogon.item) {
      return Items.instance.withoutItem()
    }

    return this.pokemonSmogon.item as string
  }

  get ability(): string {
    return this.pokemonSmogon.ability as string
  }

  get abilityOn(): boolean {
    return this.pokemonSmogon.abilityOn!
  }

  get actionableAbility(): boolean {
    const actionableAbilities = ["Slow Start", "Unburden"]
    return actionableAbilities.includes(this.ability)
  }

  get displayAbility(): string {
    if (this.pokemonSmogon.ability?.includes("Embody Aspect")) {
      return "Embody Aspect"
    }
    return this.pokemonSmogon.ability as string
  }

  get evs(): Partial<Stats> {
    return this.pokemonSmogon.evs
  }

  get totalEvs(): number {
    return this.pokemonSmogon.evs.hp + this.pokemonSmogon.evs.atk + this.pokemonSmogon.evs.def + this.pokemonSmogon.evs.spa + this.pokemonSmogon.evs.spd + this.pokemonSmogon.evs.spe
  }

  get ivs(): Partial<Stats> {
    return this.pokemonSmogon.ivs
  }

  get boosts(): StatsTable {
    return this.pokemonSmogon.boosts
  }

  get status(): string {
    return this.statusDescriptionByCode(this.pokemonSmogon.status)
  }

  get teraTypeActive(): boolean {
    return this.isTerapagosStellar || this.pokemonSmogon.teraType != undefined
  }

  get move(): Move {
    return this.moveSet.activeMove
  }

  get activeMoveName(): string {
    return this.moveSet.activeMove.name
  }

  get move1Name(): string {
    return this.moveSet.move1.name
  }

  get move2Name(): string {
    return this.moveSet.move2.name
  }

  get move3Name(): string {
    return this.moveSet.move3.name
  }

  get move4Name(): string {
    return this.moveSet.move4.name
  }

  get hp(): number {
    return this.pokemonSmogon.stats.hp
  }

  get actualHp(): number {
    return this.pokemonSmogon.curHP()
  }

  get baseHp(): number {
    return this.pokemonSmogon.species.baseStats.hp
  }

  get baseAtk(): number {
    return this.pokemonSmogon.species.baseStats.atk
  }

  get modifiedAtk(): number {
    return this.getModifiedStat("atk")
  }

  get baseDef(): number {
    return this.pokemonSmogon.species.baseStats.def
  }

  get modifiedDef(): number {
    return this.getModifiedStat("def")
  }

  get baseSpa(): number {
    return this.pokemonSmogon.species.baseStats.spa
  }

  get modifiedSpa(): number {
    return this.getModifiedStat("spa")
  }

  get baseSpd(): number {
    return this.pokemonSmogon.species.baseStats.spd
  }

  get modifiedSpd(): number {
    return this.getModifiedStat("spd")
  }

  get baseSpe(): number {
    return this.pokemonSmogon.species.baseStats.spe
  }

  get modifiedSpe(): number {
    return this.getModifiedStat("spe")
  }

  get isParadoxAbility() {
    return this.ability == "Protosynthesis" || this.ability == "Quark Drive"
  }

  get isDefault() {
    return this.pokemonSmogon.name == "Togepi"
  }

  get isOgerpon(): boolean {
    return this.name.startsWith("Ogerpon")
  }

  get isTerapagos(): boolean {
    return this.name.startsWith("Terapagos")
  }

  get isTerapagosStellar(): boolean {
    return this.name == "Terapagos-Stellar"
  }

  clone(options: PokemonParameters = {}): Pokemon {
    return new Pokemon(this.name, {
      ability: options.ability ?? this.ability,
      abilityOn: options.abilityOn ?? this.abilityOn,
      nature: options.nature ?? this.nature,
      item: options.item ?? this.item,
      teraType: options.teraType ?? this.teraType,
      teraTypeActive: options.teraTypeActive ?? this.teraTypeActive,
      evs: options.evs ?? this.evs,
      ivs: options.ivs ?? this.ivs,
      moveSet: options.moveSet ?? this.moveSet.clone(),
      boosts: options.boosts ?? this.boosts,
      status: options.status ?? this.status,
      hpPercentage: options.hpPercentage ?? this.hpPercentage
    })
  }

  equals(toCompare: Pokemon): boolean {
    return (
      toCompare &&
      this.pokemonSmogon.name === toCompare.pokemonSmogon.name &&
      this.pokemonSmogon.nature === toCompare.pokemonSmogon.nature &&
      this.pokemonSmogon.item === toCompare.pokemonSmogon.item &&
      this.pokemonSmogon.ability === toCompare.pokemonSmogon.ability &&
      this.teraType === toCompare.teraType &&
      this.teraTypeActive === toCompare.teraTypeActive &&
      this.pokemonSmogon.evs.hp === toCompare.pokemonSmogon.evs.hp &&
      this.pokemonSmogon.evs.atk === toCompare.pokemonSmogon.evs.atk &&
      this.pokemonSmogon.evs.def === toCompare.pokemonSmogon.evs.def &&
      this.pokemonSmogon.evs.spa === toCompare.pokemonSmogon.evs.spa &&
      this.pokemonSmogon.evs.spd === toCompare.pokemonSmogon.evs.spd &&
      this.pokemonSmogon.evs.spe === toCompare.pokemonSmogon.evs.spe
    )
  }

  checkOgerponTeraAbility(teraActived: boolean): string {
    if (this.name == "Ogerpon-Wellspring") {
      return teraActived ? "Embody Aspect (Wellspring)" : "Water Absorb"
    }

    if (this.name == "Ogerpon-Hearthflame") {
      return teraActived ? "Embody Aspect (Hearthflame)" : "Mold Breaker"
    }

    if (this.name == "Ogerpon-Cornerstone") {
      return teraActived ? "Embody Aspect (Cornerstone)" : "Sturdy"
    }

    return teraActived ? "Embody Aspect (Teal)" : "Defiant"
  }

  private buildPokemonSmogon(pokemonName: string, options: PokemonParameters): PokemonSmogon {
    const pokemonSmogon = new PokemonSmogon(Generations.get(9), pokemonName, {
      nature: options.nature ?? "Hardy",
      item: options.item != Items.instance.withoutItem() ? options.item : undefined,
      ability: options.ability ?? AllPokemon.instance.abilitiesByName(pokemonName)[0],
      abilityOn: options.abilityOn ?? false,
      teraType: pokemonName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? DEFAULT_TERA_TYPE) : undefined,
      evs: options.evs,
      ivs: options.ivs,
      boosts: options.boosts,
      status: this.statusCodeByDescription(options.status ?? "Healthy"),
      level: 50
    })

    const hpPercentage = options.hpPercentage ?? 100
    pokemonSmogon.originalCurHP = Math.round((pokemonSmogon.maxHP() * hpPercentage) / 100)

    return pokemonSmogon
  }

  private getModifiedStat(stat: StatID) {
    return this.smogonFunctions.getModifiedStat(this.pokemonSmogon.rawStats[stat], this.pokemonSmogon.boosts[stat])
  }

  private statusCodeByDescription(description: string): StatusName {
    return this.STATUS_CONDITIONS.find(s => s.description === description)!.code as StatusName
  }

  private statusDescriptionByCode(code: string): string {
    return this.STATUS_CONDITIONS.find(s => s.code === code)!.description
  }

  showdownTextFormat(): string {
    let text = dedent`
      ${this.name} @ ${this.item}
      Ability: ${this.ability}
      Level: ${this.pokemonSmogon.level}
      Tera Type: ${this.teraType}\n      
    `

    const evsDescription = this.evsDescriptionShowdown()
    if (evsDescription.length > 0) {
      text += `EVs: ${evsDescription}\n`
    }

    text += `${this.nature} Nature \n`

    const ivsDescription = this.ivsDescriptionShowdown()
    if (ivsDescription.length > 0) {
      text += `IVs: ${ivsDescription}\n`
    }

    text += dedent`
      - ${this.move1Name}
      - ${this.move2Name}
      - ${this.move3Name}
      - ${this.move4Name}\n
    `

    return text
  }

  private evsDescriptionShowdown(): string {
    let evsDescription = ""

    if (this.evs.hp && this.evs.hp != 0) evsDescription += `${this.evs.hp} HP / `
    if (this.evs.atk && this.evs.atk != 0) evsDescription += `${this.evs.atk} Atk / `
    if (this.evs.def && this.evs.def != 0) evsDescription += `${this.evs.def} Def / `
    if (this.evs.spa && this.evs.spa != 0) evsDescription += `${this.evs.spa} SpA / `
    if (this.evs.spd && this.evs.spd != 0) evsDescription += `${this.evs.spd} SpD / `
    if (this.evs.spe && this.evs.spe != 0) evsDescription += `${this.evs.spe} Spe / `

    evsDescription = evsDescription.slice(0, -3)

    return evsDescription
  }

  private ivsDescriptionShowdown(): string {
    let ivsDescription = ""

    if (this.ivs.hp != 31) ivsDescription += `${this.ivs.hp} HP / `
    if (this.ivs.atk != 31) ivsDescription += `${this.ivs.atk} Atk / `
    if (this.ivs.def != 31) ivsDescription += `${this.ivs.def} Def / `
    if (this.ivs.spa != 31) ivsDescription += `${this.ivs.spa} SpA / `
    if (this.ivs.spd != 31) ivsDescription += `${this.ivs.spd} SpD / `
    if (this.ivs.spe != 31) ivsDescription += `${this.ivs.spe} Spe / `

    ivsDescription = ivsDescription.slice(0, -3)

    return ivsDescription
  }
}
