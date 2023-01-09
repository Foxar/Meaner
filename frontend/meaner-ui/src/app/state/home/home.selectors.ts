import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { HomeState } from "./home.state";

export const selectHomeState = createFeatureSelector<HomeState>("home")
export const selectAllHomeTweets = createSelector(
    selectHomeState,
    (state: HomeState) => state.tweets
);
export const selectHomeStatus = createSelector(
    selectHomeState,
    (state: HomeState) => {
        return state.status;
    }
)

export const selectHomeError = createSelector(
    selectHomeState,
    (state: HomeState) => state.error
)


//DELETE THIS ??
export const selectAppState = createFeatureSelector<AppState>("appReducer")
