var express = require('express');
var router = express.Router();

var authors = require('../controllers/authors'),
	address = require('../controllers/address'),
  	books = require('../controllers/books');

router.get('/', function (req, res, next) {
    res.render('index');
});

// API Endpoints
router.get('/address', address.index);
router.post('/address', address.create);
router.put('/address', address.update);

router.get('/authors', authors.index);
router.get('/authors/:id', authors.show);
router.post('/authors', authors.create);
router.put('/authors', authors.update);
router.delete('/authors', authors.delete);

router.get('/books', books.index);
router.get('/books/:id', books.show);
router.post('/books', books.create);
router.delete('/books', books.delete);

module.exports = router;

