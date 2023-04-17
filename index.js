const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Entry = require('./models/entry');
require('dotenv').config()

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: 'desc' }).exec();
    res.render('index', { entries });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/', async (req, res) => {
  const entry = new Entry({
    name: req.body.name,
    message: req.body.message,
    date: new Date()
  });

  try {
    await entry.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});