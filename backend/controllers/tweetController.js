const tweetService = require('../services/tweetService');

const getHomeTweets = async (req,res,next) => {
    const {offset} = req.params;

    console.log("Get all tweets");

    try {
        const tweets = await tweetService.fetchHomeTweets(offset);
        res.status(200).json(tweets);
    }catch(e){
        res.sendStatus(500);
        next(e);
    }
}

const getAllTweets = async (req,res,next) => {
    const {offset} = req.params;

    console.log("Get all tweets");

    try {
        const tweets = await tweetService.fetchTweets(offset);
        res.status(200).json(tweets);
    }catch(e){
        res.sendStatus(500);
        next(e);
    }
}

const getTweet = async (req,res,next) => {
    const {id} = req.params;

    try{
        const tweet = await tweetService.fetchTweet(id);
        if(tweet == null)
            throw new Error("No tweet found");
        else
            res.status(200).json(tweet);
    }catch(e){
        //res.status(e.statusCode).json({error: e.message});
        next(e);
    }
}

const getUserTweets = async(req,res,next) => {
    const {id} = req.params;

    try {
        const tweets = await tweetService.fetchUserTweets(id);
        if(tweets == null || tweets.length == 0)
            res.sendStatus(404);
        else
            res.status(200).json(tweets);
    }catch(e){
        next(e);
    }
}

const getReplies = async(req,res,next) => {
    const {id} = req.params;

    try {
        const replies = await tweetService.fetchReplies(id);
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

const getProfileById = async (req,res,next) => {
    const {id} = req.params;

    try{
        const profile = await tweetService.fetchProfileById(id);
        if(profile == null)
            throw new Error("No profile found");
        else
            res.status(200).json(profile);
    }catch(e){
        //res.status(e.statusCode).json({error: e.message});
        next(e);
    }
}

const getProfileByUserId = async (req,res,next) => {
    const {id} = req.params;

    try{
        const profile = await tweetService.fetchProfileByUserId(id);
        if(profile == null)
            throw new Error("No profile found");
        else
            res.status(200).json(profile);
    }catch(e){
        //res.status(e.statusCode).json({error: e.message});
        next(e);
    }
}


module.exports = {
    getAllTweets,
    getHomeTweets,
    getTweet,
    getUserTweets,
    postTweet,
    // deleteTweet,
    getReplies,
    getProfileById,
    getProfileByUserId
}