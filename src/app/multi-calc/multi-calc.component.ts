import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-multi-calc',
  templateUrl: './multi-calc.component.html',
  styleUrls: ['./multi-calc.component.scss']
})
export class MultiCalcComponent {

  constructor(
    public data: DataStore, private damageCalculator: DamageCalculatorService
  ) {}

  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  activeSecondAttacker?: Pokemon
  
  @Output() 
  dataChangedEvent = new EventEmitter<any>()
  
  ngOnInit() {
    this.activeOnEditPokemon = this.data.activePokemon()
    this.activeAttackerPokemon = this.activeOnEditPokemon
  }

  targetActivated(target: Target) {
    this.activeOnEditPokemon = target.pokemon
  }

  secondTargetDeactivated() {
    this.activeOnEditPokemon = this.data.targets.find(t => t.active)?.pokemon!
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.calculateDamageForAll(false)
  }

  teamChanged(team: Team) {
    this.data.teams.forEach(t => t.active = false)
    team.active = true
    this.activeOnEditPokemon = team.activePokemon()
    this.calculateDamageForAll()
  }

  pokemonAddedToTeam() {
    const activePokemon = this.data.activeTeam().activeTeamMember()

    const pokemon = defaultPokemon()
    const teamMember = new TeamMember(pokemon)
    
    teamMember.active = true

    if (activePokemon) {
      activePokemon.active = false
    }    

    this.data.activeTeam().addTeamMember(teamMember)

    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = pokemon
  }

  pokemonAddedToTargets() {
    this.deactivateTargets()
    const pokemon = defaultPokemon()
    const position = this.data.targets.length + 1
    const target = new Target(pokemon, position)
    target.active = true
    this.data.targets.push(target)
    this.targetActivated(target)

    this.calculateDamage(target)
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    const activeTargets = this.data.targets.filter(t => t.active)
    
    if (pokemon != activeTargets[0]?.pokemon && pokemon != activeTargets[1]?.pokemon) {
      this.activeAttackerPokemon = pokemon
      this.calculateDamageForAll()
    } else {
      this.calculateDamageForAll(false)
    }
    
    this.dataChangedEvent.emit()
  }

  targetsAdded(targets: Target[]) {
    const newTargets = targets.filter(target => {
      return !this.alreadyExists(target.pokemon)
    })

    this.data.targets = this.data.targets.concat(newTargets)
    this.calculateDamageForAll()
    this.adjustDefaultPokemonOnTargets()
    
    this.dataChangedEvent.emit()
  }

  private adjustDefaultPokemonOnTargets() {
    if (this.activeOnEditPokemon.isDefault()) {
      this.activeOnEditPokemon = this.data.activeTeam().first().pokemon
      this.deactivateTargets()
      this.data.targets = this.data.targets.filter(t => !t.pokemon.isDefault())
    }
  }

  targetChanged(target: Target) {
    if (target.active) {
      this.activeOnEditPokemon = target.pokemon
    }
    
    this.calculateDamage(target)
    
    this.dataChangedEvent.emit()
  }

  targetRemoved() {
    this.activeOnEditPokemon = this.data.activePokemon()
    this.dataChangedEvent.emit()
  }

  removeAllTargets() {
    this.data.targets = []
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamageForAll()
    this.dataChangedEvent.emit()
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.data.targets.some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  private deactivateTargets() {
    this.data.targets.forEach(t => t.active = false)
  }  

  secondAttackerSelected() {
    if (this.activeSecondAttacker == this.data.activeTeam().activePokemon()) {
      this.activeSecondAttacker = undefined
    } else {
      this.activeSecondAttacker = this.data.activeTeam().activePokemon()
    }
  }

  private calculateDamage(target: Target) {
    if(this.data.oneVsManyActivated) {
      this.calculateDamageOneVsMany(this.activeAttackerPokemon, target, this.data.extraFieldOptions.criticalHit, this.activeSecondAttacker)
    } else {
      this.calculateDamageManyVsOne(target, this.data.extraFieldOptions.criticalHit)      
    }
  }

  private calculateDamageForAll(order: boolean = true) {
    if (this.activeAttackerPokemon) {
      this.data.targets.forEach(target => this.calculateDamage(target))

      if (order) {
        this.data.order()
      }
    }
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, criticalHit: boolean, secondAttacker?: Pokemon) {
    if(secondAttacker && attacker != secondAttacker) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, this.data.field, criticalHit)
      target.setDamageResult(damageResult)  
    } else {
      const damageResult = this.damageCalculator.calcDamage(attacker, target.pokemon, this.data.field, criticalHit) //REMOVER CRITICAL HIT
      target.setDamageResult(damageResult)
    }
  }

  private calculateDamageManyVsOne(target: Target, criticalHit: boolean) {
    const activeTargets = this.data.targets.filter(t => t.active)
    const activeTeamMember = this.data.activePokemon()

    if(activeTargets.length > 1 && target.active) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, this.data.field, criticalHit)
      activeTargets[0].setDamageResult(damageResult)
      activeTargets[1].setDamageResult(damageResult)  
    } else {
      const damageResult = this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, this.data.field, criticalHit)
      target.setDamageResult(damageResult)
    }
  }

}
