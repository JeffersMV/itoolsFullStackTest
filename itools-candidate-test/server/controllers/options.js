'use strict';
const Author = require('../models/Author');
const Book = require('../models/Book');

function getAuthorItems(req, res) {
    Author.find({}, '_id secondName').then(authors => {
        const authorsModified = authors.map((author) => {
            return {"label" : author._id, "value": author.name};
        });
        res.json({
            authorItems: authorsModified
        });
    }).catch(err => {
        console.error(err.message);
    });
}

function getBookItems(req, res) {
    Book.find({}, '_id name').then(books => {
        const booksModified = books.map((book) => {
            return {"label" : book._id, "value": book.name};
        });
        res.json({
            bookItems: booksModified
        });
    }).catch(err => {
        console.error(err.message);
    });
}

exports.getAuthorItems = getAuthorItems;
exports.getBookItems = getBookItems;