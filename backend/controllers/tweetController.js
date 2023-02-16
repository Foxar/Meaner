const { InvalidAuthTokenError, InvalidRequestError } = require('../middleware/errors');
const tweetService = require('../services/tweetService');

const getHomeTweets = async (req,res,next) => {
    const {offset} = req.params;
    const token = req.headers['authorization'];

    try {
        const tweets = await tweetService.fetchHomeTweets(offset,token);
        res.status(200).json(tweets);
    }catch(e){
        next(e);
    }
}

const getTweet = async (req,res,next) => {
    const {id} = req.params;
    const token = req.headers['authorization'];

    try{
        if(!id){
            throw new InvalidRequestError("Missing ID parameter.");
        }
        const tweet = await tweetService.fetchTweet(id,token);
        res.status(200).json(tweet);
    }catch(e){
        next(e);
    }
}

const getUserTweets = async(req,res,next) => {
    const {id} = req.params;
    const token = req.headers['authorization'];

    try {
        if(!id){
            throw new InvalidRequestError("Missing userId parameter.");
        }
        const tweets = await tweetService.fetchUserTweets(id,token);
        res.status(200).json(tweets);
    }catch(e){
        next(e);
    }
}

const getReplies = async(req,res,next) => {
    const {id} = req.params;
    const token = req.headers['authorization'];

    try {
        if(!id){
            throw new InvalidRequestError("Missing tweetId parameter.");
        }
        const replies = await tweetService.fetchReplies(id,token);
        res.status(200).json(replies);
    }catch(e){
        next(e);
    }
}

const postTweet = async (req,res,next) => {
    const tweet  = req.body;
    console.log(tweet);
    try {
        let inserResult= await tweetService.insertTweet(tweet);
        res.status(201).json(inserResult);
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
    const token = req.headers['authorization'];
    try{
        await tweetService.switchTweetLike(id, token)
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