import { Component, computed, effect, inject, output, signal } from '@angular/core'
import { FieldStore } from 'src/data/field-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { defaultPokemon } from 'src/lib/default-pokemon'
import { Field } from 'src/lib/field'
import { Pokemon } from 'src/lib/pokemon'
import { Target } from 'src/lib/target'
import { Team } from 'src/lib/team'
import { TeamMember } from 'src/lib/team-member'
import { DataStore } from '../../lib/data-store.service'
import { FieldComponent } from '../field/field.component'
import { TargetPokemonComponent } from '../target-pokemon/target-pokemon.component'
import { TeamComponent } from '../team/team.component'
import { TeamsComponent } from '../teams/teams.component'

@Component({
  selector: 'app-multi-calc',
  templateUrl: './multi-calc.component.html',
  styleUrls: ['./multi-calc.component.scss'],
  standalone: true,
  imports: [TeamComponent, TeamsComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent {
  
  dataChangedEvent = output()

  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  activeOnEditPokemon = signal(this.data.activePokemon())

  isAttacker = computed(() => this.data.activePokemon().equals(this.activeOnEditPokemon()))

  activeAttackerPokemon: Pokemon
  activeSecondAttacker?: Pokemon

  constructor() {
    effect(() => {
      this.calculateDamageForAll(true, this.fieldStore.field())
    })
  }
  
  ngOnInit() {
    this.activeAttackerPokemon = this.activeOnEditPokemon()
  }

  targetActivated(target: Target) {
    this.activeOnEditPokemon.set(target.pokemon)
  }

  secondTargetDeactivated() { 
    this.activeOnEditPokemon.set(this.data.targets.find(t => t.active)?.pokemon!)
    this.activeAttackerPokemon = this.activeOnEditPokemon()
    this.calculateDamageForAll(false, this.fieldStore.field())
  }

  teamChanged(team: Team) {
    this.data.teams.forEach(t => t.active = false)
    team.active = true
    this.activeOnEditPokemon.set(team.activePokemon())
    this.activeAttackerPokemon = this.activeOnEditPokemon()
    this.calculateDamageForAll(true, this.fieldStore.field())
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

    this.activeOnEditPokemon.set(pokemon)
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

    this.calculateDamage(target, this.fieldStore.field())
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon.set(pokemon)
    const activeTargets = this.data.targets.filter(t => t.active)
    
    if (!pokemon.equals(activeTargets[0]?.pokemon) && !pokemon.equals(activeTargets[1]?.pokemon)) {
      this.activeAttackerPokemon = pokemon
      this.calculateDamageForAll(true, this.fieldStore.field())
    } else {
      this.calculateDamageForAll(false, this.fieldStore.field())
    }
    
    this.dataChangedEvent.emit()
  }

  targetsAdded(targets: Target[]) {
    const newTargets = targets.filter(target => {
      return !this.alreadyExists(target.pokemon)
    })

    this.data.targets = this.data.targets.concat(newTargets)
    this.calculateDamageForAll(true, this.fieldStore.field())
    this.adjustDefaultPokemonOnTargets()
    
    this.dataChangedEvent.emit()
  }

  private adjustDefaultPokemonOnTargets() {
    if (this.activeOnEditPokemon().isDefault()) {
      this.activeOnEditPokemon.set(this.data.activeTeam().first().pokemon)
      this.deactivateTargets()
      this.data.targets = this.data.targets.filter(t => !t.pokemon.isDefault())
    }
  }

  targetChanged(target: Target) {
    if (target.active) {
      this.activeOnEditPokemon.set(target.pokemon)
    }
    
    this.calculateDamage(target, this.fieldStore.field())
    
    this.dataChangedEvent.emit()
  }

  targetRemoved() {
    this.activeOnEditPokemon.set(this.data.activePokemon())
    this.dataChangedEvent.emit()
  }

  removeAllTargets() {
    this.data.targets = []
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

  private calculateDamage(target: Target, field: Field) {
    if(this.data.oneVsManyActivated) {
      this.calculateDamageOneVsMany(this.activeAttackerPokemon, target, field, this.activeSecondAttacker)
    } else {
      this.calculateDamageManyVsOne(target, field)      
    }
  }

  private calculateDamageForAll(order: boolean, field: Field) {
    if (this.activeAttackerPokemon) {
      this.data.targets.forEach(target => this.calculateDamage(target, field))

      if (order) {
        this.data.order()
      }
    }
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, secondAttacker?: Pokemon) {
    if(secondAttacker && attacker != secondAttacker) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)
      target.setDamageResult(damageResult)
    } else {
      const damageResult = this.damageCalculator.calcDamage(attacker, target.pokemon, field)
      target.setDamageResult(damageResult)
    }
  }

  private calculateDamageManyVsOne(target: Target, field: Field) {
    const activeTargets = this.data.targets.filter(t => t.active)
    const activeTeamMember = this.data.activePokemon()

    if(activeTargets.length > 1 && target.active) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, field)
      activeTargets[0].setDamageResult(damageResult)
      activeTargets[1].setDamageResult(damageResult)
    } else {
      const damageResult = this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field)
      target.setDamageResult(damageResult)
    }
  }

}
