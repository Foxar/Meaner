import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer } from './state/home/home.reducer';
import { HomeEffects } from './state/home/home.effects';
import { appReducer } from './state/app.state';
import { UserEffects } from './state/user/user.effects';
import { LoginGuardService } from './auth/login-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m=>m.HomeModule),
  },
  {
    path: 'tweet/:id',
    loadChildren: () => import('./modules/tweet/tweet.module').then(m=>m.TweetModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'profile/:profileId',
    loadChildren: () => import('./modules/profile/profile.module').then(m=>m.ProfileModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([HomeEffects]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
