const { db_findUser, db_verifyCredentials } = require("../db")
const jwt = require('jwt-simple')

const JWTSECRET = 'somesecret';

const checkCredentials = async(login,password) => {
    try{
        console.log("Check credentials");
        const dbres = await db_verifyCredentials(login,password);
        console.log("dbres");
        console.log(dbres);
        return dbres;

    }catch(e) {
        throw e;
    }
}

const generateToken = async (login) => {
    try{
        let now = new Date();
        let expiration = new Date();
        expiration.setDate(now.getDate()+7);
        return {token: jwt.encode({login: login, expire: expiration}, JWTSECRET), expires: expiration}
    }catch(e){
        throw e;
    }
}

const validateToken = async(token) => {
    try{
        const decoded = jwt.decode(token,JWTSECRET);
        console.log(decoded);
        if(new Date(decoded.expire) < new Date()){
            return false;
        }
        return decoded;
    }catch(e){
        throw e;
    }
}




module.exports = {
    checkCredentials,
    generateToken,
    validateToken
}