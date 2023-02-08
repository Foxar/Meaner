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
                    Validators.minLength(8),
                    Validators.maxLength(32),
                ]
            }
        ],
        password: [
            '',
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(32),
              Validators.pattern('(?=.*[A-Za-z])(?=.*\\d).*')
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
        console.log(this.signupForm.controls['password'].errors);
        if(this.signupForm.valid)
          this.store.dispatch(signup({credentials: this.signupForm.value}))
        else
          this.signupForm.markAllAsTouched();
    }

    getError(controlName: string) {
      const errors = this.signupForm.controls[controlName].errors;
      if(errors == null)
        return [];
      return Object.keys(errors).map(err => {
        switch(err){
          case 'pattern':
            return 'Must have at least one letter and one number.';
            break;
          case 'minlength':
          case 'maxlength':
            return 'Must be between 8 and 32 characters long.';
            break;
          case 'required':
            return 'Required.';
            break;
          default: 
            return '';
        }
      }).shift();
    }

}