const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

router.get('/', placesControllers.getPlaceById);
router.post(
    '/signup',
    fileUpload.single('Profile_Pic'),
  [
    check('Memer')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
  
)
router.patch(
    '/:memeid',
    [
      check('Memer')
      .not()
      .isEmpty(),
    check('Email')
      .normalizeEmail()
      .isEmail(),
    check('Password').isLength({ min: 8 })
    ],
    placesControllers.updatePlace
);
router.delete('/:memeid', placesControllers.deletePlace);

module.exports = router;

