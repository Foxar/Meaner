import { HomeTweet } from "../home/home-tweet.model";


export enum TweetStateStatus {
    LOADING = 'LOADING',
    LOADING_REPLIES = 'LOADING_REPLIES',
    INIT = 'INIT',
    ERROR_LOADING_REPLIES = 'ERROR_LOADING_REPLIES',
    ERROR_LOADING = 'ERROR_LOADING',
    ERROR_POSTING = 'ERROR_POSTING',
    SUCCESS_POSTING = 'SUCCESS_POSTING',
    POSTING = 'POSTING',
}

export interface TweetState {
    tweet: HomeTweet | null;
    replies: HomeTweet[];
    error: string | null;
    status: TweetStateStatus;
}