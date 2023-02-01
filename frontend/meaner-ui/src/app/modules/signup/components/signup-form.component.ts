import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { signup } from "src/app/state/user/user.actions";
import { confirmPasswordValidator } from "src/app/validators/confirmPasswordValidator";


@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
  })
export class SignupFormComponent {
    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>
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
        this.store.dispatch(signup({credentials: this.signupForm.value}))
    }

}