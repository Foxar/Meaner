const authService = require('../services/authService')
const tweetService = require('../services/tweetService')

const postLogin = async(req,res,next) => {
    const creds = req.body;
    console.log(creds);
    const {login, password}= creds;

    try {
        if(await authService.checkCredentials(login,password))
        {
            const tokenRes = await authService.generateToken(login);
            const user = await tweetService.fetchUserByName(login);
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

const validateToken = async(req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        const validationRes = await authService.validateToken(token);
        console.log(validationRes);
        if(validationRes){
            const user = await tweetService.fetchUserByName(validationRes.login);
            const userMapped = {name: user.name, id: user._id};
            res.status(200).json({...validationRes, ...userMapped});
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

module.exports = {
    postLogin,
    validateToken,
    authMiddleware
}