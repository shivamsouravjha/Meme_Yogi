const express = require('express');
const bodyParser = require('body-parser');

const memer = require('./ROUTERS/memer');
const memes = require('./ROUTERS/memes');
const Erur = require('./MODELS/error');

const app = express();

app.use(bodyParser.json());

app.use('/api/memes', memer); // => /api/places...
app.use('/api/memers', memes);

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
    `mongodb://shivam:123456shivam@cluster0-shard-00-00.dm1xw.mongodb.net:27017,cluster0-shard-00-01.dm1xw.mongodb.net:27017,cluster0-shard-00-02.dm1xw.mongodb.net:27017/Meme_Yogi?ssl=true&replicaSet=atlas-x6eag6-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
