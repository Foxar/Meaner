const { ObjectId } = require('../db/dbConfig');
const { InvalidRequestError } = require('./errors');

const paramValidatorMiddleware = (type,param) => {
    switch(type.toLowerCase()){
        case 'bson':
            return (req,res,next) => {
                if(!ObjectId.isValid(req.params[param])){
                    throw new InvalidRequestError(`Parameter ${param} is not a valid BSON string.`);
                }
                next();
            }
            break;
        default:
            return (req,res,next) =>{
                next();
            }
            break;
    }
    
}

module.exports = {
    paramValidatorMiddleware
}