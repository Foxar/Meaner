import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { HomeTweet } from 'src/app/state/home/home-tweet.model';
import { loadTweets } from 'src/app/state/home/home.actions';
import { selectAllHomeTweets, selectHomeError, selectHomeState, selectHomeStatus } from 'src/app/state/home/home.selectors';
import { loadReplies, loadTweet, resetTweetState } from 'src/app/state/tweet/tweet.actions';
import { selectTweet, selectTweetError, selectTweetReplies, selectTweetState, selectTweetStatus } from 'src/app/state/tweet/tweet.selector';
import { TweetStateStatus } from 'src/app/state/tweet/tweet.state';
import { TweetFormStatus } from '../shared/components/tweet-form/tweet-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.scss']
})
export class TweetPageComponent implements OnInit {

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) { }

  private paramSub!: Subscription;
  tweetId!: string;

  public tweet: HomeTweet | null = null;
  public replies: HomeTweet[] | null = null;

  postReplyStatus: TweetFormStatus = TweetFormStatus.INIT;

  public tweetPageStatus$ = this.store.select(selectTweetStatus).pipe(
    tap(console.log),
    tap((tweetState) => {
      if(tweetState == TweetStateStatus.ERROR_POSTING){
        this.postReplyStatus = TweetFormStatus.ERROR
      }else if(tweetState == TweetStateStatus.POSTING){
        this.postReplyStatus = TweetFormStatus.POSTING
      }else {
        this.postReplyStatus = TweetFormStatus.INIT
      }
    })
    );


  ngOnInit(): void {

    console.log("TWEET PAGE ONINIT");
    this.store.select(selectTweet).pipe(tap(console.log)).subscribe(t=>{
      console.log(t);
      if(t != null){
        console.log("dispatching replies")
        if(this.tweet == null)
          this.store.dispatch(loadReplies({tweetId: t.id})) //If it's new tweet load, get replies. If it's data update (ex. replies+1), dont'.   
        this.tweet = t;
      }
    });


    this.store.select(selectTweetReplies).pipe(tap(console.log)).subscribe(tr=>{
        if(tr.length != 0)
            this.replies = tr
          console.log("REPLIES");
          console.log(this.replies);
    })

    this.paramSub = this.activatedRoute.params.subscribe(p => {
        this.tweetId = p['id'];
        this.store.dispatch(loadTweet({tweetId: this.tweetId}));
    })


  }

  ngOnDestroy(){
    this.store.dispatch(resetTweetState());
    this.paramSub.unsubscribe();
  }

}
