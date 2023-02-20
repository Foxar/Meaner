const tweetService = require ('../services/tweetService')
const profileService = require('../services/profileService');
const { InvalidRequestError } = require('../middleware/errors');

const getProfileById = async (req,res,next) => {
    try{
        const {id} = req.params;
        if(!id){
            throw new InvalidRequestError("Missing id parameter.");
        }
        const profile = await profileService.fetchProfileById(id);
        res.status(200).json(profile);
    }catch(e){
        next(e);
    }
}

const getProfileByUserId = async (req,res,next) => {
    try{
        const {id} = req.params;
        if(!id){
            throw new InvalidRequestError("Missing userId parameter.");
        }
        const profile = await profileService.fetchProfileByUserId(id);
        res.status(200).json(profile);
    }catch(e){
        next(e);
    }
}

//TO-DO Modifying and deleting (?) the profile

module.exports = {
    getProfileById,
    getProfileByUserId
}