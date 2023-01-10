const {db_findTweet, db_findTweets, db_insertTweet, db_findReplies, db_findUserTweets, db_findProfile, db_findUser} = require('../db')

const TWEET_REQUEST_LIMIT = 10;

const fetchHomeTweets = async(offset) => {
    try {
        offset = parseInt(offset);
        console.log("ASDF");
        console.log(offset);
        let tweets =  await db_findTweets({replyToId: null}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": 1}, skip: offset});
        console.log(tweets);
        tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return {
                ...mappedTweet,
                id: t._id
            }
        })
        console.log(tweets);
        return tweets;
    }catch(e) {
        throw new Error(e.message);
    }
}

const fetchTweets = async(offset) => {
    try {
        offset = parseInt(offset);
        console.log("ASDF");
        console.log(offset);
        const tweets =  await db_findTweets({}, {limit: TWEET_REQUEST_LIMIT, sort: {"date": 1}, skip: offset});
        console.log(tweets);
        return tweets;
    }catch(e) {
        throw new Error(e.message);
    }
}

const fetchTweet = async(id) => {
    try {
        let query = {_id: id};
        let t = await db_findTweet(query);
        let {_id, ...mappedTweet} = t
        return {
            ...mappedTweet,
            id: t._id
        }
    }catch(e) {
       throw e;
    }
}

const fetchUserTweets = async(id) => {
    try{
        let tweets = await db_findUserTweets({id: id});
        tweets = tweets.map(t=>{
            let {_id, ...mappedTweet} = t
            return {
                ...mappedTweet,
                id: t._id
            }
        })
        return tweets;
    }catch(e){
        throw e;
    }
}

const fetchReplies = async(id) => {
    try{
        return tweet = await db_findReplies({id: id});
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
        return await db_insertTweet(tweet);
    }catch(e) {
        console.error(e);
        throw e;
    }
}

const fetchProfileById = async(id) => {
    if(id == null)
        throw new Error("400")   
        try{
            let prof = await db_findProfile({_id: id})
            prof.id  = prof._id;
            return prof;
        }catch(e){
            throw e;
        }
}

const fetchProfileByUserId = async(userId) => {
    if(userId == null)
        throw new Error("400")   
        try{
            let prof = await db_findProfile({userId: userId})
            prof.id  = prof._id;
            return prof;
        }catch(e){
            throw e;
        }
}

const fetchUserByName = async(userName) => {
    try{
        return await db_findUser({name: userName})
    }catch(e){
        throw e;
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
    fetchProfileById,
    fetchProfileByUserId,
    fetchUserByName,
}