/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

const words = { buzzwords: [] };
const players = { 'score': 0 };

router.postWord = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (exists(req.body.buzzword)) return res.send({ success: 'false', message: `'${req.body.buzzword}' already exists`});
  let buzzword = req.body.buzzword;
  let points = Number(req.body.points);
  let heard = false;
  let buzzObj = words.buzzwords;
  buzzObj.push({ buzzword, points, heard });
  res.send({ success: true });
};

router.putWord = function(req, res) {
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
};

router.getWords = function(req, res) {
  res.json(words);
};

router.deleteBuzzword = function(req, res) {
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
};

router.resetBuzzwords = function(req, res) {
  words.buzzwords = [];
  res.send({ reset: true });
};

function exists( bw ){
  if (words.buzzwords.some( word => word.buzzword === bw)) return true;
  return false;
}

module.exports = router;