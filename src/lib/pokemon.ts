import { Pokemon as PokemonSmogon, Generations } from "@smogon/calc";
import { StatIDExceptHP, StatsTable, StatusName, TypeName } from "@smogon/calc/dist/data/interface";

export class Pokemon {
  public pokemonSmogon: PokemonSmogon
  public teraTypeStorage: string
  public evsStorage: Partial<StatsTable> & { spc?: number; }
  private moveStorage: string
  private paradoxAbilityActivatedStorage: boolean
  
  constructor(name: string, nature: string, item: string, ability: string, teraType: string, teraTypeActive: boolean = false, evs: Partial<StatsTable> & { spc?: number; }, move: string = "", boosts: StatsTable | undefined = undefined, status: StatusName | undefined = undefined) {
    this.pokemonSmogon = new PokemonSmogon(Generations.get(9), name, {
      nature: nature,
      item: item,
      ability: ability,
      teraType: teraTypeActive ? teraType as TypeName : undefined,
      evs: evs,
      boosts: boosts,
      status: status,
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

  public get displayName(): string {
    const namesWithHiphen = ["Porygon-Z", "Ho-Oh", "Jangmo-o", "Hakamo-o", "Kommo-o", "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"]

    if (namesWithHiphen.includes(this.pokemonSmogon.name)) {
      return this.pokemonSmogon.name
    }

    return this.pokemonSmogon.name.replaceAll("-", " ")
  }

  public get spriteName(): string {
    let adjustedPokemonName: string = this.pokemonSmogon.name
    
    adjustedPokemonName = adjustedPokemonName.replace("-Alola", "-alolan")
    adjustedPokemonName = adjustedPokemonName.replace("-Galar", "-galarian")
    adjustedPokemonName = adjustedPokemonName.replace("-Hisui", "-hisuian")
    adjustedPokemonName = adjustedPokemonName.replace("-Paldea-Aqua", "-paldean-aqua")
    adjustedPokemonName = adjustedPokemonName.replace("-Paldea-Blaze", "-paldean-blaze")
    adjustedPokemonName = adjustedPokemonName.replace("-Paldea-Combat", "-paldean-combat")
    adjustedPokemonName = adjustedPokemonName.replace("-F", "-female")
    adjustedPokemonName = adjustedPokemonName.replace("Calyrex-Shadow", "calyrex-shadow-rider")
    adjustedPokemonName = adjustedPokemonName.replace("Calyrex-Ice", "calyrex-ice-rider")
    
    return adjustedPokemonName.toLocaleLowerCase().replace(" ", "-")
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

  public get displayAbility(): string {
    if (this.pokemonSmogon.ability?.includes("Embody Aspect")) {
      return "Embody Aspect"
    }
    return this.pokemonSmogon.ability as string
  }

  public get evs(): Partial<StatsTable> & { spc?: number; } {
    return this.pokemonSmogon.evs
  }

  public set evs(evs: Partial<StatsTable> & { spc?: number; }) {
    this.evsStorage = evs
    this.pokemonSmogon = this.buildPokemonSmogon({ evs: evs })      
  }

  public get boosts(): StatsTable {
    return this.pokemonSmogon.boosts
  }

  public set boosts(boosts: StatsTable) {
    this.pokemonSmogon = this.buildPokemonSmogon({ boosts: boosts })
  }

  public get status(): string {
    return this.pokemonSmogon.status as string
  }

  public set status(status: string) {
    this.pokemonSmogon.status = status as StatusName
  }

  public get teraType(): string {
    if (this.pokemonSmogon.teraType) {
      return this.pokemonSmogon.teraType as string
    }

    return this.teraTypeStorage
  }

  public set teraType(teraType: string) {
    this.teraTypeStorage = teraType
    this.pokemonSmogon = this.buildPokemonSmogon({ teraType: teraType, teraTypeActive: this.teraTypeActive() })
  }

  public teraTypeActive(): boolean {
    return this.pokemonSmogon.teraType != undefined
  }

  public changeTeraStatus(teraTypeActive: boolean) {
    this.checkOgerponTeraAbility(teraTypeActive)
    
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

  public get paradoxAbilityActivated(): boolean {
    return this.paradoxAbilityActivatedStorage
  }

  public set paradoxAbilityActivated(paradoxAbilityActivated: boolean) {
    this.paradoxAbilityActivatedStorage = paradoxAbilityActivated

    if (paradoxAbilityActivated) {
      this.pokemonSmogon = this.buildPokemonSmogon()
      this.pokemonSmogon.boostedStat = this.higherStat()
    } else {
      this.pokemonSmogon = this.buildPokemonSmogon()
    }
  }

  public higherStat(): StatIDExceptHP {
    let bestStat = this.atk
    let bestStatDescription: StatIDExceptHP = "atk"
    
    if (this.def > bestStat) {
      bestStat = this.def
      bestStatDescription = "def"
    }

    if (this.spa > bestStat) {
      bestStat = this.spa
      bestStatDescription = "spa"
    }

    if (this.spd > bestStat) {
      bestStat = this.spd
      bestStatDescription = "spd"
    }

    if (this.spe > bestStat) {
      bestStat = this.spe
      bestStatDescription = "spe"
    }

    return bestStatDescription
  }

  public clone(): Pokemon {
    return new Pokemon(this.name, this.nature, this.item, this.ability, this.teraTypeStorage, this.teraTypeActive(), this.evs, this.move, this.boosts)
  }

  public equals(toCompare: Pokemon): boolean {
    return this.pokemonSmogon.name === toCompare.pokemonSmogon.name &&
      this.pokemonSmogon.nature === toCompare.pokemonSmogon.nature &&
      this.pokemonSmogon.item === toCompare.pokemonSmogon.item &&
      this.pokemonSmogon.ability === toCompare.pokemonSmogon.ability &&
      this.teraTypeStorage === toCompare.teraTypeStorage &&
      this.teraTypeActive() === toCompare.teraTypeActive() &&
      this.pokemonSmogon.evs.hp === toCompare.pokemonSmogon.evs.hp &&
      this.pokemonSmogon.evs.atk === toCompare.pokemonSmogon.evs.atk &&
      this.pokemonSmogon.evs.def === toCompare.pokemonSmogon.evs.def &&
      this.pokemonSmogon.evs.spa === toCompare.pokemonSmogon.evs.spa &&
      this.pokemonSmogon.evs.spd === toCompare.pokemonSmogon.evs.spd &&
      this.pokemonSmogon.evs.spe === toCompare.pokemonSmogon.evs.spe
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

  private buildPokemonSmogon({ name, nature, item, ability, teraType, teraTypeActive, evs, boosts }: { name?: string; nature?: string; item?: string; ability?: string; teraType?: string; teraTypeActive?: boolean; evs?: Partial<StatsTable> & { spc?: number; }, boosts?: StatsTable} = {}): PokemonSmogon {
    return new PokemonSmogon(Generations.get(9), name ? name : this.pokemonSmogon.name, {
      nature: nature ? nature : this.pokemonSmogon.nature,
      item: item ? item : this.pokemonSmogon.item,
      ability: ability ? ability : this.pokemonSmogon.ability,
      teraType: this.buildTeraType(teraType, teraTypeActive) as TypeName,
      evs: evs ? evs : this.pokemonSmogon.evs,
      boosts: boosts ? boosts : this.pokemonSmogon.boosts,
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

  private checkOgerponTeraAbility(teraActived: boolean) {
    if (this.name == "Ogerpon") {
      if(teraActived) {
        this.ability = "Embody Aspect (Teal)"
      } else {
        this.ability = "Defiant"
      }      
    }

    if (this.name == "Ogerpon-Wellspring") {
      if(teraActived) {
        this.ability = "Embody Aspect (Wellspring)"
      } else {
        this.ability = "Water Absorb"
      }      
    }

    if (this.name == "Ogerpon-Hearthflame") {
      if(teraActived) {
        this.ability = "Embody Aspect (Hearthflame)"
      } else {
        this.ability = "Mold Breaker"
      }      
    }

    if (this.name == "Ogerpon-Cornerstone") {
      if(teraActived) {
        this.ability = "Embody Aspect (Cornerstone)"
      } else {
        this.ability = "Sturdy"
      }      
    }
  }
}
