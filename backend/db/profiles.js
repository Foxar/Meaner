const { ResourceNotFoundError } = require("../middleware/errors");
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
        throw new ResourceNotFoundError("Profile not found.");
    }
    console.log(query);
    const user = await db.collection("users").findOne({_id: prof.userId});
    const tweetCount  = await db.collection("tweets").countDocuments({authorId: {$eq: prof.userId}});

    return {...prof, user: {...user,}, tweetCount: tweetCount}
}

const db_editProfile = async(id,doc) => {
    try{
        id = new ObjectId(id);
        const updateRes = await db.collection("profiles").updateOne(
            {
                _id: id
            },
            {
                $set: {
                    description: doc.description
                },
            }
        );

        console.log(updateRes);
        return true;
    }catch(e){
        throw e;
    }
}

module.exports = {
    db_findProfile,
    db_insertProfile,
    db_editProfile,
}