'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const DAO = require('./dao');
const authors = require('./routes/authors');
const books = require('./routes/books');
const options = require('./routes/options');

require('dotenv').config({path: path.join(__dirname, '../.env')});
const SERVER_PORT = process.env.SERVER_PORT;
const frontEndUrl = process.env.FEURL;

const app = express();
const dao = new DAO({host: process.env.MONGODB_HOST, port: process.env.PORT, name: process.env.NAME});

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

let originsWhitelist = [
    frontEndUrl
];
let corsOptions = {
    origin: function(origin, callback){
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
};
app.use(cors(corsOptions));

/**
 * Routes
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../src/index.html'));
});
app.use('/api/authors', authors);
app.use('/api/books', books);
app.use('/api/options', options);

/**
 * Init database
 */
dao.init({/*init data*/}, (err, db) => {

    if (err) {
        console.log(`Error App!`);
        console.error(err);
    }

    /**
     * Start app
     */
    app.listen(SERVER_PORT, function () {
        console.log(`App listening on port ${SERVER_PORT}!`);
    });
});

module.exports = app;
