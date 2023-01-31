import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { AppState } from "src/app/state/app.state";
import { login } from "src/app/state/user/user.actions";
import { selectUserStatus } from "src/app/state/user/user.selector";
import { UserStateStatus } from "src/app/state/user/user.state";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
  })
export class LoginFormComponent implements OnDestroy {
    constructor(
        private store: Store<AppState>,
        private fb: FormBuilder,
        ){ }

    loginForm: FormGroup = this.fb.group({
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
    })


    loginStatus$ = this.store.select(selectUserStatus).pipe(
        tap(console.log),
        tap(status => {
            if(status == UserStateStatus.ERROR){
                this.loginForm.setErrors({'badLogin': true});
            }else {
                this.loginForm.setErrors({'badLogin':false});
            }
        })
    ).subscribe();
    

    login() {
        this.store.dispatch(login({credentials: {
            name: this.loginForm.value.login,
            password: this.loginForm.value.password
        }}))
    }

    ngOnDestroy(): void {
        this.loginStatus$.unsubscribe();
    }

}