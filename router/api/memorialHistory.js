const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadHistory = require('../../middleware/uploadHistory');

const User = require('../../models/User');
const MemorialHistory = require('../../models/MemorialHistory');

// @route   GET api/memorialHistories
// @desc    Get memorialHistory list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const allMemorialHistories = await MemorialHistory.find().sort({
      date: -1
    });
    res.json(allMemorialHistories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   Post api/memorialHistories
// @desc    Add memorialHistory
// @access  Private

router.post(
  '/',
  [
    uploadHistory.array('images'),
    auth,
    [
      check('title', '제목을 입력해 주세요')
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

      const { title } = req.body;
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

      const newMemorialHistory = new MemorialHistory({
        title,
        writer: user.name,
        images,
        keys
      });

      await newMemorialHistory.save();

      const memorialHistories = await MemorialHistory.find().sort({
        date: -1
      });

      res.json(memorialHistories);
    } catch (error) {
      console.log('**Video errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   GET api/memorialHistories/:id
// @desc    Get memorialHistories by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const detailMemorialHistory = await MemorialHistory.findById(req.params.id);
    res.json(detailMemorialHistory);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: '이미지를 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Put api/memorialHistories
// @desc    Edit memorialHistories
// @access  Private

router.put(
  '/',
  [
    uploadHistory.array('images'),
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let detailMemorialHistory = await MemorialHistory.findById(req.body._id);

    if (!detailMemorialHistory) {
      return res.status(404).json({ msg: '이미지가 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (
          detailMemorialHistory.images.length &&
          detailMemorialHistory.keys !== null
        ) {
          let deleteMemorialHistoryKey = [];

          for (let i = 0; i < detailMemorialHistory.keys.length; i++) {
            deleteMemorialHistoryKey.push({
              Key: detailMemorialHistory.keys[i]
            });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteMemorialHistoryKey
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

        const { title } = req.body;

        detailMemorialHistory.title = title;
        detailMemorialHistory.images = images;
        detailMemorialHistory.keys = keys;

        detailMemorialHistory = await detailMemorialHistory.save();
      } else {
        const { title } = req.body;

        detailMemorialHistory.title = title;

        detailMemorialHistory = await detailMemorialHistory.save();
      }
      res.json(detailMemorialHistory);
    } catch (error) {
      console.log('**MemorialHistory errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/memorialHistories/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const selectedMemorialHistory = await MemorialHistory.findById(
      req.params.id
    );
    let deleteMemorialHistoryKey = [];

    for (let i = 0; i < selectedMemorialHistory.keys.length; i++) {
      deleteMemorialHistoryKey.push({ Key: selectedMemorialHistory.keys[i] });
    }

    if (!selectedMemorialHistory) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
    }

    let params = {
      Bucket: 'memorialkang',
      Delete: {
        Objects: deleteMemorialHistoryKey
      }
    };

    s3.deleteObjects(params, function(err, data) {
      if (err) console.log('deleteObjects error: ', err, err.stack);
      else console.log('successful response: ', data);
    });

    await selectedMemorialHistory.remove();

    const memorialHistories = await MemorialHistory.find().sort({
      date: -1
    });

    res.json(memorialHistories);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '이미지가 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
