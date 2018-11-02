'use strict';
const Author = require('../models/Author');

/**
 * Send authors collection
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function getAuthors(req, res) {
    Author.find().then(authors => {
        res.json({
            authors: authors
        });
    }).catch(err => {
        res.json({
            message: err.message
        });
    });
}

/**
 * Send specific author entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function getAuthorById(req, res) {
    //TODO implement
    let id = req.params.id;
    Author.findById(id)
        .then(author => {
            if (!author) {
                res.status(404).send({errors: ["Author not exist"]});
            } else res.json({
                author: author
            });
        })
        .catch(err => {
            res.json({
                message: err
            });
        });
}

/**
 * Update & Send specific author entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function updateAuthor(req, res) {
    let query = req.body;
    let email = req.body.email;
    if (email !== "") {
        let id = req.params.id;
        Author.findOneAndUpdate({_id: id}, query, {new: true})
            .then(author => {
                if (!author) {
                    res.status(404).send({errors: ["Author not exist"]});
                } else res.json({
                    author: author
                });
            })
            .catch(err => {
                res.status(400).send({errors: ["Author with this id already exist"]});
            });
    } else res.status(400).send({errors: ["E-mail is require"]});
}

/**
 * Create & Send specific author
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function createAuthor(req, res) {
    if (req.body.email !== undefined) {
        Author.findById(req.body._id, function (err, callback) {
            if (!callback) {
                let newAuthor = new Author(req.body);
                newAuthor.save(function (err, author) {
                    res.status(201).json({
                        author: author._doc
                    })
                })
            } else
                res.status(400).send({errors: ["Author with this id already exist"]});
        })
    } else
        res.status(400).send({errors: ["E-mail is require"]});
}

/**
 * Delete specific author entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
function removeAuthor(req, res) {
    const id = req.params.id;
    Author.findOneAndDelete({_id: id})
        .then(author => {
            if(author){
            res.json({
                status: "OK"
            })}
            else res.status(404).send({errors: ["Author not exist"]});
        })
        .catch(err => {
            err.message
        });
}

//TODO add other methods
exports.getAuthors = getAuthors;
exports.getAuthorById = getAuthorById;
exports.updateAuthor = updateAuthor;
exports.createAuthor = createAuthor;
exports.removeAuthor = removeAuthor;