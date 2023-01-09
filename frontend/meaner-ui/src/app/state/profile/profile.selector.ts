import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.state";

export const selectProfileState = createFeatureSelector<ProfileState>("profile")
export const selectProfile = createSelector(
    selectProfileState,
    (state: ProfileState) => state.profile
)
export const selectProfileError = createSelector(
    selectProfileState,
    (state: ProfileState) => state.error
)
export const selectProfileStatus = createSelector(
    selectProfileState,
    (state: ProfileState) => state.status
)
export const selectProfileTweets = createSelector(
    selectProfileState,
    (state: ProfileState) => state.tweets
)