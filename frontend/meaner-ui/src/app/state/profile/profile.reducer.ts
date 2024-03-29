import { createReducer, on } from "@ngrx/store";
import { tweetLikeUnlikeMapper } from "src/app/services/tweetLikeMapper";
import { loadProfile, loadProfileBlocked, loadProfileFailure, loadProfileSuccess, loadProfileTweets, loadProfileTweetsFailure, loadProfileTweetsSuccess, profileLikeTweetReactionSuccess, resetProfileState } from "./profile.actions";
import { ProfileState, ProfileStateStatus } from "./profile.state";

export const initialState: ProfileState  ={
    profile: null,
    error: null,
    status: ProfileStateStatus.LOADING_PROFILE,
    tweets: []
}

export const profileReducer = createReducer(
    initialState,
    on(loadProfile, (state: ProfileState, {userId}) => ({
        ...state,
        status: ProfileStateStatus.LOADING_PROFILE,
    })),
    on(loadProfileSuccess, (state: ProfileState, {profile}) => ({
        ...state,
        profile: profile,
        status: ProfileStateStatus.LOADING_TWEETS,
    })),
    on(loadProfileFailure, (state: ProfileState, {error}) => ({
        ...state,
        error: error,
        status: ProfileStateStatus.ERROR_PROFILE,
    })),
    on(loadProfileBlocked, (state: ProfileState) => ({
        ...state,
        status: ProfileStateStatus.BLOCKED,
    })),
    on(loadProfileTweets, (state: ProfileState, {userId}) => ({
        ...state,
        status: ProfileStateStatus.LOADING_TWEETS,
    })),
    on(loadProfileTweetsSuccess, (state: ProfileState, {tweets}) => ({
        ...state,
        tweets: [...state.tweets, ...tweets],
        status: ProfileStateStatus.LOADED,
    })),
    on(loadProfileTweetsFailure, (state: ProfileState, {error}) => ({
        ...state,
        error: error,
        status: ProfileStateStatus.ERROR_TWEETS,
    })),
    on(resetProfileState, (state: ProfileState) => (initialState)),
    on(profileLikeTweetReactionSuccess, (state: ProfileState, {tweetId}) => {
        let mappedTweets = state.tweets.map(t => {
            if(t.id == tweetId){
                return tweetLikeUnlikeMapper(t);
            }else {
                return {...t}
            }
        })
        return ({
            ...state,
            tweets: [
                ...mappedTweets,
            ]
        })
        
    } )
)