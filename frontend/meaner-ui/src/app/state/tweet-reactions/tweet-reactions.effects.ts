import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { BasicPopupComponent, BasicPopupType } from "src/app/modules/shared/components/basic-popup/basic-popup.component";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { AppState } from "../app.state";
import { homeLikeTweetReactionSuccess } from "../home/home.actions";
import { profileLikeTweetReactionSuccess } from "../profile/profile.actions";
import { tweetLikeTweetReactionSuccess } from "../tweet/tweet.actions";
import { likeTweet, likeTweetFailure, likeTweetSuccess } from "./tweet-reactions.actions";

@Injectable()
export class TweetReactionsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  likeTweet$ = createEffect(() => 
    this.actions$.pipe(
        ofType(likeTweet),
        switchMap((action) => {
            return this.meanerService.likeTweet(action.tweetId).pipe(
                tap(() => {console.log("y")}),
                map(() => {
                    console.log("liketweet return");
                    return likeTweetSuccess({tweetId: action.tweetId})
                }),
                catchError((error) => {
                    console.log(error);
                    return of(likeTweetFailure({error}))
                })
            )
        })
    ));

    likeTweetSuccess$ = createEffect(() => 
    this.actions$.pipe(
        ofType(likeTweetSuccess),
        map((action) => {
            if(this.router.url.split('/').at(1) ==  'tweet'){
                return tweetLikeTweetReactionSuccess({tweetId: action.tweetId})
                console.log("TweetState like");
            }else if(this.router.url.split('/').at(1) ==  'profile'){
                return profileLikeTweetReactionSuccess({tweetId: action.tweetId})
                console.log("ProfileState like");
            }else{
                return homeLikeTweetReactionSuccess({tweetId: action.tweetId})
                console.log("HomeState like");
            }
        })
    ))

    likeTweetFailure = createEffect(() => 
    this.actions$.pipe(
        ofType(likeTweetFailure),
        tap((action) => {
            console.error(action.error);
            this.snackbar.openFromComponent(BasicPopupComponent, {
                data: {
                    type: BasicPopupType.POPUP_FAILURE,
                    message: 'Something went wrong. Please try again later.'
                }
            })
        })
    ),
    {
        dispatch: false
    })
}