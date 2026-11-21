import { Component, OnInit, computed, inject, input, output } from "@angular/core"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { AbilitiesToggleService } from "@features/pokemon-build/tables/abilities-table/abilities-toggle.service"
import { getAllAbilities } from "@data/ability-data"
import { localizedName } from "@data/i18n/localized-names"
import { localizedDescription } from "@data/i18n/descriptions"
import { LanguageStore } from "@store/language-store"
import { TranslatePipe } from "@shared/localize/translate.pipe"

interface AbilityRow {
  name: string
  label: string
  description: string
}

@Component({
  selector: "app-abilities-table",
  imports: [FilterableTableComponent, MatSlideToggle, MatTooltip, TranslatePipe],
  templateUrl: "./abilities-table.component.html",
  styleUrl: "./abilities-table.component.scss"
})
export class AbilitiesTableComponent implements OnInit {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()
  isMobile = input<boolean>(false)

  abilitySelected = output<string>()
  firstAbilityFromList = output<string>()
  escapeWasPressed = output()

  store = inject(CalcStore)
  abilitiesToggle = inject(AbilitiesToggleService)
  private languageStore = inject(LanguageStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  hasNonNativeAbility = computed(() => this.abilitiesToggle.hasNonNativeAbility(this.pokemonId()))

  ngOnInit() {
    this.abilitiesToggle.resetForPokemon(this.pokemonId())
  }

  abilitiesData = computed(() => {
    const abilities = this.toRows(this.pokemon().availableAbilities)

    if (!this.hasNonNativeAbility() && !this.abilitiesToggle.showAllAbilities()) return [{ group: "", data: abilities }]

    const pokemonAbilityNames = new Set(abilities.map(ability => ability.name))
    const otherAbilities = this.toRows(getAllAbilities().filter(ability => !pokemonAbilityNames.has(ability.name)))

    return [
      { group: "This Pokémon", data: abilities },
      { group: "All Abilities", data: otherAbilities }
    ]
  })

  private toRows(abilities: { name: string }[]): AbilityRow[] {
    const language = this.languageStore.language()

    return abilities.map(ability => ({ ...ability, label: localizedName("abilities", ability.name, language), description: localizedDescription("abilities", ability.name, language) }))
  }

  actualAbility = computed(() => {
    const abilityName = this.pokemon().ability.name
    return [abilityName]
  })

  moveColumns: ColumnConfig<AbilityRow>[] = [
    new ColumnConfig<AbilityRow>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium", freezeOnMobile: true, displayFn: (item: AbilityRow) => item.label }),
    new ColumnConfig<AbilityRow>({
      field: "description",
      header: "Description",
      clampText: true,
      description: "Description",
      alignLeft: true,
      width: "fill"
    })
  ]
}
