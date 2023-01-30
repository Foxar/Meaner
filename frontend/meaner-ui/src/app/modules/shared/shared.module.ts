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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BasicPopupComponent } from './components/basic-popup/basic-popup.component';
import { tweetReactionsReducer } from 'src/app/state/tweet-reactions/tweet-reactions.reducer';
import { TweetReactionsEffects } from 'src/app/state/tweet-reactions/tweet-reactions.effects';



const exportComponents = [
  NavigationBarComponent,
  TweetComponent,
  TweetFormComponent,
  UserPinComponent
]

const materialsModules = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [
    ...exportComponents,
    TweetFormComponent,
    UserPinComponent,
    BasicPopupComponent,
  ],
  imports: [
    ...materialsModules,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature("reducer", userReducer),
    StoreModule.forFeature("tweetReactions", tweetReactionsReducer),
    EffectsModule.forFeature([UserEffects, TweetReactionsEffects])
  ],
  exports: [
    ...materialsModules,
    ...exportComponents
  ],
  providers: [
    ...exportComponents,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}}
  ]
})
export class SharedModule { }
