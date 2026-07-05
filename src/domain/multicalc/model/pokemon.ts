import { getAbilityData } from "@data/ability-data"
import { POKEMON_DATA } from "@data/pokemon-data"
import { DEFAULT_TERA_TYPE, SELECT_POKEMON_LABEL } from "@multicalc/constants"
import { uuid } from "@multicalc/utils/uuid"
import { Ability } from "@multicalc/model/ability"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Status } from "@multicalc/model/status"
import { higherStat } from "@multicalc/stats"
import { fromScratch } from "@adapters"
import { Jumps, PokemonParameters, Stats } from "@multicalc/types"
import { Pokemon as CalcPokemon } from "@calc"
import { NatureName, TypeName, StatID, StatIDExceptHP } from "@data/types"
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

  private calcPokemon: CalcPokemon

  constructor(name: string, options: PokemonParameters = {}) {
    const adjustedName = name == SELECT_POKEMON_LABEL ? "Togepi" : name
    this.calcPokemon = fromScratch(adjustedName, options)

    this.id = options.id ?? uuid()
    this.moveSet = options.moveSet ?? new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
    this.ability = new Ability(this.calcPokemon.ability as string, this.calcPokemon.abilityOn)
    this.teraType = options.teraType ?? DEFAULT_TERA_TYPE
    this.hpPercentage = options.hpPercentage ?? 100
    this.commanderActive = options.commanderActive ?? false
    this.higherStat = options.higherStat ?? higherStat(this.calcPokemon)
    this.bonusBoosts = options.bonusBoosts ?? { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    this.isAttacker = options.isAttacker ?? false
  }

  get name(): string {
    if (this.isDefault) return SELECT_POKEMON_LABEL

    return this.calcPokemon.name
  }

  get displayName(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.calcPokemon.name
    }

    return this.calcPokemon.name.replaceAll("-", " ")
  }

  get displayNameWithoutSuffix(): string {
    if (this.isDefault) {
      return SELECT_POKEMON_LABEL
    }

    if (this.isNameWithHiphen()) {
      return this.calcPokemon.name
    }

    if (this.calcPokemon.name.includes("-")) {
      return this.calcPokemon.name.substring(0, this.calcPokemon.name.indexOf("-"))
    }

    return this.calcPokemon.name
  }

  private isNameWithHiphen(): boolean {
    const namesWithHiphen = ["Porygon-Z", "Ho-Oh", "Jangmo-o", "Hakamo-o", "Kommo-o", "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"]

    return namesWithHiphen.includes(this.calcPokemon.name)
  }

  get type1(): TypeName {
    return this.calcPokemon.types[0]
  }

  get type2(): TypeName | undefined {
    return this.calcPokemon.types[1]
  }

  hasType(type: TypeName): boolean {
    if (this.teraTypeActive) {
      return this.teraType == type
    }

    return this.type1 == type || this.type2 == type
  }

  get level(): number {
    return this.calcPokemon.level
  }

  get nature(): string {
    return this.calcPokemon.nature as string
  }

  get item(): string {
    if (!this.calcPokemon.item) {
      return "(none)"
    }

    return this.calcPokemon.item as string
  }

  get evs(): Stats {
    return this.calcPokemon.evs
  }

  get totalEvs(): number {
    return this.calcPokemon.evs.hp + this.calcPokemon.evs.atk + this.calcPokemon.evs.def + this.calcPokemon.evs.spa + this.calcPokemon.evs.spd + this.calcPokemon.evs.spe
  }

  get jumps(): Jumps {
    const stat = this.baseStatWithBeneficalNature()
    if (!stat) return [0, 0, 0, 0]

    let ev = 0
    let actualStatValue = this.rawStatWithEv(stat, ev)

    const jumps = []

    while (ev < 252) {
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
    return this.calcPokemon.ivs
  }

  get boosts(): Partial<Stats> {
    return {
      atk: this.calcPokemon.boosts.atk,
      def: this.calcPokemon.boosts.def,
      spa: this.calcPokemon.boosts.spa,
      spd: this.calcPokemon.boosts.spd,
      spe: this.calcPokemon.boosts.spe
    }
  }

  get status(): Status {
    return Status.byCode(this.calcPokemon.status)
  }

  get teraTypeActive(): boolean {
    return this.calcPokemon.teraType != undefined
  }

  get move(): Move {
    return this.moveSet.activeMove
  }

  get activeMoveName(): string {
    return this.moveSet.activeMove.name
  }

  get activeMoveIndex() {
    return this.moveSet.activeMovePosition - 1
  }

  get activeMovePosition() {
    return this.moveSet.activeMovePosition
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
    return this.calcPokemon.stats.hp
  }

  get actualHp(): number {
    return this.calcPokemon.currrentHp()
  }

  get baseHp(): number {
    return this.calcPokemon.pokemonData.baseStats.hp
  }

  get baseAtk(): number {
    return this.calcPokemon.pokemonData.baseStats.atk
  }

  get atk(): number {
    return this.calcPokemon.stats.atk
  }

  get baseDef(): number {
    return this.calcPokemon.pokemonData.baseStats.def
  }

  get def(): number {
    return this.calcPokemon.stats.def
  }

  get baseSpa(): number {
    return this.calcPokemon.pokemonData.baseStats.spa
  }

  get spa(): number {
    return this.calcPokemon.stats.spa
  }

  get baseSpd(): number {
    return this.calcPokemon.pokemonData.baseStats.spd
  }

  get spd(): number {
    return this.calcPokemon.stats.spd
  }

  get baseSpe(): number {
    return this.calcPokemon.pokemonData.baseStats.spe
  }

  get spe(): number {
    return this.calcPokemon.stats.spe
  }

  get bst(): number {
    return this.baseHp + this.baseAtk + this.baseDef + this.baseSpa + this.baseSpd + this.baseSpe
  }

  get abilityOn(): boolean {
    return this.ability.on
  }

  get isParadoxAbility(): boolean {
    return this.isCalcParadoxAbility(this.calcPokemon)
  }

  get isDefault() {
    return this.calcPokemon.name == "Togepi"
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
      return [getAbilityData(`embodyaspect${form}`)!]
    }

    const pokemonData = Object.values(POKEMON_DATA).find(p => p.name == this.name)
    const abilities = pokemonData?.abilities ? pokemonData.abilities.map(ability => getAbilityData(ability)).filter(ability => ability !== undefined) : []

    return abilities
  }

  get rawStats(): Partial<Stats> {
    return this.calcPokemon.rawStats
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
      id: options.id,
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
      this.calcPokemon.name === toCompare.calcPokemon.name &&
      this.calcPokemon.nature === toCompare.calcPokemon.nature &&
      this.calcPokemon.item === toCompare.calcPokemon.item &&
      this.calcPokemon.ability === toCompare.calcPokemon.ability &&
      this.teraType === toCompare.teraType &&
      this.teraTypeActive === toCompare.teraTypeActive &&
      this.calcPokemon.evs.hp === toCompare.calcPokemon.evs.hp &&
      this.calcPokemon.evs.atk === toCompare.calcPokemon.evs.atk &&
      this.calcPokemon.evs.def === toCompare.calcPokemon.evs.def &&
      this.calcPokemon.evs.spa === toCompare.calcPokemon.evs.spa &&
      this.calcPokemon.evs.spd === toCompare.calcPokemon.evs.spd &&
      this.calcPokemon.evs.spe === toCompare.calcPokemon.evs.spe &&
      this.move1Name === toCompare.move1Name &&
      this.move2Name === toCompare.move2Name &&
      this.move3Name === toCompare.move3Name &&
      this.move4Name === toCompare.move4Name
    )
  }

  private isCalcParadoxAbility(calcPokemon: CalcPokemon): boolean {
    return calcPokemon.ability == "Protosynthesis" || calcPokemon.ability == "Quark Drive"
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
    return this.clone({ evs: { [stat]: ev } }).calcPokemon.rawStats[stat]
  }

  private evToIncrementStat(stat: StatID, actualStatValue: number, ev: number) {
    return this.rawStatWithEv(stat, ev + 4) > actualStatValue ? 4 : 8
  }

  setEvs(evs: Stats) {
    const currentEvs = this.calcPokemon.evs
    let hpChanged = false

    for (const stat of Object.keys(evs) as StatID[]) {
      if (currentEvs[stat] !== evs[stat]) {
        currentEvs[stat] = evs[stat]
        if (stat === "hp") hpChanged = true
      }
    }

    this.calcPokemon.recalculateStats()

    if (hpChanged) {
      this.calcPokemon.originalCurrrentHp = this.calcPokemon.stats.hp
    }
  }

  setNature(nature: string) {
    this.calcPokemon.nature = nature as NatureName
    this.recalculateStats()
  }

  get stats(): Stats {
    return this.calcPokemon.stats
  }

  private recalculateStats() {
    this.calcPokemon.recalculateStats()
    this.calcPokemon.originalCurrrentHp = this.calcPokemon.stats.hp
  }
}
