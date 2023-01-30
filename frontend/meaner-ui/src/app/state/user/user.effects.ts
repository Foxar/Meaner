import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { STORAGE_JWT } from "src/app/constants/constants";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { AppState } from "../app.state";
import { login, loginFailed, loginSuccess, resetUser, validateJwt, validateJwtFailed } from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService,
    private router: Router
  ) {}
  
  login$ = createEffect(() => 
  this.actions$.pipe(
    ofType(login),
    switchMap((action) => {
        console.log("login effect");
        console.log(action);
        return this.meanerService.postLogin(action.credentials.name, action.credentials.password).pipe(
            tap(() => this.router.navigate(['/'])),
            map((loginResponse) => loginSuccess({loginResponse})),
            catchError((error) => {
                console.log("error in login effects");
                return of (loginFailed({error}))
            })
        )
    })
  ));

  validateJwt$ = createEffect(() =>
  this.actions$.pipe(
    ofType(validateJwt),
    switchMap((action) => {
        console.log("Validate JWT effect");
        return this.meanerService.validateJwt(action.jwt).pipe(
            tap(console.log),
            map((loginResponse) => loginSuccess({loginResponse})),
            catchError((error) => {
                console.log("error in validateJWT effect");
                console.log(error);
                return of (resetUser())
            })
        )
    })
  ))

  resetUser$ = createEffect(() => 
  this.actions$.pipe(
    ofType(resetUser),
    tap(() =>{
      localStorage.removeItem(STORAGE_JWT)
    }),
    switchMap(() => {
      return of({})
    })
    
  ),
  {dispatch: false}
  )
  
}
