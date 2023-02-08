import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { STORAGE_JWT } from "src/app/constants/constants";
import { BasicPopupComponent, BasicPopupType } from "src/app/modules/shared/components/basic-popup/basic-popup.component";
import { ErrorMessagePipe } from "src/app/pipes/error-message.pipe";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { AppState } from "../app.state";
import { login, loginFailed, loginSuccess, resetUser, signup, signupFailed, signupSuccess, validateJwt, validateJwtFailed } from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private meanerService: MeanerApiService,
    private router: Router,
    private snackbar: MatSnackBar,
    private errorMsgPipe: ErrorMessagePipe,
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


  signup$ = createEffect(() => 
  this.actions$.pipe(
    ofType(signup),
    switchMap((action) => {
      console.log(action);
      return this.meanerService.postSignup(action.credentials).pipe(
        tap(console.log),
        map(() => {
          return signupSuccess({credentials: action.credentials})
        }),
        catchError((error) => {
          console.error(error);
          return of (signupFailed({error: error.error}))  
        })
      );
    })
  ));

  signupSuccess$ = createEffect(() => 
  this.actions$.pipe(
    ofType(signupSuccess),
    switchMap((action) => {
      return of(login(
        {
          credentials: {
            name: action.credentials.login,
            password: action.credentials.password,
      }}))
    })
  ))

  signupFailed$ = createEffect(() => 
  this.actions$.pipe(
    ofType(signupFailed),
    tap((action) => {
      this.snackbar.openFromComponent(BasicPopupComponent, {
        data: {
            type: BasicPopupType.POPUP_FAILURE,
            message: this.errorMsgPipe.transform(action.error)
        }
      })
    })
  ),
  {
    dispatch: false
  })

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
