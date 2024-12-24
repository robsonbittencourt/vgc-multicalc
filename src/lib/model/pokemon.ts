import { Items } from "@data/items"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL, STATUS_CONDITIONS } from "@lib/constants"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { SmogonFunctions } from "@lib/smogon-functions/smogon-functions"
import { SmogonPokemonBuilder } from "@lib/smogon-functions/smogon-pokemon-builder"
import { PokemonParameters, Stats } from "@lib/types"
import { Pokemon as PokemonSmogon } from "@robsonbittencourt/calc"
import { StatsTable, TypeName } from "@robsonbittencourt/calc/dist/data/interface"
import { StatID, StatIDExceptHP } from "@robsonbittencourt/calc/src/data/interface"
import { v4 as uuidv4 } from "uuid"

export class Pokemon {
  readonly id: string
  readonly moveSet: MoveSet
  readonly teraType: string
  readonly hpPercentage: number
  readonly commanderActive: boolean
  readonly higherStat: StatIDExceptHP

  private pokemonSmogon: PokemonSmogon
  private smogonFunctions = new SmogonFunctions()

  constructor(name: string, options: PokemonParameters = {}) {
    const adjustedName = name == SELECT_POKEMON_LABEL ? "Togepi" : name
    this.pokemonSmogon = new SmogonPokemonBuilder().fromScratch(adjustedName, options)

    this.id = options.id ?? uuidv4()
    this.hpPercentage = options.hpPercentage ?? 100
    this.commanderActive = options.commanderActive ?? false
    this.teraType = options.teraType ?? DEFAULT_TERA_TYPE
    this.moveSet = options.moveSet ?? new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
    this.higherStat = this.smogonFunctions.higherStat(this.pokemonSmogon)
  }

  get name(): string {
    if (this.isDefault) return SELECT_POKEMON_LABEL

    return this.pokemonSmogon.name
  }

  get displayName(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.pokemonSmogon.name
    }

    return this.pokemonSmogon.name.replaceAll("-", " ")
  }

  get displayNameWithoutSuffix(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
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

  get level(): number {
    return this.pokemonSmogon.level
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
    return this.getModifiedStat(this.pokemonSmogon, "atk")
  }

  get baseDef(): number {
    return this.pokemonSmogon.species.baseStats.def
  }

  get modifiedDef(): number {
    return this.getModifiedStat(this.pokemonSmogon, "def")
  }

  get baseSpa(): number {
    return this.pokemonSmogon.species.baseStats.spa
  }

  get modifiedSpa(): number {
    return this.getModifiedStat(this.pokemonSmogon, "spa")
  }

  get baseSpd(): number {
    return this.pokemonSmogon.species.baseStats.spd
  }

  get modifiedSpd(): number {
    return this.getModifiedStat(this.pokemonSmogon, "spd")
  }

  get baseSpe(): number {
    return this.pokemonSmogon.species.baseStats.spe
  }

  get modifiedSpe(): number {
    return this.getModifiedStat(this.pokemonSmogon, "spe")
  }

  get isParadoxAbility() {
    return this.isSmogonParadoxAbility(this.pokemonSmogon)
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

  private isSmogonParadoxAbility(pokemonSmogon: PokemonSmogon): boolean {
    return pokemonSmogon.ability == "Protosynthesis" || pokemonSmogon.ability == "Quark Drive"
  }

  private getModifiedStat(pokemonSmogon: PokemonSmogon, stat: StatID) {
    return this.smogonFunctions.getModifiedStat(pokemonSmogon.rawStats[stat], pokemonSmogon.boosts[stat])
  }

  private statusDescriptionByCode(code: string): string {
    return STATUS_CONDITIONS.find(s => s.code === code)!.description
  }
}
