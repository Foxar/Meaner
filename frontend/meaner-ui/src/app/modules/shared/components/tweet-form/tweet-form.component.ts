import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addTweet } from 'src/app/state/home/home.actions';
import { HomeState } from 'src/app/state/home/home.state';
import { postReply } from 'src/app/state/tweet/tweet.actions';

export enum TweetFormStatus {
  INIT = 'INIT',
  POSTING = 'POSTING',
  ERROR = 'ERROR'
}

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent implements OnInit {

  @Input() status: TweetFormStatus = TweetFormStatus.INIT;
  @Input() error: string = '';
  @Input() replyToId: string | null = null;
  tweetContent = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(32),
  ]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.tweetContent.valueChanges.subscribe(v=>{
      console.log(v);
      if(this.tweetContent.errors)
        console.log(this.tweetContent.errors);
        console.log(this.errorToMessage());
    })
  }

  errorToMessage(){
    if(!this.tweetContent.errors || this.tweetContent.pristine)
      return null;
    return Object.entries(this.tweetContent.errors).map(([k,v])=>{
      switch(k){
        case 'minlength':
          return `Needs at least ${v.requiredLength} characters to post.`;
        case 'maxlength':
          return `Needs less than ${v.requiredLength} characters to post.`;
        case 'required':
          return `Tweet cannot be empty.`;
        default:
          return '';
      }
    })
  }

  postTweet() {
    if(this.tweetContent.errors){
      return
    }
    
    const action = this.replyToId == null ? addTweet : postReply;
    
    this.store.dispatch(action({newTweet: {
      content: this.tweetContent.value!,
      authorId: "1",
      replyToId: this.replyToId
    }}))
  }
}
