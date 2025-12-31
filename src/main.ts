import { importProvidersFrom, provideZonelessChangeDetection } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimations } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "@app/app-routing.module"
import { AppComponent } from "@app/app.component"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { LastRespectsAdjuster } from "@lib/damage-calculator/calc-adjuster/last-respects-adjuster"
import { NeutralizingGasAdjuster } from "@lib/damage-calculator/calc-adjuster/neutralizing-gas-adjuster"
import { OgerponAdjuster } from "@lib/damage-calculator/calc-adjuster/ogerpon-adjuster"
import { RageFistAdjuster } from "@lib/damage-calculator/calc-adjuster/rage-fist-adjuster"
import { RuinsAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/ruins-ability-adjuster"
import { ZacianZamazentaAdjuster } from "@lib/damage-calculator/calc-adjuster/zacian-zamazenta-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { RuinationCalculator } from "@lib/damage-calculator/specific-damage-calculator/ruination-calculator"

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideAnimations(),
    provideZonelessChangeDetection(),
    { provide: CALC_ADJUSTERS, useClass: RuinsAbilityAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: LastRespectsAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: RageFistAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: ZacianZamazentaAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: NeutralizingGasAdjuster, multi: true },
    { provide: CALC_ADJUSTERS, useClass: OgerponAdjuster, multi: true },
    { provide: SPECIFIC_DAMAGE_CALCULATORS, useClass: RuinationCalculator, multi: true }
  ]
}).catch(err => console.error(err))
