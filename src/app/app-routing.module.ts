import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from 'src/lib/user-data/user-data-resolver';
import { CalculatorComponent } from './calculator/calculator.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'data/:userDataId', component: CalculatorComponent, resolve: { userData: UserDataResolver } },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
