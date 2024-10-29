import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { SmogonFunctions } from 'src/lib/smogon-functions/smogon-functions';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ReactiveFormsModule, FormsModule, BrowserModule, RouterOutlet, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatCardModule, MatCheckboxModule, MatSliderModule, MatIconModule, MatButtonModule, MatSelectModule, MatButtonToggleModule, MatChipsModule, MatSlideToggleModule, AppRoutingModule, MatSnackBarModule, MatTooltipModule, MatTabsModule, MatDialogModule, MatMenuModule),
        SmogonFunctions,
        provideAnimations()
    ]
}).catch(err => console.error(err));
