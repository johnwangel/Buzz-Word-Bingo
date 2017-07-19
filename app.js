/*jshint esversion: 6 */

const express = require('express');
const fs = require('fs');
const bodyParser = require('Body-Parser');

const app = express();
const meth = require('./routes/methods');

app.use('/methods', meth);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/buzzwords', meth.getWords);
app.post('/buzzword', meth.postWord);
app.put('/buzzword', meth.putWord);
app.delete('/buzzword', meth.deleteBuzzword);
app.post('/reset', meth.resetBuzzwords);
app.listen(9000);
