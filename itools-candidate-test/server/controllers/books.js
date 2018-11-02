'use strict';
const Book = require('../models/Book');

/**
 * Send books collection
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function getBooks(req, res) {
    Book.find().then(books => {
        res.json({
            books: books
        });
    }).catch(err => {
        res.json({
            message: err.message
        });
    });
}

/**
 * Send specific book entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function getBookById(req, res) {
    //TODO implement
    let id = req.params.id;
    Book.findById(id)
        .then(book => {
            if (!book) {
                res.status(404).send({errors: ["Book not exist"]});
            } else res.json({
                book: book
            });
        })
        .catch(err => {
            res.json({
                message: err
            });
        });
}

/**
 * Update & Send specific book entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function updateBook(req, res) {
    let query = req.body;
    let name = req.body.name;
    if (name !== "") {
        let id = req.params.id;
        Book.findOneAndUpdate({_id: id}, query, {new: true})
            .then(book => {
                if (!book) {
                    res.status(404).send({errors: ["Book not exist"]});
                }else res.json({
                    book: book
                });
            })
            .catch(err => {
                res.status(400).send({errors: ["Book with this id already exist"]});
            });
    } else
        res.status(400).send({errors: ["Name is require"]});
}

/**
 * Create & Send specific book
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function createBook(req, res) {
    if (req.body.name !== undefined) {
        Book.findById(req.body._id, function (err, callback) {
            if (!callback) {
                let newBook = new Book(req.body);
                newBook.save(function (err, book) {
                    res.status(201).json({
                        book: book._doc
                    })
                })
            } else
                res.status(400).send({errors: ["Book with this id already exist"]});
        })
    } else
        res.status(400).send({errors: ["Name is require"]});
}

/**
 * Delete specific book entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function removeBook(req, res) {
    const id = req.params.id;
    Book.findOneAndDelete({_id: id})
        .then(book => {
            if(book){
                res.json({
                    status: "OK"
                })}
            else res.status(404).send({errors: ["Book not exist"]});
        })
        .catch(err => {
            err.message
        });
}

//TODO add other methods
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.updateBook = updateBook;
exports.createBook = createBook;
exports.removeBook = removeBook;
