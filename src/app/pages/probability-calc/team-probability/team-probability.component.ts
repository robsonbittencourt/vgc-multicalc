import { Component, computed, inject } from "@angular/core"
import { DonutGraphicComponent } from "@app/basic/donut-graphic/donut-graphic.component"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { CalculatorStore } from "@store/calculator-store"
import { FieldStore } from "@store/field-store"
import { ConsistencyScoreService } from "@lib/probability-calc/consistency-score.service"

@Component({
  selector: "app-team-probability",
  imports: [WidgetComponent, DonutGraphicComponent, PokemonSpriteComponent],
  templateUrl: "./team-probability.component.html",
  styleUrl: "./team-probability.component.scss"
})
export class TeamProbabilityComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  consistencyScoreService = inject(ConsistencyScoreService)

  team = computed(() => this.store.team())
  field = computed(() => this.fieldStore.field())

  score0 = computed(() => {
    const pokemon = this.store.teamMember0()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  score1 = computed(() => {
    const pokemon = this.store.teamMember1()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  score2 = computed(() => {
    const pokemon = this.store.teamMember2()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  score3 = computed(() => {
    const pokemon = this.store.teamMember3()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  score4 = computed(() => {
    const pokemon = this.store.teamMember4()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  score5 = computed(() => {
    const pokemon = this.store.teamMember5()
    return pokemon ? this.consistencyScoreService.consistencyScore(pokemon, this.field()) : null
  })

  scores = computed(() => [this.score0(), this.score1(), this.score2(), this.score3(), this.score4(), this.score5()])

  teamScore = computed(() => {
    const team = this.team()
    return Math.round(this.consistencyScoreService.teamConsistencyScore(team, this.field()))
  })

  hasValidTeamMembers = computed(() => {
    const team = this.team()
    return team.teamMembers.some(member => !member.pokemon.isDefault)
  })
}
