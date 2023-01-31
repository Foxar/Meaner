import { createAction, props } from "@ngrx/store";
import { PostTweet } from "src/app/modules/shared/models/tweetModels";
import { HomeTweet } from "../home/home-tweet.model";

//LOADING PARENT TWEET

export const loadTweet = createAction(
    '[Tweet] Load tweet',
    props<{tweetId: string}>()
);

export const loadTweetFailure = createAction(
    '[Tweet] Load tweet failure',
    props<{error: string}>()
);

export const loadTweetSuccess = createAction(
    '[Tweet] Load tweet success',
    props<{loadedTweet: HomeTweet}>()
);

//LOADING REPLIES

export const loadReplies = createAction(
    '[Tweet] Load replies',
     props<{tweetId: string}>()
);

export const loadRepliesSuccess = createAction(
    '[Tweet] Load replies success',
    props<{tweetReplies: HomeTweet[]}>()
);

export const loadRepliesFailure = createAction(
    '[Tweet] Load replies failure',
    props<{error: string}>()
);

//POSTING REPLIES

export const postReply = createAction(
    '[Tweet] Post reply',
    props<{newTweet: PostTweet}>()
)

export const postReplySuccess = createAction(
    '[Tweet] Post reply success',
    props<{newTweet: HomeTweet}>()
)

export const postReplyFailure = createAction(
    '[Tweet] Post reply failure',
    props<{error: string}>()
)

export const tweetLikeTweetReactionSuccess = createAction(
    '[Tweet] Like tweet success',
    props<{tweetId: string}>()
)

//RESET TWEET STATE 
export const resetTweetState = createAction('[Tweet] Reset tweet state')