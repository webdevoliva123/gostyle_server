const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {readdirSync} = require('fs');
const connect_mongo = require('./mongodb/mongoDB');

// enviorment file configuration
require('dotenv').config();

// backend will run only given url
const corsOption = {
    origin : ["http://localhost:3000","http://192.168.0.113:3000",],
    useSuccessStatus : 200,
}



// config code
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

// config all router
readdirSync('./router').map((fileName) => {
    const route = require(`./router/${fileName}`)
    app.use('/api/v1',route)
})


app.get('/email',(req,res) => {
    res.sendFile(path.join(__dirname+'/tamplate/verification.html'))
})


// app home page
app.get('/', (req, res) => {
    //see in browser
    res.sendFile(path.join(__dirname+'/public/home.html'))
})

app.get('/mazaigne', (req, res) => {
    //see in browser
    res.sendFile(path.join(__dirname+'/public/magazine_controller.html'))
})

// connect to mongodb server
connect_mongo()
module.exports = app