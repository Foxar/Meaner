import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProfileEffects } from "src/app/state/profile/profile.effects";
import { profileReducer } from "src/app/state/profile/profile.reducer";
import { SharedModule } from "../shared/shared.module";
import { SettingsPageComponent } from "./pages/settings-page.component";

const routes: Routes = [
    {
      path: '',
      component: SettingsPageComponent
    }
  ]
  
  
  @NgModule({
    declarations: [
        SettingsPageComponent
    ],
    imports: [
      SharedModule,
      RouterModule.forChild(routes),
      CommonModule,
    ],
    exports: [RouterModule]
  })
  export class SettingsModule { }
  