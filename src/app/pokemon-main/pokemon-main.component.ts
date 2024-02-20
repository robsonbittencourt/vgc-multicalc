import { Component, OnInit } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import axios from 'axios';
import { startWith, map } from 'rxjs/operators';
import { calculate, Generations, Field, Move, MOVES, ITEMS, NATURES, TYPE_CHART, SPECIES, ABILITIES } from '@smogon/calc';
import { Koffing } from 'koffing'
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokemon-main',
  templateUrl: './pokemon-main.component.html',
  styleUrls: ['./pokemon-main.component.scss']
})
export class PokemonMainComponent implements OnInit {

  controlPokemonName = new FormControl('Flutter Mane');
  controlNature = new FormControl('Timid');
  controlItem = new FormControl('Choice Specs');
  controlAbility = new FormControl('Protosynthesis');
  controlTeraType = new FormControl('Fairy');
  controlMove = new FormControl('Moon Blast');

  allMoveNames = Object.keys(MOVES[9])
  allNatureNames = Object.keys(NATURES)
  allItemsNames = Object.values(ITEMS[9]).sort()
  allAbilitiesNames = Object.values(ABILITIES[9]).sort()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1)
  allPokemonNames = Object.keys(SPECIES[9])

  filteredPokemonNames: Observable<string[]>;
  filteredItems: Observable<string[]>;
  filteredAbilities: Observable<string[]>;
  filteredNatures: Observable<string[]>;
  filteredTeraTypes: Observable<string[]>;
  filteredMoves: Observable<string[]>;

  field = {
    tabletsOfRuinActive: false,
    vesselOfRuinActive: false,
    swordOfRuinActive: false,
    beadsOfRuinActive: false
  }

  EV_ZERO = 0
  FIRST_EV = 4
  MAX_EVS = 508

  private differ: KeyValueDiffer<string, any>;
  private differField: KeyValueDiffer<string, any>;
  public pokemon: Pokemon
  public pokePaste = ""

  constructor(private differs: KeyValueDiffers) {
    this.pokemon = new Pokemon("Flutter Mane", "Timid", "Choice Specs", "Protosynthesis", "Fairy", true, { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }, "Moon Blast")
    this.differ = this.differs.find(this.pokemon).create();
    this.differField = this.differs.find(this.field).create();
  }

  ngOnInit() {
    this.filteredPokemonNames = this.controlPokemonName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allPokemonNames)),
    );

    this.filteredNatures = this.controlNature.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allNatureNames)),
    );

    this.filteredItems = this.controlItem.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allItemsNames)),
    );

    this.filteredAbilities = this.controlAbility.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allAbilitiesNames)),
    );

    this.filteredTeraTypes = this.controlTeraType.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allTeraTypes)),
    );

    this.filteredMoves = this.controlMove.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.allMoveNames)),
    );
    
    this.calcDamageToAll();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.pokemon) || this.differField.diff(this.field);
    if (change) {
        this.calcDamageToAll()
    }
  }

  private _filter(value: string, values: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return values.filter(name => this._normalizeValue(name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  gen = Generations.get(9);

  ragingBolt = new Pokemon('Raging Bolt', "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, spa: 252, spd: 12 })
  walkingWake = new Pokemon('Walking Wake', "Timid", "Life Orb", "Protosynthesis", "Poison", true, { hp: 4, spa: 252, spe: 252 })
  gougingFire = new Pokemon('Gouging Fire', "Adamant", "Clear Amulet", "Protosynthesis", "Water", false, { hp: 4, atk: 252, spe: 252 })
  entei = new Pokemon('Entei', "Adamant", "Sitrus Berry", "Inner Focus", "Grass", false, { atk: 252, def: 4, spd: 252 })
  incineroar = new Pokemon('Incineroar', "Careful", "Assault Vest", "Intimidate", "Water", false, { hp: 252, atk: 4, spd: 252 })
  urshifu = new Pokemon('Urshifu', "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { atk: 252, spd: 4, spe: 252 })
  landorus = new Pokemon('Landorus', "Timid", "Life Orb", "Sheer Force", "Flying", false, { spa: 252, spd: 4, spe: 252 })
  ogerponWellspring = new Pokemon('Ogerpon-Wellspring', "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 })
  
  targets: Pokemon[] = [
    this.ragingBolt,
    this.walkingWake,
    this.gougingFire,
    this.entei,
    this.incineroar,
    this.urshifu,
    this.landorus,
    this.ogerponWellspring
  ]

  onPokemonSelected(selectedPokemon: string) {
    this.pokemon.name = selectedPokemon
  }

  onNatureSelected(selectedNature: string) {
    this.pokemon.nature = selectedNature
  }

  onTeraTypeSelected(selectedTeraType: string) {
    this.pokemon.teraType = selectedTeraType
  }

  onItemSelected(selectedItem: string) {
    this.pokemon.item = selectedItem
  }

  onAbilitySelected(selectedAbility: string) {
    this.pokemon.ability = selectedAbility
  }

  onMoveSelected(selectedMove: string) {
    this.pokemon.move = selectedMove
  }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  addPokemon() {
    this.targets.push(this.pokemon.clone())
    this.calcDamageToAll()
  }

  addFromPokePaste() {
    axios.get(`${this.pokePaste}/raw`)
      .then(res => {
        const parsedTeam = Koffing.parse(res.data)
        JSON.parse(parsedTeam.toJson()).teams[0].pokemon.forEach((poke: any) => {
          const evs = { hp: poke.evs.hp, atk: poke.evs.atk, def: poke.evs.def, spa: poke.evs.spa, spd: poke.evs.spd, spe: poke.evs.spe }
          this.targets.push(
            new Pokemon(poke.name, poke.nature, poke.item, poke.ability, poke.teraType, false, evs)
          )
        })
        this.calcDamageToAll()
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });

    this.pokePaste = ""
  }

  removePokemon(index: number) {
    this.targets.splice(index, 1);
  }

  removeAll() {
    this.targets = []
  }

  terastalyzePokemon(index: number) {
    const teraActived = this.targets[index].teraTypeActive()
    this.targets[index].changeTeraStatus(!teraActived)
    this.calcDamageToAll()
  }

  calculateMin(evValue: number | undefined) {
    if (evValue == this.EV_ZERO || evValue == this.FIRST_EV) return 0
    
    return 4
  }

  calculateEvStep(evValue: number | undefined) {
    if (evValue == this.EV_ZERO) return 4
    if (evValue == this.FIRST_EV) return 6
    
    return 8
  }

  calcDamage(attackerPoke: Pokemon, target: Pokemon, move: Move) {
    const gen = Generations.get(9);
    const result = calculate(
      gen,
      attackerPoke.pokemonSmogon,
      target.pokemonSmogon,
      move,
      new Field({ gameType: 'Doubles' })
    );

    //TODO refactory
    if ((result.move.category == 'Special' && this.field.vesselOfRuinActive && !this.field.beadsOfRuinActive) || (result.move.category == 'Physical' && this.field.tabletsOfRuinActive && !this.field.swordOfRuinActive)) {
      (result.damage as Array<number>)[0] = Math.ceil((result.damage as Array<number>)[0] * 0.75);
      (result.damage as Array<number>)[1] = Math.ceil((result.damage as Array<number>)[1] * 0.75);
      (result.damage as Array<number>)[2] = Math.ceil((result.damage as Array<number>)[2] * 0.75);
      (result.damage as Array<number>)[3] = Math.ceil((result.damage as Array<number>)[3] * 0.75);
      (result.damage as Array<number>)[4] = Math.ceil((result.damage as Array<number>)[4] * 0.75);
      (result.damage as Array<number>)[5] = Math.ceil((result.damage as Array<number>)[5] * 0.75);
      (result.damage as Array<number>)[6] = Math.ceil((result.damage as Array<number>)[6] * 0.75);
      (result.damage as Array<number>)[7] = Math.ceil((result.damage as Array<number>)[7] * 0.75);
      (result.damage as Array<number>)[8] = Math.ceil((result.damage as Array<number>)[8] * 0.75);
      (result.damage as Array<number>)[9] = Math.ceil((result.damage as Array<number>)[9] * 0.75);
      (result.damage as Array<number>)[10] = Math.ceil((result.damage as Array<number>)[10] * 0.75);
      (result.damage as Array<number>)[11] = Math.ceil((result.damage as Array<number>)[11] * 0.75);
      (result.damage as Array<number>)[12] = Math.ceil((result.damage as Array<number>)[12] * 0.75);
      (result.damage as Array<number>)[13] = Math.ceil((result.damage as Array<number>)[13] * 0.75);
      (result.damage as Array<number>)[14] = Math.ceil((result.damage as Array<number>)[14] * 0.75);
      (result.damage as Array<number>)[15] = Math.ceil((result.damage as Array<number>)[15] * 0.75);
    }

    if ((result.move.category == 'Special' && this.field.beadsOfRuinActive && !this.field.vesselOfRuinActive) || (result.move.category == 'Physical' && this.field.swordOfRuinActive && !this.field.tabletsOfRuinActive)) {
      (result.damage as Array<number>)[0] = Math.ceil((result.damage as Array<number>)[0] * 1.33);
      (result.damage as Array<number>)[1] = Math.ceil((result.damage as Array<number>)[1] * 1.33);
      (result.damage as Array<number>)[2] = Math.ceil((result.damage as Array<number>)[2] * 1.33);
      (result.damage as Array<number>)[3] = Math.ceil((result.damage as Array<number>)[3] * 1.33);
      (result.damage as Array<number>)[4] = Math.ceil((result.damage as Array<number>)[4] * 1.33);
      (result.damage as Array<number>)[5] = Math.ceil((result.damage as Array<number>)[5] * 1.33);
      (result.damage as Array<number>)[6] = Math.ceil((result.damage as Array<number>)[6] * 1.33);
      (result.damage as Array<number>)[7] = Math.ceil((result.damage as Array<number>)[7] * 1.33);
      (result.damage as Array<number>)[8] = Math.ceil((result.damage as Array<number>)[8] * 1.33);
      (result.damage as Array<number>)[9] = Math.ceil((result.damage as Array<number>)[9] * 1.33);
      (result.damage as Array<number>)[10] = Math.ceil((result.damage as Array<number>)[10] * 1.33);
      (result.damage as Array<number>)[11] = Math.ceil((result.damage as Array<number>)[11] * 1.33);
      (result.damage as Array<number>)[12] = Math.ceil((result.damage as Array<number>)[12] * 1.33);
      (result.damage as Array<number>)[13] = Math.ceil((result.damage as Array<number>)[13] * 1.33);
      (result.damage as Array<number>)[14] = Math.ceil((result.damage as Array<number>)[14] * 1.33);
      (result.damage as Array<number>)[15] = Math.ceil((result.damage as Array<number>)[15] * 1.33);
    }

    const damage = (result.damage as Array<number>)[15]
    const finalDamage = damage ? damage : 0
    const finalDamagePercentage = +((finalDamage / result.defender.stats.hp) * 100).toFixed(1)

    target.damage = finalDamagePercentage

    let koChance
    try {
      koChance = result.kochance().text
    } catch (ex) {
      koChance = "Does not cause any damage"
    }

    target.result = result.moveDesc()
    target.koChance = this.capitalizeFirstLetter(koChance)
  }

  calcDamageToAll() {
    const move = new Move(this.gen, this.pokemon.move)

    this.targets.forEach((target) => {
      this.calcDamage(this.pokemon, target, move)
    })

    this.targets
      .sort((a, b) => b.damage - a.damage)
  }

  capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  cardColor(koChance: String) {
    if (koChance == "Guaranteed OHKO") {
      return "#dbd8e3" //gray
    }

    if (koChance.includes("chance to OHKO")) {
      return "#f33d42" //red
    }

    if (koChance.includes("2HKO")) {
      return "#fe9901" //yellow
    }

    return "#30ca2e" //green
  }
}