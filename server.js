const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const memer = require('./routers/memer');
const memes = require('./routers/memes');
const Erur = require('./models/error');
const cors = require('cors')

const app = express();
app.use(cors());
console.log()
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
  res.json({message: error.message || 'An unknown error occurred!', success: error.success||false});
});

mongoose
  .connect(
    `mongodb://${process.env.name}:${process.env.password}@cluster0-shard-00-00.dm1xw.mongodb.net:27017,cluster0-shard-00-01.dm1xw.mongodb.net:27017,cluster0-shard-00-02.dm1xw.mongodb.net:27017/${process.env.db}?ssl=true&replicaSet=atlas-x6eag6-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
    
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
