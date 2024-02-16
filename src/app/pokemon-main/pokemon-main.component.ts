import { Component, OnInit } from '@angular/core';
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import axios from 'axios';
import { startWith, map } from 'rxjs/operators';
import { calculate, Generations, Field, Pokemon, Move, MOVES, ITEMS, NATURES, TYPE_CHART, SPECIES, ABILITIES } from '@smogon/calc';
import { Koffing } from 'koffing'
import { TargetPokemon } from './target-pokemon';

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

  tabletsOfRuinActive = false;
  vesselOfRuinActive = false;
  swordOfRuinActive = false;
  beadsOfRuinActive = false;

  EV_ZERO = 0
  FIRST_EV = 4
  MAX_EVS = 508

  differ: KeyValueDiffer<string, any>;
  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        this.calcDamageToAll()
      });
    }
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

  private _filter(value: string, values: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return values.filter(name => this._normalizeValue(name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  gen = Generations.get(9);
  field = new Field({ gameType: 'Doubles' });

  ragingBolt = new Pokemon(this.gen, 'Raging Bolt', {
    item: 'Booster Energy',
    nature: 'Modest',
    evs: { hp: 244, spa: 252, spd: 12 },
    level: 50,
    teraType: 'Fairy'
  })

  walkingWake = new Pokemon(this.gen, 'Walking Wake', {
    item: 'Life Orb',
    nature: 'Timid',
    evs: { hp: 4, spa: 252, spe: 252 },
    level: 50,
    teraType: 'Poison'
  })

  gougingFire = new Pokemon(this.gen, 'Gouging Fire', {
    item: 'Clear Amulet',
    nature: 'Adamant',
    evs: { hp: 4, atk: 252, spe: 252 },
    level: 50,
    teraType: 'Water'
  })

  entei = new Pokemon(this.gen, 'Entei', {
    item: 'Sitrus Berry',
    nature: 'Adamant',
    evs: { atk: 252, def: 4, spd: 252 },
    level: 50,
    teraType: 'Grass'
  })

  incineroar = new Pokemon(this.gen, 'Incineroar', {
    item: 'Assault Vest',
    nature: 'Careful',
    evs: { hp: 252, atk: 4, spd: 252 },
    level: 50,
    teraType: 'Water'
  })

  urshifu = new Pokemon(this.gen, 'Urshifu', {
    item: 'Choice Scarf',
    nature: 'Jolly',
    evs: { atk: 252, spd: 4, spe: 252 },
    level: 50,
    teraType: 'Water'
  })

  landorus = new Pokemon(this.gen, 'Landorus', {
    item: 'Life Orb',
    nature: 'Timid',
    evs: { spa: 252, spd: 4, spe: 252 },
    level: 50,
    teraType: 'Flying'
  })

  ogerponWellspring = new Pokemon(this.gen, 'Ogerpon-Wellspring', {
    item: 'Wellspring Mask',
    nature: 'Adamant',
    evs: { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 },
    level: 50,
    teraType: 'Water'
  })

  targets: TargetPokemon[] = [
    new TargetPokemon(this.ragingBolt, true),
    new TargetPokemon(this.walkingWake, true),
    new TargetPokemon(this.gougingFire),
    new TargetPokemon(this.entei),
    new TargetPokemon(this.incineroar),
    new TargetPokemon(this.urshifu, true),
    new TargetPokemon(this.landorus),
    new TargetPokemon(this.ogerponWellspring)
  ]

  public pokemonName = "Flutter Mane"
  public nature = "Timid"
  public item = "Choice Specs"
  public ability: any = "Protosynthesis"
  public teraType = "Fairy"
  public moveName = 'Moon Blast'
  public teraTypeActive = true
  public pokePaste = ""

  public current = new TargetPokemon(new Pokemon(this.gen, this.pokemonName, {
    nature: this.nature,
    item: this.item,
    ability: this.ability,
    teraType: this.teraTypeActive ? this.teraType as any : null,
    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
    level: 50
  }), this.teraTypeActive)

  public previous = new TargetPokemon(this.current.pokemon.clone())

  onPokemonSelected(selectedPokemon: string) {
    this.pokemonName = selectedPokemon
  }

  onNatureSelected(selectedNature: string) {
    this.nature = selectedNature
  }

  onTeraTypeSelected(selectedTeraType: string) {
    this.teraType = selectedTeraType
  }

  onItemSelected(selectedItem: string) {
    this.item = selectedItem
  }

  onAbilitySelected(selectedAbility: string) {
    this.ability = selectedAbility
  }

  onMoveSelected(selectedMove: string) {
    this.moveName = selectedMove
  }

  onChangeEvValue() {
    if (this.current.totalEvs() <= this.MAX_EVS) {
      this.previous = new TargetPokemon(this.current.pokemon.clone())
      this.current = new TargetPokemon(this.current.pokemon.clone())
    } else {
      this.current = new TargetPokemon(this.previous.pokemon.clone())
    }    
  }

  beforeChangeEvValue() {
    if (this.current.totalEvs() <= this.MAX_EVS) {
      this.previous = new TargetPokemon(this.current.pokemon.clone())
      this.current = new TargetPokemon(this.current.pokemon.clone())
    }
  }

  addPokemon() {
    this.targets.push(
      new TargetPokemon(new Pokemon(this.gen, this.pokemonName, {
        nature: this.nature,
        item: this.item,
        ability: this.ability,
        teraType: this.teraTypeActive ? this.teraType as any : null,
        evs: this.current.pokemon.evs,
        level: 50
      }), this.teraTypeActive)
    )
    this.calcDamageToAll()
  }

  addFromPokePaste() {
    axios.get(`${this.pokePaste}/raw`)
      .then(res => {
        const parsedTeam = Koffing.parse(res.data)
        JSON.parse(parsedTeam.toJson()).teams[0].pokemon.forEach((poke: any) => {
          this.targets.push(
            new TargetPokemon(new Pokemon(this.gen, poke.name, {
              nature: poke.nature,
              item: poke.item,
              ability: poke.ability,
              evs: { hp: poke.evs.hp, atk: poke.evs.atk, def: poke.evs.def, spa: poke.evs.spa, spd: poke.evs.spd, spe: poke.evs.spe },
              teraType: poke.teraType,
              level: 50
            }))
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
    this.targets[index].changeTeraStatus()
    this.calcDamageToAll()
  }

  calculateMin(evValue: number) {
    if (evValue == this.EV_ZERO || evValue == this.FIRST_EV) return 0
    
    return 4
  }

  calculateEvStep(evValue: number) {
    if (evValue == this.EV_ZERO) return 4
    if (evValue == this.FIRST_EV) return 6
    
    return 8
  }

  calcDamage(attackerPoke: Pokemon, target: TargetPokemon, move: Move) {
    const gen = Generations.get(9);
    const result = calculate(
      gen,
      attackerPoke,
      target.pokemon,
      move,
      this.field
    );

    //TODO refactory
    if ((result.move.category == 'Special' && this.vesselOfRuinActive && !this.beadsOfRuinActive) || (result.move.category == 'Physical' && this.tabletsOfRuinActive && !this.swordOfRuinActive)) {
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

    if ((result.move.category == 'Special' && this.beadsOfRuinActive && !this.vesselOfRuinActive) || (result.move.category == 'Physical' && this.swordOfRuinActive && !this.tabletsOfRuinActive)) {
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
    const move = new Move(this.gen, this.moveName)

    const pokemon = new Pokemon(this.gen, this.pokemonName, {
      item: this.item,
      nature: this.nature,
      ability: this.ability,
      evs: this.current.pokemon.evs,
      teraType: this.teraTypeActive ? this.teraType as any : null,
      level: 50
    })

    this.targets.forEach((target) => {
      this.calcDamage(pokemon, target, move)
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