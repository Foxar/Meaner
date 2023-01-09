import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TweetEffects } from "src/app/state/tweet/tweet.effects";
import { tweetReducer } from "src/app/state/tweet/tweet.reducer";
import { SharedModule } from "../shared/shared.module";
import { TweetPageComponent } from "./tweet-page.component";

const routes: Routes = [
    {
        path: '',
        component: TweetPageComponent
    }
]

@NgModule({
    declarations: [TweetPageComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        StoreModule.forFeature("tweet", tweetReducer),
        EffectsModule.forFeature([TweetEffects])
    ],
    exports: [RouterModule],
})
export class TweetModule { }