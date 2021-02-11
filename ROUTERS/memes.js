const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

router.get('/:memeid', placesControllers.getPlaceById);
router.get('/memer/:memerid', placesControllers.getPlaceById);
router.get('/', placesControllers.getPlaceById);

router.post(
    '/',
    fileUpload.single('meme'),
  [
    check('Caption').isLength({ min: 5 }),
    check('Tags')
      .not()
      .isEmpty()
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

