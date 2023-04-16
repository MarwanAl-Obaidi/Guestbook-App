const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let entries = [];

app.get('/', (req, res) => {
  res.render('index', { entries });
});

app.post('/', (req, res) => {
  const name = req.body.name.trim();
  const message = req.body.message.trim();
  if (name && message) {
    entries.unshift({ name, message, date: new Date() });
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Guestbook app listening on port 3000!');
});