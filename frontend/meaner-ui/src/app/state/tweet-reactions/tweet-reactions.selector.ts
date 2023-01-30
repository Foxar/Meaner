import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TweetReactionsState } from "./tweet-reactions.state";

export const selectTweetReactionsState = createFeatureSelector<TweetReactionsState>("tweetReactions")

export const selectTweetReactionsError = createSelector(
    selectTweetReactionsState,
    (state: TweetReactionsState) => state.error
)

export const selectTweetReactionsStatus = createSelector(
    selectTweetReactionsState,
    (state: TweetReactionsState) => state.status
)