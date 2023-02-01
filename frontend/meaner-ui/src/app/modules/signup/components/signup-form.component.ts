import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { confirmPasswordValidator } from "src/app/validators/confirmPasswordValidator";


@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
  })
export class SignupFormComponent {
    constructor(
        private fb: FormBuilder
    ){}

    signupForm: FormGroup = this.fb.group({
        login: [
            '',
            {
                validators: [
                    Validators.required,
                ]
            }
        ],
        password: [
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
        ],
    },
    { validators: confirmPasswordValidator('password', 'confirmPassword') }
    );

    signup() {
        console.log(this.signupForm.value);
    }

}