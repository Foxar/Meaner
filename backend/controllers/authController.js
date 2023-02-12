const authService = require('../services/authService')
const tweetService = require('../services/tweetService')
const userService = require('../services/userService');


const postSignup = async(req,res,next) => {
    try {
        const cred = req.body;
        const user = await authService.addUser(cred);
        res.status(201).json(user);
    }catch(e){
        next(e);
    }
}

const postLogin = async(req,res,next) => {
    const creds = req.body;
    console.log(creds);
    const {login, password}= creds;

    try {
        if(await authService.checkCredentials(login,password))
        {
            const tokenRes = await authService.generateToken(login);
            const user = await userService.fetchUserByName(login);
            const userMapped = {name: user.name, id: user._id};
            res.status(200).json({...tokenRes, ...userMapped});
        }
        else
        {
            res.sendStatus(401);
        }
    }catch(e){
        next(e);
    }
}

const postValidateToken = async(req,res,next) => {
    const token = req.headers['authorization'];
if(token){
        const validationRes = await authService.validateToken(token);
        console.log(validationRes);
        if(validationRes){
            const user = await userService.fetchUserByName(validationRes.login);
            const userMapped = {name: user.name, id: user._id};
            res.status(200).json({token, ...validationRes, ...userMapped});
        }else {
            res.status(401).send({error: "Invalid or missing token."})
        }
    }else {
        res.status(401).send({error: "Invalid or missing token."})
    }
}

const authMiddleware = async(req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        const validationRes = await authService.validateToken(token);
        console.log(validationRes);
        if(validationRes){
            next()
        }
    }else {
        res.status(401).send({error: "Invalid or missing token."})
    }
}

const postChangePassword = async(req,res,next) => {
    try{
        const creds = req.body;
        console.log(creds);
        const {userId, password, newPassword}= creds;
        const changePassRes = await authService.changePassword(userId, password, newPassword);
        if(changePassRes.result){
            res.status(200).json()
        }else {
            res.sendStatus(changePassRes.status);
        }
    }catch(e){
        next(e);
    }
}

module.exports = {
    postSignup,
    postLogin,
    postValidateToken,
    authMiddleware,
    postChangePassword,
}