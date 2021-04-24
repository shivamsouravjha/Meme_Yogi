const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const memer = require('./ROUTERS/memer');
const memes = require('./ROUTERS/memes');
const Erur = require('./MODELS/error');
var clouud= require('cloudinary').v2
clouud.config({
  cloud_name:'shivamsouravjha',
  api_key:947186273157443,
  api_secret:'UaL81mACgEmZcSb6yMthDQZWMxg'
})
const app = express();

app.use(bodyParser.json());

app.use('/api/memers', memer); // => /api/places...
app.use('/api/memes', memes);

app.use((req, res, next) => {
  const error = new Erur('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});
mongoose
  .connect(
    `mongodb+srv://shivam:shivam123@cluster0.dm1xw.mongodb.net/meme_yogi?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
