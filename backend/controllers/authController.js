const authService = require('../services/authService')
const tweetService = require('../services/tweetService')
const userService = require('../services/userService');


const postSignup = async(req,res,next) => {
    try {
        const { login, password, confirmPassword } = req.body;
        const user = await authService.addUser(login, password, confirmPassword);
        res.status(201).json(user);
    }catch(e){
        next(e);
    }
}

const postLogin = async(req,res,next) => {
    const {login, password} = req.body;
    console.log(req.body);
    try {
        const loginRes = await authService.login(login,password);
        res.status(200).json(loginRes);
    }catch(e){
        next(e);
    }
}

const postValidateToken = async(req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        const validationRes = await authService.validateToken(token);
        console.log(validationRes);
        res.status(200).json(validationRes);
    }else {
        res.status(401).send({error: "Missing token."})
    }
}


const postChangePassword = async(req,res,next) => {
    try{
        const { login, password, newPassword }= req.body;
        console.log(req.body);
        const changePassRes = await authService.changePassword(login, password, newPassword);
        res.sendStatus(200);
    }catch(e){
        next(e);
    }
}

module.exports = {
    postSignup,
    postLogin,
    postValidateToken,
    postChangePassword,
}