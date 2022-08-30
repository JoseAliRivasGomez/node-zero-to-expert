const express = require('express');
const app = express();
const hbs = require('hbs');
require('dotenv').config();
const port = process.env.PORT;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Kim Wexler',
    titulo: 'Home',
  });
});

app.get('/generic', (req, res) => {
  // res.sendFile( __dirname + '/public/generic.html');
  res.render('generic', {
    nombre: 'Kim Wexler',
    titulo: 'Generic',
  });
});

app.get('/elements', (req, res) => {
  // res.sendFile( __dirname + '/public/elements.html');
  res.render('elements', {
    nombre: 'Kim Wexler',
    titulo: 'Elements',
  });
});

app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});