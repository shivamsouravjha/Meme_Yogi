const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const Error = require('./MODELS/error');
const memer = require('./ROUTERS/memer');
const memes = require('./ROUTERS/memes');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
}); 
app.use('/api/memers', memer); 
app.use('/api/memes', memes);

app.use((req, res, next) => {
  const error = new Error('Could not find this route.', 404);
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
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
