import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { login } from "src/app/state/user/user.actions";
import { UserStateStatus } from "src/app/state/user/user.state";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
  })
export class LoginFormComponent implements OnInit {

    @Input() status: UserStateStatus = UserStateStatus.INIT;
    @Input() error: string = '';

    loginControl = new FormControl('', [
        Validators.required
    ]);

    passwordControl = new FormControl('', [
        Validators.required
    ]);
    
    constructor(private store: Store<AppState>){ }
    ngOnInit(): void {
        console.log("Status", this.status);
        console.log("Error", this.error);
    }


    login() {
        if([this.loginControl, this.passwordControl]
            .every(f => {
            console.log(f.value);
            console.log(f.pristine);
            console.log(f.errors);
            !f.pristine && !f.errors
            })
        ){
            console.log("Pristine or errors.");
            return;  
        }
        console.log("Logging in!");
        this.store.dispatch(login({credentials: {
            name: this.loginControl.value!,
            password: this.passwordControl.value!
        }}))
    }

}