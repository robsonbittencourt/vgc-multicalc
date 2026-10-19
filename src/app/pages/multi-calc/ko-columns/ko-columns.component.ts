import { Component, computed, effect, inject, input, OnDestroy, output, signal, TemplateRef, untracked, viewChild, ViewContainerRef } from "@angular/core"
import { Overlay, OverlayRef } from "@angular/cdk/overlay"
import { TemplatePortal } from "@angular/cdk/portal"
import { MatTooltip } from "@angular/material/tooltip"
import { ActionSheetComponent } from "@shared/action-sheet/action-sheet.component"
import { ActionSheetItemComponent } from "@shared/action-sheet/action-sheet-item.component"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { DamageResult, RollLevelConfig } from "@multicalc/damage-calc"
import { remainingHpPercentage } from "@multicalc/hp-calc"
import { Pokemon } from "@multicalc/model"
import { CalcStore } from "@store/calc-store"
import { evsDescription, spsDescription } from "@store/user-data/pokepaste-export"

type KoEntry = {
  id: string
  pokemons: Pokemon[]
  move: string
  result: string
  hpPercentage: number
}

type PokemonInfo = {
  label: string
  value: string
}

type KoColumn = {
  minHits: number
  maxHits: number
  label: string
  entries: KoEntry[]
}

const KO_COLUMNS = [
  { minHits: 1, maxHits: 1, label: "OHKO" },
  { minHits: 2, maxHits: 2, label: "2HKO" },
  { minHits: 3, maxHits: 3, label: "3HKO" },
  { minHits: 4, maxHits: Infinity, label: "4HKO+" }
]

@Component({
  selector: "app-ko-columns",
  templateUrl: "./ko-columns.component.html",
  styleUrl: "./ko-columns.component.scss",
  imports: [MatTooltip, PokemonSpriteComponent, ActionSheetComponent, ActionSheetItemComponent],
  host: {
    "[class.rows]": "rows()"
  }
})
export class KoColumnsComponent implements OnDestroy {
  private store = inject(CalcStore)
  private overlay = inject(Overlay)
  private viewContainerRef = inject(ViewContainerRef)

  damageResults = input.required<DamageResult[]>()
  rollLevelConfig = input.required<RollLevelConfig>()
  isAttacker = input.required<boolean>()
  rows = input<boolean>(false)
  mobile = input<boolean>(false)

  pokemonActivated = output<string>()

  columns = signal<KoColumn[]>([])
  infoPokemon = signal<Pokemon | null>(null)

  private readonly infoSheetTemplate = viewChild.required<TemplateRef<unknown>>("infoSheetTemplate")
  private infoSheetOverlayRef?: OverlayRef
  private longPressTimeout: any
  private touchStart = { x: 0, y: 0 }

  constructor() {
    effect(onCleanup => {
      const columns = this.liveColumns()

      if (untracked(this.columns).length === 0) {
        this.columns.set(columns)

        return
      }

      const timeoutId = setTimeout(() => this.columns.set(columns), 100)

      onCleanup(() => clearTimeout(timeoutId))
    })
  }

  private liveColumns = computed<KoColumn[]>(() => {
    const config = this.rollLevelConfig()
    const sorted = [...this.damageResults()].sort((a, b) => b.damagePercentage(config) - a.damagePercentage(config))

    return KO_COLUMNS.map(column => ({
      ...column,
      entries: sorted
        .filter(result => {
          const hits = result.hitsToKo(config)

          return hits >= column.minHits && hits <= column.maxHits
        })
        .map(result => this.toEntry(result, config))
    }))
  })

  private toEntry(result: DamageResult, config: RollLevelConfig): KoEntry {
    const defender = result.defender
    const pokemons = this.isAttacker() ? [result.attacker, result.secondAttacker].filter((p): p is Pokemon => !!p) : [defender]

    return {
      id: result.id,
      pokemons,
      move: result.secondAttacker ? `${result.move} + ${result.secondAttacker.move.name}` : result.move,
      result: result.result,
      hpPercentage: remainingHpPercentage(defender.hp, defender.actualHp, result.damageByRollConfig(config))
    }
  }

  pokemonInfo(pokemon: Pokemon): PokemonInfo[] {
    const useSpsMode = this.store.useSpsMode()

    return [
      { label: "Item", value: pokemon.item },
      { label: "Nature", value: pokemon.nature },
      { label: "Ability", value: pokemon.ability.simpleName },
      { label: useSpsMode ? "SPs" : "EVs", value: useSpsMode ? spsDescription(pokemon) : evsDescription(pokemon) }
    ]
  }

  pokemonTooltip(pokemon: Pokemon): string {
    return this.pokemonInfo(pokemon)
      .map(info => `${info.label}: ${info.value}`)
      .join("\n")
  }

  onPokemonClick(pokemon: Pokemon) {
    if (this.mobile()) return

    this.pokemonActivated.emit(pokemon.id)
  }

  onPokemonTouchStart(event: TouchEvent, pokemon: Pokemon) {
    if (!this.mobile()) return

    const touch = event.touches[0]

    this.touchStart = { x: touch.clientX, y: touch.clientY }

    clearTimeout(this.longPressTimeout)

    this.longPressTimeout = setTimeout(() => this.openInfoSheet(pokemon), 500)
  }

  onPokemonTouchMove(event: TouchEvent) {
    const touch = event.touches[0]
    const distance = Math.hypot(touch.clientX - this.touchStart.x, touch.clientY - this.touchStart.y)

    if (distance > 10) clearTimeout(this.longPressTimeout)
  }

  cancelLongPress() {
    clearTimeout(this.longPressTimeout)
  }

  closeInfoSheet() {
    this.infoPokemon.set(null)
    this.detachInfoSheet()
  }

  editFromInfoSheet(pokemon: Pokemon) {
    this.closeInfoSheet()
    this.pokemonActivated.emit(pokemon.id)
  }

  ngOnDestroy() {
    clearTimeout(this.longPressTimeout)
    this.detachInfoSheet()
  }

  private openInfoSheet(pokemon: Pokemon) {
    this.infoPokemon.set(pokemon)
    this.detachInfoSheet()

    this.infoSheetOverlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: false
    })

    this.infoSheetOverlayRef.attach(new TemplatePortal(this.infoSheetTemplate(), this.viewContainerRef))
  }

  private detachInfoSheet() {
    this.infoSheetOverlayRef?.dispose()
    this.infoSheetOverlayRef = undefined
  }

  hpBarClass(hpPercentage: number): string {
    if (hpPercentage < 20) return "low"
    if (hpPercentage <= 50) return "mid"

    return "high"
  }
}
