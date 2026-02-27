import { CdkDragDrop, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InputAutocompleteComponent } from "@app/basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@app/basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { SnackbarService } from "@lib/snackbar.service"
import { Regulation } from "@lib/types"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { AddPokemonCardComponent } from "@pages/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"

@Component({
  selector: "app-target-pokemon",
  templateUrl: "./target-pokemon.component.html",
  styleUrls: ["./target-pokemon.component.scss"],
  imports: [CdkDropList, CdkDropListGroup, MatButton, MatSlideToggle, WidgetComponent, InputSelectComponent, InputAutocompleteComponent, PokemonCardComponent, AddPokemonCardComponent, ImportPokemonButtonComponent, RollConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetPokemonComponent {
  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()

  targetActivated = output<string>()
  targetRemoved = output()
  targetsImported = output()
  orderChanged = output<boolean>()
  rollLevelChange = output<RollLevelConfig>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  regulation = signal<Regulation>(this.store.targetMetaRegulation() ?? "F")
  rollLevelConfig = signal(RollLevelConfig.fromConfigString(this.store.multiCalcRollLevel()))

  constructor() {
    effect(() => {
      const level = this.isAttacker() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })
  }

  cardsFilter = signal("")

  title = computed(() => (this.isAttacker() ? "Opponent Attackers" : "Opponent Defenders"))

  targets = computed(() => this.store.targets())

  haveMetaData = computed(() => this.store.targetMetaRegulation() != undefined)

  metaButtonLabel = computed(() => (this.haveMetaData() ? "Remove Meta" : "Add Meta"))

  filteredDamageResults = computed(() => {
    const filter = this.cardsFilter().toLocaleLowerCase()

    if (!filter) {
      return this.damageResults()
    }

    if (this.isAttacker()) {
      return this.damageResults().filter(result => result.attacker.name.toLocaleLowerCase().includes(filter) || result.secondAttacker?.name.toLocaleLowerCase().includes(filter))
    }

    return this.damageResults().filter(result => result.defender.name.toLocaleLowerCase().includes(filter))
  })

  readonly pokemonNamesByReg = computed(() =>
    pokemonByRegulation(this.regulation() as Regulation)
      .map(s => s.name)
      .sort()
  )

  regulationsList: Regulation[] = ["F", "J"]

  order = true

  onMetaClick() {
    if (this.haveMetaData()) {
      const newTargets = this.targetsExcludingMetaData()

      this.store.updateTargetMetaRegulation(undefined)
      this.activateTeamMember()
      this.store.updateTargets(newTargets)
      this.snackBar.open("Pokémon removed")
    } else {
      this.store.updateTargetMetaRegulation(this.regulation())
      const metaPokemon = pokemonByRegulation(this.regulation(), 50)
      this.pokemonImported(metaPokemon)
    }
  }

  removeAll() {
    this.activateTeamMember()
    this.store.updateTargetMetaRegulation(undefined)
    this.store.removeAllTargets()
    this.snackBar.open("Pokémon removed")
  }

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const pokemonList = pokemon as Pokemon[]
    const newTargets = []

    for (const pokemon of pokemonList) {
      newTargets.push(new Target(pokemon))
    }

    this.targetsImported.emit()

    const allTargets = this.targets()
      .filter(t => !t.pokemon.isDefault)
      .concat(newTargets)

    this.store.updateTargets(allTargets)

    this.snackBar.open("Pokémon imported")
  }

  exportPokemon() {
    const pokemon = this.targets().flatMap(t => (t.secondPokemon ? [t.pokemon, t.secondPokemon] : [t.pokemon]))
    this.exportPokeService.export("Opponent Pokémon", ...pokemon)
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon)
    const deactivatedTargets = this.targets().map(t => new Target(t.pokemon, t.secondPokemon))
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

  updateCardsFilter(event: string) {
    const cardsFilter = event
    this.cardsFilter.set(cardsFilter)
  }

  updateRegulation(event: string) {
    const regulation = event as Regulation
    this.regulation.set(regulation)
  }

  clearCardsFilter() {
    this.cardsFilter.set("")
  }
  handleRollLevelChange(rollLevel: RollLevelConfig) {
    this.rollLevelConfig.set(rollLevel)
    this.rollLevelChange.emit(rollLevel)

    if (this.isAttacker()) {
      this.store.updateManyVsTeamRollLevel(rollLevel.toConfigString())
    } else {
      this.store.updateMultiCalcRollLevel(rollLevel.toConfigString())
    }
  }

  private findTarget(pokemonId: string): Target {
    return this.targets().find(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)!
  }

  private findTargetIndex(pokemonId: string): number {
    return this.targets().findIndex(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)
  }

  private targetsExcludingMetaData(): Target[] {
    const metaLeft = pokemonByRegulation(this.store.targetMetaRegulation()!, 50)

    const newTargets = [...this.targets()]
      .reverse()
      .filter(target => {
        const index = metaLeft.findIndex(m => m.equals(target.pokemon))

        if (index !== -1) {
          metaLeft.splice(index, 1)
          return false
        }

        return true
      })
      .reverse()

    return newTargets
  }

  private activateTeamMember() {
    this.targetActivated.emit(this.store.team().activePokemon().id)
  }
}
