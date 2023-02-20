const { OperationalError } = require('./errors');

const errorLogger = (err,req,res,next) => {
    if(err instanceof OperationalError){
        console.error('\x1b[33m[!]Error: %s\nMessage: %s\nPath: %s\nBody: %s\x1b[37m',err.name, err.message, req.path,req.body)
    }else {
        console.error('\x1b[31m[!!!] UNEXPECTED\n%s\x1b[37m', err)
    }
    
    next(err);
}

module.exports = { errorLogger }