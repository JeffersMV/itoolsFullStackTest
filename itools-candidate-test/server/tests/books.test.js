'use strict';

var supertest = require('supertest');
var mocha = require('mocha');
var chai = require('chai');

var app = require('../app');
var controller = require('../controllers/books');
var DAO = require('../dao/index');

var dao = new DAO({host: 'localhost', port: 27017, name: 'testing'});
var should = chai.should();
var assert = chai.assert;

/**
 * Test Data
 */
var dummyBook1 = {
    name: 'Book 1',
    author: ['1', '2'],
    publishing: 'O\'Reilly',
    ebook: true,
    year: 2016,
    isbn: '123-345-678',
    pages: 657,
    _id: '1'
};
var dummyBook2 = {
    name: 'Book 2',
    author: ['1'],
    publishing: 'Williams',
    ebook: false,
    year: 2015,
    isbn: '321-543-876',
    pages: 300,
    _id: '2'
};

describe('Books', function () {

    beforeEach(function (done) {
        dao.clear(function (err) {
            if (err) {
                return done(err);
            }
            dao.init({
                collections: [
                    {
                        name: 'books',
                        rows: [dummyBook1, dummyBook2]
                    }
                ]
            }, function (err, db) {
                done(err);
            });
        });
    });

    describe('HTTP API endpoint\'s', function () {
        describe('GET /', function () {
            it('should return book collection', function (done) {
                supertest(app)
                    .get('/api/books/')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var books = res.body.books;
                        assert.typeOf(books, 'array');
                        assert.property(books[0], 'name');
                        assert.property(books[0], 'author');
                        assert.property(books[0], 'publishing');
                        assert.property(books[0], 'ebook');
                        assert.property(books[0], 'year');
                        assert.property(books[0], 'isbn');
                        assert.property(books[0], 'pages');
                        assert.property(books[0], '_id');
                        done();
                    });
            });
        });
        describe('GET /:id', function () {
            it('should return specific book', function (done) {
                supertest(app)
                    .get(`/api/books/${dummyBook1._id}`)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var book = res.body.book;
                        assert.typeOf(book, 'object');
                        assert.equal(book.name, dummyBook1.name);
                        assert.equal(book.author[0], dummyBook1.author[0]);
                        assert.equal(book.author[1], dummyBook1.author[1]);
                        assert.equal(book.publishing, dummyBook1.publishing);
                        assert.equal(book.ebook, dummyBook1.ebook);
                        assert.equal(book.year, dummyBook1.year);
                        assert.equal(book.isbn, dummyBook1.isbn);
                        assert.equal(book.pages, dummyBook1.pages);
                        done();
                    });
            });
            it('should return error if book not exist', function (done) {
                supertest(app)
                    .get('/api/books/4')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book not exist');
                        done();
                    });
            });
        });
        describe('PUT /:id', function () {
            var updatedBook = {
                name: 'Book 222',
                author: ['1', '2'],
                publishing: 'Williams',
                ebook: false,
                year: 2015,
                isbn: '321-543-876',
                pages: 300
            };
            var notValidBook1 = Object.assign({}, updatedBook);
            notValidBook1.name = '';
            var notValidBook2 = Object.assign({}, updatedBook);
            notValidBook2._id = '2';
            it('should update book', function (done) {
                supertest(app)
                    .put(`/api/books/${dummyBook2._id}`)
                    .send(updatedBook)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var book = res.body.book;
                        assert.typeOf(book, 'object');
                        assert.equal(book.name, updatedBook.name);
                        assert.equal(book._id, dummyBook2._id);
                        assert.equal(book.author[1], updatedBook.author[1]);
                        done();
                    });
            });
            it('should return error if book not exist', function (done) {
                supertest(app)
                    .put('/api/books/4')
                    .send(updatedBook)
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book not exist');
                        done();
                    });
            });
            it('should return error if book name is empty', function (done) {
                supertest(app)
                    .put('/api/books/5')
                    .send(notValidBook1)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Name is require');
                        done();
                    });
            });
            it('should return error if book with the id already exist', function (done) {
                supertest(app)
                    .put('/api/books/1')
                    .send(notValidBook2)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book with this id already exist');
                        done();
                    });
            });
        });
        describe('PATCH /:id', function () {
            var patchBook = {
                name: 'Book 333'
            };
            it('should update specific book filed/property', function (done) {
                supertest(app)
                    .patch(`/api/books/${dummyBook2._id}`)
                    .send(patchBook)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var book = res.body.book;
                        assert.typeOf(book, 'object');
                        assert.equal(book.name, patchBook.name);
                        assert.equal(book._id, dummyBook2._id);
                        done();
                    });
            });
            it('should return error if book not exist', function (done) {
                supertest(app)
                    .patch('/api/books/4')
                    .send(patchBook)
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book not exist');
                        done();
                    });
            });
            it('should return error if book name is empty', function (done) {
                supertest(app)
                    .patch('/api/books/5')
                    .send({
                        name: ''
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Name is require');
                        done();
                    });
            });
            it('should return error if book with the id already exist', function (done) {
                supertest(app)
                    .patch('/api/books/1')
                    .send({
                        _id: '2'
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book with this id already exist');
                        done();
                    });
            });
        });
        describe('POST /', function () {
            var newBook = {
                name: 'Book 3',
                author: [],
                publishing: 'O\'Reilly',
                ebook: true,
                year: 2015,
                isbn: '124-345-678',
                pages: 657,
                _id: '3'
            };
            var notValidBook1 = Object.assign({}, newBook);
            notValidBook1._id = '5';
            notValidBook1.name = undefined;
            var notValidBook2 = Object.assign({}, newBook);
            notValidBook2._id = '2';
            it('should create new book', function (done) {
                supertest(app)
                    .post(`/api/books`)
                    .send(newBook)
                    .expect(201)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var book = res.body.book;
                        assert.typeOf(book, 'object');
                        assert.equal(book.name, newBook.name);
                        assert.equal(book.author.length, 0);
                        assert.equal(book.publishing, newBook.publishing);
                        assert.equal(book.ebook, newBook.ebook);
                        assert.equal(book.year, newBook.year);
                        assert.equal(book.isbn, newBook.isbn);
                        assert.equal(book.pages, newBook.pages);
                        assert.equal(book._id, newBook._id);
                        done();
                    });
            });
            it('should return error if book name is empty', function (done) {
                supertest(app)
                    .post('/api/books')
                    .send(notValidBook1)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Name is require');
                        done();
                    });
            });
            it('should return error if book with the id already exist', function (done) {
                supertest(app)
                    .post('/api/books')
                    .send(notValidBook2)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book with this id already exist');
                        done();
                    });
            });
        });
        describe('DELETE /:id', function () {
            it('should delete book', function (done) {
                supertest(app)
                    .delete(`/api/books/${dummyBook2._id}`)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'status');
                        assert.typeOf(body, 'object');
                        assert.equal(body.status, 'OK');
                        done();
                    });
            });
            it('should return error if book not exist', function (done) {
                supertest(app)
                    .delete('/api/books/4')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Book not exist');
                        done();
                    });
            });
        });
    });
    describe('Controller', function () {
        it('has method "getBooks"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'getBookById');
            assert.typeOf(controller.getBookById, 'function');
            assert.equal(controller.getBookById.length, 2);
            done();
        });
        it('has method "getBookById"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'getBooks');
            assert.typeOf(controller.getBooks, 'function');
            assert.equal(controller.getBooks.length, 2);
            done();
        });
        it('has method "updateBook"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'updateBook');
            assert.typeOf(controller.updateBook, 'function');
            assert.equal(controller.updateBook.length, 2);
            done();
        });
        it('has method "removeBook"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'removeBook');
            assert.typeOf(controller.removeBook, 'function');
            assert.equal(controller.removeBook.length, 2);
            done();
        });
    });
});


