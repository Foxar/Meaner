import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.state";

//export const selectUserState = (state: AppState) => state.userState

export const selectUserState = createFeatureSelector<UserState>("user");

export const selectUser = createSelector(
    selectUserState,
    (state: UserState) => state.user
)

export const selectUserStatus = createSelector(
    selectUserState,
    (state: UserState) => state.status
)

export const selectUserError = createSelector(
    selectUserState,
    (state: UserState) => state.error
)