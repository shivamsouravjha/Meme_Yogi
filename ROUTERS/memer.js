const express = require('express');
const { check } = require('express-validator');
const { fileUpload } = require('../middleware/file-upload');

const memercontroller = require('../CONTROLLERS/memercontroller');

const router = express.Router();

router.get('/', memercontroller.getPlaceById);
router.post(
  '/signup',
  fileUpload.single('Profile_Pic'),
[
  check('Memer')
    .not()
    .isEmpty(),
    check('Username')
    .not()
    .isEmpty(),
    check('Email')
    .normalizeEmail()
    .isEmail(),
  check('password').isLength({ min: 8 })
],
memercontroller.signup
)
router.post('/login',memercontroller.login)
router.patch(
    '/:memerid',  fileUpload.single('Profile_Pic'),
    [
      check('Memer')
      .not()
      .isEmpty(),
      check('Username')
      .not()
      .isEmpty(),
    check('Email')
      .normalizeEmail()
      .isEmail(),
    check('Password').isLength({ min: 8 })
    ],
    memercontroller.ChangeMemer
);
router.delete('/:memeid', memercontroller.MEMERBEGONE);

module.exports = router;

