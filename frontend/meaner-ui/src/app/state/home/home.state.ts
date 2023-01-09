import { HomeTweet } from "./home-tweet.model";

export enum HomeStateStatus {
    LOADING = 'LOADING',
    LOADING_MORE = 'LOADING_MORE',
    INIT = 'INIT',
    ERROR = 'ERROR',
    ERRORPOSTING = 'ERRORPOSTING',
    SUCCESS = 'SUCCESS',
    POSTING = 'POSTING',
}

export interface HomeState {
    tweets: HomeTweet[];
    error: string | null;
    status: HomeStateStatus;
}