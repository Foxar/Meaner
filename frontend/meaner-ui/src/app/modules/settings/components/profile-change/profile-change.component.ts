import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { selectPasswordStatus } from '../../../../state/settings/settings.selector';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.scss']
})
export class ProfileChangeComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
){}

    //Move this from here and password change element to the page, pass through Input. Keep code DRY.
  settingsPageStatus$ = this.store.select(selectPasswordStatus).pipe(
    tap((status) => {
      console.log("Settings password status: " + status);
    })
  );

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
  }
}
