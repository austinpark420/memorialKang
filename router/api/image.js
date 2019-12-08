const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadImage = require('../../middleware/uploadImage');

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

// @route   Post api/images
// @desc    Add image
// @access  Private

router.post(
  '/',
  [
    uploadImage,
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

      let imageLocation;
      const images = [];

      let imageKeys;
      const keys = [];

      for (let i = 0; i < fileArray.length; i++) {
        imageKeys = fileArray[i].key;
        keys.push(imageKeys);
        imageLocation = fileArray[i].location;
        images.push(imageLocation);
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
      return res.status(404).json({ msg: '이미지를 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Put api/images
// @desc    Edit images
// @access  Private

router.put(
  '/:id',
  [
    uploadImage,
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('category', '카테고리를 선택해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let detailImages = await Image.findById(req.params.id);

    if (!detailImages) {
      return res.status(404).json({ msg: '이미지가 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (detailImages.images.length && detailImages.keys !== null) {
          let deleteImageKey = [];

          for (let i = 0; i < detailImages.keys.length; i++) {
            deleteImageKey.push({ Key: detailImages.keys[i] });
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
        }

        let imageKeys;
        const keys = [];

        let imageLocation;
        const images = [];

        for (let i = 0; i < fileArray.length; i++) {
          imageKeys = fileArray[i].key;
          keys.push(imageKeys);
          imageLocation = fileArray[i].location;
          images.push(imageLocation);
        }

        const { title, category } = req.body;

        detailImages.title = title;
        detailImages.category = category;
        detailImages.images = images;
        detailImages.keys = keys;

        detailImages = await detailImages.save();
      } else {
        const { title, category } = req.body;

        detailImages.title = title;
        detailImages.category = category;

        detailImages = await detailImages.save();
      }
      res.json(detailImages);
    } catch (error) {
      console.log('**Image errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/images/:id
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

    const allImages = await Image.find().sort({ date: -1 });

    res.json(allImages);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '이미지가 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
