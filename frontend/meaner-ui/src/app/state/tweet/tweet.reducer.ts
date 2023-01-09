import { createReducer, on } from "@ngrx/store";
import { HomeTweet } from "../home/home-tweet.model";
import { loadReplies, loadRepliesFailure, loadRepliesSuccess, loadTweet, loadTweetFailure, loadTweetSuccess, postReply, postReplyFailure, postReplySuccess, resetTweetState } from "./tweet.actions";
import { TweetState, TweetStateStatus } from "./tweet.state";

export const initialState: TweetState = {
    tweet: null,
    error: null,
    status: TweetStateStatus.INIT,
    replies: [],
}

export const tweetReducer = createReducer(
    initialState,
    on(loadTweet, (state: TweetState) => ({
        ...state, status: TweetStateStatus.LOADING
    })),
    on(loadTweetSuccess, (state: TweetState, { loadedTweet }) => ({
            ...state,
            status: TweetStateStatus.INIT,
            tweet: loadedTweet,
            error: null,
        })
    ),
    on(loadTweetFailure, (state: TweetState, { error }) => ({
        ...state,
        status: TweetStateStatus.ERROR_LOADING,
        error: error
    })),

    on(loadReplies, (state: TweetState) => ({
        ...state, status: TweetStateStatus.LOADING_REPLIES
    })),
    on(loadRepliesSuccess, (state: TweetState, { tweetReplies }) => ({
        ...state,
        status: TweetStateStatus.INIT,
        replies: tweetReplies
    })),
    on(loadRepliesFailure, (state: TweetState, { error }) => ({
        ...state,
        status: TweetStateStatus.ERROR_LOADING_REPLIES,
        error: error
    })),
    on(postReply, (state: TweetState, { newTweet }) => ({
        ...state,
        status: TweetStateStatus.POSTING
    })),
    on(postReplySuccess, (state: TweetState, { newTweet }) => ({
        ...state,
        tweet: {...state.tweet!,replies: state.tweet!.replies+1}, // The !s are necessary due to spread operator complaining.
        replies: [newTweet, ...state.replies],
        status: TweetStateStatus.INIT
    })),
    on(postReplyFailure, (state: TweetState, { error }) => ({
        ...state,
        status: TweetStateStatus.ERROR_POSTING,
        error: error
    })),
    on(resetTweetState, (state: TweetState) => ({
        ...initialState
    })),
    
)