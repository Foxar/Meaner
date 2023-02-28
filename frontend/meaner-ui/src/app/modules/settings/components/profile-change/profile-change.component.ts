import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { MeanerApiService } from '../../../../services/meanerApi.service';
import { AppState } from '../../../../state/app.state';
import { changeDescription } from '../../../../state/settings/settings.action';
import { selectPasswordStatus } from '../../../../state/settings/settings.selector';
import { selectUser } from '../../../../state/user/user.selector';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.scss']
})
export class ProfileChangeComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private meanerApi: MeanerApiService,
){}

    //Move this from here and password change element to the page, pass through Input. Keep code DRY.
  settingsPageStatus$ = this.store.select(selectPasswordStatus).pipe(
    tap((status) => {
      console.log("Settings password status: " + status);
    })
  );

  currentProfileDesc$ = this.store.select(selectUser).pipe(
    tap((user) => {
      console.log(user);

    }),
    switchMap((user) => {
      return user ? this.meanerApi.getProfileByUserId(user.id) : of();
    })
  ).subscribe(profileResponse => {
    if(this.changeProfileForm.pristine)
       this.changeProfileForm.controls['description'].setValue(profileResponse.description);
  })

  changeProfileForm: FormGroup = this.fb.group({
    description: [
      '',
      {
        validators: [
          Validators.required,
        ]
      }
    ]
  })

  onSave(): void {
    this.changeProfileForm.markAllAsTouched();
    if(this.changeProfileForm.valid){
      this.store.dispatch(changeDescription({description: this.changeProfileForm.controls['description'].value}));
    }
  }

  ngOnDestroy(): void {
    this.currentProfileDesc$.unsubscribe();
  }
}
