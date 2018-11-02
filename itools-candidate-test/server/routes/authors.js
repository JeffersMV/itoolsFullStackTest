'use strict';

const express = require('express');
const controller = require('../controllers/authors');

const router = express.Router();

// TODO Add other author routes
router.get('/', controller.getAuthors);
router.get('/:id', controller.getAuthorById);
router.put('/:id', controller.updateAuthor);
router.patch('/:id', controller.updateAuthor);
router.post('/', controller.createAuthor);
router.delete('/:id', controller.removeAuthor);

module.exports = router;

