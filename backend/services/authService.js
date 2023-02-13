const { db_insertUser, db_verifyCredentials, db_validatePassword, db_changeUserPassword, db_insertProfile, db_findUser } = require("../db/index")
const userService = require('./userService');
const { bcrypt, saltRounds } = require('../db/dbConfig');
const { InvalidSignupError, InvalidLoginError, InvalidAuthTokenError, InvalidRequestError } = require("../middleware/errors");
const jwt = require('jwt-simple')

const JWTSECRET = 'somesecret';


const addUser = async(login, password, confirmPassword) => {
    try {
        if(password != confirmPassword) {
            throw new InvalidSignupError("Passwords aren't matching.");
        }
        const hash = await bcrypt.hash(password, saltRounds);
        const dbres = await db_insertUser({
            name: login,
            password: hash
        });

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

const login = async(login,password) => {
    if(await checkCredentials(login,password)){
        const token = await generateToken(login);
        const user = await userService.fetchUserByName(login);
        const userMapped = {name: user.name, id: user._id};
        return {...token, ...userMapped};
    }else {
        throw new InvalidLoginError("Invalid username or password.")
    }
}

const checkCredentials = async(login,password) => {
    try{
        const user = await db_findUser({"name": login});
        return await bcrypt.compare(password, user.password);
    }catch(e) {
        throw e;
    }
}

const generateToken = async (login) => {
    try{
        let now = new Date();
        let expiration = new Date();
        expiration.setDate(now.getDate()+7);
        return {
            token: jwt.encode({login: login, expire: expiration}, JWTSECRET), expires: expiration}
    }catch(e){
        throw e;
    }
}

const validateToken = async(token) => {
    try{
        const decoded = jwt.decode(token,JWTSECRET);
        console.log(decoded);
        if(new Date(decoded.expire) < new Date()){
            throw new InvalidAuthTokenError("Token is expired.")
        }
        if(decoded){
            const user = await userService.fetchUserByName(decoded.login);
            const userMapped = {name: user.name, id: user._id};
            return {token, ...decoded, ...userMapped};
        }else{
            throw new InvalidAuthTokenError("Invalid token.")
        }
    }catch(e){
        throw e;
    }
}

const changePassword = async(login, password, newPassword) => {
    try {
        // const validateRes = await db_validatePassword(userId,password);
        const validateRes = await checkCredentials(login,password);
        console.log(validateRes);
        if(validateRes){
            const changePassRes = await db_changeUserPassword(login, newPassword)
            console.log(changePassRes);
            if(changePassRes.acknowledged && changePassRes.modifiedCount > 0){
                return true;
            }else{
                throw new InvalidRequestError("Unknown user for password change.")
            }
        }else{
            throw new InvalidLoginError("Invalid username or password.");
        }
        
    }catch(e){
        throw e;
    }
}




module.exports = {
    validateToken,
    changePassword,
    addUser,
    login,
    JWTSECRET
}