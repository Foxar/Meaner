const authService = require('../services/authService')

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
    authMiddleware
}