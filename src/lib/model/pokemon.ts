import { AllPokemon } from "@data/all-pokemon"
import { Items } from "@data/items"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Stats } from "@lib/types"
import { Generations, Pokemon as PokemonSmogon } from "@robsonbittencourt/calc"
import { StatsTable, StatusName, TypeName } from "@robsonbittencourt/calc/dist/data/interface"
import dedent from "dedent"
import { v4 as uuidv4 } from "uuid"

type PokemonParameters = {
  id?: string
  ability?: string
  abilityOn?: boolean
  nature?: string
  item?: string
  teraType?: string
  teraTypeActive?: boolean
  evs?: Partial<Stats>
  moveSet?: MoveSet
  boosts?: Partial<Stats>
  status?: string
  ivs?: Partial<Stats>
  hpPercentage?: number
  commanderActive?: boolean
}

export class Pokemon {
  private _id: string
  public pokemonSmogon: PokemonSmogon
  public teraTypeStorage: string
  public evsStorage: Partial<Stats>
  public ivsStorage: Partial<Stats>
  private moveSetStorage: MoveSet
  private statusStorage?: string
  private hpPercentageStorage: number
  private commanderActivatedStorage: boolean
  private selectPokemonLabel: string = "Select a Pokémon"

  constructor(name: string, options: PokemonParameters = {}) {
    const defaulTeraType = "Water"
    const adjustedName = name == this.selectPokemonLabel ? "Togepi" : name

    this.pokemonSmogon = new PokemonSmogon(Generations.get(9), adjustedName, {
      nature: options.nature ?? "Hardy",
      item: options.item != Items.instance.withoutItem() ? options.item : undefined,
      ability: options.ability ?? AllPokemon.instance.abilitiesByName(adjustedName)[0],
      abilityOn: options.abilityOn ?? false,
      teraType: adjustedName == "Terapagos-Stellar" || options.teraTypeActive ? ((options.teraType as TypeName) ?? defaulTeraType) : undefined,
      evs: options.evs,
      ivs: options.ivs,
      boosts: options.boosts,
      status: this.statusConditionCode(options.status ?? "Healthy"),
      level: 50
    })

    this.hpPercentageStorage = options.hpPercentage ?? 100
    this.pokemonSmogon.originalCurHP = Math.round((this.pokemonSmogon.maxHP() * this.hpPercentageStorage) / 100)

    this._id = options.id ?? uuidv4()
    this.commanderActivatedStorage = options.commanderActive ?? false
    this.statusStorage = options.status ?? "Healthy"
    this.teraTypeStorage = options.teraType ?? defaulTeraType
    this.evsStorage = options.evs ?? { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    this.ivsStorage = options.ivs ?? { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
    this.moveSetStorage = options.moveSet ?? new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    if (this.isDefault()) return this.selectPokemonLabel

    return this.pokemonSmogon.name
  }

  public get displayName(): string {
    if (this.isDefault()) {
      return this.selectPokemonLabel
    }

    if (this.isNameWithHiphen()) {
      return this.pokemonSmogon.name
    }

    return this.pokemonSmogon.name.replaceAll("-", " ")
  }

  public get displayNameWithoutSuffix(): string {
    if (this.isDefault()) {
      return this.selectPokemonLabel
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

  public get nature(): string {
    return this.pokemonSmogon.nature as string
  }

  public get item(): string {
    if (!this.pokemonSmogon.item) {
      return Items.instance.withoutItem()
    }

    return this.pokemonSmogon.item as string
  }

  public set item(item: string) {
    this.pokemonSmogon = this.buildPokemonSmogon({ item: item })
  }

  public get ability(): string {
    return this.pokemonSmogon.ability as string
  }

  public set ability(ability: string) {
    this.pokemonSmogon = this.buildPokemonSmogon({ ability: ability })
  }

  public get abilityOn(): boolean {
    return this.pokemonSmogon.abilityOn!
  }

  public actionableAbility(): boolean {
    const actionableAbilities = ["Slow Start", "Unburden"]
    return actionableAbilities.includes(this.ability)
  }

  public get displayAbility(): string {
    if (this.pokemonSmogon.ability?.includes("Embody Aspect")) {
      return "Embody Aspect"
    }
    return this.pokemonSmogon.ability as string
  }

  public get hpPercentage(): number {
    return this.hpPercentageStorage
  }

  public get evs(): Partial<Stats> {
    return this.pokemonSmogon.evs
  }

  public get ivs(): Partial<Stats> {
    return this.pokemonSmogon.ivs
  }

  public get boosts(): StatsTable {
    return this.pokemonSmogon.boosts
  }

  public get status(): string {
    return this.statusStorage ?? ""
  }

  public set status(status: string) {
    this.statusStorage = status
    this.pokemonSmogon = this.buildPokemonSmogon({}, (status = this.statusConditionCode(status)))
  }

  statusConditionCode(status: string): StatusName {
    const statusConditions = [
      { code: "", status: "Healthy" },
      { code: "slp", status: "Sleep" },
      { code: "psn", status: "Poison" },
      { code: "brn", status: "Burn" },
      { code: "frz", status: "Freeze" },
      { code: "par", status: "Paralysis" }
    ]

    return statusConditions.find(s => s.status === status)?.code! as StatusName
  }

  public get teraType(): string {
    if (this.pokemonSmogon.teraType) {
      return this.pokemonSmogon.teraType as string
    }

    return this.teraTypeStorage
  }

  public get teraTypeActive(): boolean {
    return this.isTerapagosStellar() || this.pokemonSmogon.teraType != undefined
  }

  public get moveSet(): MoveSet {
    return this.moveSetStorage
  }

  public get move(): Move {
    return this.moveSetStorage.activeMove
  }

  public get activeMoveName(): string {
    return this.moveSetStorage.activeMove.name
  }

  public get move1Name(): string {
    return this.moveSet.move1.name
  }

  public get move2Name(): string {
    return this.moveSet.move2.name
  }

  public get move3Name(): string {
    return this.moveSet.move3.name
  }

  public get move4Name(): string {
    return this.moveSet.move4.name
  }

  public get hp(): number {
    return this.pokemonSmogon.stats.hp
  }

  public get actualHp(): number {
    return this.pokemonSmogon.curHP()
  }

  public get baseHp(): number {
    return this.pokemonSmogon.species.baseStats.hp
  }

  public get atk(): number {
    return this.pokemonSmogon.stats.atk
  }

  public get baseAtk(): number {
    return this.pokemonSmogon.species.baseStats.atk
  }

  public get def(): number {
    return this.pokemonSmogon.stats.def
  }

  public get baseDef(): number {
    return this.pokemonSmogon.species.baseStats.def
  }

  public get spa(): number {
    return this.pokemonSmogon.stats.spa
  }

  public get baseSpa(): number {
    return this.pokemonSmogon.species.baseStats.spa
  }

  public get spd(): number {
    return this.pokemonSmogon.stats.spd
  }

  public get baseSpd(): number {
    return this.pokemonSmogon.species.baseStats.spd
  }

  public get spe(): number {
    return this.pokemonSmogon.stats.spe
  }

  public get baseSpe(): number {
    return this.pokemonSmogon.species.baseStats.spe
  }

  modifiedAtk(): number {
    return this.getModifiedStat(this.pokemonSmogon.rawStats["atk"], this.pokemonSmogon.boosts["atk"])
  }

  modifiedDef(): number {
    return this.getModifiedStat(this.pokemonSmogon.rawStats["def"], this.pokemonSmogon.boosts["def"])
  }

  modifiedSpa(): number {
    return this.getModifiedStat(this.pokemonSmogon.rawStats["spa"], this.pokemonSmogon.boosts["spa"])
  }

  modifiedSpd(): number {
    return this.getModifiedStat(this.pokemonSmogon.rawStats["spd"], this.pokemonSmogon.boosts["spd"])
  }

  modifiedSpe(): number {
    return this.getModifiedStat(this.pokemonSmogon.rawStats["spe"], this.pokemonSmogon.boosts["spe"])
  }

  public isParadoxAbility() {
    return this.ability == "Protosynthesis" || this.ability == "Quark Drive"
  }

  public get commanderActivated(): boolean {
    return this.commanderActivatedStorage
  }

  public clone(options: PokemonParameters = {}): Pokemon {
    return new Pokemon(this.name, {
      ability: options.ability ?? this.ability,
      abilityOn: options.abilityOn ?? this.abilityOn,
      nature: options.nature ?? this.nature,
      item: options.item ?? this.item,
      teraType: options.teraType ?? this.teraTypeStorage,
      teraTypeActive: options.teraTypeActive ?? this.teraTypeActive,
      evs: options.evs ?? this.evs,
      ivs: options.ivs ?? this.ivs,
      moveSet: options.moveSet ?? this.moveSetStorage.clone(),
      boosts: options.boosts ?? this.boosts,
      status: options.status ?? this.status,
      hpPercentage: options.hpPercentage ?? this.hpPercentageStorage
    })
  }

  public equals(toCompare: Pokemon): boolean {
    return (
      toCompare &&
      this.pokemonSmogon.name === toCompare.pokemonSmogon.name &&
      this.pokemonSmogon.nature === toCompare.pokemonSmogon.nature &&
      this.pokemonSmogon.item === toCompare.pokemonSmogon.item &&
      this.pokemonSmogon.ability === toCompare.pokemonSmogon.ability &&
      this.teraTypeStorage === toCompare.teraTypeStorage &&
      this.teraTypeActive === toCompare.teraTypeActive &&
      this.pokemonSmogon.evs.hp === toCompare.pokemonSmogon.evs.hp &&
      this.pokemonSmogon.evs.atk === toCompare.pokemonSmogon.evs.atk &&
      this.pokemonSmogon.evs.def === toCompare.pokemonSmogon.evs.def &&
      this.pokemonSmogon.evs.spa === toCompare.pokemonSmogon.evs.spa &&
      this.pokemonSmogon.evs.spd === toCompare.pokemonSmogon.evs.spd &&
      this.pokemonSmogon.evs.spe === toCompare.pokemonSmogon.evs.spe
    )
  }

  public totalEvs(): number {
    return this.pokemonSmogon.evs.hp + this.pokemonSmogon.evs.atk + this.pokemonSmogon.evs.def + this.pokemonSmogon.evs.spa + this.pokemonSmogon.evs.spd + this.pokemonSmogon.evs.spe
  }

  public evsDescription(isAttacker: boolean): string {
    let evsDescription = ""

    if (isAttacker) {
      evsDescription = "Offensive: "
      if (this.evs.atk && this.evs.atk != 0) evsDescription += `atk: ${this.evs.atk} `
      if (this.evs.spa && this.evs.spa != 0) evsDescription += `spa: ${this.evs.spa} `
    } else {
      evsDescription = "Bulky: "
      if (this.evs.hp && this.evs.hp != 0) evsDescription += `hp: ${this.evs.hp} `
      if (this.evs.def && this.evs.def != 0) evsDescription += `def: ${this.evs.def} `
      if (this.evs.spd && this.evs.spd != 0) evsDescription += `spd: ${this.evs.spd} `
    }

    return evsDescription
  }

  public evsDescriptionShowdown(): string {
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

  public ivsDescriptionShowdown(): string {
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

  private buildPokemonSmogon(
    {
      name,
      nature,
      item,
      ability,
      abilityOn,
      teraType,
      teraTypeActive,
      evs,
      ivs,
      boosts,
      hpValue
    }: {
      name?: string
      nature?: string
      item?: string
      ability?: string
      abilityOn?: boolean
      teraType?: string
      teraTypeActive?: boolean
      evs?: Partial<StatsTable> & { spc?: number }
      ivs?: Partial<StatsTable> & { spc?: number }
      boosts?: StatsTable
      hpValue?: number
    } = {},
    status?: StatusName
  ): PokemonSmogon {
    const pokemonSmogon = new PokemonSmogon(Generations.get(9), name ? name : this.pokemonSmogon.name, {
      nature: nature ? nature : this.pokemonSmogon.nature,
      item: this.buildItem(item),
      ability: ability ? ability : this.pokemonSmogon.ability,
      abilityOn: abilityOn ? abilityOn : this.pokemonSmogon.abilityOn,
      teraType: this.buildTeraType(teraType, teraTypeActive) as TypeName,
      evs: evs ? evs : this.pokemonSmogon.evs,
      ivs: ivs ? ivs : this.pokemonSmogon.ivs,
      boosts: boosts ? boosts : this.pokemonSmogon.boosts,
      status: status != undefined ? status : this.pokemonSmogon.status,
      originalCurHP: hpValue ? hpValue : this.pokemonSmogon.originalCurHP,
      level: 50
    })

    if (abilityOn != undefined) {
      pokemonSmogon.abilityOn = abilityOn
    } else {
      pokemonSmogon.abilityOn = this.pokemonSmogon.abilityOn
    }

    if (hpValue == 0) {
      pokemonSmogon.originalCurHP = 0
    }

    return pokemonSmogon
  }

  private buildItem(item?: string): string | undefined {
    if (!item) {
      return this.pokemonSmogon.item
    }

    if (item == Items.instance.withoutItem()) {
      return undefined
    }

    return item
  }

  private buildTeraType(teraType?: string, teraTypeActive?: boolean) {
    if (teraTypeActive == false) {
      return undefined
    }

    if (teraTypeActive == undefined && !this.teraTypeActive) {
      return undefined
    }

    if (teraTypeActive == undefined && this.teraTypeActive) {
      return this.pokemonSmogon.teraType
    }

    return teraType
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

  isDefault() {
    return this.pokemonSmogon.name == "Togepi"
  }

  isOgerpon(): boolean {
    return this.name.startsWith("Ogerpon")
  }

  isTerapagos(): boolean {
    return this.name.startsWith("Terapagos")
  }

  isTerapagosStellar(): boolean {
    return this.name == "Terapagos-Stellar"
  }

  private getModifiedStat(stat: number, mod: number): number {
    const numerator = 0
    const denominator = 1
    const modernGenBoostTable = [
      [2, 8],
      [2, 7],
      [2, 6],
      [2, 5],
      [2, 4],
      [2, 3],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [8, 2]
    ]
    stat = this.OF16(stat * modernGenBoostTable[6 + mod][numerator])
    stat = Math.floor(stat / modernGenBoostTable[6 + mod][denominator])

    return stat
  }

  private OF16(n: number): number {
    return n > 65535 ? n % 65536 : n
  }

  type1(): TypeName {
    return this.pokemonSmogon.types[0]
  }

  type2(): TypeName | undefined {
    return this.pokemonSmogon.types[1]
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
}
