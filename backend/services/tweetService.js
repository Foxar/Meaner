const {db_insertTweetToUserLikes, db_findTweet, db_findTweets, db_insertTweet, db_findReplies, db_findUserTweets, db_findProfile, db_findUser, db_removeTweetFromUserLikes} = require('../db/index')
const {JWTSECRET} = require('./authService');
const jwt = require('jwt-simple');
const { InvalidRequestError, ResourceNotFoundError } = require('../middleware/errors');

const TWEET_REQUEST_LIMIT = 10;

const fetchHomeTweets = async(offset, userLogin) => {
    try {
        offset = parseInt(offset);
        if(isNaN(offset)){
            throw new InvalidRequestError("Param offset must be an integer.")
        }
        let tweets =  await db_findTweets({replyToId: null}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": -1}, skip: offset});
        return tweetArrayMarkLiked(tweets,userLogin);
    }catch(e) {
        throw e;
    }
}

const fetchTweet = async(id, userLogin) => {
    try {

        let tweetFound = await db_findTweet({_id: id});
        if(!tweetFound){
            throw new ResourceNotFoundError("Tweet not found.");
        }
        
        const finalTweet = await tweetArrayMarkLiked([tweetFound],userLogin);
        return finalTweet.at(0);
    }catch(e) {
       throw e;
    }
}

const fetchUserTweets = async(id, userLogin) => {
    try{

        let tweets = await db_findUserTweets({id: id});
        return tweetArrayMarkLiked(tweets,userLogin);
    }catch(e){
        throw e;
    }
}

const fetchReplies = async(id, userLogin) => {
    try{
        let tweets = await db_findReplies({id: id});
        return tweetArrayMarkLiked(tweets,userLogin);
    }catch(e){
        throw e;
    }
}

const insertTweet = async(tweet, userLogin) => {
    try{
        let currentUser = await db_findUser({name: userLogin});
        if(currentUser._id != tweet.authorId){
            throw new InvalidRequestError("Invalid authorId param, must be the same as currently logged in user.");
        }
        let insertedTweet = await db_insertTweet(tweet);
        let {_id, ...mappedTweet} = insertedTweet
        return {
            ...mappedTweet,
            id: insertedTweet._id
        }
    }catch(e) {
        console.error(e);
        throw e;
    }
}

const switchTweetLike = async(tweetId, userLogin) => {
    try{
        const user = await db_findUser({name: userLogin});
        if(user.likedTweets.map((lt) => lt.toString()).includes(tweetId))
            return await db_removeTweetFromUserLikes(user._id, tweetId);
        else
            return await db_insertTweetToUserLikes(user._id, tweetId);
    }catch(e){
        console.error(e);
        throw e;
    }


}

const tweetArrayMarkLiked = async(tweets,userLogin) => {
    let userLikes = undefined;
    if(userLogin){
        let currentUser = await db_findUser({name: userLogin});
        userLikes = currentUser.likedTweets;
    }
    tweets = tweets.map(t=>{
        let {_id, ...mappedTweet} = t
        mappedTweet = {...mappedTweet, id: t._id};
        if(userLikes){
            mappedTweet = mapTweetToLikedTweet(mappedTweet,userLikes);
        }
        return mappedTweet;
    });
    return tweets;
}

const mapTweetToLikedTweet  = (tweet, userLikes) => {
    return {
        ...tweet,
        liked: userLikes ? userLikes.some(ul => ul.toString() == tweet.id.toString()) : false,
    }   
}

/* 
const deleteTweet = async(id) => {
    try{
        console.log("deleting service");
        return await db_deleteTweet({_id: id});
    }catch(e)
    {
        throw e;
    }
}
 */
module.exports = {
    fetchHomeTweets,
    fetchTweet,
    fetchUserTweets,
    insertTweet,
    fetchReplies,
    // deleteTweet,
    switchTweetLike
}