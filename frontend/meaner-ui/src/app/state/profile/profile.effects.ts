import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { AppState } from "../app.state";
import { HomeTweet } from "../home/home-tweet.model";
import { loadProfile, loadProfileBlocked, loadProfileFailure, loadProfileSuccess, loadProfileTweets, loadProfileTweetsFailure, loadProfileTweetsSuccess } from "./profile.actions";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService
  ) {}

  loadProfile$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadProfile),
        switchMap((action) => {
            console.log("PROFILEEE");
            return this.meanerService.getProfile(action.profileId, null).pipe(
                tap(() => console.log("loadProfile effect")),
                map((profileResponse) => {
                    if(profileResponse.blocked)
                        return loadProfileBlocked();
                    else
                    {
                        if(!profileResponse || !profileResponse.user)
                            throw new Error("Profile null");
                        else
                            return loadProfileSuccess({
                                profile: {
                                    ...profileResponse,
                                    userName: profileResponse.user.name
                                }
                            });
                    }
                }),
                catchError((error) => {
                    console.log("CAUGHT ERROR");
                    console.log(error);
                    return of(loadProfileFailure({error: "Failed to load profile."}))
                })
            )
        })
  ));


  loadProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadProfileSuccess),
        map(p => {
            return loadProfileTweets({userId: p.profile.userId});
        })
    ));

  loadProfileTweets$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadProfileTweets),
        switchMap((action) => {
            return this.meanerService.getUserTweets(action.userId).pipe(
                tap(()=>console.log("loadprofiletweets effect")),
                tap(console.log),
                map(tweets => loadProfileTweetsSuccess({tweets: tweets.map((t:HomeTweet)=>{return {...t,replyToId: null}})})),
                catchError((error) => {
                    console.log("CAUGHT ERROR");
                    console.log(error);
                    return of (loadProfileTweetsFailure({error: "Failed to load this profile's tweets."}));
                })
            )
        })
    )
  )

}