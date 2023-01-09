import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from 'src/app/state/home/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from 'src/app/state/home/home.effects';
import { LoginPageComponent } from './pages/login-page.components';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
]

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class LoginModule { }
