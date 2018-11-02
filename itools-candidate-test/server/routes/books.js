'use strict';

const express = require('express');
const controller = require('../controllers/books');

const router = express.Router();

router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);
router.put('/:id', controller.updateBook);
router.patch('/:id', controller.updateBook);
router.post('/', controller.createBook);
router.delete('/:id', controller.removeBook);

module.exports = router;