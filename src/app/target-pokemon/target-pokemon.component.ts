import { NoopScrollStrategy } from '@angular/cdk/overlay'
import { Component, computed, inject, input, output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Target } from 'src/lib/model/target'
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service'
import { SnackbarService } from '../../lib/snackbar.service'
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component'
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component'

import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { MenuStore } from 'src/data/store/menu-store'
import { DamageResult } from 'src/lib/damage-calculator/damage-result'
import { defaultPokemon } from 'src/lib/default-pokemon'
import { Pokemon } from 'src/lib/model/pokemon'
import { AddPokemonCardComponent } from '../add-pokemon-card/add-pokemon-card.component'
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component'

@Component({
  selector: 'app-target-pokemon',
  templateUrl: './target-pokemon.component.html',
  styleUrls: ['./target-pokemon.component.scss'],
  imports: [MatIcon, MatButton, PokemonCardComponent, AddPokemonCardComponent]
})
export class TargetPokemonComponent {

  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()
  showDamageDescription = input(true)

  targetActivated = output<string>()
  targetRemoved = output()
  targetsImported = output()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private pokePasteService = inject(PokePasteParserService)
  private dialog = inject(MatDialog)
  private snackBar = inject(SnackbarService)

  targets = computed(() => this.store.targets())

  activeDamageResult = computed(() => {
    const activeTarget = this.targets().find(t => t.active)

    if (this.menuStore.oneVsManyActivated()) {
      return this.damageResults().find(result => result.defender.id == activeTarget?.pokemon.id)
    } else {
      return this.damageResults().find(result => result.attacker.id == activeTarget?.pokemon.id)
    }
  })

  copyMessageEnabled = false

  removeAll() {
    this.store.removeAllTargets()
  }

  async importPokemon() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, {
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      const newTargets = []

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        const position = this.targets().length + index + 1

        if (!this.alreadyExists(pokemon)) {
          newTargets.push(new Target(pokemon))
        }
      }

      this.targetsImported.emit()

      const allTargets = this.targets().filter(t => !t.pokemon.isDefault()).concat(newTargets)
      this.store.updateTargets(allTargets)

      this.snackBar.open("Pokémon from PokePaste added")
    })
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.targets().some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  exportPokemon() {
    this.dialog.open(TeamExportModalComponent, {
      data: {
        title: "Opponent Pokémon",
        content: this.exportToShowdownFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  private exportToShowdownFormat() {
    let result = ""

    this.targets().forEach(t => {
      if (!t.pokemon.isDefault()) {
        result += t.pokemon.showdownTextFormat() + "\n"
      }
    })

    return result
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon, true)
    const deactivatedTargets = this.targets().map(t => new Target(t.pokemon, false))
    const targetsWithDefaultPokemon = deactivatedTargets.concat(target)

    this.store.updateTargets(targetsWithDefaultPokemon)
    this.targetActivated.emit(pokemon.id)
  }

  selectPokemonActive(): boolean {
    return this.targets().find(t => t.pokemon.isDefault()) != null
  }

  damageDescription(): string {
    return this.activeDamageResult()?.description ?? ""
  }

  rolls(): number[] {
    return this.activeDamageResult()?.rolls ?? []
  }

  copyDamageResult() {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(this.damageDescription())

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  canSelectSecondPokemon(): boolean {
    const onlyOneActive = this.targets().filter(t => t.active).length == 1
    return this.isAttacker() && onlyOneActive
  }

  secondTargetActivated(pokemonId: string) {
    const target = this.targets().find(t => t.pokemon.id == pokemonId)!
    const index = this.targets().findIndex(t => t.pokemon.id == pokemonId)

    if (target.active && this.canSelectSecondPokemon()) return

    if (target.active) {
      const newTargets = [
        ...this.targets().slice(0, index),
        new Target(target.pokemon, false),
        ...this.targets().slice(index + 1)
      ]

      this.store.updateTargets(newTargets)
    } else {
      const newTargets = [
        ...this.targets().slice(0, index),
        new Target(target.pokemon, true),
        ...this.targets().slice(index + 1)
      ]

      this.store.updateTargets(newTargets)
    }
  }

  findTarget(pokemonId: string): Target {
    return this.targets().find(target => target.pokemon.id === pokemonId)!
  }

}
