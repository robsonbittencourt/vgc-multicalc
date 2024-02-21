import { Pokemon as PokemonSmogon, Generations } from "@smogon/calc";
import { StatsTable, TypeName } from "@smogon/calc/dist/data/interface";

export class Pokemon {
  public pokemonSmogon: PokemonSmogon
  public teraTypeStorage: string
  public evsStorage: Partial<StatsTable> & { spc?: number; }
  private moveStorage: string

  public damage: number = 0
  public result: String = ""
  public koChance: String = ""

  constructor(name: string, nature: string, item: string, ability: string, teraType: string, teraTypeActive: boolean = false, evs: Partial<StatsTable> & { spc?: number; }, move: string = "") {
    this.pokemonSmogon = new PokemonSmogon(Generations.get(9), name, {
      nature: nature,
      item: item,
      ability: ability,
      teraType: teraTypeActive ? teraType as TypeName : undefined,
      evs: evs,
      level: 50
    })

    this.teraTypeStorage = teraType
    this.evsStorage = evs
    this.moveStorage = move
  }

  public get name(): string {
    return this.pokemonSmogon.name
  }

  public set name(name: string) {
    this.pokemonSmogon = this.buildPokemonSmogon({ name: name })
  }

  public get lowerCaseName(): string {
    return this.pokemonSmogon.name.toLocaleLowerCase().replace(" ", "-")
  }

  public get nature(): string {
    return this.pokemonSmogon.nature as string
  }

  public set nature(nature: string) {
    this.pokemonSmogon = this.buildPokemonSmogon({ nature: nature })
  }

  public get item(): string {
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

  public get evs(): Partial<StatsTable> & { spc?: number; } {
    return this.pokemonSmogon.evs
  }

  public set evs(evs: Partial<StatsTable> & { spc?: number; }) {
    this.evsStorage = evs
    this.pokemonSmogon = this.buildPokemonSmogon({ evs: evs })      
  }

  public get teraType(): string {
    return this.pokemonSmogon.teraType as string
  }

  public set teraType(teraType: string) {
    this.teraTypeStorage = teraType
    this.pokemonSmogon = this.buildPokemonSmogon({ teraType: teraType, teraTypeActive: this.teraTypeActive() })
  }

  public teraTypeActive(): boolean {
    return this.pokemonSmogon.teraType != undefined
  }

  public changeTeraStatus(teraTypeActive: boolean) {
    if (teraTypeActive) {
      this.pokemonSmogon = this.buildPokemonSmogon({ teraType: this.teraTypeStorage, teraTypeActive: true })
    } else {
      this.pokemonSmogon = this.buildPokemonSmogon({ teraType: undefined, teraTypeActive: false })
    }
  }

  public get move(): string {
    return this.moveStorage
  }

  public set move(move: string) {
    this.moveStorage = move
  }

  public get hp(): number {
    return this.pokemonSmogon.stats.hp
  }

  public get atk(): number {
    return this.pokemonSmogon.stats.atk
  }

  public get def(): number {
    return this.pokemonSmogon.stats.def
  }

  public get spa(): number {
    return this.pokemonSmogon.stats.spa
  }

  public get spd(): number {
    return this.pokemonSmogon.stats.spd
  }

  public get spe(): number {
    return this.pokemonSmogon.stats.spe
  }

  public clone(): Pokemon {
    return new Pokemon(this.name, this.nature, this.item, this.ability, this.teraTypeStorage, this.teraTypeActive(), this.evs, this.move)
  }

  public equals(toCompare: Pokemon): boolean {
    return this.pokemonSmogon.name === toCompare.pokemonSmogon.name && 
      this.pokemonSmogon.nature === toCompare.pokemonSmogon.nature &&
      this.pokemonSmogon.item === toCompare.pokemonSmogon.item &&
      this.pokemonSmogon.ability === toCompare.pokemonSmogon.ability &&
      this.teraTypeStorage === toCompare.teraTypeStorage &&
      this.teraTypeActive() === toCompare.teraTypeActive() &&
      this.pokemonSmogon.evs === toCompare.pokemonSmogon.evs
  }

  public totalEvs(): number {
    return this.pokemonSmogon.evs.hp + this.pokemonSmogon.evs.atk + this.pokemonSmogon.evs.def + this.pokemonSmogon.evs.spa + this.pokemonSmogon.evs.spd + this.pokemonSmogon.evs.spe
  }

  public evsDescription(): string {
    var evsDescription = ""

    if (this.evs.hp && this.evs.hp != 0) evsDescription += `hp: ${this.evs.hp} `
    if (this.evs.atk && this.evs.atk != 0) evsDescription += `atk: ${this.evs.atk} `
    if (this.evs.def && this.evs.def != 0) evsDescription += `def: ${this.evs.def} `
    if (this.evs.spa && this.evs.spa != 0) evsDescription += `spa: ${this.evs.spa} `
    if (this.evs.spd && this.evs.spd != 0) evsDescription += `spd: ${this.evs.spd} `
    if (this.evs.spe && this.evs.spe != 0) evsDescription += `spe: ${this.evs.spe}`

    return evsDescription
  }

  private buildPokemonSmogon({ name, nature, item, ability, teraType, teraTypeActive, evs }: { name?: string; nature?: string; item?: string; ability?: string; teraType?: string; teraTypeActive?: boolean; evs?: Partial<StatsTable> & { spc?: number; }} = {}): PokemonSmogon {
    return new PokemonSmogon(Generations.get(9), name ? name : this.pokemonSmogon.name, {
      nature: nature ? nature : this.pokemonSmogon.nature,
      item: item ? item : this.pokemonSmogon.item,
      ability: ability ? ability : this.pokemonSmogon.ability,
      teraType: this.buildTeraType(teraType, teraTypeActive) as TypeName,
      evs: evs ? evs : this.pokemonSmogon.evs,
      level: 50
    })
  }

  private buildTeraType(teraType?: string, teraTypeActive?: boolean) {
    if (teraTypeActive == false) {
      return undefined
    }

    if (teraTypeActive == undefined && !this.teraTypeActive()) {
      return undefined
    }

    if (teraTypeActive == undefined && this.teraTypeActive()) {
      return this.pokemonSmogon.teraType
    }

    return teraType
  }
}
