import { createAction, props } from "@ngrx/store";

export const changePassword = createAction(
    '[Settings] Change password',
    props<{newPassword: string, oldPassword: string}>()
)

export const changePasswordSuccess = createAction('[Settings] Change password success')

export const changePasswordFailure = createAction(
    '[Settings] Change password failure',
    props<{error: string}>()
)

