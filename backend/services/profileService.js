const { db_findProfile } = require("../db/index");

const fetchProfileById = async(id) => {
    if(id == null)
        throw new Error("400")   
        try{
            let prof = await db_findProfile({_id: id})
            prof['id']  = prof._id;
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
            prof['id']  = prof._id;
            return prof;
        }catch(e){
            throw e;
        }
}

module.exports = {
    fetchProfileById,
    fetchProfileByUserId
}