import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TweetState } from "./tweet.state";

export const selectTweetState = createFeatureSelector<TweetState>("tweet")
export const selectTweet = createSelector(
    selectTweetState,
    (state: TweetState) => state.tweet
);
export const selectTweetStatus = createSelector(
    selectTweetState,
    (state: TweetState) => state.status
);
export const selectTweetReplies = createSelector(
    selectTweetState,
    (state: TweetState) => state.replies
);
export const selectTweetError = createSelector(
    selectTweetState,
    (state: TweetState) => state.error
);