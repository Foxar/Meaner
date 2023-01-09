import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TweetFormComponent } from './components/tweet-form/tweet-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPinComponent } from './components/user-pin/user-pin.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/state/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/state/user/user.effects';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const exportComponents = [
  NavigationBarComponent,
  TweetComponent,
  TweetFormComponent,
  UserPinComponent
]

@NgModule({
  declarations: [
    ...exportComponents,
    TweetFormComponent,
    UserPinComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature("reducer", userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [
    ...exportComponents
  ],
  providers: [...exportComponents]
})
export class SharedModule { }
