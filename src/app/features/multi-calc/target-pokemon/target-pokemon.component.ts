import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, output } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { AddPokemonCardComponent } from "@app/features/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { PokemonCardComponent } from "@app/features/multi-calc/pokemon-card/pokemon-card.component"
import { CopyButtonComponent } from "@app/shared/buttons/copy-button/copy-button.component"
import { ImportPokemonButtonComponent } from "@app/shared/buttons/import-pokemon-button/import-pokemon-button.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { SnackbarService } from "@lib/snackbar.service"
import { ExportPokeService } from "@lib/user-data/export-poke.service"

@Component({
  selector: "app-target-pokemon",
  templateUrl: "./target-pokemon.component.html",
  styleUrls: ["./target-pokemon.component.scss"],
  imports: [WidgetComponent, MatButton, MatSlideToggle, PokemonCardComponent, AddPokemonCardComponent, CopyButtonComponent, ImportPokemonButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetPokemonComponent {
  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()
  showDamageDescription = input(true)

  targetActivated = output<string>()
  targetRemoved = output()
  targetsImported = output()
  orderChanged = output<boolean>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  title = computed(() => (this.isAttacker() ? "Opponent Attackers" : "Opponent Defenders"))

  targets = computed(() => this.store.targets())

  activeDamageResult = computed(() => {
    const activeTarget = this.targets().find(t => t.active)

    if (this.menuStore.oneVsManyActivated()) {
      return this.damageResults().find(result => result.defender.id == activeTarget?.pokemon.id)
    } else {
      return this.damageResults().find(result => result.attacker.id == activeTarget?.pokemon.id)
    }
  })

  order = false

  removeAll() {
    this.store.removeAllTargets()
  }

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const pokemonList = pokemon as Pokemon[]
    const newTargets = []

    for (const pokemon of pokemonList) {
      if (!this.alreadyExists(pokemon)) {
        newTargets.push(new Target(pokemon))
      }
    }

    this.targetsImported.emit()

    const allTargets = this.targets()
      .filter(t => !t.pokemon.isDefault)
      .concat(newTargets)

    this.store.updateTargets(allTargets)

    this.snackBar.open("Pokémon from PokePaste added")
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.targets().some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  exportPokemon() {
    const pokemon = this.targets().map(t => t.pokemon)
    this.exportPokeService.export("Opponent Pokémon", ...pokemon)
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
    return this.targets().find(t => t.pokemon.isDefault) != null
  }

  activateTarget(pokemonId: string) {
    const withoutDefaultPokemon = this.targets().filter(t => !t.pokemon.isDefault)
    this.store.updateTargets(withoutDefaultPokemon)

    this.targetActivated.emit(pokemonId)
  }

  damageDescription(): string {
    const damageResult = this.activeDamageResult()

    if (damageResult && !damageResult?.attacker.isDefault && !damageResult?.defender.isDefault) {
      return damageResult.description
    } else {
      return ""
    }
  }

  rolls(): number[] {
    return this.activeDamageResult()?.rolls ?? []
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
      const newTargets = [...this.targets().slice(0, index), new Target(target.pokemon, false), ...this.targets().slice(index + 1)]

      this.store.updateTargets(newTargets)
    } else {
      const newTargets = [...this.targets().slice(0, index), new Target(target.pokemon, true), ...this.targets().slice(index + 1)]

      this.store.updateTargets(newTargets)
    }
  }

  findTarget(pokemonId: string): Target {
    return this.targets().find(target => target.pokemon.id === pokemonId)!
  }

  toogleOrder() {
    this.order = !this.order
    this.orderChanged.emit(this.order)
  }
}
