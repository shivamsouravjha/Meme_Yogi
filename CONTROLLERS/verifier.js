const fs=require('fs');
var path = require('path');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const MemerSchema = require('../models/memer-schema');
const ERROR = require('../models/error');
const cors = require('cors')
const CheckUsername = async (req, res, next) => {
    const { username } = req.body;
    let usernametaken;
    try {
      usernametaken = await MemerSchema.findOne({username:username});
    } catch (err) {
      const error = new ERROR(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    if(!usernametaken)res.json({ found: false});
    res.json({ found: true});
  };
  const Checkcontact = async (req, res, next) => {
    const { contact } = req.body;
    let contactnametaken;
    try {
        contactnametaken = await MemerSchema.findOne({contact:contact});
    } catch (err) {
      const error = new ERROR(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    if(!contactnametaken)res.json({ found: false});
    res.json({ found: true});
  }; 
  exports.CheckUsername =CheckUsername;
  exports.Checkcontact =Checkcontact;