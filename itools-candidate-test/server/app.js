'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DAO = require('./dao');
const authors = require('./routes/authors');
const books = require('./routes/books');
const options = require('./routes/options');
const cors = require('cors');

const PORT = 3000;
const frontEndUrl = 'http://localhost:4200';

const app = express();
const dao = new DAO({host: 'localhost', port: 27017, name: 'todo'});

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
    app.listen(PORT, function () {
        console.log(`App listening on port ${PORT}!`);
    });
});

module.exports = app;
