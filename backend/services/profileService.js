const { db_findProfile } = require("../db/index");

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

module.exports = {
    fetchProfileById,
    fetchProfileByUserId
}