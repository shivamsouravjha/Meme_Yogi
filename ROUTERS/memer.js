const express = require('express');
const { check } = require('express-validator');
const { fileUpload } = require('../middleware/file-upload');

const memercontroller = require('../controllers/memercontroller');

const router = express.Router();

router.post(
  '/signup',
//  fileUpload.single('Profile_Pic'),
[
  check('memername')
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
memercontroller.signup
)
router.post('/login',memercontroller.login)
router.patch(
    '/:memerid',  ///fileUpload.single('Profile_Pic'),
    [
      check('memername')
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
router.delete('/:memeid', memercontroller.MEMERBEGONE);

module.exports = router;

