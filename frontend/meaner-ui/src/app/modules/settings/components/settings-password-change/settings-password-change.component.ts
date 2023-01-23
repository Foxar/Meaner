import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { confirmPasswordValidator } from "src/app/validators/confirmPasswordValidator";

@Component({
    selector: 'app-settings-password-change',
    templateUrl: './settings-password-change.component.html',
    styleUrls: ['./settings-password-change.component.scss']
})
export class SettingsPasswordChangeComponent {
    constructor(
        private fb: FormBuilder,
    ){}


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
      }
}