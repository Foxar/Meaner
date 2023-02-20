const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcrypt');


const connectionString = `mongodb://localhost:27017/`
const mongoClient = new MongoClient(connectionString);
let db = mongoClient.db('meaner')

const saltRounds = 10;

module.exports = {
    db,
    saltRounds,
    bcrypt,
    ObjectId,
}