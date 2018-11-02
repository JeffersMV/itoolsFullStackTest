'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DAO = require('./dao');
const authors = require('./routes/authors');
const books = require('./routes/books');
// const authorCollection = require('./initial/authors');
// const bookCollection = require('./initial/books');

const PORT = 3000;

const app = express();
const dao = new DAO({host: 'localhost', port: 27017, name: 'todo'});

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


/**
 * Routes
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../web/index.html'));
});
app.use('/api/authors', authors);
app.use('/api/books', books);

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
