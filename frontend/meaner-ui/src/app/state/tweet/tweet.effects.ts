import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, tap, map, catchError, of, withLatestFrom } from "rxjs";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { AppState } from "../app.state";
import { selectUser } from "../user/user.selector";
import { loadTweet, loadTweetSuccess, loadTweetFailure, loadReplies, loadRepliesSuccess, loadRepliesFailure, postReplySuccess, postReplyFailure, postReply } from "./tweet.actions";


@Injectable()
export class TweetEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService
  ) {}

  loadTweet$ = createEffect(() => 
  this.actions$.pipe(
      ofType(loadTweet), 
      switchMap((action) => this.meanerService.getTweet(action.tweetId).pipe(
              map((tweet) => {
                return loadTweetSuccess({loadedTweet: tweet})
              }),
              catchError((error) => of(loadTweetFailure({error})))
          )
      )
  ));


  loadReplies$ = createEffect(() => 
  this.actions$.pipe(
      ofType(loadReplies),
      switchMap((action) => this.meanerService.getReplies(action.tweetId).pipe(
              map((replies) => {
                return loadRepliesSuccess({tweetReplies: replies})
              }),
              catchError((error) => of(loadRepliesFailure({error})))
          )
      )
  ));

  postReply$ = createEffect(() =>
  this.actions$.pipe(
    ofType(postReply),
    withLatestFrom(this.store.select(selectUser)),
    switchMap(([action,user]) => {
      if(!user)
        return of(postReplyFailure({error: "Can't post reply - not logged in."}))
      return this.meanerService.postTweet({...action.newTweet, authorId: user.id}).pipe(
        map((newTweet) => postReplySuccess({newTweet})),
        catchError((error) => {
            return of (postReplyFailure({error}))
        })
      )
    })
  ))
  
}