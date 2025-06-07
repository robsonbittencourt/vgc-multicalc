import { CdkDragDrop, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, output, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { AddPokemonCardComponent } from "@app/features/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { PokemonCardComponent } from "@app/features/multi-calc/pokemon-card/pokemon-card.component"
import { RollConfigComponent } from "@app/roll-config/roll-config.component"
import { ImportPokemonButtonComponent } from "@app/shared/buttons/import-pokemon-button/import-pokemon-button.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { SnackbarService } from "@lib/snackbar.service"
import { ExportPokeService } from "@lib/user-data/export-poke.service"

@Component({
  selector: "app-target-pokemon",
  templateUrl: "./target-pokemon.component.html",
  styleUrls: ["./target-pokemon.component.scss"],
  imports: [CdkDropList, CdkDropListGroup, MatButton, MatSlideToggle, WidgetComponent, PokemonCardComponent, AddPokemonCardComponent, ImportPokemonButtonComponent, RollConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetPokemonComponent {
  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()

  targetActivated = output<string>()
  targetRemoved = output()
  targetsImported = output()
  orderChanged = output<boolean>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  rollLevelConfig = signal(RollLevelConfig.high())

  title = computed(() => (this.isAttacker() ? "Opponent Attackers" : "Opponent Defenders"))

  targets = computed(() => this.store.targets())

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
    const pokemon = this.targets().flatMap(t => (t.secondPokemon ? [t.pokemon, t.secondPokemon] : [t.pokemon]))
    this.exportPokeService.export("Opponent Pokémon", ...pokemon)
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon)
    const deactivatedTargets = this.targets().map(t => new Target(t.pokemon))
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

  toogleOrder() {
    this.order = !this.order
    this.orderChanged.emit(this.order)
  }

  drop(event: CdkDragDrop<string, any>) {
    const { previousContainer, container } = event

    if (previousContainer.data != container.data) {
      const target = this.findTarget(container.data)

      if (target.secondPokemon) return

      const activeIndex = this.findTargetIndex(previousContainer.data)
      const active = this.targets()[activeIndex]

      target.secondPokemon = active.pokemon

      const newTargets = [...this.targets().slice(0, activeIndex), ...this.targets().slice(activeIndex + 1)]
      this.store.updateTargets(newTargets)
    }
  }

  separateAttackers(pokemonId: string) {
    const index = this.findTargetIndex(pokemonId)
    const target = this.targets()[index]

    const secondTarget = new Target(target.secondPokemon!)
    target.secondPokemon = undefined

    const newTargets = [...this.targets().slice(0, index), target, secondTarget, ...this.targets().slice(index + 1)]
    this.store.updateTargets(newTargets)
  }

  private findTarget(pokemonId: string): Target {
    return this.targets().find(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)!
  }

  private findTargetIndex(pokemonId: string): number {
    return this.targets().findIndex(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)
  }
}
