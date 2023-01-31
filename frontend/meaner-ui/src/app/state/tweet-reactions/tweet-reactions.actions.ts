import { createAction, props } from "@ngrx/store"

export const  likeTweet = createAction(
    '[Tweet Reactions] Like tweet',
    props<{tweetId: string}>()
)

export const  likeTweetFailure = createAction(
    '[Tweet Reactions] Like tweet failure',
    props<{error: string}>()
)

export const  likeTweetSuccess = createAction(
    '[Tweet Reactions] Like tweet success',
    props<{tweetId: string}>()
    )

