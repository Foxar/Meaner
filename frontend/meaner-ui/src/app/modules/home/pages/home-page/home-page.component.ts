import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { TweetFormStatus } from 'src/app/modules/shared/components/tweet-form/tweet-form.component';
import { AppState } from 'src/app/state/app.state';
import { loadTweets, resetHomeState } from 'src/app/state/home/home.actions';
import { selectAllHomeTweets, selectHomeError, selectHomeState, selectHomeStatus } from 'src/app/state/home/home.selectors';
import { HomeStateStatus } from 'src/app/state/home/home.state';
import { selectUserState, selectUser, selectUserStatus } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  appContainerEl: any;

  tweetStatus: TweetFormStatus = TweetFormStatus.INIT;
  homeStatus: HomeStateStatus = HomeStateStatus.INIT

  public homeTweets$ = this.store.select(selectAllHomeTweets).pipe(tap(console.log));
  
  //public homeState$ = this.store.select(selectHomeState).pipe(tap(console.log));
  public homeError$ = this.store.select(selectHomeError).pipe(tap(console.log));
  public userStatus$ = this.store.select(selectUserStatus).pipe(tap(console.log));

  ngOnInit(): void {
    this.store.dispatch(loadTweets({append:false}));


    this.store.select(selectHomeStatus).pipe(
      tap(console.log),
      tap((homeStatus) => {
        if(homeStatus == HomeStateStatus.ERRORPOSTING){
          this.tweetStatus = TweetFormStatus.ERROR
        }else if(homeStatus == HomeStateStatus.POSTING){
          this.tweetStatus = TweetFormStatus.POSTING
        }else {
          this.tweetStatus = TweetFormStatus.INIT
        }
  
        console.log("TWEET STATUS: " + this.tweetStatus);
      })
    ).subscribe(homeStatus => {
      this.homeStatus = homeStatus;
    });


    //TESTING DELETE LATER
    this.store.select(selectUserState).pipe(tap(()=>console.log("USER STATE SELECTOR")),tap(console.log)).subscribe(s=>{
      console.log(s);
    })

    this.store.select(selectUser).pipe(tap(()=>{console.log("USER SELECTOR")}),tap(console.log)).subscribe(u=>{
      console.log(u);
    });

    this.store.select(selectUserStatus).pipe(tap(()=>{console.log("USER STATUS SELECTOR")}),tap(console.log)).subscribe(u=>{
      console.log(u);
    })
    this.appContainerEl = document.querySelector(".appContainer");
    this.appContainerEl.addEventListener("scroll", this.onScroll.bind(this))
  }

  onScroll(event: Event){
    const percentScroll = this.appContainerEl.scrollHeight / (document.body.scrollHeight - window.innerHeight);
    if(percentScroll > 0.8 && (this.homeStatus) != HomeStateStatus.LOADING_MORE)
      this.store.dispatch(loadTweets({append:true}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetHomeState());
  }

}
