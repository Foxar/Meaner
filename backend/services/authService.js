const { db_insertUser, db_verifyCredentials, db_validatePassword, db_changeUserPassword, db_insertProfile } = require("../db/index")
const { InvalidSignupError } = require("../middleware/errors");
const jwt = require('jwt-simple')

const JWTSECRET = 'somesecret';


const addUser = async(user) => {
    try {
        const dbres = await db_insertUser(user);
        await db_insertProfile({
            userId: dbres.insertedId
        })
        return dbres;
    }catch(e) {
        if(e.message.includes("E11000")){
            throw new InvalidSignupError("Username taken");
        }else {
            throw e;
        }
    }
}

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

const changePassword = async(userId, password, newPassword) => {
    try {
        const validateRes = await db_validatePassword(userId,password);
        console.log(validateRes);
        if(validateRes){
            const changePassRes = await db_changeUserPassword(userId, newPassword)
            console.log(changePassRes);
            if(changePassRes.acknowledged && changePassRes.modifiedCount > 0){
                return {result: true, status: 200};
            }else{
                return {result: false, status: 400};
            }
        }else{
            return {result: false, status: 401}
        }
        
    }catch(e){
        throw e;
    }
}




module.exports = {
    checkCredentials,
    generateToken,
    validateToken,
    changePassword,
    addUser,
    JWTSECRET
}