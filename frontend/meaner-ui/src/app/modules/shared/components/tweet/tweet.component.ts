import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { HomeTweet } from 'src/app/state/home/home-tweet.model';
import { likeTweet } from 'src/app/state/tweet-reactions/tweet-reactions.actions';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet!: HomeTweet;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log("tweet oninit");
    console.log(this.tweet);
  }

  like(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.dispatch(likeTweet({tweetId: this.tweet.id}));
  }

}
