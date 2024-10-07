import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterOutlet } from '@angular/router';
import { SmogonFunctions } from 'src/lib/smogon-functions/smogon-functions';
import { AddPokemonCardComponent } from './add-pokemon-card/add-pokemon-card.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvSliderComponent } from './ev-slider/ev-slider.component';
import { FieldComponent } from './field/field.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { HeaderComponent } from './header/header.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { MainPokemonComponent } from './main-pokemon/main-pokemon.component';
import { MainComponent } from './main/main.component';
import { MultiCalcComponent } from './multi-calc/multi-calc.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PokemonBuildComponent } from './pokemon-build/pokemon-build.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonEditMobileComponent } from './pokemon-edit-mobile/pokemon-edit-mobile.component';
import { PokemonTabComponent } from './pokemon-tab/pokemon-tab.component';
import { SimpleCalcMobileComponent } from './simple-calc-mobile/simple-calc-mobile.component';
import { SpeedBoxComponent } from './speed-box/speed-box.component';
import { SpeedCalculatorMobileComponent } from './speed-calculator-mobile/speed-calculator-mobile.component';
import { SpeedCalculatorComponent } from './speed-calculator/speed-calculator.component';
import { SpeedScaleComponent } from './speed-scale/speed-scale.component';
import { TargetPokemonComponent } from './target-pokemon/target-pokemon.component';
import { TeamBoxComponent } from './team-box/team-box.component';
import { TeamExportModalComponent } from './team-export-modal/team-export-modal.component';
import { TeamImportModalComponent } from './team-import-modal/team-import-modal.component';
import { TeamsComponent } from './teams/teams.component';
import { SimpleCalcComponent } from './simple-calc/simple-calc.component';
import { PokemonComboBoxComponent } from './pokemon-combo-box/pokemon-combo-box.component';
import { AbilityComboBoxComponent } from './ability-combo-box/ability-combo-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPokemonComponent,
    TargetPokemonComponent,
    FieldComponent,
    EvSliderComponent,
    InputAutocompleteComponent,
    PokemonCardComponent,
    AddPokemonCardComponent,
    NotFoundPageComponent,
    PokemonTabComponent,
    TeamsComponent,
    TeamBoxComponent,
    TeamExportModalComponent,
    TeamImportModalComponent,
    PokemonEditMobileComponent,
    SpeedScaleComponent,
    SpeedCalculatorMobileComponent,
    SpeedBoxComponent,
    SpeedCalculatorComponent,
    MainComponent,
    MultiCalcComponent,
    SimpleCalcMobileComponent,
    HeaderComponent,
    HeaderMobileComponent,
    PokemonBuildComponent,
    SimpleCalcComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [SmogonFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
