import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { AppState } from "src/app/state/app.state";
import { selectUserError, selectUserStatus } from 'src/app/state/user/user.selector';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
  })
  export class LoginPageComponent implements OnInit {
    constructor (private store: Store<AppState>) {}


    loginStatus$ = this.store.select(selectUserStatus).pipe(tap(console.log));
    loginError$ = this.store.select(selectUserError).pipe(tap(console.log));


    ngOnInit(): void {
        
    }

    
  }