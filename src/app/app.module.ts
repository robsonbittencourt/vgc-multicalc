import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MainPokemonComponent } from './main-pokemon/main-pokemon.component';
import { TargetPokemonComponent } from './target-pokemon/target-pokemon.component';
import { FieldComponent } from './field/field.component';
import { EvSliderComponent } from './ev-slider/ev-slider.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { AddPokemonCardComponent } from './add-pokemon-card/add-pokemon-card.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PokemonTabComponent } from './pokemon-tab/pokemon-tab.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamBoxComponent } from './team-box/team-box.component';
import { TeamExportModalComponent } from './team-export-modal/team-export-modal.component';
import { TeamImportModalComponent } from './team-import-modal/team-import-modal.component';
import { PokemonEditMobileComponent } from './pokemon-edit-mobile/pokemon-edit-mobile.component';

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
    CalculatorComponent,
    NotFoundPageComponent,
    PokemonTabComponent,
    TeamsComponent,
    TeamBoxComponent,
    TeamExportModalComponent,
    TeamImportModalComponent,
    PokemonEditMobileComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
