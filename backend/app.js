const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const routes = require('./routes/index')
const port = 3000
const {generateDatabase} = require('./mockDb');
const {db_generateMock} = require('./db')

const mockDb = generateDatabase();

console.log(mockDb);
//db_generateMock(mockDb);


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,Authorization');

    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',routes);
app.all('/api/*', (req,res) => res.status(404).json("Unknown endpoint."));
app.use('/', (req,res) => res.json("Api is woring"));
app.use((err,req,res,next) => {

    console.log("error middleware");

    if(err.name == "BSONTypeError" || ["400", "Username taken"].includes(err.message))
    {
        err.statusCode = 400;
    }
    else if(err.message == "No tweet found" || err.message == "404")
    {
        err.statusCode = 404;
    }
    else
    {
        err.statusCode = 500;
    }

    console.error(err);
    res.status(err.statusCode).json(err.message);
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
