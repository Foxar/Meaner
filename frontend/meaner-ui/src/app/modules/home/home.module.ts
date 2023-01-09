import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from 'src/app/state/home/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from 'src/app/state/home/home.effects';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature("home", homeReducer),
    EffectsModule.forFeature([HomeEffects])
    
  ],
  exports: [RouterModule],
})
export class HomeModule { }
