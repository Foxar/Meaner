import { HomeTweet } from "../state/home/home-tweet.model";
import { tweetLikeUnlikeMapper } from "./tweetLikeMapper"

describe('TweetLikeMapper', () => {
    let tweet: HomeTweet;
    beforeEach(() => {
        tweet = {
            content: 'test',
            authorName: 'testname',
            authorId: 'testId',
            id: 'testId',
            date: new Date(),
            likes: 5,
            liked: false,
            replies: 5,
            shares: 5,
            replyToId: null,
        }

    });

    it('should like tweet', () => {
        const likedTweet = tweetLikeUnlikeMapper(tweet);
        expect(likedTweet.liked).toBeTrue();
        expect(likedTweet.likes).toBe(tweet.likes+1);
    });
    it('should unlike tweet', () => {
        tweet.liked = true;
        const likedTweet = tweetLikeUnlikeMapper(tweet);
        expect(likedTweet.liked).toBeFalse();
        expect(likedTweet.likes).toBe(tweet.likes-1);
    });

})