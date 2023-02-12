const tweetService = require ('../services/tweetService')
const profileService = require('../services/profileService')

const getProfileById = async (req,res,next) => {
    const {id} = req.params;

    try{
        const profile = await profileService.fetchProfileById(id);
        if(profile == null)
            throw new Error("No profile found");
        else
            res.status(200).json(profile);
    }catch(e){
        //res.status(e.statusCode).json({error: e.message});
        next(e);
    }
}

const getProfileByUserId = async (req,res,next) => {
    const {id} = req.params;

    try{
        const profile = await profileService.fetchProfileByUserId(id);
        if(profile == null)
            throw new Error("No profile found");
        else
            res.status(200).json(profile);
    }catch(e){
        //res.status(e.statusCode).json({error: e.message});
        next(e);
    }
}

//TO-DO Modifying and deleting (?) the profile

module.exports = {
    getProfileById,
    getProfileByUserId
}