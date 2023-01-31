import { HomeTweet } from "../state/home/home-tweet.model";

export function tweetStringDateMapper(tweet: HomeTweet) {
    return {
        ...tweet,
        date: new Date(tweet.date)
    }
}