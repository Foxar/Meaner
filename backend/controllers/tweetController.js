const { InvalidAuthTokenError, InvalidRequestError } = require('../middleware/errors');
const tweetService = require('../services/tweetService');
const authService = require('../services/authService');

const getHomeTweets = async (req,res,next) => {
    const {offset} = req.params;
    try {
        const tweets = await tweetService.fetchHomeTweets(offset,req.userLogin);
        res.status(200).json(tweets);
    }catch(e){
        next(e);
    }
}

const getTweet = async (req,res,next) => {
    const {id} = req.params;

    try{
        if(!id){
            throw new InvalidRequestError("Missing ID parameter.");
        }
        const tweet = await tweetService.fetchTweet(id,req.userLogin);
        res.status(200).json(tweet);
    }catch(e){
        next(e);
    }
}

const getUserTweets = async(req,res,next) => {
    const {id} = req.params;

    try {
        if(!id){
            throw new InvalidRequestError("Missing userId parameter.");
        }
        const tweets = await tweetService.fetchUserTweets(id,req.userLogin);
        res.status(200).json(tweets);
    }catch(e){
        next(e);
    }
}

const getReplies = async(req,res,next) => {
    const {id} = req.params;

    try {
        if(!id){
            throw new InvalidRequestError("Missing tweetId parameter.");
        }
        const replies = await tweetService.fetchReplies(id,req.userLogin);
        res.status(200).json(replies);
    }catch(e){
        next(e);
    }
}

const postTweet = async (req,res,next) => {
    const tweet  = req.body;
    try {
        if(!tweet){
            throw new InvalidRequestError("Missing tweet body.");
        }
        let insertResult= await tweetService.insertTweet(tweet,req.userLogin);
        res.status(201).json(insertResult);
    }catch(e){
        next(e);
    }
}
/* 
const deleteTweet = async(req,res,next) => {
    const { id } = req.params;
    try{
        let deleteRes = await tweetService.deleteTweet(id);
        res.status(200).json(deleteRes);
    }catch(e){
        next(e);
    }
} */

const likeTweet = async(req,res,next) => {
    const {id} = req.params;
    try{
        if(!id){
            throw new InvalidRequestError("Missing tweetId param.");
        }
        await tweetService.switchTweetLike(id, req.userLogin)
        res.status(200).json();
    }catch(e){
        next(e);
    }
}


module.exports = {
    getHomeTweets,
    getTweet,
    getUserTweets,
    postTweet,
    // deleteTweet,
    getReplies,
    likeTweet
}