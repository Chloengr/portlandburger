const db = require('./models')
const app = require('./app')
var express = require('express');

app.listen(7000, () => console.log('App listening on port 7000!'))

app.use(express.static('public'));
