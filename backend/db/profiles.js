const { ProfileNotFoundError } = require("../middleware/errors");
const { ObjectId, db } = require("./dbConfig");

const db_insertProfile = async(doc) => {
    try{
        return await db.collection("profiles").insertOne({
            _id: new ObjectId(),
            userId: doc.userId,
            description: "",
            dateCreated: new Date(),
        });
    }catch(e){
        throw e;
    }
}

const db_findProfile = async(query,options) => {
    if(query._id){
        query._id = new ObjectId(query._id);
    }
    if(query.userId){
        query.userId = new ObjectId(query.userId); 
    }

    const prof = await db.collection("profiles").findOne({...query});
    if(!prof){
        throw new ProfileNotFoundError("Profile not found.");
    }
    console.log(query);
    const user = await db.collection("users").findOne({_id: prof.userId});
    const tweetCount  = await db.collection("tweets").countDocuments({authorId: {$eq: prof.userId}});

    return {...prof, user: {...user,}, tweetCount: tweetCount}

}

module.exports = {
    db_findProfile,
    db_insertProfile
}