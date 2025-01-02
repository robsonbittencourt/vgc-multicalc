import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimations } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "@app/app-routing.module"
import { AppComponent } from "@app/app.component"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { LastRespectsAdjuster } from "@lib/damage-calculator/calc-adjuster/last-respects-adjuster"
import { RageFistAdjuster } from "@lib/damage-calculator/calc-adjuster/rage-fist-adjuster"
import { RuinsAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/ruins-ability-adjuster"

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
    { provide: CALC_ADJUSTERS, useClass: RuinsAbilityAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: LastRespectsAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: RageFistAdjuster, multi: true }
  ]
}).catch(err => console.error(err))
