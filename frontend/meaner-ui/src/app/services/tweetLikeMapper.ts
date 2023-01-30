import { HomeTweet } from "../state/home/home-tweet.model";

export function tweetLikeUnlikeMapper(t: HomeTweet){
    return {
        ...t,
        likes:( t.liked? t.likes-1 : t.likes+1),
        liked: !t.liked,
    }
}
