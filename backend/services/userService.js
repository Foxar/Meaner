const { db_findUser } = require("../db/index");

const fetchUserByName = async(userName) => {
    try{
        return await db_findUser({name: userName})
    }catch(e){
        throw e;
    }
        
}

module.exports = {
    fetchUserByName
}