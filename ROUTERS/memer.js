const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

router.get('/', placesControllers.getPlaceById);
router.post(
    '/signup',
    fileUpload.single('memer'),
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
      check('caption').isLength({ min: 5 }),
      check('Tags')
      .not()
      .isEmpty()
    ],
    placesControllers.updatePlace
);
router.delete('/:memeid', placesControllers.deletePlace);

module.exports = router;

