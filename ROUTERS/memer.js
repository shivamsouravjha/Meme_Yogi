var path = require('path');
const express = require('express');
const { check } = require('express-validator');
const { fileUpload } = require('../middleware/file-upload');
const memercontroller = require('../CONTROLLERS/memercontroller');
const verifier = require('../CONTROLLERS/verifier');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
router.get('/username',verifier.CheckUsername);
router.get('/contact',verifier.Checkcontact);
router.get('/getall',memercontroller.Getmemer);
router.post(
  '/signup',
//  fileUpload.single('Profile_Pic'),
[
  check('name')
    .not()
    .isEmpty(),
    check('username')
    .not()
    .isEmpty(),
  check('password').isLength({ min: 8 })
],
memercontroller.signup
)
router.get('/login',memercontroller.login)

router.use(checkAuth)
router.patch(
    '/:memerid',  ///fileUpload.single('Profile_Pic'),
    [
      check('name')
      .not()
      .isEmpty(),
      check('username')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 8 })
    ],
    memercontroller.ChangeMemer
);
router.delete('/:memerid', memercontroller.MEMERBEGONE);

module.exports = router;

