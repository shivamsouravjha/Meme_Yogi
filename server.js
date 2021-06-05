const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const memer = require('./ROUTERS/memer');
const memes = require('./ROUTERS/memes');
const Erur = require('./MODELS/error');
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
//console.log(process.env.name)
//console.log(process.env.password)
//console.log(process.env.db)
mongoose
  .connect(
    `mongodb://${process.env.name}:${process.env.password}@cluster0.dm1xw.mongodb.net/${process.env.db}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
