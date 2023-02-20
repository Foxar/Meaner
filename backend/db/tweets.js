const { ObjectId, db } = require("./dbConfig");

const db_findTweets = async (query, options) => {
    
    return await (db.collection("tweets").aggregate([
        { $match: {...query}},
        { $sort: options.sort },
        { $skip: options.skip },
        { $limit: options.limit },
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ])).toArray();
    //return await Promise.all(tweets.map(tweetToTweetWithAuthorUser));
}

const db_findTweet = async(query,options) => {
    
    return (await (db.collection("tweets").aggregate([
        { $match : {_id: {$eq: new ObjectId(query._id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ]))).next()

    //return await (db.collection("tweets").aggregate([{$match: {_id: {$eq: query._id}}}, { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},]))
    //return await tweetToTweetWithAuthorUser(await db.collection("tweets").findOne(query, options));
}

const db_findReplies = async(query,options) => {

    console.log(query);

    return await (db.collection("tweets").aggregate([
        { $match : {replyToId: {$eq: new ObjectId(query.id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ])).toArray();

}

const db_findUserTweets = async(query,options) => {
    return await (db.collection("tweets").aggregate([
        { $match : {authorId: {$eq: new ObjectId(query.id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ])).toArray();
}

const db_insertTweet = async(doc) => {
    try{
        // console.log(doc);
        const author = await db.collection("users").findOne({_id: new ObjectId(doc.authorId)});
        if(!author){
            // console.log(doc.authorId);
            throw new Error("400");
        }
        if(doc.replyToId){
            // console.log(doc.replyToId);
            const parentTweet = await db.collection("tweets").findOne({_id: new ObjectId(doc.replyToId)});
            if(!parentTweet)
            {
                // console.log(doc);
                // console.log(doc.replyToId);
                throw new Error("400");
            }
        }
        doc = {
            ...doc,
            authorId: new ObjectId(doc.authorId),
            likes: 0,
            retweets: 0,
            replies: 0,
            replyToId: doc.replyToId?new ObjectId(doc.replyToId):null,
            date: new Date(),
        }
        await db.collection("tweets").insertOne(doc);
        if(doc.replyToId){
            await db.collection("tweets").updateOne({_id: new ObjectId(doc.replyToId)},{$inc: {replies:1}})
        }
        return doc;
    }catch(e){
        throw e;
    }
}


/* const db_deleteTweet = async(query, options) => {
    query = {
        ...query,
        _id: new ObjectId(query._id),
    }
    const dbDeleteRes = await db.collection("tweets").deleteOne(query);
    if(dbDeleteRes.deletedCount ==0){
        throw new Error(404);
    }
    else{
        return dbDeleteRes;
    }
} */

const db_insertTweetToUserLikes = async(userId, tweetId) => {
    userId = new ObjectId(userId);
    tweetId = new ObjectId(tweetId);

    try {
        await db.collection("users").updateOne({_id: userId}, {$addToSet: { likedTweets: tweetId}});
        await db.collection("tweets").updateOne({_id: tweetId}, {$inc: {likes:1}});
    }catch(e){
        throw e;
    }
}

const db_removeTweetFromUserLikes = async(userId, tweetId) => {
    userId = new ObjectId(userId);
    tweetId = new ObjectId(tweetId);

    try {
        await db.collection("users").updateOne({_id: userId}, {$pull: { likedTweets: tweetId}});
        await db.collection("tweets").updateOne({_id: tweetId}, {$inc: {likes:-1}});
    }catch(e){
        throw e;
    }
}

module.exports = {
    db_findTweet,
    db_findTweets,
    db_findReplies,
    db_findUserTweets,
    db_insertTweet,
    db_insertTweetToUserLikes,
    db_removeTweetFromUserLikes
}