import { createAction, props } from "@ngrx/store";
import { HomeTweet } from "../home/home-tweet.model";
import { Profile, ProfileDisplayModel } from "./profile.model";

export const loadProfile = createAction(
    '[Profile] Load profile',
    props<{userId: string}>()
);

export const loadProfileByUser = createAction(
    '[Profile] Load profile by user',
    props<{userId: string}>()
);

export const loadProfileSuccess = createAction(
    '[Profile] Load profile success',
    props<{profile: ProfileDisplayModel}>()
);

export const loadProfileFailure = createAction(
    '[Profile] Load profile failure',
    props<{error: string}>()
);

export const loadProfileBlocked = createAction('[Profile] Load profile blocked');


export const loadProfileTweets = createAction(
    '[Profile] Load profile tweets',
    props<{userId: string}>()
);

export const loadProfileTweetsSuccess = createAction(
    '[Profile] Load profile tweets success',
    props<{tweets: HomeTweet[]}>()
);

export const loadProfileTweetsFailure = createAction(
    '[Profile] Load profile tweets failure',
    props<{error: string}>()
);

export const profileLikeTweetReactionSuccess = createAction(
    '[Profile] Like tweet success',
    props<{tweetId: string}>()
)

export const resetProfileState = createAction('[Profile] Reset profile state');