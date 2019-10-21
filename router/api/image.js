const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Image = require('../../models/Image');

// @route   GET api/images
// @desc    Get image list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const allImages = await Image.find().sort({ date: -1 });
    res.json(allImages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

const uploadImage = multer({
  storage: multerS3({
    s3,
    bucket: 'memorialkang',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, 'images/' + Date.now() + '-' + path.basename(file.originalname));
    }
  }),
  limits: { fileSize: 2000000 } // In bytes: 2000000 bytes = 2 MB
});

// @route   Post api/images
// @desc    Add notice
// @access  Private

router.post(
  '/',
  [
    uploadImage.array('images'),
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('category', '카테고리를 입력해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('name');

      const { title, category } = req.body;

      let fileArray = req.files;

      let fileLocation;
      let fileKey;
      const keys = [];
      const images = [];

      for (let i = 0; i < fileArray.length; i++) {
        fileKey = fileArray[i].key;
        keys.push(fileKey);
        fileLocation = fileArray[i].location;
        images.push(fileLocation);
      }

      const newImage = new Image({
        title,
        category,
        writer: user.name,
        images,
        keys
      });

      await newImage.save();

      const allImages = await Image.find().sort({ date: -1 });

      res.json(allImages);
    } catch (error) {
      console.log('**Video errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   GET api/images/:id
// @desc    Get images by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const detailImages = await Image.findById(req.params.id);

    res.json(detailImages);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Notice not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/notices/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const selectedImages = await Image.findById(req.params.id);

    let deleteImageKey = [];

    for (let i = 0; i < selectedImages.images.length; i++) {
      deleteImageKey.push({ Key: selectedImages.keys[i] });
    }

    if (!selectedImages) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
    }

    let params = {
      Bucket: 'memorialkang',
      Delete: {
        Objects: deleteImageKey
      }
    };

    s3.deleteObjects(params, function(err, data) {
      if (err) console.log('deleteObjects error: ', err, err.stack);
      else console.log('successful response: ', data);
    });

    await selectedImages.remove();

    res.json({ msg: '이미지를 삭제했습니다.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '이미지가 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
