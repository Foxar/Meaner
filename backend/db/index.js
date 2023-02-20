const { db_findProfile, db_insertProfile} = require('./profiles');
const { db_insertUser, db_findUser, db_verifyCredentials, db_validatePassword, db_changeUserPassword } = require('./users');
const { db_insertTweet, db_findTweets, db_findTweet, db_findReplies, db_findUserTweets, db_insertTweetToUserLikes, db_removeTweetFromUserLikes } = require('./tweets');
const { db } = require('./dbConfig');

const db_generateMock = async (mockDb) => {
    await db.collection("users").deleteMany({});
    await db.collection("tweets").deleteMany({});
    await db.collection("profiles").deleteMany({});

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

module.exports = {
    db_generateMock,
    db_findTweets,
    db_findTweet,
    db_findUserTweets,
    db_insertTweet,
    // db_deleteTweet,
    db_findReplies,
    db_findProfile,
    db_findUser,
    db_verifyCredentials,
    db_validatePassword,
    db_changeUserPassword,
    db_insertTweetToUserLikes,
    db_removeTweetFromUserLikes,
    db_insertUser,
    db_insertProfile
}