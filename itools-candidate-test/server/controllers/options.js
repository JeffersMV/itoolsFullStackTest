'use strict';
const Author = require('../models/Author');
const Book = require('../models/Book');

function getAuthorItems(req, res) {
    Author.find({}, '_id secondName').then(authors => {
        console.log(authors);
        authors = JSON.parse(JSON.stringify(authors).split('"_id":').join('"label":'));
        authors = JSON.parse(JSON.stringify(authors).split('"secondName":').join('"value":'));
        res.json({
            authorItems: authors
        });
    }).catch(err => {
        console.error(err.message);
    });
}

function getBookItems(req, res) {
    Book.find({}, '_id name').then(books => {
        books = JSON.parse(JSON.stringify(books).split('"_id":').join('"label":'));
        books = JSON.parse(JSON.stringify(books).split('"name":').join('"value":'));
        res.json({
            bookItems: books
        });
    }).catch(err => {
        console.error(err.message);
    });
}

exports.getAuthorItems = getAuthorItems;
exports.getBookItems = getBookItems;