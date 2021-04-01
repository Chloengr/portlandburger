const db = require('./models')
const app = require('./app')
const initServer = require('./initServer')
var express = require('express');

initServer(db);

app.listen(7000, () => console.log('App listening on port 7000!'))

app.use(express.static('public'));
