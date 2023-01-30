import { createReducer, on } from "@ngrx/store";
import { likeTweet, likeTweetFailure, likeTweetSuccess } from "./tweet-reactions.actions";
import { TweetReactionsState, TweetReactionsStatus } from "./tweet-reactions.state";

export const initialState: TweetReactionsState = {
    error: null,
    status: TweetReactionsStatus.INIT,
}

export const tweetReactionsReducer = createReducer(
    initialState,
    on(likeTweet, (state: TweetReactionsState) => ({
        ...state,
        status: TweetReactionsStatus.PENDING
    })),
    on(likeTweetSuccess, (state: TweetReactionsState) => ({
        ...state,
        status: TweetReactionsStatus.INIT
    })),
    on(likeTweetFailure, (state: TweetReactionsState, {error}) => ({
        ...state,
        error: error,
        status: TweetReactionsStatus.ERROR
    })),
)