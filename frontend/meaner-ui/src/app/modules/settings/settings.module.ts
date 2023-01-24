import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProfileEffects } from "src/app/state/profile/profile.effects";
import { profileReducer } from "src/app/state/profile/profile.reducer";
import { SettingsEffects } from "src/app/state/settings/settings.effects";
import { settingsReducer } from "src/app/state/settings/settings.reducer";
import { SharedModule } from "../shared/shared.module";
import { SettingsPasswordChangeComponent } from "./components/settings-password-change/settings-password-change.component";
import { SettingsPageComponent } from "./pages/settings-page.component";

const routes: Routes = [
    {
      path: '',
      component: SettingsPageComponent,
      children: [
        {
          path: 'password',
          component: SettingsPasswordChangeComponent,
        }
      ]
    }
  ]
  
  
  @NgModule({
    declarations: [
        SettingsPageComponent,
        SettingsPasswordChangeComponent
    ],
    imports: [
      ReactiveFormsModule,
      SharedModule,
      RouterModule.forChild(routes),
      CommonModule,
      StoreModule.forFeature("settings",settingsReducer),
      EffectsModule.forFeature([SettingsEffects])
    ],
    exports: [RouterModule]
  })
  export class SettingsModule { }
  