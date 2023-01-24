import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { MeanerApiService } from "src/app/services/meanerApi.service";
import { selectUser } from "../user/user.selector";
import { changePassword, changePasswordFailure, changePasswordSuccess } from "./settings.action";

@Injectable()
export class SettingsEffects {
    constructor(private actions$: Actions, private store: Store, private meanerService: MeanerApiService){}


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
                        console.log(error.message);
                        return of(changePasswordFailure({error: error.message}))
                    })
                )
            }),
            tap(console.log)
        )
    )
}