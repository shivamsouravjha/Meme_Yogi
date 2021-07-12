var path = require('path');
const express = require('express');

const { check } = require('express-validator');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const memescontroller = require('../CONTROLLERS/memescontroller');
const { fileUpload } = require('../middleware/file-upload');
router.use(checkAuth)

router.get('/:memeid', memescontroller.MemesbyID);
router.get('/memer/:memerid', memescontroller.Memesbymemer);
router.get('/', memescontroller.Getallmemes);

router.post(
    '/:memerid',
    fileUpload.single('meme'),
  [
    check('caption').isLength({ min: 5 }),
    check('tags')
      .not()
      .isEmpty()
  ],memescontroller.createMEME
  
)
router.patch(
    '/:memeid',
    [
      check('caption').isLength({ min: 5 }),
      check('tags')
      .not()
      .isEmpty()
    ],
    memescontroller.ChangeMeme
);
router.delete('/:memeid', memescontroller.MEMEBEGONE);

module.exports = router;

