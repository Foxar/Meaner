const { ObjectId } = require("../db/dbConfig");
const { db_findProfile, db_findUser } = require("../db/index");
const { db_editProfile } = require("../db/profiles");
const { NotAuthorizedError } = require("../middleware/errors");

const fetchProfileById = async(id) => {
    try{
        let {_id, ...prof} = await db_findProfile({_id: id})
        return {...prof, id:_id};
    }catch(e){
        throw e;
    }
}

const fetchProfileByUserId = async(userId) => {
    try{
        let {_id, ...prof} = await db_findProfile({userId: userId})
        return {...prof, id:_id};
    }catch(e){
        throw e;
    }
}

const editProfileByUserId = async(id,userLogin,profile) => {
    try{
        const currentUser = await db_findUser({name: userLogin});
        if(!currentUser._id.equals(new ObjectId(id))){
            throw new NotAuthorizedError("Cannot modify another user's profile.")
        }
        return await db_editProfile({userId: new ObjectId(id), ...profile});
    }catch(e){
        throw e;
    }
}

module.exports = {
    fetchProfileById,
    fetchProfileByUserId,
    editProfileByUserId
}