import { ABILITY_DETAILS } from "@data/abiliity-details"
import { Items } from "@data/items"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL } from "@lib/constants"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Status } from "@lib/model/status"
import { higherStat } from "@lib/smogon/commom"
import { fromScratch } from "@lib/smogon/smogon-pokemon-builder"
import { Jumps, PokemonParameters, Stats } from "@lib/types"
import { Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { NatureName, TypeName } from "@robsonbittencourt/calc/dist/data/interface"
import { StatID, StatIDExceptHP } from "@robsonbittencourt/calc/src/data/interface"
import { v4 as uuidv4 } from "uuid"

export class Pokemon {
  readonly id: string
  readonly moveSet: MoveSet
  readonly ability: Ability
  readonly teraType: string
  readonly hpPercentage: number
  readonly commanderActive: boolean
  readonly higherStat: StatIDExceptHP
  readonly bonusBoosts: Partial<Stats>
  readonly isAttacker: boolean

  private smogonPokemon: SmogonPokemon

  constructor(name: string, options: PokemonParameters = {}) {
    const adjustedName = name == SELECT_POKEMON_LABEL ? "Togepi" : name
    this.smogonPokemon = fromScratch(adjustedName, options)

    this.id = options.id ?? uuidv4()
    this.moveSet = options.moveSet ?? new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
    this.ability = new Ability(this.smogonPokemon.ability as string, this.smogonPokemon.abilityOn)
    this.teraType = options.teraType ?? DEFAULT_TERA_TYPE
    this.hpPercentage = options.hpPercentage ?? 100
    this.commanderActive = options.commanderActive ?? false
    this.higherStat = options.higherStat ?? higherStat(this.smogonPokemon)
    this.bonusBoosts = options.bonusBoosts ?? { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    this.isAttacker = options.isAttacker ?? false
  }

  get name(): string {
    if (this.isDefault) return SELECT_POKEMON_LABEL

    return this.smogonPokemon.name
  }

  get displayName(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.smogonPokemon.name
    }

    return this.smogonPokemon.name.replaceAll("-", " ")
  }

  get displayNameWithoutSuffix(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.smogonPokemon.name
    }

    if (this.smogonPokemon.name.includes("-")) {
      return this.smogonPokemon.name.substring(0, this.smogonPokemon.name.indexOf("-"))
    }

    return this.smogonPokemon.name
  }

  private isNameWithHiphen(): boolean {
    const namesWithHiphen = ["Porygon-Z", "Ho-Oh", "Jangmo-o", "Hakamo-o", "Kommo-o", "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"]

    return namesWithHiphen.includes(this.smogonPokemon.name)
  }

  get type1(): TypeName {
    return this.smogonPokemon.types[0]
  }

  get type2(): TypeName | undefined {
    return this.smogonPokemon.types[1]
  }

  hasType(type: TypeName): boolean {
    if (this.teraTypeActive) {
      return this.teraType == type
    }

    return this.type1 == type || this.type2 == type
  }

  get level(): number {
    return this.smogonPokemon.level
  }

  get nature(): string {
    return this.smogonPokemon.nature as string
  }

  get item(): string {
    if (!this.smogonPokemon.item) {
      return Items.instance.withoutItem()
    }

    return this.smogonPokemon.item as string
  }

  get evs(): Stats {
    return this.smogonPokemon.evs
  }

  get totalEvs(): number {
    return this.smogonPokemon.evs.hp + this.smogonPokemon.evs.atk + this.smogonPokemon.evs.def + this.smogonPokemon.evs.spa + this.smogonPokemon.evs.spd + this.smogonPokemon.evs.spe
  }

  get jumps(): Jumps {
    const stat = this.baseStatWithBeneficalNature()
    if (!stat) return [0, 0, 0, 0]

    let ev = 0
    let actualStatValue = this.rawStatWithEv(stat, ev)

    const jumps = []

    while (ev <= 252) {
      ev += this.evToIncrementStat(stat, actualStatValue, ev)

      const statValue = this.rawStatWithEv(stat, ev)
      const isJump = statValue - actualStatValue == 2

      if (isJump) {
        jumps.push(ev)
      }

      actualStatValue = statValue
    }

    return jumps as Jumps
  }

  get ivs(): Partial<Stats> {
    return this.smogonPokemon.ivs
  }

  get boosts(): Partial<Stats> {
    return {
      atk: this.smogonPokemon.boosts.atk,
      def: this.smogonPokemon.boosts.def,
      spa: this.smogonPokemon.boosts.spa,
      spd: this.smogonPokemon.boosts.spd,
      spe: this.smogonPokemon.boosts.spe
    }
  }

  get status(): Status {
    return Status.byCode(this.smogonPokemon.status)
  }

  get teraTypeActive(): boolean {
    return this.smogonPokemon.teraType != undefined
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
    return this.smogonPokemon.stats.hp
  }

  get actualHp(): number {
    return this.smogonPokemon.curHP()
  }

  get baseHp(): number {
    return this.smogonPokemon.species.baseStats.hp
  }

  get baseAtk(): number {
    return this.smogonPokemon.species.baseStats.atk
  }

  get atk(): number {
    return this.smogonPokemon.stats.atk
  }

  get baseDef(): number {
    return this.smogonPokemon.species.baseStats.def
  }

  get def(): number {
    return this.smogonPokemon.stats.def
  }

  get baseSpa(): number {
    return this.smogonPokemon.species.baseStats.spa
  }

  get spa(): number {
    return this.smogonPokemon.stats.spa
  }

  get baseSpd(): number {
    return this.smogonPokemon.species.baseStats.spd
  }

  get spd(): number {
    return this.smogonPokemon.stats.spd
  }

  get baseSpe(): number {
    return this.smogonPokemon.species.baseStats.spe
  }

  get spe(): number {
    return this.smogonPokemon.stats.spe
  }

  get bst(): number {
    return this.baseHp + this.baseAtk + this.baseDef + this.baseSpa + this.baseSpd + this.baseSpe
  }

  get abilityOn(): boolean {
    return this.ability.on
  }

  get isParadoxAbility(): boolean {
    return this.isSmogonParadoxAbility(this.smogonPokemon)
  }

  get isDefault() {
    return this.smogonPokemon.name == "Togepi"
  }

  get isOgerpon(): boolean {
    return this.name.startsWith("Ogerpon")
  }

  get isTerapagosForm(): boolean {
    return this.name.startsWith("Terapagos")
  }

  get availableAbilities() {
    if (this.name.startsWith("Ogerpon") && this.teraTypeActive) {
      const isTealForm = this.name === "Ogerpon"
      const form = isTealForm ? "teal" : this.name.replace("Ogerpon-", "").toLowerCase()
      return [ABILITY_DETAILS[`embodyaspect${form}`]]
    }

    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.name)!
    return pokemonDetails.abilities.map(ability => ABILITY_DETAILS[ability])
  }

  get rawStats(): Partial<Stats> {
    return this.smogonPokemon.rawStats
  }

  get isAffectedByNeutralizingGas(): boolean {
    if (this.item == "Ability Shield") {
      return false
    }

    const notAffectedAbilities = ["Neutralizing Gas", "Multitype", "Power Construct", "Disguise", "Ice Face", "As One (Spectrier)", "Tera Shift"]

    return !notAffectedAbilities.includes(this.ability.name)
  }

  hasAbility(ability: string): boolean {
    return ability == this.ability.name
  }

  hasItem(item: string): boolean {
    return this.item == item
  }

  clone(options: PokemonParameters = {}): Pokemon {
    return new Pokemon(this.name, {
      ability: options.ability ?? this.ability,
      nature: options.nature ?? this.nature,
      item: options.item ?? this.item,
      teraType: options.teraType ?? this.teraType,
      teraTypeActive: options.teraTypeActive ?? this.teraTypeActive,
      evs: options.evs ?? this.evs,
      ivs: options.ivs ?? this.ivs,
      moveSet: options.moveSet ?? this.moveSet.clone(),
      boosts: options.boosts ?? this.boosts,
      bonusBoosts: options.bonusBoosts ?? this.bonusBoosts,
      status: options.status ?? this.status,
      hpPercentage: options.hpPercentage ?? this.hpPercentage,
      higherStat: options.higherStat ?? this.higherStat
    })
  }

  equals(toCompare: Pokemon): boolean {
    return (
      this.smogonPokemon.name === toCompare.smogonPokemon.name &&
      this.smogonPokemon.nature === toCompare.smogonPokemon.nature &&
      this.smogonPokemon.item === toCompare.smogonPokemon.item &&
      this.smogonPokemon.ability === toCompare.smogonPokemon.ability &&
      this.teraType === toCompare.teraType &&
      this.teraTypeActive === toCompare.teraTypeActive &&
      this.smogonPokemon.evs.hp === toCompare.smogonPokemon.evs.hp &&
      this.smogonPokemon.evs.atk === toCompare.smogonPokemon.evs.atk &&
      this.smogonPokemon.evs.def === toCompare.smogonPokemon.evs.def &&
      this.smogonPokemon.evs.spa === toCompare.smogonPokemon.evs.spa &&
      this.smogonPokemon.evs.spd === toCompare.smogonPokemon.evs.spd &&
      this.smogonPokemon.evs.spe === toCompare.smogonPokemon.evs.spe
    )
  }

  private isSmogonParadoxAbility(smogonPokemon: SmogonPokemon): boolean {
    return smogonPokemon.ability == "Protosynthesis" || smogonPokemon.ability == "Quark Drive"
  }

  private baseStatWithBeneficalNature(): StatID | undefined {
    if (["Lonely", "Adamant", "Naughty", "Brave"].includes(this.nature)) {
      return "atk"
    }

    if (["Bold", "Impish", "Lax", "Relaxed"].includes(this.nature)) {
      return "def"
    }

    if (["Modest", "Mild", "Rash", "Quiet"].includes(this.nature)) {
      return "spa"
    }

    if (["Calm", "Gentle", "Careful", "Sassy"].includes(this.nature)) {
      return "spd"
    }

    if (["Timid", "Hasty", "Jolly", "Naive"].includes(this.nature)) {
      return "spe"
    }

    return undefined
  }

  private rawStatWithEv(stat: StatID, ev: number): number {
    return this.clone({ evs: { [stat]: ev } }).smogonPokemon.rawStats[stat]
  }

  private evToIncrementStat(stat: StatID, actualStatValue: number, ev: number) {
    return this.rawStatWithEv(stat, ev + 4) > actualStatValue ? 4 : 8
  }

  setEvs(evs: Stats) {
    const currentEvs = this.smogonPokemon.evs
    let hpChanged = false

    for (const stat of Object.keys(evs) as StatID[]) {
      if (currentEvs[stat] !== evs[stat]) {
        currentEvs[stat] = evs[stat]
        this.smogonPokemon.stats[stat] = (this.smogonPokemon as any).calcStat(this.smogonPokemon.gen, stat)
        if (stat === "hp") hpChanged = true
      }
    }

    if (hpChanged) {
      this.smogonPokemon.originalCurHP = this.smogonPokemon.stats.hp
    }
  }

  setNature(nature: string) {
    this.smogonPokemon.nature = nature as NatureName
    this.recalculateStats()
  }

  get stats(): Stats {
    return this.smogonPokemon.stats
  }

  private recalculateStats() {
    const stats: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

    for (const statName of Object.keys(stats)) {
      const stat = statName as StatID
      stats[stat] = (this.smogonPokemon as any).calcStat(this.smogonPokemon.gen, stat)
    }

    this.smogonPokemon.stats = stats
    this.smogonPokemon.originalCurHP = stats.hp
  }
}
