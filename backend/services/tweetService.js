const {db_insertTweetToUserLikes, db_findTweet, db_findTweets, db_insertTweet, db_findReplies, db_findUserTweets, db_findProfile, db_findUser, db_removeTweetFromUserLikes} = require('../db/index')
const {JWTSECRET} = require('./authService');
const jwt = require('jwt-simple');
const { InvalidRequestError, ResourceNotFoundError } = require('../middleware/errors');

const TWEET_REQUEST_LIMIT = 10;

const fetchHomeTweets = async(offset, authToken) => {
    try {
        offset = parseInt(offset);
        if(isNaN(offset)){
            throw new InvalidRequestError("Param offset must be an integer.")
        }
        let tweets =  await db_findTweets({replyToId: null}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": -1}, skip: offset});
        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            let currentUser = await db_findUser({name: decodedJwt.login});
            userLikes = currentUser.likedTweets;
        }
        return tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return mapTweetToLikedTweet({
                    ...mappedTweet,
                    id: t._id,
                },
                userLikes)
            
        });
    }catch(e) {
        throw e;
    }
}

const fetchTweet = async(id, authToken) => {
    try {

        let tweetFound = await db_findTweet({_id: id});
        if(!tweetFound){
            throw new ResourceNotFoundError("Tweet not found.");
        }
        let {_id, ...mappedTweet} = tweetFound;
        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            let currentUser = await db_findUser({name: decodedJwt.login});
            userLikes = currentUser.likedTweets;
        }
        let tweet = {
            ...mappedTweet,
            id: _id
        }
        return mapTweetToLikedTweet(tweet,userLikes)
    }catch(e) {
       throw e;
    }
}

const fetchUserTweets = async(id, authToken) => {
    try{

        let tweets = await db_findUserTweets({id: id});
        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            let currentUser = await db_findUser({name: decodedJwt.login});
            userLikes = currentUser.likedTweets;
        }
        
        tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return {
                ...mappedTweet,
                id: t._id
            }
        })

        tweets = tweets.map(t => mapTweetToLikedTweet(t,userLikes));
        return tweets;
    }catch(e){
        throw e;
    }
}

const fetchReplies = async(id, authToken) => {
    try{

        let tweets = await db_findReplies({id: id});
        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            let currentUser = await db_findUser({name: decodedJwt.login});
            userLikes = currentUser.likedTweets;
        }
        
        tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return {
                ...mappedTweet,
                id: t._id
            }
        })

        return tweets.map(t => mapTweetToLikedTweet(t,userLikes))
    }catch(e){
        throw e;
    }
}

const insertTweet = async(tweet) => {
    ['content', 'authorId'].forEach(k => {
        if(tweet[k] == undefined)
        {
            throw new Error("400")
        }
    });
    
    try{
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

const switchTweetLike = async(tweetId, authToken) => {
    console.log("switch tweet like");
    console.log(tweetId);
    console.log(authToken);

    if(authToken == undefined || tweetId == undefined)
    {
        throw new Error("400")
    }

    let userId;
    if(authToken)
    {
        const decodedJwt = jwt.decode(authToken,JWTSECRET)
        console.log(decodedJwt);
        let currentUser = await db_findUser({name: decodedJwt.login});
        console.log(currentUser);
        userId = currentUser._id;
    }
    
    try{
        const user = await db_findUser({_id: userId})
        if(user.likedTweets.map((lt) => lt.toString()).includes(tweetId))
            return await db_removeTweetFromUserLikes(userId, tweetId);
        else
            return await db_insertTweetToUserLikes(userId, tweetId);
    }catch(e){
        console.error(e);
        throw e;
    }


}

const tweetArrayMarkLiked = (tweets) => {
    
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