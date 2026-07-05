import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, linkedSignal, output, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InputAutocompleteComponent } from "@app/basic/input-autocomplete/input-autocomplete.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { MOVESETS } from "@data/moveset-data"
import { pokemonByRegulation } from "@adapters"
import { CalculatorStore } from "@store/calculator-store"
import { MenuStore } from "@store/menu-store"
import { pokemonToState } from "@store/utils/state-mapper"
import { setsMatch } from "@store/utils/sets-match"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { TeamExportModalComponent } from "@features/export-modal/export-modal.component"
import { MetaRegulationModalComponent } from "@features/meta-regulation-modal/meta-regulation-modal.component"
import { DamageResult, RollLevelConfig } from "@multicalc/damage-calculator"
import { defaultPokemon } from "@multicalc/default-pokemon"
import { Pokemon, Target } from "@multicalc/model"
import { SnackbarService } from "@core/services/snackbar.service"
import { Regulation } from "@multicalc/types"
import { FEATURES } from "@configuration/feature-flags"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { AddPokemonCardComponent } from "@pages/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"

@Component({
  selector: "app-target-pokemon",
  templateUrl: "./target-pokemon.component.html",
  styleUrls: ["./target-pokemon.component.scss"],
  imports: [CdkDropList, CdkDropListGroup, MatButton, MatSlideToggle, WidgetComponent, InputAutocompleteComponent, PokemonCardComponent, AddPokemonCardComponent, ImportPokemonButtonComponent, RollConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetPokemonComponent {
  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()

  targetActivated = output<string>()
  pokemonAddedToTargets = output<string>()
  targetRemoved = output()
  targetsImported = output()
  rollLevelChange = output<RollLevelConfig>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)
  private dialog = inject(MatDialog)
  private snackBar = inject(SnackbarService)

  regulation = linkedSignal<Regulation>(() => this.store.targetMetaRegulation() ?? "MB")
  rollLevelConfig = signal(RollLevelConfig.fromConfigString(this.store.multiCalcRollLevel()))

  constructor() {
    effect(() => {
      const level = this.isAttacker() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })
  }

  cardsFilter = signal("")
  setFilter = signal("")
  teamFilter = signal("")

  title = computed(() => (this.isAttacker() ? "Opponent Attackers" : "Opponent Defenders"))

  targets = computed(() => this.store.targets())

  haveMetaData = computed(() => this.store.targetMetaRegulation() != undefined)

  metaButtonLabel = computed(() => (this.haveMetaData() ? "Remove Meta" : "Add Meta"))

  getExpansionKey(result: DamageResult): string {
    return this.isAttacker() ? result.attacker.id : result.defender.id
  }

  private cardPokemons(result: DamageResult): Pokemon[] {
    if (this.isAttacker()) {
      return result.secondAttacker ? [result.attacker, result.secondAttacker] : [result.attacker]
    }

    return [result.defender]
  }

  readonly setNameByPokemonId = computed(() => {
    const customSets = this.store.customSetsByPokemon()
    const map = new Map<string, string>()

    for (const result of this.damageResults()) {
      for (const pokemon of this.cardPokemons(result)) {
        const sets = customSets.get(pokemon.name) ?? []
        const state = pokemonToState(pokemon)
        const matched = sets.find(s => setsMatch(s.state, state))

        if (matched) {
          map.set(pokemon.id, `${pokemon.name} - ${matched.setName}`)
        }
      }
    }

    return map
  })

  readonly availableSetNames = computed(() => [...new Set(this.setNameByPokemonId().values())].sort())

  filteredDamageResults = computed(() => {
    const filter = this.cardsFilter().toLocaleLowerCase()
    const setFilter = this.setFilter()

    let results = this.damageResults()

    if (filter) {
      if (this.isAttacker()) {
        results = results.filter(result => result.attacker.name.toLocaleLowerCase().includes(filter) || result.secondAttacker?.name.toLocaleLowerCase().includes(filter))
      } else {
        results = results.filter(result => result.defender.name.toLocaleLowerCase().includes(filter))
      }
    }

    if (setFilter) {
      const normalizedSetFilter = setFilter.toLocaleLowerCase()
      const setNameById = this.setNameByPokemonId()
      results = results.filter(result =>
        this.cardPokemons(result).some(pokemon => {
          const setName = setNameById.get(pokemon.id)

          return setName != undefined && setName.toLocaleLowerCase().includes(normalizedSetFilter)
        })
      )
    }

    return results
  })

  private get setdex() {
    return MOVESETS
  }

  readonly targetPokemonNames = computed(() => {
    const names = this.damageResults().flatMap(result => (this.isAttacker() ? [result.attacker.name, result.secondAttacker?.name] : [result.defender.name]))

    return [...new Set(names.filter((name): name is string => !!name))].sort()
  })

  readonly regulationsList = signal(["MB"])

  onMetaClick() {
    if (this.haveMetaData()) {
      const newTargets = this.targetsExcludingMetaData()

      this.store.updateTargetMetaRegulation(undefined)
      this.activateTeamMember()
      this.store.updateTargets(newTargets)
      this.snackBar.open("Pokémon removed")

      return
    }

    const regulations = this.regulationsList()

    if (regulations.length <= 1) {
      this.applyMeta(regulations[0] as Regulation)

      return
    }

    const dialogRef = this.dialog.open(MetaRegulationModalComponent, {
      data: { regulations, selected: this.regulation() },
      width: "32em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(regulation => {
      if (regulation) {
        this.applyMeta(regulation as Regulation)
      }
    })
  }

  private applyMeta(regulation: Regulation) {
    this.regulation.set(regulation)
    this.store.updateTargetMetaRegulation(regulation)
    const metaPokemon = pokemonByRegulation(regulation, 60, this.setdex, false)
    this.pokemonImported(metaPokemon)
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

    const allTargets = this.targets()
      .filter(t => !t.pokemon.isDefault)
      .concat(newTargets)

    this.store.updateTargets(allTargets)

    this.targetsImported.emit()

    this.snackBar.open("Pokémon imported")
  }

  exportPokemon() {
    const pokemon = this.targets().flatMap(t => (t.secondPokemon ? [t.pokemon, t.secondPokemon] : [t.pokemon]))
    const shouldUseSps = this.store.useSpsMode()
    this.exportPokeService.export("Opponent Pokémon", pokemon, shouldUseSps)
  }

  exportCalcs() {
    const content = this.filteredDamageResults()
      .map(r => r.description)
      .join("\n\n")

    this.dialog.open(TeamExportModalComponent, {
      data: { title: "Calc Results", content },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon)
    const deactivatedTargets = this.targets().map(t => new Target(t.pokemon, t.secondPokemon))
    const targetsWithDefaultPokemon = deactivatedTargets.concat(target)

    this.store.updateTargets(targetsWithDefaultPokemon)
    this.pokemonAddedToTargets.emit(pokemon.id)
  }

  selectPokemonActive(): boolean {
    return this.targets().find(t => t.pokemon.isDefault) != null
  }

  activateTarget(pokemonId: string) {
    const withoutDefaultPokemon = this.targets().filter(t => !t.pokemon.isDefault)
    this.store.updateTargets(withoutDefaultPokemon)

    this.targetActivated.emit(pokemonId)
  }

  drop(event: CdkDragDrop<string, any>) {
    const { previousContainer, container } = event

    if (previousContainer.data != container.data) {
      const target = this.findTarget(container.data)

      if (target.secondPokemon) return

      const activeIndex = this.findTargetIndex(previousContainer.data)
      const active = this.targets()[activeIndex]

      if (target.pokemon.isDefault || active.pokemon.isDefault) return

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

  clearCardsFilter() {
    this.cardsFilter.set("")
  }

  readonly teamNames = computed(() =>
    this.store
      .teams()
      .filter(t => t.teamMembers.some(m => !m.pokemon.isDefault))
      .map(t => t.name)
  )

  readonly anyFilterActive = computed(() => this.cardsFilter() !== "" || this.setFilter() !== "" || this.teamFilter() !== "")

  readonly pokemonFilterEnabled = computed(() => this.setFilter() === "" && this.teamFilter() === "")
  readonly setFilterEnabled = computed(() => this.cardsFilter() === "" && this.teamFilter() === "")
  readonly teamFilterEnabled = computed(() => this.cardsFilter() === "" && this.setFilter() === "")

  updateSetFilter(event: string) {
    this.setFilter.set(event)
  }

  clearSetFilter() {
    this.setFilter.set("")
  }

  updateTeamFilter(event: string) {
    if (!event) {
      this.clearTeamFilter()
      return
    }

    this.teamFilter.set(event)

    const team = this.store.teams().find(t => t.name === event)
    if (!team) return

    this.store.setTeamFilter(team.id)
  }

  clearTeamFilter() {
    this.teamFilter.set("")
    this.store.clearTeamFilter()
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
    const metaLeft = pokemonByRegulation(this.store.targetMetaRegulation()!, undefined, this.setdex, FEATURES.allowAllPokes)

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
