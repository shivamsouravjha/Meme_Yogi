const { validationResult } = require('express-validator');

const Erur = require('../MODELS/error');
const MemerSchema = require('../MODELS/memer-schema');

const Getmemer = async (req, res, next) => {
  let memer;
  try {
    memer = await MemerSchema.find({}, '-password');
  } catch (err) {
    const error = new Erur(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ memer: memer.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new Erur('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { Memer,Username, Email,Password,About } = req.body;

  let memerexisted;
  let usernametaken;
  try {
    memerexisted = await MemerSchema.findOne({ Email: Email });
  } catch (err) {
    const error = new Erur(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
    try {
        usernametaken = await MemerSchema.findOne({Username :Username});
  } catch (err) {
    const error = new Erur(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (memerexisted) {
    const error = new Erur(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
    if (usernametaken) {
    const error = new Erur(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  const Newmemer = new MemerSchema({
    Memer,
    Username,
    Email,
    Profile_Pic: req.file.path,
    Password,
    About,
    Meme: []
  });

  try {
    await Newmemer.save();
  } catch (err) {
    const error = new Erur(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({ memer: Newmemer.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { Username, Password } = req.body;

  let memerexisted;

  try {
    memerexisted = await MemerSchema.findOne({ Username: Username });
  } catch (err) {
    const error = new Erur(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!memerexisted || memerexisted.password !== password) {
    const error = new Erur(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    memer: memerexisted.toObject({ getters: true })
  });
};
const ChangeMemer = async (req, res, next) => {
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
  

exports.Getmemer = Getmemer;
exports.signup = signup;
exports.login = login;
exports.ChangeMemer = ChangeMemer;
