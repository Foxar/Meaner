export enum TweetReactionsStatus {
    INIT = 'INIT',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
}

export interface TweetReactionsState {
    status: TweetReactionsStatus;
    error: string | null;
}