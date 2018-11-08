'use strict';

const express = require('express');
const controller = require('../controllers/options');

const router = express.Router();

router.get('/authors', controller.getAuthorItems);
router.get('/books', controller.getBookItems);

module.exports = router;