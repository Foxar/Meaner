const { bcrypt, saltRounds, db, ObjectId } = require("./dbConfig");

const db_insertUser = async(doc) => {
    let readyDoc = {
        name: doc.name,
        password: doc.password,
        likedTweets: []
    }
    console.log("Inserting user:", readyDoc);
    return await db.collection("users").insertOne(readyDoc);
}

const db_findUser = async(query) => {
    for(const [key,value] of Object.entries(query)){
        if(['_id','userId'].includes(key))
            query[key] = new ObjectId(value);
    }
    
    try {
        return await db.collection("users").findOne({...query})
    }catch(e){
        throw e;
    }
}

const db_verifyCredentials = async(login,password) => {
    try{
        const user = await db_findUser({name: login});
        console.log(user);
        const res = await bcrypt.compare(password, user.password);
        console.log(res);
        return res;
    }
    catch(e){
        throw e;
    }
}

const db_validatePassword = async(userId, password) => {
    try{
        const user = await db_findUser({_id: userId});
        console.log(user);
        const res = await bcrypt.compare(password, user.password);
        console.log(res);
        return res;
    }
    catch(e){
        throw e;
    }
}

const db_changeUserPassword = async(login, newPassword) => {
    try{
        const hash = await bcrypt.hash(newPassword, saltRounds);
        return await db.collection("users").updateOne(
        {
            name: login
        },
        {
            $set: { "password": hash }
        }
        )
    }catch(e){
        throw e;
    }
}

module.exports = {
    db_changeUserPassword,
    db_findUser,
    db_insertUser,
    db_validatePassword,
    db_verifyCredentials
}