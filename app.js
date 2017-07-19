/*jshint esversion: 6 */

const express = require('express');
const fs = require('fs');
const bodyParser = require('Body-Parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const words = { buzzwords: [] };
let userScore = 0;

app.use(express.static('express-todo-api'));

app.get('/buzzwords', (req, res, next) => {
  res.json(words);
  next();
});

app.post('/buzzword', urlencodedParser, (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let buzzword = req.body.buzzword;
  let points = Number(req.body.points);
  let heard = false;
  let buzzObj = words.buzzwords;
  buzzObj.push({ buzzword, points, heard });
  res.send({ success: true });
  next();
});

app.put('/buzzword', urlencodedParser, (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let score = updateBuzzword(req.body.buzzword);
  if (score !== false){
    res.send( { 'success': true, 'newScore': score } );
  } else {
    res.sendStatus(400);
  }
  next();
});

app.delete('/buzzword', urlencodedParser, (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let del = deleteBuzzword(req.body.buzzword);
  if (del !== false){
    res.send( { 'success': true } );
  } else {
    res.sendStatus(400);
  }
  next();
});

app.post('/reset', (req, res, next) => {
  words.buzzwords = [];
  res.send({ reset: true });
  next();
});


app.listen(9000);

function updateBuzzword( bw ) {
  let wordArr = words.buzzwords;
  for (var i = 0; i < wordArr.length; i++) {
    if (wordArr[i].buzzword === bw){
      wordArr[i].heard = true;
      userScore += wordArr[i].points;
      return wordArr[i].points;
    }
  }
  return false;
}

function deleteBuzzword( bw ) {
  let wordArr = words.buzzwords;
  for (var i = 0; i < wordArr.length; i++) {
    console.log(wordArr[i].buzzword);
    if (wordArr[i].buzzword === bw){
      wordArr.splice(wordArr.indexOf(wordArr[i]));
      return true;
    }
  }
  return false;
}