/*jshint esversion: 6 */

const express = require('express');
const fs = require('fs');
const bodyParser = require('Body-Parser');

const app = express();
const words = { buzzwords: [] };
const players = { 'score': 0 };

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/buzzwords', getWords);
app.post('/buzzword', postWord);
app.put('/buzzword', putWord);
app.delete('/buzzword', deleteBuzzword);
app.post('/reset', resetBuzzwords);
app.listen(9000);

function postWord(req, res) {
  if (!req.body) return res.sendStatus(400);
  let buzzword = req.body.buzzword;
  let points = Number(req.body.points);
  let heard = false;
  let buzzObj = words.buzzwords;
  buzzObj.push({ buzzword, points, heard });
  res.send({ success: true });
}

function putWord(req, res) {
  if (!req.body || !req.body.buzzword || !req.body.heard) return res.sendStatus(400);

  let wordArr = words.buzzwords;
  for (var i = 0; i < wordArr.length; i++) {
    if (wordArr[i].buzzword === req.body.buzzword){
      wordArr[i].heard = true;
      players.score += wordArr[i].points;
      res.send({ 'success': true, 'newScore': players.score });
      return;
    }
  }
  res.sendStatus(404);
}

function getWords(req, res) {
  res.json(words);
}

function deleteBuzzword(req, res) {
  if (!req.body) return res.sendStatus(400);
  let wordArr = words.buzzwords;
  for (var i = 0; i < wordArr.length; i++) {
    if (wordArr[i].buzzword === req.body.buzzword){
      wordArr.splice(wordArr.indexOf(wordArr[i]), 1);
      res.send( { 'success': true } );
      return;
    }
  }
  res.sendStatus(404);
}

function resetBuzzwords(req, res) {
  words.buzzwords = [];
  res.send({ reset: true });
}