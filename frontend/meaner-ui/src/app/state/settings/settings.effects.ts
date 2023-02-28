import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { BasicPopupComponent, BasicPopupType } from "src/app/modules/shared/components/basic-popup/basic-popup.component";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { selectUser } from "../user/user.selector";
import { changeDescription, changeDescriptionFailure, changeDescriptionSuccess, changePassword, changePasswordFailure, changePasswordSuccess } from "./settings.action";

@Injectable()
export class SettingsEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private meanerService: MeanerApiService,
        private snackbar: MatSnackBar,
    ){}


    changePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changePassword),
            withLatestFrom(this.store.select(selectUser)),
            switchMap(([action, user]) => {
                console.log("Change password action effect");
                if(!user)
                    return of(changePasswordFailure({error: "Error changing password, is the user logged in?"}))
                return this.meanerService.postPasswordChange(user.id, action.newPassword, action.oldPassword).pipe(
                    tap(console.log),
                    tap(() => {console.log(`Changing ${user.id} password to ${action.newPassword}`)}),
                    map(() => {
                        return changePasswordSuccess();
                    }),
                    catchError((error) => {
                        console.log(error);
                        let errorMessage;
                        if(error.status == 401){
                            errorMessage = 'Invalid password'
                        }else {
                            errorMessage = error.message;
                        }
                        return of(changePasswordFailure({error: errorMessage}))
                    })
                )
            }),
            tap(console.log)
        )
    )

    changePasswordSuccess$ = createEffect(() => 
            this.actions$.pipe(
                ofType(changePasswordSuccess),
                tap(() => {
                    this.snackbar.openFromComponent(BasicPopupComponent, {
                        data: {
                            type: BasicPopupType.POPUP_SUCCESS,
                            message: 'Success!'
                        }
                    })
                })
            ),
            {
                dispatch: false
            }
    )

    changePasswordFailure$ = createEffect(() => 
            this.actions$.pipe(
                ofType(changePasswordFailure),
                tap(() => {
                    this.snackbar.openFromComponent(BasicPopupComponent, {
                        data: {
                            type: BasicPopupType.POPUP_FAILURE,
                            message: 'Failed to change password. Please try again later.'
                        }
                    })
                })
            ),
            {
                dispatch: false
            }
    )

    changeDescription$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeDescription),
            withLatestFrom(this.store.select(selectUser)),
            switchMap(([action, user]) => {
                console.log("Change password action effect");
                if(!user)
                    return of(changeDescriptionFailure({error: "Error changing password, is the user logged in?"}))
                return this.meanerService.postDescriptionChange(user.id, action.description).pipe(
                    tap(console.log),
                    tap(() => {console.log(`Changing ${user.id} profile description to ${action.description}`)}),
                    map(() => {
                        return changeDescriptionSuccess();
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(changeDescriptionFailure({error: error.message}))
                    })
                )
            }),
            tap(console.log)
        )
    )

    changeDescriptionSuccess$ = createEffect(() => 
            this.actions$.pipe(
                ofType(changeDescriptionSuccess),
                tap(() => {
                    this.snackbar.openFromComponent(BasicPopupComponent, {
                        data: {
                            type: BasicPopupType.POPUP_SUCCESS,
                            message: 'Success!'
                        }
                    })
                })
            ),
            {
                dispatch: false
            }
    )

    changeDescriptionFailure$ = createEffect(() => 
            this.actions$.pipe(
                ofType(changeDescriptionFailure),
                tap(() => {
                    this.snackbar.openFromComponent(BasicPopupComponent, {
                        data: {
                            type: BasicPopupType.POPUP_FAILURE,
                            message: 'Failed to change description. Please try again later.'
                        }
                    })
                })
            ),
            {
                dispatch: false
            }
    )
}