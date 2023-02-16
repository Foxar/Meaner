const authService = require('../services/authService')
const jwt = require('jwt-simple');
const { InvalidAuthTokenError } = require('./errors');


const authMiddleware = async(req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        const validationRes = await authService.validateToken(token);
        if(validationRes){
            next()
        }
    }else {
        throw new InvalidAuthTokenError("Invalid or missing token.")
    }
}

const tokenDecodeMiddleware = async(req,res,next) => {
    console.log("tokenDecodeMiddleware");
    const token = req.headers['authorization'];
    if(token){
        const validationRes = await authService.validateToken(token);
        if(validationRes){
            const decoded = jwt.decode(token,authService.JWTSECRET);
            req.userLogin=decoded.login;
            console.log(decoded);
        }
    }
    next();
}

module.exports = {
    authMiddleware,
    tokenDecodeMiddleware,
}