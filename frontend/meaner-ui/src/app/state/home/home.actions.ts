import { createAction, props } from "@ngrx/store";
import { PostTweet } from "src/app/modules/shared/models/tweetModels";
import { HomeTweet } from "./home-tweet.model";

export const addTweet = createAction(
    '[Home] Add tweet',
    props<{newTweet: PostTweet}>()
);

export const addTweetSuccess = createAction(
    '[Home] Add tweet success',
    props<{newTweet: HomeTweet}>());

export const addTweetFailure = createAction(
    '[Home] Add tweet failure',
    props<{error: string}>()
);

export const deleteTweet = createAction(
    '[Home] Delete tweet',
    props<{tweetId: string}>()
);

export const loadTweets = createAction(
    '[Home] Load tweets',
    props<{append: boolean}>()
);

export const loadTweetsSuccess = createAction(
    '[Home] Load tweets success',
    props<{tweets: HomeTweet[]}>()
);

export const loadMoreTweetsSuccess = createAction(
    '[Home] Load more tweets success',
    props<{tweets: HomeTweet[]}>()
);

export const loadTweetsFailure = createAction(
    '[Home] Load tweets failure',
    props<{error: string}>()
);

export const resetHomeState = createAction('[Home] Reset home state');


