const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcrypt');
//const ObjectId = require('mongodb').ObjectId;


const connectionString = `mongodb://localhost:27017/`
const mongoClient = new MongoClient(connectionString);
let db = mongoClient.db('meaner')

const saltRounds = 10;


const db_generateMock = async (mockDb) => {
    await db.collection("users").remove({});
    await db.collection("tweets").remove({});
    await db.collection("profiles").remove({});

    await Promise.all(mockDb.users.map(async u => {
        // console.log("Inserting user:");
        // console.log(u);
        // console.log(u._id);
        return await db_insertUser(u);
    }))

    //PARENT TWEETS FIRST

    await Promise.all(mockDb.tweets.map(t => {
            if(!t.replyToId)
            {
                // console.log("Inserting:")
                // console.log(t);
                return db_insertTweet(t);
            }
            else{
                return Promise.resolve();
            }
        }
    ));
    // CHILD TWEETS LATER

    await Promise.all(mockDb.tweets.map( t => {
        if(t.replyToId)
        {
            // console.log("Inserting:")
            // console.log(t);
            return db_insertTweet(t);
        }
        else{
            return Promise.resolve();
        }
    }

    ));

    // PROFILES

    await Promise.all(mockDb.profiles.map(p =>{
        // console.log("Inserting profile:")
        // console.log(p);
        return db_insertProfile(p);
    }))
}


const db_findTweets = async (query, options) => {
    console.log(options);
    console.log(query);
    
    
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
        { $match : {_id: {$eq: ObjectId(query._id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ]))).next()

    //return await (db.collection("tweets").aggregate([{$match: {_id: {$eq: query._id}}}, { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},]))
    //return await tweetToTweetWithAuthorUser(await db.collection("tweets").findOne(query, options));
}

const db_findUserTweets = async(query,options) => {
    return await (db.collection("tweets").aggregate([
        { $match : {authorId: {$eq: ObjectId(query.id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ])).toArray();
}

const db_findProfile = async(query,options) => {
    if(query._id){
        query._id = ObjectId(query._id);
    }
    if(query.userId){
        query.userId = ObjectId(query.userId); 
    }

    const prof = await db.collection("profiles").findOne({...query});
    console.log(query);
    const user = await db.collection("users").findOne({_id: prof.userId});
    const tweetCount  = await db.collection("tweets").countDocuments({authorId: {$eq: prof.userId}});

    return {...prof, user: {...user,}, tweetCount: tweetCount}

}

const db_findReplies = async(query,options) => {

    console.log(query);

    return await (db.collection("tweets").aggregate([
        { $match : {replyToId: {$eq: ObjectId(query.id) }}},
        { $lookup: {from: "users", localField: "authorId", foreignField:"_id", as: "author",},},
        { $unwind: "$author" },
        { $addFields: {authorName: '$author.name'}},
        { $unset: "author" }
    ])).toArray();

}

const db_insertTweet = async(doc) => {
    try{
        // console.log(doc);
        const author = await db.collection("users").findOne({_id: ObjectId(doc.authorId)});
        if(!author){
            // console.log(doc.authorId);
            throw new Error("400");
        }
        if(doc.replyToId){
            // console.log(doc.replyToId);
            const parentTweet = await db.collection("tweets").findOne({_id: ObjectId(doc.replyToId)});
            if(!parentTweet)
            {
                // console.log(doc);
                // console.log(doc.replyToId);
                throw new Error("400");
            }
        }
        doc = {
            ...doc,
            authorId: ObjectId(doc.authorId),
            likes: 0,
            retweets: 0,
            replies: 0,
            replyToId: doc.replyToId?ObjectId(doc.replyToId):null,
            date: new Date(),
        }
        await db.collection("tweets").insertOne(doc);
        if(doc.replyToId){
            await db.collection("tweets").updateOne({_id: ObjectId(doc.replyToId)},{$inc: {replies:1}})
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

const db_insertUser = async(doc) => {
    console.log("USER");
    console.log(doc);

    doc.password = await bcrypt.hash(doc.password, saltRounds);
    console.log("POST HASHING")
    console.log(doc);

    try{
        return await db.collection("users").insertOne(doc);
    }catch(e){
        throw e;
    }
}

const db_insertProfile = async(doc) => {
    try{
        return await db.collection("profiles").insertOne(doc);
    }catch(e){
        throw e;
    }
}

const db_findUser = async(query) => {
    for(const [key,value] of Object.entries(query)){
        if(['_id','userId'].includes(key))
            query[key] = ObjectId(value);
    }
    
    try {
        return await db.collection("users").findOne({...query})
    }catch(e){
        throw e;
    }
}



const db_insertTweetToUserLikes = async(userId, tweetId) => {
    userId = ObjectId(userId);
    tweetId = ObjectId(tweetId);

    try {
        await db.collection("users").updateOne({_id: userId}, {$addToSet: { likedTweets: tweetId}});
        await db.collection("tweets").updateOne({_id: tweetId}, {$inc: {likes:1}});
    }catch(e){
        throw e;
    }
}

const db_removeTweetFromUserLikes = async(userId, tweetId) => {
    userId = ObjectId(userId);
    tweetId = ObjectId(tweetId);

    try {
        await db.collection("users").updateOne({_id: userId}, {$pull: { likedTweets: tweetId}});
        await db.collection("tweets").updateOne({_id: tweetId}, {$inc: {likes:-1}});
    }catch(e){
        throw e;
    }
}

const db_verifyCredentials = async(login,password) => {
    try{
        const user = await db_findUser({name: login});
        console.log(user);
        const res = await bcrypt.compare(password, user.password);
        console.log(res);
        return res;
    }
    catch(e){
        throw e;
    }
}

const db_validatePassword = async(userId, password) => {
    try{
        const user = await db_findUser({_id: userId});
        console.log(user);
        const res = await bcrypt.compare(password, user.password);
        console.log(res);
        return res;
    }
    catch(e){
        throw e;
    }
}

const db_changeUserPassword = async(userId, newPassword) => {
    try{
        hash = await bcrypt.hash(newPassword, saltRounds);
        return await db.collection("users").updateOne(
        {
            _id: new ObjectId(userId)
        },
        {
            $set: { "password": hash }
        }
        )
    }catch(e){
        throw e;
    }
}


module.exports = {
    db_findTweets,
    db_findTweet,
    db_findUserTweets,
    db_insertTweet,
    // db_deleteTweet,
    db_generateMock,
    db_findReplies,
    db_findProfile,
    db_findUser,
    db_verifyCredentials,
    db_validatePassword,
    db_changeUserPassword,
    db_insertTweetToUserLikes,
    db_removeTweetFromUserLikes
}