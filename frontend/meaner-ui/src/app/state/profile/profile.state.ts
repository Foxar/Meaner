import { HomeTweet } from "../home/home-tweet.model";
import { Profile, ProfileDisplayModel } from "./profile.model";

export enum ProfileStateStatus {
    LOADING_PROFILE = 'LOADING_PROFILE',
    LOADING_TWEETS = 'LOADING_TWEETS',
    LOADED = 'LOADED',
    ERROR_PROFILE = 'ERROR_PROFILE',
    ERROR_TWEETS = 'ERROR_TWEETS',
    BLOCKED = 'BLOCKED'

}

export interface ProfileState {
    profile: ProfileDisplayModel | null;
    error: string | null;
    status: ProfileStateStatus;
    tweets: HomeTweet[];

}