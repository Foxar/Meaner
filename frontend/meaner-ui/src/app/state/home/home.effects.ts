import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, throwError, withLatestFrom } from "rxjs";
import { MeanerApiService } from "../../services/meanerApi.service";
import { AppState } from "../app.state";
import { selectUser } from "../user/user.selector";
import { addTweet, addTweetFailure, addTweetSuccess, loadMoreTweetsSuccess, loadTweets, loadTweetsFailure, loadTweetsSuccess } from "./home.actions";
import { selectAllHomeTweets } from "./home.selectors";

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService
  ) {}

  loadTweets$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadTweets),
        withLatestFrom(this.store.select(selectAllHomeTweets)),
        switchMap(([action,tweets]) => 
        {
          console.log("tweets length");
          console.log(tweets.length);
          return this.meanerService.getHomeTweets(action.append?tweets.length:0).pipe(
            tap(() => console.log("loadTweets effect")),
            map((tweets) => {
              if(action.append){
                return loadMoreTweetsSuccess({tweets: tweets});
              }else
              return loadTweetsSuccess({tweets: tweets});
            }),
            catchError((error) => {
              console.log("CAUGHT ERORR");
              console.log(error);
              return of(loadTweetsFailure({error: "Something went wrong loading your feed. Please try again later."}));
            })
        )
        }
        )
    )
  );

  addTweet$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addTweet),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action,user]) => {
        if(!user)
          return of(addTweetFailure({error: "Can't post - not logged in."}))
        return this.meanerService.postTweet({...action.newTweet,authorId: user.id})
          .pipe(
            map((newTweet) => addTweetSuccess({newTweet})),
            catchError((error) => {
              console.log("caught error in effects");
              return of(addTweetFailure({error}))
            })
          )
      })
    )
  )
/*
  addTweetSuccess$ = createEffect(() => 
  this.actions$.pipe(
    ofType(addTweetSuccess),
    //map(loadTweets)
  ))
*/
}
