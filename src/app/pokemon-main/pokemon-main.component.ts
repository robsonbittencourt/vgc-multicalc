import { Component, OnInit } from '@angular/core';
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { calculate, Generations, Field, Pokemon, Move, MOVES, NATURES, SPECIES } from '@ajhyndman/smogon-calc';
import { TargetPokemon } from './target-pokemon';

@Component({
  selector: 'app-pokemon-main',
  templateUrl: './pokemon-main.component.html',
  styleUrls: ['./pokemon-main.component.css']
})
export class PokemonMainComponent implements OnInit {

  controlPokemonName = new FormControl('Flutter Mane');
  controlNature = new FormControl('Timid');
  controlMove = new FormControl('Moon Blast');

  allMoveNames = Object.keys(MOVES[9])
  allNatureNames = Object.keys(NATURES)
  allPokemonNames = Object.keys(SPECIES[9])

  filteredPokemonNames: Observable<string[]>;
  filteredNatures: Observable<string[]>;
  filteredMoves: Observable<string[]>;

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

  ironBundle = new Pokemon(this.gen, 'Iron Bundle', {
    item: 'Booster Energy',
    nature: 'Timid',
    evs: { hp: 4, spa: 252, spe: 252 },
    level: 50
  })

  ironHands = new Pokemon(this.gen, 'Iron Hands', {
    item: 'Leftovers',
    nature: 'Adamant',
    evs: { hp: 84, atk: 236, spd: 188, spe: 0 },
    level: 50
  })

  greatTusk = new Pokemon(this.gen, 'Great Tusk', {
    item: 'Focus Sash',
    nature: 'Jolly',
    evs: { hp: 4, atk: 252, spe: 252 },
    level: 50
  })

  palafin = new Pokemon(this.gen, 'Palafin-Hero', {
    item: 'Mystic Water',
    nature: 'Adamant',
    evs: { hp: 204, atk: 252, def: 4, spd: 4, spe: 44 },
    level: 50,
    teraType: 'Water'
  })

  gholdengo = new Pokemon(this.gen, 'Gholdengo', {
    item: 'Choice Specs',
    nature: 'Modest',
    evs: { hp: 244, def: 4, spa: 252, spd: 4, spe: 4 },
    level: 50
  })

  targets: TargetPokemon[] = [
    new TargetPokemon(this.ironBundle),
    new TargetPokemon(this.ironHands),
    new TargetPokemon(this.greatTusk),
    new TargetPokemon(this.palafin),
    new TargetPokemon(this.gholdengo)
  ]

  public pokemonName = "Flutter Mane"
  public nature = "Timid"
  public hp = 0
  public atk = 0
  public def = 0
  public spa = 252
  public spd = 0
  public spe = 252
  public moveName = 'Moon Blast'

  onPokemonSelected(selectedPokemon: string) {
    this.pokemonName = selectedPokemon
  }

  onNatureSelected(selectedNature: string) {
    this.nature = selectedNature
  }

  onMoveSelected(selectedMove: string) {
    this.moveName = selectedMove
  }

  addPokemon() {
    this.targets.push(
      new TargetPokemon(new Pokemon(this.gen, this.pokemonName, {
        nature: this.nature,
        evs: { hp: this.hp, atk: this.atk, def: this.def, spa: this.spa, spd: this.spd, spe: this.spe },
        level: 50
      }))
    )
    this.calcDamageToAll()  
  }

  removePokemon(index: number) {
    this.targets.splice(index, 1);
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

    target.result = "Damage: " + result.moveDesc() + " - " + koChance
  }

  calcDamageToAll() {
    const move = new Move(this.gen, this.moveName)

    const pokemon = new Pokemon(this.gen, this.pokemonName, {
      item: 'Focus Sash', //TODO
      nature: this.nature,
      evs: { hp: this.hp, atk: this.atk, def: this.def, spa: this.spa, spd: this.spd, spe: this.spe },
      level: 50
    })

    this.targets.forEach((target) => {
      this.calcDamage(pokemon, target, move)
    })

    this.targets
      .sort((a, b) => b.damage - a.damage)
  }
}
