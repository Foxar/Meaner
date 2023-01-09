import { createReducer, on } from "@ngrx/store";
import { addTweet, addTweetFailure, addTweetSuccess, deleteTweet, loadMoreTweetsSuccess, loadTweets, loadTweetsFailure, loadTweetsSuccess, resetHomeState } from "./home.actions";
import { HomeState, HomeStateStatus } from "./home.state";

export const initialState: HomeState = {
    tweets: [],
    error: null,
    status: HomeStateStatus.INIT,
}

export const homeReducer = createReducer(
    initialState,
    on(addTweet, (state: HomeState, { newTweet }) => ({
        ...state,
        status: HomeStateStatus.POSTING,
    })),
    on(addTweetSuccess, (state: HomeState, { newTweet }) => {
        return {
            ...state,
            status: HomeStateStatus.SUCCESS,
            tweets: [newTweet, ...state.tweets]
        }
    }),
    on(addTweetFailure, (state: HomeState, { error }) => ({
        ...state,
        status: HomeStateStatus.ERRORPOSTING,
        error: error
    })),
    on(deleteTweet, (state: HomeState, { tweetId }) => ({
        ...state,
        tweets: state.tweets.filter((t) => t.id != tweetId),
    })),
    
    on(loadTweets, (state: HomeState, {append}) => {
        return ({...state, status: append?HomeStateStatus.LOADING_MORE:HomeStateStatus.LOADING})
    }),
    on(loadTweetsSuccess, (state: HomeState, {tweets}) => {
        console.log("loadtweets succ");
        return ({...state, tweets: tweets, status: HomeStateStatus.SUCCESS, error: null});
    }),
    on(loadMoreTweetsSuccess, (state: HomeState, {tweets}) => {
        console.log("loadmoretweets succ");
        console.log(state.tweets);
        console.log(tweets);
        return ({...state, tweets: [...state.tweets, ...tweets], status: HomeStateStatus.SUCCESS, error: null});
    }),
    on(loadTweetsFailure, (state: HomeState, {error}) => ({...state, status: HomeStateStatus.ERROR, error: error})),
    on(resetHomeState, (state: HomeState) => ({...initialState}))
)