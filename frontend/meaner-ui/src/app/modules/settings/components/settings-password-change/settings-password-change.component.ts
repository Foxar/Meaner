import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { AppState } from "src/app/state/app.state";
import { changePassword } from "src/app/state/settings/settings.action";
import { selectPasswordError, selectPasswordStatus } from "src/app/state/settings/settings.selector";
import { confirmPasswordValidator } from "src/app/validators/confirmPasswordValidator";

@Component({
    selector: 'app-settings-password-change',
    templateUrl: './settings-password-change.component.html',
    styleUrls: ['./settings-password-change.component.scss']
})
export class SettingsPasswordChangeComponent implements OnDestroy {
    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
    ){}

    settingsPageStatus$ = this.store.select(selectPasswordStatus).pipe(
      tap((status) => {
        console.log("Settings password status: " + status);
      })
    );

    settingsPageError$ = this.store.select(selectPasswordError).pipe(
      tap((error) => {
        console.log("Settings password error: " + error);
        if(error && error == 'Invalid password'){
          this.changePasswordForm.controls["currentPassword"].setErrors({'invalid': true});
          this.changeDetectorRef.detectChanges();
        }
      })
    ).subscribe();


    changePasswordForm: FormGroup = this.fb.group({
        currentPassword: [
          '',
          {
            validators: [
              Validators.required,
            ]
          }
        ],
        newPassword: [
          '',
          {
            validators: [
              Validators.required,
            ]
          }
        ],
        confirmPassword: [
          '',
          {
            validators: [
              Validators.required,
            ]
          }
        ]
      },
      { validators: confirmPasswordValidator('newPassword', 'confirmPassword') }
      );

      onSave(): void {
        this.changePasswordForm.markAllAsTouched();
        this.changePasswordForm.updateValueAndValidity();


        if(this.changePasswordForm.valid){
          this.store.dispatch(changePassword({
            newPassword: this.changePasswordForm.value["newPassword"],
            oldPassword: this.changePasswordForm.value["currentPassword"]
          }))
        }
      }

      ngOnDestroy(): void {
        this.settingsPageError$.unsubscribe();
      }
}