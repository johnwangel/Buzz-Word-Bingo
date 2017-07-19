/*jshint esversion: 6 */

const express = require('express');
const app = express();

app.use(express.static('express-todo-api'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(9000, () => {
  console.log('server started');
});