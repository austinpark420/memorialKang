const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploadFile');
const User = require('../../models/User');
const Award = require('../../models/Award');

// @route   GET api/awards
// @desc    Get award list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const awards = await Award.find().sort({ date: -1 });
    res.json(awards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/awards/:id
// @desc    Get award by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);

    res.json(award);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Award not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post api/awards
// @desc    Add award
// @access  Private

router.post(
  '/',
  [
    uploadFile.array('files'),
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('winner', '수상자를 입력해 주세요')
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

      const { title, winner, content } = req.body;

      let fileArray = req.files;

      let fileName;
      const originalnames = [];

      let fileLocation;
      const locations = [];

      let fileKey;
      const keys = [];

      for (let i = 0; i < fileArray.length; i++) {
        fileName = fileArray[i].originalname;
        originalnames.push(fileName);
        fileKey = fileArray[i].key;
        keys.push(fileKey);
        fileLocation = fileArray[i].location;
        locations.push(fileLocation);
      }

      // post number
      const awards = await Award.find();
      const awardNumber = awards.length ? awards.length + 1 : 1;

      const newAward = new Award({
        title: title,
        winner: winner,
        number: awardNumber,
        writer: user.name,
        content: content,
        files: {
          locations,
          keys,
          originalnames
        }
      });

      const award = await newAward.save();

      res.json(award);
    } catch (error) {
      console.log('**Award errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   Put api/awards
// @desc    Edit award
// @access  Private

router.put(
  '/',
  [
    uploadFile.array('files'),
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('winner', '수상자를 입력해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let award = await Award.findById(req.body._id);
    if (!award) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (award.files.keys.length && award.files.keys.length !== null) {
          let deleteAwardKey = [];

          for (let i = 0; i < award.files.keys.length; i++) {
            deleteAwardKey.push({ Key: award.files.keys[i] });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteAwardKey
            }
          };

          s3.deleteObjects(params, function(err, data) {
            if (err) console.log('deleteObjects error: ', err, err.stack);
            else console.log('successful response: ', data);
          });
        }

        let fileName;
        const originalnames = [];

        let fileKey;
        const keys = [];

        let fileLocation;
        const locations = [];

        for (let i = 0; i < fileArray.length; i++) {
          fileName = fileArray[i].originalname;
          originalnames.push(fileName);
          fileKey = fileArray[i].key;
          keys.push(fileKey);
          fileLocation = fileArray[i].location;
          locations.push(fileLocation);
        }

        const { title, winner, content } = req.body;

        award.title = title;
        award.winner = winner;
        award.content = content;
        award.files = {
          locations,
          keys,
          originalnames
        };

        award = await award.save();
      } else {
        const { title, winner, content } = req.body;

        award.title = title;
        award.winner = winner;
        award.content = content;

        award = await award.save();
      }
      res.json(award);
    } catch (error) {
      console.log('**Award errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/awards/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);

    if (award.files.keys.length && award.files.keys.length !== null) {
      let deleteAwardKey = [];

      for (let i = 0; i < award.files.keys.length; i++) {
        deleteAwardKey.push({ Key: award.files.keys[i] });
      }

      if (!award) {
        return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
      }

      let params = {
        Bucket: 'memorialkang',
        Delete: {
          Objects: deleteAwardKey
        }
      };

      s3.deleteObjects(params, function(err, data) {
        if (err) console.log('deleteObjects error: ', err, err.stack);
        else console.log('successful response: ', data);
      });
    }

    await award.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
