import { Pokemon as PokemonSmogon, Generations } from "@smogon/calc"

export class PokemonSpeed {

  private name: string
  private speedEv: number
  private speedIv: number
  private nature: string
  private speedModifier: number
  private ability: string
  private item: string
  private paradoxAbilityActivatedInSpeed: boolean
  private tailwind: boolean

  MAX_BASE_SPEED_FOR_TR = 52

  constructor(name: string, speedEv: number, speedIv: number = 31, nature: string = "Bashful", item: string = "", speedModifier: number = 1, ability: string = "", paradoxAbilityActivatedInSpeed: boolean = false, tailwind: boolean = false) {
    this.name = name
    this.speedEv = speedEv
    this.speedIv = speedIv
    this.nature = nature
    this.speedModifier = speedModifier
    this.ability = ability
    this.item = item
    this.paradoxAbilityActivatedInSpeed = paradoxAbilityActivatedInSpeed
    this.tailwind = tailwind
  }

  getName(): string {    
    return this.name
  }

  minSpeed(): number {
    const isTrickRoomPokemon = new PokemonSmogon(Generations.get(9), this.name).species.baseStats.spe <= this.MAX_BASE_SPEED_FOR_TR
    
    const pokemonSmogon = new PokemonSmogon(Generations.get(9), this.name, {
      level: 50,
      nature: isTrickRoomPokemon ? "Brave" : "Bashful",
      ivs: isTrickRoomPokemon ? { spe: 0 } : { spe: 31 }
    })

    return pokemonSmogon.rawStats['spe']
  }

  maxSpeed(): number {
    const pokemonSmogon = new PokemonSmogon(Generations.get(9), this.name, {
      nature: "Timid",
      evs: { spe: 252 },
      ivs: { spe: 31 },
      level: 50
    })
    
    return pokemonSmogon.rawStats['spe']
  }

  maxMeta(): number {
    const pokemonSmogon = new PokemonSmogon(Generations.get(9), this.name, {
      nature: this.nature,
      evs: { spe: this.speedEv },
      ivs: { spe: this.speedIv },
      level: 50
    })

    let itemModifier = 1
    if (this.item == "Choice Scarf") {
      itemModifier = 1.5
    }
    
    let abilityModifier = 1
    if (this.paradoxAbility() && this.paradoxAbilityActivatedInSpeed) {
      abilityModifier = 1.5
    }

    let tailwindModifier = 1
    if (this.tailwind) {
      tailwindModifier = 2
    }
    
    return Math.floor(pokemonSmogon.rawStats['spe'] * itemModifier * abilityModifier * this.speedModifier * tailwindModifier)
  }

  paradoxAbility(): boolean {
    return this.ability == "Protosynthesis" || this.ability == "Quark Drive"
  }

  print() {
    console.log(`${this.getName()} - Min: ${this.minSpeed()} - Max: ${this.maxSpeed()} - Meta: ${this.maxMeta()}`)
  }

}