//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const app = express();
const url = process.env.MONGOLAB_URI;
//=========================//

//====SPEECH MODELS===//

const Quotes = require('./models/quotes.js');
const Scriptures = require('./models/scriptures.js');

//=========================//

//====SET APP ENGINE===//

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

//=========================//

//====START SESSION===//

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//==========================//

//====MONGOOSE PROMISE===//

mongoose.Promise = require('bluebird');

//==========================//

//====MONGOOSE CONNECTION===//

mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});

//==========================//

//====TEST THE CONNECTION/ROOT DIR===//

app.use(function(req, res, next) {
  console.log('Programming is fun!');
  next();
})

app.get('/', function(req, res) {
  res.render('home');
});

//==========================//

//====APP UPDATE SPEECH===//

app.post('/quotecreate', function(req, res) {
  Quotes.create({
  date: req.body.date,
  type: req.body.type,
  author: req.body.author,
  lesson: req.body.lesson,
  talk_reference: req.body.talk_reference,
  text: req.body.text,
  tags: req.body.tags,
}).then(quotes => {
  res.redirect('/')
});
});

//==========================//

//====APP UPDATE SPEECH===//

app.post('/scripturecreate', function(req, res) {
  Scriptures.create({
  lesson: req.body.lesson,
  reference: req.body.reference,
  blurb: req.body.blurb,
}).then(quotes => {
  res.redirect('/')
});
});

//==========================//

//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//
