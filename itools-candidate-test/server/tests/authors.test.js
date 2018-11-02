'use strict';

var supertest = require('supertest');
var mocha = require('mocha');
var chai = require('chai');

var app = require('../app');
var controller = require('../controllers/authors');
var DAO = require('../dao/index');

var dao = new DAO({host: 'localhost', port: 27017, name: 'testing'});
var should = chai.should();
var assert = chai.assert;

/**
 * Test Data
 */
var dummyAuthor1 = {
    email: 'au1@test.com',
    firstName: 'A 1',
    secondName: 'A 1',
    book: ['1', '2'],
    birthDate: 1, //Date.now(),
    _id: '1'
};
var dummyAuthor2 = {
    email: 'au2@test.com',
    firstName: 'A 2',
    secondName: 'A 2',
    book: ['1'],
    birthDate: 1, //Date.now(),
    _id: '2'
};

describe('Authors', function () {

    beforeEach(function (done) {
        dao.clear(function (err) {
            if (err) {
                return done(err);
            }
            dao.init({
                collections: [
                    {
                        name: 'authors',
                        rows: [dummyAuthor1, dummyAuthor2]
                    }
                ]
            }, function (err, db) {
                done(err);
            });
        });
    });

    describe('HTTP API endpoint\'s', function () {
        describe('GET /', function () {
            it('should return author collection', function (done) {
                supertest(app)
                    .get('/api/authors/')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authors = res.body.authors;
                        assert.typeOf(authors, 'array');
                        assert.property(authors[0], 'email');
                        assert.property(authors[0], 'firstName');
                        assert.property(authors[0], 'secondName');
                        assert.property(authors[0], 'book');
                        assert.property(authors[0], 'birthDate');
                        assert.property(authors[0], '_id');
                        done();
                    });
            });
        });
        describe('GET /:id', function () {
            it('should return specific author', function (done) {
                supertest(app)
                    .get(`/api/authors/${dummyAuthor1._id}`)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var author = res.body.author;
                        assert.typeOf(author, 'object');
                        assert.equal(author.firstName, dummyAuthor1.firstName);
                        assert.equal(author.secondName, dummyAuthor1.secondName);
                        assert.equal(author.book[0], dummyAuthor1.book[0]);
                        assert.equal(author.book[1], dummyAuthor1.book[1]);
                        assert.equal(author.birthDate, dummyAuthor1.birthDate);
                        assert.equal(author.email, dummyAuthor1.email);
                        done();
                    });
            });
            it('should return error if author not exist', function (done) {
                supertest(app)
                    .get('/api/authors/4')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author not exist');
                        done();
                    });
            });
        });
        describe('PUT /:id', function () {
            var updatedAuthor = {
                email: 'au222@test.com',
                firstName: 'A 222',
                secondName: 'A 222',
                book: [],
                birthDate: Date.now()
            };
            var notValidAuthor1 = Object.assign({}, updatedAuthor);
            notValidAuthor1.email = '';
            var notValidAuthor2 = Object.assign({}, updatedAuthor);
            notValidAuthor2._id = '2';
            it('should update author', function (done) {
                supertest(app)
                    .put(`/api/authors/${dummyAuthor2._id}`)
                    .send(updatedAuthor)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var author = res.body.author;
                        assert.typeOf(author, 'object');
                        assert.equal(author.firstName, updatedAuthor.firstName);
                        assert.equal(author.secondName, updatedAuthor.secondName);
                        assert.equal(author.birthDate, updatedAuthor.birthDate);
                        assert.equal(author._id, dummyAuthor2._id);
                        assert.equal(author.book.length, 0);
                        done();
                    });
            });
            it('should return error if author not exist', function (done) {
                supertest(app)
                    .put('/api/authors/4')
                    .send(updatedAuthor)
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author not exist');
                        done();
                    });
            });
            it('should return error if author email is empty', function (done) {
                supertest(app)
                    .put('/api/authors/5')
                    .send(notValidAuthor1)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'E-mail is require');
                        done();
                    });
            });
            it('should return error if author with the id already exist', function (done) {
                supertest(app)
                    .put('/api/authors/1')
                    .send(notValidAuthor2)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author with this id already exist');
                        done();
                    });
            });
        });
        describe('PATCH /:id', function () {
            var patchAuthor = {
                email: 'abc@test.com'
            };
            it('should update specific author filed/property', function (done) {
                supertest(app)
                    .patch(`/api/authors/${dummyAuthor2._id}`)
                    .send(patchAuthor)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var author = res.body.author;
                        assert.typeOf(author, 'object');
                        assert.equal(author.email, patchAuthor.email);
                        assert.equal(author._id, dummyAuthor2._id);
                        done();
                    });
            });
            it('should return error if author not exist', function (done) {
                supertest(app)
                    .patch('/api/authors/4')
                    .send(patchAuthor)
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author not exist');
                        done();
                    });
            });
            it('should return error if author email is empty', function (done) {
                supertest(app)
                    .patch('/api/authors/5')
                    .send({
                        email: ''
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'E-mail is require');
                        done();
                    });
            });
            it('should return error if author with the id already exist', function (done) {
                supertest(app)
                    .patch('/api/authors/1')
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
                        assert.equal(body.errors[0], 'Author with this id already exist');
                        done();
                    });
            });
        });
        describe('POST /', function () {
            var newAuthor = {
                email: 'au333@test.com',
                firstName: 'A 3',
                secondName: 'A 3',
                book: [],
                birthDate: Date.now(),
                _id: '3'
            };
            var notValidAuthor1 = Object.assign({}, newAuthor);
            notValidAuthor1._id = '5';
            notValidAuthor1.email = undefined;
            var notValidAuthor2 = Object.assign({}, newAuthor);
            notValidAuthor2._id = '2';
            it('should create new author', function (done) {
                supertest(app)
                    .post(`/api/authors`)
                    .send(newAuthor)
                    .expect(201)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var author = res.body.author;
                        assert.typeOf(author, 'object');
                        assert.equal(author.firstName, newAuthor.firstName);
                        assert.equal(author.firstName, newAuthor.firstName);
                        assert.equal(author.book.length, 0);
                        assert.equal(author.email, newAuthor.email);
                        assert.equal(author.birthDate, newAuthor.birthDate);
                        assert.equal(author._id, newAuthor._id);
                        done();
                    });
            });
            it('should return error if author email is empty', function (done) {
                supertest(app)
                    .post('/api/authors')
                    .send(notValidAuthor1)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'E-mail is require');
                        done();
                    });
            });
            it('should return error if author with the id already exist', function (done) {
                supertest(app)
                    .post('/api/authors')
                    .expect(400)
                    .send(notValidAuthor2)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author with this id already exist');
                        done();
                    });
            });
        });
        describe('DELETE /:id', function () {
            it('should delete author', function (done) {
                supertest(app)
                    .delete(`/api/authors/${dummyAuthor2._id}`)
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
            it('should return error if author not exist', function (done) {
                supertest(app)
                    .delete('/api/authors/4')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var body = res.body;
                        assert.property(body, 'errors');
                        assert.typeOf(body, 'object');
                        assert.equal(body.errors[0], 'Author not exist');
                        done();
                    });
            });
        });
    });
    describe('Controller', function () {
        it('has method "getAuthors"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'getAuthorById');
            assert.typeOf(controller.getAuthorById, 'function');
            assert.equal(controller.getAuthorById.length, 2);
            done();
        });
        it('has method "getAuthorById"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'getAuthors');
            assert.typeOf(controller.getAuthors, 'function');
            assert.equal(controller.getAuthors.length, 2);
            done();
        });
        it('has method "updateAuthor"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'updateAuthor');
            assert.typeOf(controller.updateAuthor, 'function');
            assert.equal(controller.updateAuthor.length, 2);
            done();
        });
        it('has method "removeAuthor"', function (done) {
            assert.typeOf(controller, 'object');
            assert.property(controller, 'removeAuthor');
            assert.typeOf(controller.removeAuthor, 'function');
            assert.equal(controller.removeAuthor.length, 2);
            done();
        });
    });
});


