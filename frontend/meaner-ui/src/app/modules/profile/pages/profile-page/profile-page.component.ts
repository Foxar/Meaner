import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { loadProfile, resetProfileState } from 'src/app/state/profile/profile.actions';
import { Profile, ProfileDisplayModel } from 'src/app/state/profile/profile.model';
import { selectProfile, selectProfileError, selectProfileStatus, selectProfileTweets } from 'src/app/state/profile/profile.selector';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  profile: ProfileDisplayModel | null = null;
  profileStatus$ = this.store.select(selectProfileStatus);
  profileError$ = this.store.select(selectProfileError);
  profileTweets$ = this.store.select(selectProfileTweets);

  constructor(private store: Store<AppState>, private activatedRouter: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.store.dispatch(resetProfileState());
  }

  ngOnInit(): void {
    console.log("PROFILE PAGE COMP");
    this.activatedRouter.params.pipe(
      tap(console.log),
      tap(p => {
        console.log("params tap");
        if(p['profileId']){
          this.store.dispatch(loadProfile({profileId: p['profileId']}))
        }else
          throw new Error("Missing profileID. Can't load profile.");
      })
    ).subscribe();

    this.store.select(selectProfile).pipe(
      tap(console.log)
    ).subscribe(p=>{
      this.profile = p
    })
  }

}
