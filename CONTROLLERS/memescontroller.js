const fs=require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Erur = require('../MODELS/error');
const MemerSchema = require('../MODELS/memer-schema');
const Memes = require('../MODELS/memes-schema');

const MemesbyID = async (req, res, next) => {
  const memeid = req.params.memeid;

  let meme;
  try {
    meme = await Meme.findById(memeid);
  } catch (err) {
    const error = new Erur(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!meme) {
    const error = new Erur(
      'You Get Nothing in Here',
      404
    );
    return next(error);
  }

  res.json({ meme: meme.toObject({ getters: true }) });
};

const Memesbymemer = async (req, res, next) => {
  const memerID = req.params.memerid;

  let mererswithmeme;
  try {
    mererswithmeme = await MemerSchema.findById(memerID).populate('Meme');
  } catch (err) {
    const error = new Erur(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!mererswithmeme || mererswithmeme.places.length === 0) {
    return next(
      new Erur('Memer is shy to upload memes', 404)
    );
  }

  res.json({ memes: Memesbymemer.memes.map(memes => memes.toObject({ getters: true })) });
};
const Getallmemes = async (req, res, next) => {
  let meme;
  try {
    meme = await Memes.find({});
  } catch (err) {
    const error = new Erur(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ meme: meme.map(meme => meme.toObject({ getters: true })) });
};

const CreateMEME = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new Erur('Sorry to bother,its invalid,mind doing it again?', 422)
    );
  }

  const { Caption, Tags, Memer } = req.body;

  
  const NewMEME = new Place({
    Caption,
    Tags,
    Meme:req.file.path, // => File Upload module, will be replaced with real image url
    Memer
  });

  let memer;
  try {
    memer = await MemerSchema.findById(Memer);
  } catch (err) {
    const error = new Erur(
      'Cannot Upload Meme ,TTYL',
      500
    );
    return next(error);
  }

  if (!memer) {
    const error = new Erur('Register Yourself First Please', 404);
    return next(error);
  }

  console.log(memer);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await NewMEME.save({ session: sess }); 
    user.MemesDB.push(NewMEME); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new Erur(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ meme: NewMEME });
};

const ChangeMeme = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new Erur('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { Caption, Tags } = req.body;
  const memeID = req.params.memeid;

  let meme;
  try {
    meme = await Memes.findById(memeID);
  } catch (err) {
    const error = new Erur(
      'Sorry Cannot format the POST',
      500
    );
    return next(error);
  }

  meme.Caption = Caption;
  meme.Tags = Tags;
  meme.Meme = req.file.path;

  try {
    await meme.save();
  } catch (err) {
    const error = new Erur(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ meme: meme.toObject({ getters: true }) });
};

const MEMEBEGONE = async (req, res, next) => {
  const memeID = req.params.memeid;

  let memetogo;
  try {
    memetogo = await Memes.findById(memeID).populate('Memes');
  } catch (err) {
    const error = new Erur(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!memetogo) {
    const error = new Erur('Could not find place for this id.', 404);
    return next(error);
  }
  const imagePath = memetogo.Meme;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await memetogo.remove({session: sess});
    memetogo.Memer.MemesDB.pull(place);
    await memetogo.Memer.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new Erur(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }
  fs.unlink(imagePath,err=>{
    console.log(err);
  })
  res.status(200).json({ message: 'Deleted place.' });
};

exports.Memesbymemer = Memesbymemer;
exports.MemesbyID = MemesbyID;
exports.CreateMEME = CreateMEME;
exports.ChangeMeme = ChangeMeme;
exports.MEMEBEGONE = MEMEBEGONE;
exports.Getallmemes = Getallmemes;
