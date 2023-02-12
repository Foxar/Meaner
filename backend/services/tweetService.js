const {db_insertTweetToUserLikes, db_findTweet, db_findTweets, db_insertTweet, db_findReplies, db_findUserTweets, db_findProfile, db_findUser, db_removeTweetFromUserLikes} = require('../db/index')
const {JWTSECRET} = require('./authService');
const jwt = require('jwt-simple')

const TWEET_REQUEST_LIMIT = 10;

const fetchHomeTweets = async(offset, authToken) => {
    try {
        console.log("FETCH");
        console.log(authToken);
        let currentUserId;
        let userLikes;
        if(authToken) //This block should be moved to some kind of middleware. Since this project is frontend-focused, this is optional.
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            console.log(decodedJwt);
            let currentUser = await db_findUser({name: decodedJwt.login});
            console.log(currentUser);
            currentUserId = currentUser._id;
            userLikes = currentUser.likedTweets;
        }

        offset = parseInt(offset);
        console.log(currentUserId);
        console.log("ASDF");
        console.log(offset);
        let tweets =  await db_findTweets({replyToId: null}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": -1}, skip: offset});
        console.log(tweets);
        tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return {
                ...mappedTweet,
                id: t._id,
            }
        });

        tweets = tweets.map(t => mapTweetToLikedTweet(t,userLikes));

        console.log(tweets);
        return tweets;
    }catch(e) {
        throw new Error(e.message);
    }
}

const fetchTweets = async(offset, authToken) => {
    try {

        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            console.log(decodedJwt);
            const currentUser = await db_findUser({name: decodedJwt.login});
            console.log(currentUser);
            const currentUserId = currentUser._id;
            userLikes = currentUser.likedTweets;
        }
        

        offset = parseInt(offset);
        console.log("ASDF");
        console.log(offset);
        let tweets =  await db_findTweets({}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": -1}, skip: offset});
        tweets = tweets.map(t => mapTweetToLikedTweet(t,userLikes));
        console.log(tweets);
        return tweets;
    }catch(e) {
        throw new Error(e.message);
    }
}

const fetchTweet = async(id, authToken) => {
    try {

        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            console.log(decodedJwt);
            let currentUser = await db_findUser({name: decodedJwt.login});
            console.log(currentUser);
            const currentUserId = currentUser._id;
            userLikes = currentUser.likedTweets;
        }

        let query = {_id: id};
        let t = await db_findTweet(query);
        let {_id, ...mappedTweet} = t
        let tweet = {
            ...mappedTweet,
            id: t._id
        }
        return mapTweetToLikedTweet(tweet,userLikes)
    }catch(e) {
       throw e;
    }
}

const fetchUserTweets = async(id, authToken) => {
    try{

        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            console.log(decodedJwt);
            let currentUser = await db_findUser({name: decodedJwt.login});
            console.log(currentUser);
            const currentUserId = currentUser._id;
            userLikes = currentUser.likedTweets;
        }


        let tweets = await db_findUserTweets({id: id});
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

        let userLikes;
        if(authToken)
        {
            const decodedJwt = jwt.decode(authToken,JWTSECRET)
            console.log(decodedJwt);
            let currentUser = await db_findUser({name: decodedJwt.login});
            console.log(currentUser);
            const currentUserId = currentUser._id;
            userLikes = currentUser.likedTweets;
        }

        let tweets = await db_findReplies({id: id});
        console.log(tweets);
        
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
    fetchTweets,
    fetchHomeTweets,
    fetchTweet,
    fetchUserTweets,
    insertTweet,
    fetchReplies,
    // deleteTweet,
    switchTweetLike
}