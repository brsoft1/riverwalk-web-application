var express = require('express');
var models = require('./models/');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// api controllers
var authors = require('./controllers/authors');
var books = require('./controllers/books');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// API Endpoints
app.get('/authors', authors.index);
app.get('/authors/:id', authors.show);
app.post('/authors', authors.create);
app.put('/authors', authors.update);
app.delete('/authors', authors.delete);

app.get('/books', books.index);
app.get('/books/:id', books.show);
app.post('/books', books.create);
app.delete('/books', books.delete);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

module.exports = app;
