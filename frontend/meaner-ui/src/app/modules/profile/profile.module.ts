import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { profileReducer } from 'src/app/state/profile/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from 'src/app/state/profile/profile.effects';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
]


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature("profile", profileReducer),
    EffectsModule.forFeature([ProfileEffects])
  ],
  exports: [RouterModule]
})
export class ProfileModule { }
