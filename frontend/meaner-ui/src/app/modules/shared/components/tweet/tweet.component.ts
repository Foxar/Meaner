import { Component, Input, OnInit } from '@angular/core';
import { HomeTweet } from 'src/app/state/home/home-tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet!: HomeTweet;

  constructor() { }

  ngOnInit(): void {
    console.log("tweet oninit");
    console.log(this.tweet);
  }

}
